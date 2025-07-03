export interface Product {
  id: string
  name: string
  slug: string
  brand: Brand
  categories: Category[]
  description: string
  images: string[]
  price: number
  rating: number
  reviewCount: number
  features: string[]
  url: string
  tags: string[]
  isActive: boolean
  isFeatured: boolean
  createdAt: string
  updatedAt: string
}

export interface Brand {
  id: string
  name: string
  slug: string
  logo?: string
  description?: string
  websiteUrl?: string
  featured?: boolean
  isOnline?: boolean
  categories?: Category[]
  tags?: string[]
  socialLinks?: {
    facebook?: string
    instagram?: string
    tiktok?: string
  }
  locations?: string[]
  productGallery?: string[]
}

export interface Category {
  id: string
  name: string
  slug: string
  description?: string
  parentCategoryId?: string
}

export interface BlogPost {
  id: string
  title: string
  slug: string
  body: string
  excerpt: string
  author: User
  categories: BlogCategory[]
  tags: BlogTag[]
  featuredImage?: string
  publishedAt?: string
  status: "DRAFT" | "PUBLISHED" | "ARCHIVED"
  viewCount: number
  createdAt: string
  updatedAt: string
}

export interface BlogCategory {
  id: string
  name: string
  slug: string
  description?: string
}

export interface BlogTag {
  id: string
  name: string
  slug: string
}

export interface User {
  id: string
  name: string
  email: string
  avatarUrl?: string
  bio?: string
}

export interface ForumThread {
  id: string
  title: string
  slug: string
  author: User
  category: ForumCategory
  posts: ForumPost[]
  isPinned: boolean
  isLocked: boolean
  viewCount: number
  lastActivityAt: string
  createdAt: string
}

export interface ForumCategory {
  id: string
  name: string
  slug: string
  description?: string
}

export interface ForumPost {
  id: string
  author: User
  body: string
  likes: number
  createdAt: string
  editedAt?: string
}

