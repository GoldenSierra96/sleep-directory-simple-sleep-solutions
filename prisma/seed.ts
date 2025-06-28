import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

console.log("Seeding database at:", process.env.DATABASE_URL);

async function main() {
  // Create brands
  const purple = await prisma.brand.create({
    data: {
      name: "Purple",
      slug: "purple",
      description: "Innovative sleep technology company known for their gel grid mattresses.",
      websiteUrl: "https://purple.com",
      logo: "/brands/purple-logo.png",
    },
  })

  console.log("Created Purple brand");

  const tempur = await prisma.brand.create({
    data: {
      name: "Tempur-Pedic",
      slug: "tempur-pedic",
      description: "Premium memory foam mattresses and sleep products.",
      websiteUrl: "https://tempurpedic.com",
      logo: "/brands/tempur-logo.png",
    },
  })

  // Create categories
  const mattressCategory = await prisma.category.create({
    data: {
      name: "Mattresses",
      slug: "mattresses",
      description: "All types of mattresses for better sleep",
    },
  })

  const pillowCategory = await prisma.category.create({
    data: {
      name: "Pillows",
      slug: "pillows",
      description: "Comfortable pillows for all sleep positions",
    },
  })

  // Create users
  const admin = await prisma.user.create({
    data: {
      email: "admin@sleepdirectory.com",
      username: "admin",
      name: "Admin User",
      roles: ["ADMIN"],
    },
  })

  const author = await prisma.user.create({
    data: {
      email: "author@sleepdirectory.com",
      username: "sleepexpert",
      name: "Dr. Sleep Expert",
      bio: "Sleep medicine specialist with 15+ years of experience",
    },
  })

  // Create products
  const purpleMattress = await prisma.product.create({
    data: {
      name: "Purple Hybrid Premier",
      slug: "purple-hybrid-premier",
      brandId: purple.id,
      description: "Premium hybrid mattress with Purple's innovative gel grid technology.",
      images: ["/products/purple-hybrid-premier-1.jpg", "/products/purple-hybrid-premier-2.jpg"],
      price: 2299,
      rating: 4.8,
      reviewCount: 1247,
      features: [
        "GelFlex Grid Technology",
        "Responsive Coils",
        "Cooling Technology",
        "Motion Isolation",
        "100-Night Trial",
        "10-Year Warranty",
      ],
      url: "https://purple.com/mattresses/purple-hybrid-premier",
      tags: ["Hybrid", "Cooling", "Premium"],
      isFeatured: true,
      categories: {
        connect: { id: mattressCategory.id },
      },
    },
  })

  // Create blog categories
  const sleepDisordersCategory = await prisma.blogCategory.create({
    data: {
      name: "Sleep Disorders",
      slug: "sleep-disorders",
      description: "Information about various sleep disorders and treatments",
    },
  })

  // Create blog tags
  const sleepApneaTag = await prisma.blogTag.create({
    data: {
      name: "Sleep Apnea",
      slug: "sleep-apnea",
    },
  })

  // Create blog post
  await prisma.blogPost.create({
    data: {
      title: "Understanding Sleep Apnea: Symptoms and Treatment",
      slug: "understanding-sleep-apnea-symptoms-treatment",
      body: "Sleep apnea is a serious sleep disorder...",
      excerpt: "Learn about sleep apnea symptoms, causes, and effective treatment options.",
      authorId: author.id,
      publishedAt: new Date(),
      status: "PUBLISHED",
      featuredImage: "/blog/sleep-apnea-featured.jpg",
      categories: {
        connect: { id: sleepDisordersCategory.id },
      },
      tags: {
        connect: { id: sleepApneaTag.id },
      },
    },
  })

  // Create forum categories
  const productReviewsCategory = await prisma.forumCategory.create({
    data: {
      name: "Product Reviews",
      slug: "product-reviews",
      description: "Share your experiences with sleep products",
      order: 1,
    },
  })

  // Create forum thread
  const thread = await prisma.thread.create({
    data: {
      title: "Best mattress for side sleepers with back pain?",
      slug: "best-mattress-side-sleepers-back-pain",
      forumCategoryId: productReviewsCategory.id,
      authorId: author.id,
    },
  })

  // Create forum post
  await prisma.forumPost.create({
    data: {
      threadId: thread.id,
      authorId: author.id,
      body: "I'm looking for recommendations for a mattress that works well for side sleepers who also have back pain. Any suggestions?",
    },
  })

  // Create Not Swiss Cheese brand
  const notSwissCheese = await prisma.brand.create({
    data: {
      name: "Not Swiss Cheese",
      slug: "not-swiss-cheese",
      logo: "https://www.notswisscheese.co.uk/cdn/shop/files/gempages_532633081576686393-16438b11-e4ff-4aa9-8344-dd1b54890c52.png?v=1727003792&width=352",
      description: "Why We're Not Your Average Pillow Shop\nEvery night, people around the world lay their heads on pillows that do more harm than good. Cheap materials, poor support, and short lifespans mean most pillows need replacing every year. The result? A global epidemic of stiff necks, sweaty sleep, and misaligned spines. Our Natural Talalay Pillow is different. Made from pure, breathable natural rubber, it offers lasting support and comfort—night after night, year after year. No neck pain. No spine issues. No sweaty regrets. Just deep, restorative sleep.",
      websiteUrl: "https://notswisscheese.co.uk",
      categories: {
        connect: [
          { id: mattressCategory.id },
          { id: pillowCategory.id }
        ]
      },
      tags: ["Eco-friendly", "Organic", "Luxury"],
      locations: ["Warehouses in Leeds, UK", "Debno, Poland"],
      isOnline: true,
      socialLinks: {
        instagram: "https://www.instagram.com/notswisscheese.co.uk/",
        facebook: "https://www.facebook.com/notswisscheese.co.uk/",
        tiktok: "https://www.tiktok.com/@notswisscheese.co.uk"
      },
      featured: true,
      awards: [],
      productGallery: [
        "https://www.notswisscheese.co.uk/cdn/shop/files/Tal_x-ray_with_box_-_Glow.png?v=1743588847&width=823",
        "https://www.notswisscheese.co.uk/cdn/shop/files/DUN-CN24-PDPXRay_2_c6b50dbe-9caf-43cd-8bf5-0bd9831ae551.png?v=1738050038&width=750"
      ],
    },
  })

  console.log("Database seeded successfully!")
}

main()
  .catch((e) => {
    console.error("SEED ERROR:", e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
