import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star, ThumbsUp, MessageSquare } from "lucide-react";

export default async function BrandReviewsPage({ params }: { params: { slug: string } }) {
  const brand = await prisma.brand.findUnique({
    where: { slug: params.slug },
    include: { 
      categories: true,
      // When you add review relations:
      // reviews: {
      //   include: {
      //     user: true,
      //   },
      //   orderBy: {
      //     createdAt: 'desc'
      //   }
      // }
    },
  });
  
  if (!brand) notFound();

  // Mock review data for demonstration
  const mockReviews = [
    {
      id: 1,
      rating: 5,
      title: "Excellent sleep products!",
      content: "I've been using their mattress for 6 months now and my sleep quality has improved dramatically. The customer service was also fantastic when I had questions about setup.",
      author: {
        name: "Sarah Johnson",
        avatar: "/placeholder.svg",
        verified: true,
      },
      helpful: 12,
      createdAt: "2024-01-15",
      product: "Memory Foam Mattress",
    },
    {
      id: 2,
      rating: 4,
      title: "Great quality, fast shipping",
      content: "Really impressed with the build quality and comfort. Shipping was faster than expected. Only minor complaint is the initial smell that took a few days to air out.",
      author: {
        name: "Mike Chen",
        avatar: "/placeholder.svg",
        verified: true,
      },
      helpful: 8,
      createdAt: "2024-01-10",
      product: "Cooling Pillow",
    },
    {
      id: 3,
      rating: 5,
      title: "Life-changing sleep experience",
      content: "After years of poor sleep, this mattress has been a game-changer. The pressure relief is incredible and I wake up without any back pain. Highly recommend!",
      author: {
        name: "Emma Wilson",
        avatar: "/placeholder.svg",
        verified: false,
      },
      helpful: 15,
      createdAt: "2024-01-05",
      product: "Hybrid Mattress",
    },
  ];

  const averageRating = 4.7;
  const totalReviews = 247;

  return (
    <div className="space-y-8">
      {/* Review Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Customer Reviews</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <span className="text-3xl font-bold">{averageRating}</span>
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`h-5 w-5 ${
                        star <= averageRating
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
              </div>
              <p className="text-muted-foreground">Based on {totalReviews} reviews</p>
            </div>
            
            <div className="space-y-2">
              {[5, 4, 3, 2, 1].map((rating) => (
                <div key={rating} className="flex items-center gap-2">
                  <span className="text-sm w-8">{rating}★</span>
                  <div className="flex-1 bg-muted rounded-full h-2">
                    <div 
                      className="bg-yellow-400 h-2 rounded-full" 
                      style={{ width: `${rating === 5 ? 60 : rating === 4 ? 30 : rating === 3 ? 8 : 2}%` }}
                    />
                  </div>
                  <span className="text-sm text-muted-foreground w-8">
                    {rating === 5 ? 148 : rating === 4 ? 74 : rating === 3 ? 20 : 5}
                  </span>
                </div>
              ))}
            </div>

            <div className="space-y-3">
              <Button className="w-full">Write a Review</Button>
              <p className="text-xs text-muted-foreground text-center">
                Share your experience with {brand.name}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Review Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline">All Reviews</Badge>
            <Badge variant="outline">5 Stars</Badge>
            <Badge variant="outline">4 Stars</Badge>
            <Badge variant="outline">Verified Purchases</Badge>
            <Badge variant="outline">Photos & Videos</Badge>
            <Badge variant="outline">Recent</Badge>
          </div>
        </CardContent>
      </Card>

      {/* Individual Reviews */}
      <div className="space-y-6">
        {mockReviews.map((review) => (
          <Card key={review.id}>
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <Avatar>
                  <AvatarImage src={review.author.avatar} />
                  <AvatarFallback>{review.author.name.charAt(0)}</AvatarFallback>
                </Avatar>
                
                <div className="flex-1 space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">{review.author.name}</span>
                    {review.author.verified && (
                      <Badge variant="secondary" className="text-xs">Verified Purchase</Badge>
                    )}
                    <span className="text-muted-foreground text-sm">•</span>
                    <span className="text-muted-foreground text-sm">{review.createdAt}</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`h-4 w-4 ${
                            star <= review.rating
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <Badge variant="outline" className="text-xs">{review.product}</Badge>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-2">{review.title}</h4>
                    <p className="text-muted-foreground">{review.content}</p>
                  </div>
                  
                  <div className="flex items-center gap-4 pt-2">
                    <Button variant="ghost" size="sm" className="text-muted-foreground">
                      <ThumbsUp className="h-4 w-4 mr-1" />
                      Helpful ({review.helpful})
                    </Button>
                    <Button variant="ghost" size="sm" className="text-muted-foreground">
                      <MessageSquare className="h-4 w-4 mr-1" />
                      Reply
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Load More */}
      <div className="text-center">
        <Button variant="outline">Load More Reviews</Button>
      </div>
    </div>
  );
} 