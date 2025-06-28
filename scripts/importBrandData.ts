import fs from 'fs';
import path from 'path';
import Papa from 'papaparse';
import { client } from '../sanity/lib/client';

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

async function findOrCreateCategory(categorySlug: string) {
  const existingCategory = await client.fetch(`
    *[_type == "category" && slug.current == $categorySlug][0]
  `, { categorySlug });

  if (existingCategory) {
    return existingCategory._id;
  }
  
  console.log(`Warning: Category "${categorySlug}" not found in Sanity`);
  return null;
}

async function findOrCreateSubNiche(subNicheSlug: string, categoryId: string) {
  const existingSubNiche = await client.fetch(`
    *[_type == "subNiche" && slug.current == $subNicheSlug][0]
  `, { subNicheSlug });

  if (existingSubNiche) {
    return existingSubNiche._id;
  }
  
  console.log(`Warning: SubNiche "${subNicheSlug}" not found in Sanity`);
  return null;
}

async function createBrandDocument(brandData: BrandDataRow, isNewBrand: boolean, categoryId: string, subNicheId: string) {
  const brandSlug = slugify(brandData.brand_slug);
  
  const brandDoc = {
    _type: 'brand',
    _id: `brand-${brandSlug}`,
    title: brandData.brand_name,
    slug: { _type: 'slug', current: brandSlug },
    description: brandData.brand_description,
    website: brandData.brand_website,
    categories: categoryId ? [{ _type: 'reference', _ref: categoryId }] : [],
    // Additional brand fields can be added here
    seoTitle: brandData.meta_title || `${brandData.brand_name} - Sleep Products`,
    seoDescription: brandData.meta_description || brandData.brand_description,
  };

  return brandDoc;
}

async function createDirectoryEntry(brandData: BrandDataRow, brandId: string, categoryId: string, subNicheId: string) {
  const entrySlug = slugify(`${brandData.brand_slug}-${brandData.primary_subniche}`);
  
  const directoryEntry = {
    _type: 'directoryEntry',
    _id: `entry-${entrySlug}`,
    title: brandData.subniche_specific_title,
    slug: { _type: 'slug', current: entrySlug },
    description: brandData.subniche_specific_description,
    type: 'brand',
    brand: { _type: 'reference', _ref: brandId },
    category: categoryId ? { _type: 'reference', _ref: categoryId } : null,
    subNiche: subNicheId ? { _type: 'reference', _ref: subNicheId } : null,
    website: brandData.subniche_specific_url,
    seoTitle: brandData.meta_title || brandData.subniche_specific_title,
    seoDescription: brandData.meta_description || brandData.subniche_specific_description,
  };

  return directoryEntry;
}

async function importBrandData(csvFilePath: string) {
  try {
    console.log('Reading CSV file...');
    const csvContent = fs.readFileSync(csvFilePath, 'utf-8');
    
    console.log('Parsing CSV data...');
    const parseResult = Papa.parse<BrandDataRow>(csvContent, {
      header: true,
      skipEmptyLines: true,
      transformHeader: (header) => header.trim(),
    });

    if (parseResult.errors.length > 0) {
      console.error('CSV parsing errors:', parseResult.errors);
      return;
    }

    const brandData = parseResult.data;
    console.log(`Found ${brandData.length} brand entries to process`);

    const processedBrands = new Set<string>();
    const documentsToCreate = [];

    for (const row of brandData) {
      try {
        console.log(`Processing: ${row.brand_name} - ${row.primary_subniche}`);

        // Find category and subniche
        const categoryId = await findOrCreateCategory(row.primary_category);
        const subNicheId = await findOrCreateSubNiche(row.primary_subniche, categoryId);

        if (!categoryId || !subNicheId) {
          console.log(`Skipping ${row.brand_name} due to missing category or subniche`);
          continue;
        }

        const brandSlug = slugify(row.brand_slug);
        const isNewBrand = !processedBrands.has(brandSlug);

        // Create brand document if it's the first time we see this brand
        if (isNewBrand) {
          const brandDoc = await createBrandDocument(row, true, categoryId, subNicheId);
          documentsToCreate.push(brandDoc);
          processedBrands.add(brandSlug);
        }

        // Create directory entry for this brand-subniche combination
        const directoryEntry = await createDirectoryEntry(row, `brand-${brandSlug}`, categoryId, subNicheId);
        documentsToCreate.push(directoryEntry);

      } catch (error) {
        console.error(`Error processing row for ${row.brand_name}:`, error);
      }
    }

    console.log(`\nCreating ${documentsToCreate.length} documents in Sanity...`);
    
    // Create documents in batches to avoid overwhelming Sanity
    const batchSize = 10;
    for (let i = 0; i < documentsToCreate.length; i += batchSize) {
      const batch = documentsToCreate.slice(i, i + batchSize);
      const transaction = client.transaction();
      
      batch.forEach(doc => {
        transaction.createOrReplace(doc);
      });

      await transaction.commit();
      console.log(`Processed batch ${Math.floor(i / batchSize) + 1}/${Math.ceil(documentsToCreate.length / batchSize)}`);
    }

    console.log('\n✅ Brand data import completed successfully!');
    console.log(`📊 Summary:`);
    console.log(`- Brands processed: ${processedBrands.size}`);
    console.log(`- Directory entries created: ${documentsToCreate.length - processedBrands.size}`);
    console.log(`- Total documents: ${documentsToCreate.length}`);

  } catch (error) {
    console.error('Error importing brand data:', error);
  }
}

// Run the import if this file is executed directly
if (require.main === module) {
  const csvFilePath = process.argv[2] || 'data-collection/brand-data-collected.csv';
  
  if (!fs.existsSync(csvFilePath)) {
    console.error(`CSV file not found: ${csvFilePath}`);
    console.log('Usage: npm run import-brands [path-to-csv-file]');
    process.exit(1);
  }

  importBrandData(csvFilePath);
}

export { importBrandData }; 