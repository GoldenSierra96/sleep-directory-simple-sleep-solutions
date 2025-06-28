import type { Prisma } from "@prisma/client";

type Brand = {
  id?: string;
  name: string;
  slug: string;
  logo?: string | null;
  description?: string | null;
  websiteUrl?: string | null;
  tags: string[];
  locations: string[];
  isOnline: boolean;
  socialLinks?: any;
  featured: boolean;
  awards: string[];
  productGallery: string[];
  createdAt?: Date;
  updatedAt?: Date;
};

interface SocialLinks {
  instagram?: string;
  facebook?: string;
  tiktok?: string;
  twitter?: string;
  youtube?: string;
}

export const brandTemplate: Partial<Brand> = {
  name: "Example Brand",
  slug: "example-brand",
  logo: "/brands/example-brand/logo.png",
  description: "A premium sleep solutions brand offering innovative products for better rest and recovery.",
  websiteUrl: "https://example-brand.com",
  tags: [
    "premium",
    "innovative",
    "eco-friendly",
    "certified",
    "award-winning"
  ],
  locations: [
    "New York, NY",
    "Los Angeles, CA",
    "Chicago, IL"
  ],
  isOnline: true,
  socialLinks: {
    instagram: "https://instagram.com/examplebrand",
    facebook: "https://facebook.com/examplebrand",
    tiktok: "https://tiktok.com/@examplebrand",
    twitter: "https://twitter.com/examplebrand",
    youtube: "https://youtube.com/@examplebrand"
  } as SocialLinks,
  featured: false,
  awards: [
    "Best Sleep Product 2023",
    "Innovation Award 2022",
    "Customer Choice Award 2023"
  ],
  productGallery: [
    "/brands/example-brand/product1.jpg",
    "/brands/example-brand/product2.jpg",
    "/brands/example-brand/product3.jpg"
  ]
};

// Example of a complete brand entry with all fields
export const completeBrandExample: Partial<Brand> = {
  ...brandTemplate,
  name: "SleepWell Innovations",
  slug: "sleepwell-innovations",
  logo: "/brands/sleepwell/logo.png",
  description: "SleepWell Innovations is a leading manufacturer of premium sleep products, combining cutting-edge technology with sustainable materials to create the perfect sleep environment. Our products are designed with both comfort and environmental responsibility in mind.",
  websiteUrl: "https://sleepwell.com",
  tags: [
    "premium",
    "innovative",
    "eco-friendly",
    "certified",
    "award-winning",
    "sustainable",
    "luxury",
    "smart-technology"
  ],
  locations: [
    "New York, NY",
    "Los Angeles, CA",
    "Chicago, IL",
    "Miami, FL",
    "Seattle, WA"
  ],
  isOnline: true,
  socialLinks: {
    instagram: "https://instagram.com/sleepwell",
    facebook: "https://facebook.com/sleepwell",
    tiktok: "https://tiktok.com/@sleepwell",
    twitter: "https://twitter.com/sleepwell",
    youtube: "https://youtube.com/@sleepwell"
  } as SocialLinks,
  featured: true,
  awards: [
    "Best Sleep Product 2023 - Sleep Foundation",
    "Innovation Award 2022 - Sleep Tech Association",
    "Customer Choice Award 2023 - Consumer Reports",
    "Green Product Award 2023 - Eco Alliance",
    "Design Excellence Award 2022 - Design Week"
  ],
  productGallery: [
    "/brands/sleepwell/smart-mattress.jpg",
    "/brands/sleepwell/pillow-collection.jpg",
    "/brands/sleepwell/sleep-tracker.jpg",
    "/brands/sleepwell/blackout-curtains.jpg",
    "/brands/sleepwell/white-noise-machine.jpg"
  ]
};

// Helper function to validate brand data
export function validateBrandData(brand: Partial<Brand>): string[] {
  const errors: string[] = [];
  
  if (!brand.name) errors.push("Brand name is required");
  if (!brand.slug) errors.push("Brand slug is required");
  if (!brand.description) errors.push("Brand description is required");
  
  // Validate slug format
  if (brand.slug && !/^[a-z0-9-]+$/.test(brand.slug)) {
    errors.push("Slug must contain only lowercase letters, numbers, and hyphens");
  }
  
  // Validate URLs
  if (brand.websiteUrl && !brand.websiteUrl.startsWith("http")) {
    errors.push("Website URL must start with http:// or https://");
  }
  
  if (brand.socialLinks) {
    const socialLinks = brand.socialLinks as SocialLinks;
    Object.entries(socialLinks).forEach(([platform, url]) => {
      if (url && !url.startsWith("http")) {
        errors.push(`${platform} URL must start with http:// or https://`);
      }
    });
  }
  
  return errors;
} 