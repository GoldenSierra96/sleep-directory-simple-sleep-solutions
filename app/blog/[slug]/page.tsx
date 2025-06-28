import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Calendar, Clock, User, Share2, BookOpen, ArrowLeft, ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { SeoSchema } from "@/components/seo-schema"

// This would typically come from a database or API
const getBlogPost = (slug: string) => {
  const posts = {
    "understanding-sleep-apnea": {
      id: 1,
      title: "Understanding Sleep Apnea: Symptoms, Causes, and Treatment Options",
      slug: "understanding-sleep-apnea",
      excerpt:
        "Sleep apnea affects millions of people worldwide. Learn about the different types, warning signs, and effective treatment approaches including CPAP therapy and lifestyle changes.",
      content: `
        <p>Sleep apnea is one of the most common yet underdiagnosed sleep disorders, affecting an estimated 22 million Americans. This serious condition occurs when breathing repeatedly stops and starts during sleep, leading to fragmented rest and potentially dangerous health complications.</p>

        <h2>What is Sleep Apnea?</h2>
        <p>Sleep apnea is characterized by repeated interruptions in breathing during sleep. These pauses can last from a few seconds to minutes and may occur 30 times or more per hour. The most common type is obstructive sleep apnea (OSA), which occurs when throat muscles relax and block the airway.</p>

        <h2>Types of Sleep Apnea</h2>
        <h3>Obstructive Sleep Apnea (OSA)</h3>
        <p>The most common form, occurring when throat muscles relax and block the airway during sleep. This accounts for about 84% of all sleep apnea cases.</p>

        <h3>Central Sleep Apnea</h3>
        <p>Less common, this occurs when the brain fails to send proper signals to the muscles that control breathing.</p>

        <h3>Complex Sleep Apnea Syndrome</h3>
        <p>Also known as treatment-emergent central sleep apnea, this is a combination of both obstructive and central sleep apnea.</p>

        <h2>Common Symptoms</h2>
        <ul>
          <li>Loud snoring (though not everyone who snores has sleep apnea)</li>
          <li>Episodes of breathing cessation during sleep witnessed by others</li>
          <li>Gasping for air during sleep</li>
          <li>Morning headaches</li>
          <li>Excessive daytime sleepiness</li>
          <li>Difficulty concentrating</li>
          <li>Irritability and mood changes</li>
        </ul>

        <h2>Risk Factors</h2>
        <p>Several factors can increase your risk of developing sleep apnea:</p>
        <ul>
          <li>Excess weight and obesity</li>
          <li>Neck circumference greater than 17 inches (men) or 16 inches (women)</li>
          <li>Age (more common in older adults)</li>
          <li>Gender (men are 2-3 times more likely to have sleep apnea)</li>
          <li>Family history</li>
          <li>Use of alcohol or sedatives</li>
          <li>Smoking</li>
        </ul>

        <h2>Treatment Options</h2>
        <h3>CPAP Therapy</h3>
        <p>Continuous Positive Airway Pressure (CPAP) is the gold standard treatment for moderate to severe sleep apnea. The machine delivers pressurized air through a mask to keep airways open during sleep.</p>

        <h3>Lifestyle Changes</h3>
        <ul>
          <li>Weight loss (even modest weight loss can help)</li>
          <li>Regular exercise</li>
          <li>Avoiding alcohol and sedatives</li>
          <li>Sleeping on your side</li>
          <li>Quitting smoking</li>
        </ul>

        <h3>Oral Appliances</h3>
        <p>Custom-fitted devices that reposition the jaw and tongue to keep airways open. These are often effective for mild to moderate sleep apnea.</p>

        <h3>Surgery</h3>
        <p>In severe cases where other treatments haven't worked, surgical options may be considered, including uvulopalatopharyngoplasty (UPPP) or more advanced procedures.</p>

        <h2>The Importance of Treatment</h2>
        <p>Untreated sleep apnea can lead to serious health complications including high blood pressure, heart disease, stroke, diabetes, and depression. It also increases the risk of accidents due to daytime sleepiness.</p>

        <p>If you suspect you or a loved one may have sleep apnea, it's crucial to consult with a healthcare provider or sleep specialist for proper diagnosis and treatment.</p>
      `,
      category: "Sleep Disorders",
      author: "Dr. Michael Chen",
      authorBio: "Board-certified sleep medicine physician with over 15 years of experience treating sleep disorders.",
      publishDate: "2024-01-15",
      readTime: "8 min read",
      image: "/placeholder.svg?height=400&width=800",
      tags: ["Sleep Apnea", "CPAP", "Sleep Disorders", "Treatment"],
      relatedPosts: [
        {
          title: "CPAP vs. Oral Appliances: Which is Right for You?",
          slug: "cpap-vs-oral-appliances",
          image: "/placeholder.svg?height=200&width=300",
        },
        {
          title: "The Hidden Dangers of Untreated Sleep Apnea",
          slug: "dangers-untreated-sleep-apnea",
          image: "/placeholder.svg?height=200&width=300",
        },
      ],
    },
  }

  return posts[slug as keyof typeof posts] || null
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getBlogPost(params.slug)

  if (!post) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Article Not Found</h1>
          <Link href="/blog">
            <Button>Back to Blog</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <>
      {/* SEO Schema for Blog Post */}
      <SeoSchema
        title={`${post.title} | Sleep Directory Blog`}
        description={post.excerpt}
        type="Article"
        breadcrumbs={[
          { name: "Home", item: "/", position: 1 },
          { name: "Blog", item: "/blog", position: 2 },
          { name: post.title, item: `/blog/${post.slug}`, position: 3 },
        ]}
        articleData={{
          headline: post.title,
          image: post.image,
          datePublished: post.publishDate,
          dateModified: post.publishDate,
          author: {
            name: post.author,
            type: "Person",
          },
        }}
      />

      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="border-b">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Link href="/" className="flex items-center space-x-2">
                <div className="h-8 w-8 bg-primary rounded-full" />
                <span className="text-2xl font-bold">SleepDirectory</span>
              </Link>
              <nav className="hidden md:flex items-center space-x-6">
                <Link href="/directory" className="text-muted-foreground hover:text-foreground">
                  Directory
                </Link>
                <Link href="/blog" className="text-foreground font-medium">
                  Blog
                </Link>
                <Link href="/about" className="text-muted-foreground hover:text-foreground">
                  About
                </Link>
                <Button>Submit Listing</Button>
              </nav>
            </div>
          </div>
        </header>

        <article className="container mx-auto px-4 py-8 max-w-4xl">
          {/* Breadcrumb */}
          <nav className="mb-6 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground">
              Home
            </Link>
            <span className="mx-2">/</span>
            <Link href="/blog" className="hover:text-foreground">
              Blog
            </Link>
            <span className="mx-2">/</span>
            <span className="text-foreground">{post.title}</span>
          </nav>

          {/* Back Button */}
          <Link
            href="/blog"
            className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Blog
          </Link>

          {/* Article Header */}
          <header className="mb-8">
            <Badge className="mb-4">{post.category}</Badge>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">{post.title}</h1>
            <p className="text-xl text-muted-foreground mb-6">{post.excerpt}</p>

            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6">
              <div className="flex items-center">
                <User className="h-4 w-4 mr-2" />
                <span>{post.author}</span>
              </div>
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2" />
                <span>{new Date(post.publishDate).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-2" />
                <span>{post.readTime}</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
              {post.tags.map((tag, index) => (
                <Badge key={index} variant="outline">
                  {tag}
                </Badge>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
              <Button variant="outline" size="sm">
                Share
              </Button>
              <Button variant="outline" size="sm">
                <BookOpen className="h-4 w-4 mr-2" />
                Save
              </Button>
            </div>
          </header>

          {/* Featured Image */}
          <div className="aspect-video relative overflow-hidden rounded-lg mb-8">
            <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
          </div>

          {/* Article Content */}
          <div className="prose prose-lg max-w-none mb-12">
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
          </div>

          <Separator className="mb-8" />

          {/* Author Bio */}
          <Card className="mb-8">
            <CardHeader>
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center">
                  <User className="h-8 w-8" />
                </div>
                <div>
                  <CardTitle>About {post.author}</CardTitle>
                  <CardDescription>{post.authorBio}</CardDescription>
                </div>
              </div>
            </CardHeader>
          </Card>

          {/* Related Posts */}
          {post.relatedPosts && post.relatedPosts.length > 0 && (
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-6">Related Articles</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {post.relatedPosts.map((relatedPost, index) => (
                  <Link key={index} href={`/blog/${relatedPost.slug}`}>
                    <Card className="hover:shadow-lg transition-shadow">
                      <div className="aspect-video relative overflow-hidden rounded-t-lg">
                        <Image
                          src={relatedPost.image || "/placeholder.svg"}
                          alt={relatedPost.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <CardHeader>
                        <CardTitle className="line-clamp-2">{relatedPost.title}</CardTitle>
                      </CardHeader>
                    </Card>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* Navigation */}
          <div className="flex justify-between items-center">
            <Link href="/blog">
              <Button variant="outline">
                <ArrowLeft className="mr-2 h-4 w-4" />
                All Articles
              </Button>
            </Link>
            <Button variant="outline">
              Next Article
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </article>

        {/* Newsletter Signup */}
        <section className="bg-muted py-16">
          <div className="container mx-auto px-4 text-center max-w-2xl">
            <h2 className="text-2xl font-bold mb-4">Stay Updated on Sleep Health</h2>
            <p className="text-muted-foreground mb-6">
              Get the latest sleep research, tips, and expert advice delivered to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-2 rounded-md border border-input bg-background flex-1 max-w-sm"
              />
              <Button>Subscribe</Button>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