// Mock Data
export const mockBrands: Brand[] = [
  {
    id: "1",
    name: "Emma Sleep",
    slug: "emma-sleep",
    logo: "/placeholder.svg?height=40&width=120",
    description: "Award-winning memory foam mattresses with 200-night trial. Emma Sleep has revolutionized the sleep industry with their innovative approach to mattress design, combining comfort, support, and temperature regulation in one perfect package.",
    websiteUrl: "https://emma-sleep.com",
    featured: true,
    isOnline: true,
    categories: [{ id: "1", name: "Mattresses", slug: "mattresses" }],
    tags: ["Memory Foam", "200-Night Trial", "Free Delivery", "Award-Winning", "Temperature Regulation"],
    socialLinks: {
      facebook: "https://facebook.com/emmasleep",
      instagram: "https://instagram.com/emmasleep",
    },
    productGallery: [
      "/placeholder.svg?height=200&width=300",
      "/placeholder.svg?height=200&width=300",
      "/placeholder.svg?height=200&width=300",
      "/placeholder.svg?height=200&width=300",
      "/placeholder.svg?height=200&width=300",
    ],
  },
  {
    id: "2",
    name: "Simba Sleep",
    slug: "simba-sleep", 
    logo: "/placeholder.svg?height=40&width=120",
    description: "Hybrid mattresses with pocket springs and cooling foam. Simba Sleep combines the best of memory foam and pocket springs to create the perfect balance of comfort and support for every sleep position.",
    websiteUrl: "https://simbasleep.com",
    featured: true,
    isOnline: true,
    categories: [{ id: "1", name: "Mattresses", slug: "mattresses" }],
    tags: ["Hybrid Technology", "Pocket Springs", "Cooling", "British Made", "100-Night Trial"],
    socialLinks: {
      facebook: "https://facebook.com/simbasleep",
      instagram: "https://instagram.com/simbasleep",
      tiktok: "https://tiktok.com/@simbasleep",
    },
    productGallery: [
      "/placeholder.svg?height=200&width=300",
      "/placeholder.svg?height=200&width=300",
      "/placeholder.svg?height=200&width=300",
    ],
  },
  {
    id: "3",
    name: "Casper",
    slug: "casper",
    logo: "/placeholder.svg?height=40&width=120",
    description: "Direct-to-consumer sleep products with zoned support. Casper pioneered the bed-in-a-box revolution and continues to innovate with zoned technology and premium materials.",
    websiteUrl: "https://casper.com",
    featured: true,
    isOnline: true,
    categories: [{ id: "1", name: "Mattresses", slug: "mattresses" }, { id: "2", name: "Pillows", slug: "pillows" }],
    tags: ["Zoned Support", "Direct-to-Consumer", "Premium Materials", "Sleep Accessories"],
    socialLinks: {
      facebook: "https://facebook.com/casper",
      instagram: "https://instagram.com/casper",
    },
    productGallery: [
      "/placeholder.svg?height=200&width=300",
      "/placeholder.svg?height=200&width=300",
      "/placeholder.svg?height=200&width=300",
      "/placeholder.svg?height=200&width=300",
    ],
  },
  {
    id: "4",
    name: "Purple",
    slug: "purple",
    logo: "/placeholder.svg?height=40&width=120",
    description: "Innovative gel grid technology for cooling sleep",
    websiteUrl: "https://purple.com",
    featured: true,
    isOnline: true,
    categories: [{ id: "1", name: "Mattresses", slug: "mattresses" }, { id: "2", name: "Pillows", slug: "pillows" }],
    tags: ["Gel Grid Technology", "Cooling", "Innovative"],
  },
  {
    id: "5",
    name: "Tempur-Pedic",
    slug: "tempur-pedic",
    logo: "/placeholder.svg?height=40&width=120",
    description: "NASA-developed memory foam for personalized comfort",
    websiteUrl: "https://tempurpedic.com",
    featured: true,
    isOnline: true,
    categories: [{ id: "1", name: "Mattresses", slug: "mattresses" }, { id: "2", name: "Pillows", slug: "pillows" }],
    tags: ["NASA Technology", "Memory Foam", "Personalized Comfort"],
  },
  {
    id: "6",
    name: "Eve Sleep",
    slug: "eve-sleep",
    logo: "/placeholder.svg?height=40&width=120",
    description: "Premium foam mattresses with eco-friendly materials",
    websiteUrl: "https://evesleep.com",
    featured: false,
    isOnline: true,
    categories: [{ id: "1", name: "Mattresses", slug: "mattresses" }],
    tags: ["Eco-Friendly", "Premium Foam", "Sustainable"],
  },
  {
    id: "7",
    name: "Nectar Sleep",
    slug: "nectar-sleep",
    logo: "/placeholder.svg?height=40&width=120",
    description: "Memory foam with cooling cover and lifetime warranty",
    websiteUrl: "https://nectarsleep.com",
    featured: false,
    isOnline: true,
    categories: [{ id: "1", name: "Mattresses", slug: "mattresses" }],
    tags: ["Lifetime Warranty", "Cooling Cover", "Memory Foam"],
  },
  {
    id: "8",
    name: "Otty Sleep",
    slug: "otty-sleep",
    logo: "/placeholder.svg?height=40&width=120",
    description: "British-made hybrid mattresses with cooling technology",
    websiteUrl: "https://ottysleep.com",
    featured: false,
    isOnline: true,
    categories: [{ id: "1", name: "Mattresses", slug: "mattresses" }],
    tags: ["British Made", "Hybrid", "Cooling Technology"],
  },
  {
    id: "9",
    name: "Brook + Wilde",
    slug: "brook-wilde",
    logo: "/placeholder.svg?height=40&width=120",
    description: "Luxury British mattresses with premium natural materials",
    websiteUrl: "https://brookandwilde.com",
    featured: false,
    isOnline: true,
    categories: [{ id: "1", name: "Mattresses", slug: "mattresses" }],
    tags: ["Luxury", "Natural Materials", "British Craftsmanship"],
  },
  {
    id: "10",
    name: "Hypnos",
    slug: "hypnos",
    logo: "/placeholder.svg?height=40&width=120",
    description: "Royal Warrant holders crafting luxury handmade beds",
    websiteUrl: "https://hypnosbeds.com",
    featured: false,
    isOnline: false,
    categories: [{ id: "1", name: "Mattresses", slug: "mattresses" }, { id: "3", name: "Bedding", slug: "bedding" }],
    tags: ["Royal Warrant", "Luxury", "Handmade", "Heritage"],
    locations: ["London", "Manchester", "Edinburgh", "Birmingham", "Bristol"],
  },
]

