import fs from 'fs';
import path from 'path';
import Papa from 'papaparse';
import { prisma } from '../lib/db';

interface BrandDataRow {
  brand_name: string;
  brand_slug: string;
  brand_website: string;
  brand_description: string;
  brand_logo_url?: string;
  brand_country: string;
  primary_category: string;
  primary_subniche: string;
  subniche_specific_url: string;
  subniche_specific_title: string;
  subniche_specific_description: string;
  price_range_min?: number;
  price_range_max?: number;
  currency: string;
  shipping_info?: string;
  return_policy?: string;
  warranty_info?: string;
  established_year?: number;
  headquarters_location?: string;
  brand_type?: string;
  customer_rating?: number;
  review_count?: number;
  social_media_facebook?: string;
  social_media_instagram?: string;
  social_media_twitter?: string;
  key_features?: string;
  target_audience?: string;
  materials_used?: string;
  certifications?: string;
  awards?: string;
  sustainability_notes?: string;
  customer_support_phone?: string;
  customer_support_email?: string;
  marketplace_amazon_uk?: string;
  marketplace_ebay_uk?: string;
  marketplace_direct_sales?: string;
  special_offers?: string;
  brand_story?: string;
  unique_selling_points?: string;
  competitor_comparison?: string;
  search_keywords?: string;
  meta_title?: string;
  meta_description?: string;
  data_collection_date: string;
  data_collector: string;
  verification_status: string;
  notes?: string;
}

function slugify(str: string): string {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
}

async function findOrCreateCategory(categoryName: string) {
  const categorySlug = slugify(categoryName);
  
  let category = await prisma.category.findUnique({
    where: { slug: categorySlug }
  });

  if (!category) {
    console.log(`Creating category: ${categoryName}`);
    category = await prisma.category.create({
      data: {
        name: categoryName,
        slug: categorySlug,
        description: `${categoryName} products for better sleep`,
      }
    });
  }

  return category;
}

async function createOrUpdateBrand(brandData: BrandDataRow) {
  const brandSlug = slugify(brandData.brand_slug);
  
  // Parse features, awards, and locations from CSV strings
  const tags = brandData.key_features ? brandData.key_features.split(',').map(s => s.trim()) : [];
  const awards = brandData.awards ? brandData.awards.split(',').map(s => s.trim()) : [];
  const locations = brandData.headquarters_location ? [brandData.headquarters_location] : [];
  
  // Build social links object
  const socialLinks: any = {};
  if (brandData.social_media_facebook) socialLinks.facebook = brandData.social_media_facebook;
  if (brandData.social_media_instagram) socialLinks.instagram = brandData.social_media_instagram;
  if (brandData.social_media_twitter) socialLinks.twitter = brandData.social_media_twitter;

  const brandCreateData = {
    name: brandData.brand_name,
    slug: brandSlug,
    description: brandData.brand_description,
    logo: brandData.brand_logo_url || null,
    websiteUrl: brandData.brand_website,
    tags: tags,
    locations: locations,
    isOnline: brandData.brand_type === 'direct-to-consumer' || brandData.marketplace_direct_sales === 'Yes',
    socialLinks: Object.keys(socialLinks).length > 0 ? socialLinks : null,
    featured: brandData.customer_rating ? parseFloat(brandData.customer_rating.toString()) >= 4.5 : false,
    awards: awards,
    productGallery: [], // Will be populated later
  };

  // Check if brand already exists
  const existingBrand = await prisma.brand.findUnique({
    where: { slug: brandSlug }
  });

  let brand;
  if (existingBrand) {
    console.log(`Updating existing brand: ${brandData.brand_name}`);
    brand = await prisma.brand.update({
      where: { slug: brandSlug },
      data: brandCreateData
    });
  } else {
    console.log(`Creating new brand: ${brandData.brand_name}`);
    brand = await prisma.brand.create({
      data: brandCreateData
    });
  }

  return brand;
}

async function connectBrandToCategory(brandId: string, categoryId: string) {
  // Connect brand to category
  await prisma.brand.update({
    where: { id: brandId },
    data: {
      categories: {
        connect: { id: categoryId }
      }
    }
  });
}

export async function importBrandDataFromCSV(csvFilePath: string) {
  try {
    console.log('🚀 Starting brand data import...');
    console.log(`📄 Reading CSV file: ${csvFilePath}`);
    
    const csvContent = fs.readFileSync(csvFilePath, 'utf-8');
    
    console.log('📊 Parsing CSV data...');
    const parseResult = Papa.parse<BrandDataRow>(csvContent, {
      header: true,
      skipEmptyLines: true,
      transformHeader: (header) => header.trim(),
    });

    if (parseResult.errors.length > 0) {
      console.error('❌ CSV parsing errors:', parseResult.errors);
      return;
    }

    const brandData = parseResult.data;
    console.log(`📋 Found ${brandData.length} brand entries to process`);

    const processedBrands = new Set<string>();
    let successCount = 0;
    let errorCount = 0;

    for (const [index, row] of brandData.entries()) {
      try {
        console.log(`\n[${index + 1}/${brandData.length}] Processing: ${row.brand_name}`);

        // Find or create category
        const category = await findOrCreateCategory(row.primary_category);
        
        // Create or update brand
        const brand = await createOrUpdateBrand(row);
        
        // Connect brand to category if not already connected
        await connectBrandToCategory(brand.id, category.id);
        
        processedBrands.add(brand.slug);
        successCount++;
        
        console.log(`✅ ${row.brand_name} processed successfully`);

      } catch (error) {
        console.error(`❌ Error processing ${row.brand_name}:`, error);
        errorCount++;
      }
    }

    console.log('\n🎉 Brand data import completed!');
    console.log(`📊 Summary:`);
    console.log(`✅ Successfully processed: ${successCount} brands`);
    console.log(`❌ Errors: ${errorCount}`);
    console.log(`📝 Total unique brands: ${processedBrands.size}`);
    
    return {
      success: successCount,
      errors: errorCount,
      total: brandData.length
    };

  } catch (error) {
    console.error('💥 Fatal error during import:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// Run the import if this file is executed directly
if (require.main === module) {
  const csvFilePath = process.argv[2] || 'data-collection/brand-data-template.csv';
  
  if (!fs.existsSync(csvFilePath)) {
    console.error(`❌ CSV file not found: ${csvFilePath}`);
    console.log('Usage: npm run import-brands-prisma [path-to-csv-file]');
    process.exit(1);
  }

  importBrandDataFromCSV(csvFilePath);
} 