export const mockCategories: Category[] = [
  {
    id: "1",
    name: "Mattresses",
    slug: "mattresses",
    description: "Memory foam, hybrid, innerspring, and latex mattresses for perfect spinal alignment and comfort",
  },
  {
    id: "2",
    name: "Pillows",
    slug: "pillows",
    description: "Memory foam, down, latex, and specialty pillows for optimal neck and head support",
  },
  {
    id: "3",
    name: "Bedding",
    slug: "bedding",
    description: "Premium sheets, comforters, duvets, and blankets for ultimate comfort and temperature control",
  },
  {
    id: "4",
    name: "Sleep Masks",
    slug: "sleep-masks",
    description: "Blackout masks and light-blocking solutions for deeper, uninterrupted sleep",
  },
  {
    id: "5",
    name: "Sleep Aids",
    slug: "sleep-aids",
    description: "Sound machines, white noise generators, and audio solutions for peaceful sleep",
  },
  {
    id: "6",
    name: "Supplements",
    slug: "supplements",
    description: "Natural melatonin, magnesium, and herbal supplements for better sleep quality",
  },
  {
    id: "7",
    name: "Sleep Tracking",
    slug: "sleep-tracking",
    description: "Wearables and devices to monitor and optimize your sleep patterns and quality",
  },
  {
    id: "8",
    name: "Sleepwear",
    slug: "sleepwear",
    description: "Comfortable pajamas and loungewear designed for optimal sleep temperature and comfort",
  },
  {
    id: "9",
    name: "Travel Sleep",
    slug: "travel-sleep",
    description: "Portable sleep solutions including travel pillows and compact sleep aids for better rest on-the-go",
  },
]

export const mockProducts: Product[] = [
  {
    id: "1",
    name: "Purple Hybrid Premier 4",
    slug: "purple-hybrid-premier-4",
    brand: mockBrands[0],
    categories: [mockCategories[0]],
    description:
      "The Purple Hybrid Premier 4 features 4 inches of Purple GelFlex Grid for ultimate comfort and cooling.",
    images: [
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
    price: 2299,
    rating: 4.5,
    reviewCount: 1247,
    features: ['4" Purple GelFlex Grid', "Individually wrapped coils", "10-year warranty", "Free shipping and returns"],
    url: "https://purple.com/mattresses/purple-hybrid-premier",
    tags: ["hybrid", "cooling", "premium"],
    isActive: true,
    isFeatured: true,
    createdAt: "2024-01-15T10:00:00Z",
    updatedAt: "2024-01-15T10:00:00Z",
  },
  {
    id: "2",
    name: "Tempur-Pedic TEMPUR-Adapt",
    slug: "tempur-pedic-tempur-adapt",
    brand: mockBrands[1],
    categories: [mockCategories[0]],
    description: "One-of-a-kind TEMPUR material that adapts to your body for personalized comfort.",
    images: ["/placeholder.svg?height=400&width=600", "/placeholder.svg?height=400&width=600"],
    price: 1699,
    rating: 4.3,
    reviewCount: 892,
    features: ["TEMPUR material", "Medium feel", "10-year warranty", "90-night trial"],
    url: "https://tempurpedic.com/mattresses/tempur-adapt",
    tags: ["memory-foam", "adaptive", "medium"],
    isActive: true,
    isFeatured: true,
    createdAt: "2024-01-10T10:00:00Z",
    updatedAt: "2024-01-10T10:00:00Z",
  },
  {
    id: "3",
    name: "Casper Original Mattress",
    slug: "casper-original-mattress",
    brand: mockBrands[2],
    categories: [mockCategories[0]],
    description: "Three layers of premium foam for balanced comfort and support.",
    images: ["/placeholder.svg?height=400&width=600", "/placeholder.svg?height=400&width=600"],
    price: 1095,
    rating: 4.2,
    reviewCount: 2156,
    features: ["Three-layer foam construction", "Zoned support", "100-night trial", "Free shipping"],
    url: "https://casper.com/mattresses/casper-original",
    tags: ["foam", "balanced", "popular"],
    isActive: true,
    isFeatured: false,
    createdAt: "2024-01-05T10:00:00Z",
    updatedAt: "2024-01-05T10:00:00Z",
  },
  {
    id: "4",
    name: "Purple Harmony Pillow",
    slug: "purple-harmony-pillow",
    brand: mockBrands[0],
    categories: [mockCategories[1]],
    description: "Latex and Purple GelFlex Grid for the perfect balance of support and comfort.",
    images: ["/placeholder.svg?height=300&width=400", "/placeholder.svg?height=300&width=400"],
    price: 179,
    rating: 4.4,
    reviewCount: 567,
    features: ["Talalay latex", "Purple GelFlex Grid", "Breathable design", "100-night trial"],
    url: "https://purple.com/pillows/harmony",
    tags: ["latex", "cooling", "supportive"],
    isActive: true,
    isFeatured: true,
    createdAt: "2024-01-12T10:00:00Z",
    updatedAt: "2024-01-12T10:00:00Z",
  },
]

export const mockUsers: User[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    email: "sarah@example.com",
    avatarUrl: "/placeholder.svg?height=40&width=40",
    bio: "Sleep wellness enthusiast and certified sleep coach",
  },
  {
    id: "2",
    name: "Dr. Michael Chen",
    email: "michael@example.com",
    avatarUrl: "/placeholder.svg?height=40&width=40",
    bio: "Sleep medicine specialist with 15 years of experience",
  },
]

export const mockBlogCategories: BlogCategory[] = [
  {
    id: "1",
    name: "Sleep Science",
    slug: "sleep-science",
    description: "Research and insights into sleep health",
  },
  {
    id: "2",
    name: "Product Reviews",
    slug: "product-reviews",
    description: "In-depth reviews of sleep products",
  },
  {
    id: "3",
    name: "Sleep Tips",
    slug: "sleep-tips",
    description: "Practical advice for better sleep",
  },
]

export const mockBlogTags: BlogTag[] = [
  { id: "1", name: "Insomnia", slug: "insomnia" },
  { id: "2", name: "Mattress", slug: "mattress" },
  { id: "3", name: "Sleep Hygiene", slug: "sleep-hygiene" },
  { id: "4", name: "REM Sleep", slug: "rem-sleep" },
]

export const mockBlogPosts: BlogPost[] = [
  {
    id: "1",
    title: "The Science Behind REM Sleep: Why It Matters for Your Health",
    slug: "science-behind-rem-sleep",
    body: `# The Science Behind REM Sleep

REM (Rapid Eye Movement) sleep is one of the most fascinating and important stages of our sleep cycle. During this phase, our brains are incredibly active, almost as much as when we're awake.

## What Happens During REM Sleep?

During REM sleep, several important processes occur:

- **Memory consolidation**: Your brain processes and stores information from the day
- **Emotional regulation**: REM sleep helps process emotions and experiences
- **Brain development**: Particularly important for children and adolescents
- **Dreaming**: Most vivid dreams occur during REM sleep

## The REM Sleep Cycle

REM sleep typically occurs in cycles throughout the night, with longer REM periods toward morning. A healthy adult spends about 20-25% of their total sleep time in REM sleep.

## Tips for Better REM Sleep

1. Maintain a consistent sleep schedule
2. Create a comfortable sleep environment
3. Avoid alcohol and caffeine before bedtime
4. Manage stress through relaxation techniques

Understanding REM sleep can help you optimize your sleep quality and overall health.`,
    excerpt:
      "Discover the fascinating world of REM sleep and learn why this crucial sleep stage is essential for memory, emotional health, and brain development.",
    author: mockUsers[1],
    categories: [mockBlogCategories[0]],
    tags: [mockBlogTags[3], mockBlogTags[2]],
    featuredImage: "/placeholder.svg?height=300&width=600",
    publishedAt: "2024-01-20T10:00:00Z",
    status: "PUBLISHED",
    viewCount: 1247,
    createdAt: "2024-01-18T10:00:00Z",
    updatedAt: "2024-01-20T10:00:00Z",
  },
  {
    id: "2",
    title: "Purple vs Tempur-Pedic: A Comprehensive Mattress Comparison",
    slug: "purple-vs-tempur-pedic-comparison",
    body: `# Purple vs Tempur-Pedic: Which Mattress is Right for You?

Choosing between Purple and Tempur-Pedic mattresses can be challenging. Both brands offer premium sleep solutions, but they use very different technologies and approaches.

## Purple Mattresses

Purple mattresses feature their signature GelFlex Grid technology:

- **Cooling**: Excellent airflow and temperature regulation
- **Support**: Responsive support that adapts to your body
- **Durability**: Grid technology maintains shape over time
- **Feel**: Unique gel-like feel that's neither too soft nor too firm

## Tempur-Pedic Mattresses

Tempur-Pedic uses their proprietary TEMPUR material:

- **Pressure Relief**: Exceptional pressure point relief
- **Motion Isolation**: Minimal motion transfer between partners
- **Conforming**: Molds closely to your body shape
- **Feel**: Classic memory foam feel with slow response

## Key Differences

| Feature | Purple | Tempur-Pedic |
|---------|--------|--------------|
| Cooling | Excellent | Good |
| Motion Isolation | Good | Excellent |
| Responsiveness | High | Low |
| Price Range | $1,000-$3,000 | $1,500-$4,000 |

## Our Recommendation

Choose Purple if you:
- Sleep hot
- Want responsive support
- Prefer a unique feel

Choose Tempur-Pedic if you:
- Want maximum pressure relief
- Need motion isolation
- Prefer traditional memory foam`,
    excerpt:
      "Compare Purple and Tempur-Pedic mattresses to find the perfect sleep solution for your needs, budget, and sleep preferences.",
    author: mockUsers[0],
    categories: [mockBlogCategories[1]],
    tags: [mockBlogTags[1]],
    featuredImage: "/placeholder.svg?height=300&width=600",
    publishedAt: "2024-01-18T10:00:00Z",
    status: "PUBLISHED",
    viewCount: 892,
    createdAt: "2024-01-16T10:00:00Z",
    updatedAt: "2024-01-18T10:00:00Z",
  },
]

export const mockForumCategories: ForumCategory[] = [
  {
    id: "1",
    name: "General Discussion",
    slug: "general-discussion",
    description: "General sleep-related discussions",
  },
  {
    id: "2",
    name: "Product Help",
    slug: "product-help",
    description: "Get help with sleep products",
  },
  {
    id: "3",
    name: "Sleep Disorders",
    slug: "sleep-disorders",
    description: "Support for sleep disorder issues",
  },
]

export const mockForumThreads: ForumThread[] = [
  {
    id: "1",
    title: "Best mattress for side sleepers?",
    slug: "best-mattress-side-sleepers",
    author: mockUsers[0],
    category: mockForumCategories[0],
    posts: [
      {
        id: "1",
        author: mockUsers[0],
        body: "I'm a side sleeper and looking for a new mattress. Any recommendations? I tend to get hip pain with my current mattress.",
        likes: 5,
        createdAt: "2024-01-20T14:30:00Z",
      },
      {
        id: "2",
        author: mockUsers[1],
        body: "As a sleep specialist, I'd recommend looking for a medium-soft to medium mattress with good pressure relief. Memory foam or hybrid mattresses often work well for side sleepers.",
        likes: 12,
        createdAt: "2024-01-20T15:45:00Z",
      },
    ],
    isPinned: false,
    isLocked: false,
    viewCount: 234,
    lastActivityAt: "2024-01-20T15:45:00Z",
    createdAt: "2024-01-20T14:30:00Z",
  },
]

// Utility functions for filtering and searching
export function filterProducts(
  products: Product[],
  filters: {
    categories?: string[]
    brands?: string[]
    priceMin?: number
    priceMax?: number
    rating?: number
    tags?: string[]
    search?: string
  },
) {
  return products.filter((product) => {
    if (filters.categories?.length && !product.categories.some((cat) => filters.categories!.includes(cat.slug))) {
      return false
    }

    if (filters.brands?.length && !filters.brands.includes(product.brand.slug)) {
      return false
    }

    if (filters.priceMin !== undefined && product.price < filters.priceMin) {
      return false
    }

    if (filters.priceMax !== undefined && product.price > filters.priceMax) {
      return false
    }

    if (filters.rating !== undefined && product.rating < filters.rating) {
      return false
    }

    if (filters.tags?.length && !filters.tags.some((tag) => product.tags.includes(tag))) {
      return false
    }

    if (filters.search) {
      const searchLower = filters.search.toLowerCase()
      return (
        product.name.toLowerCase().includes(searchLower) ||
        product.description.toLowerCase().includes(searchLower) ||
        product.tags.some((tag) => tag.toLowerCase().includes(searchLower))
      )
    }

    return true
  })
}

export function sortProducts(products: Product[], sortBy: string, sortOrder: "asc" | "desc" = "desc") {
  return [...products].sort((a, b) => {
    let comparison = 0

    switch (sortBy) {
      case "name":
        comparison = a.name.localeCompare(b.name)
        break
      case "price":
        comparison = a.price - b.price
        break
      case "rating":
        comparison = a.rating - b.rating
        break
      case "createdAt":
      default:
        comparison = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        break
    }

    return sortOrder === "desc" ? -comparison : comparison
  })
}

export function paginateArray<T>(array: T[], page: number, limit: number) {
  const startIndex = (page - 1) * limit
  const endIndex = startIndex + limit

  return {
    data: array.slice(startIndex, endIndex),
    pagination: {
      page,
      limit,
      total: array.length,
      totalPages: Math.ceil(array.length / limit),
    },
  }
}
