import { categoryData } from "../../categoryData";
import { notFound } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star, ThumbsUp, MessageSquare, Filter, TrendingUp } from "lucide-react";

interface CategoryReviewsPageProps {
  params: {
    category: string;
  };
}

export default function CategoryReviewsPage({ params }: CategoryReviewsPageProps) {
  const data = Object.values(categoryData).find(category => category.slug === params.category);
  
  if (!data) {
    notFound();
  }

  // Mock review data for demonstration
  const mockReviews = [
    {
      id: 1,
      rating: 5,
      title: "Game-changing sleep quality!",
      content: "After months of research on different mattresses, I finally found the perfect one in this category. The difference in my sleep quality is remarkable. I wake up feeling refreshed and without any back pain.",
      author: {
        name: "Sarah M.",
        avatar: "/placeholder.svg",
        verified: true,
        reviewCount: 12,
      },
      product: "Premium Memory Foam Mattress",
      brand: "SleepWell",
      helpful: 24,
      createdAt: "2024-01-15",
      images: 2,
    },
    {
      id: 2,
      rating: 4,
      title: "Great value for money",
      content: "Really impressed with the quality considering the price point. It took about a week to get used to, but now I wouldn't trade it for anything. Highly recommend for anyone looking for affordable quality.",
      author: {
        name: "Mike R.",
        avatar: "/placeholder.svg",
        verified: true,
        reviewCount: 8,
      },
      product: "Organic Cotton Pillow",
      brand: "EcoSleep",
      helpful: 18,
      createdAt: "2024-01-12",
      images: 0,
    },
    {
      id: 3,
      rating: 5,
      title: "Exceeded expectations",
      content: "I was skeptical about ordering online without trying first, but the 30-day trial convinced me. So glad I did! The quality is outstanding and customer service was fantastic when I had questions.",
      author: {
        name: "Emma K.",
        avatar: "/placeholder.svg",
        verified: false,
        reviewCount: 3,
      },
      product: "Smart Sleep Tracker",
      brand: "TechSleep",
      helpful: 31,
      createdAt: "2024-01-08",
      images: 1,
    },
  ];

  const averageRating = 4.6;
  const totalReviews = 1247;
  const ratingDistribution = [
    { stars: 5, count: 748, percentage: 60 },
    { stars: 4, count: 374, percentage: 30 },
    { stars: 3, count: 87, percentage: 7 },
    { stars: 2, count: 25, percentage: 2 },
    { stars: 1, count: 13, percentage: 1 },
  ];

  return (
    <div className="space-y-8">
      {/* Review Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Customer Reviews for {data.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <span className="text-4xl font-bold">{averageRating}</span>
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`h-6 w-6 ${
                        star <= averageRating
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
              </div>
              <p className="text-muted-foreground">Based on {totalReviews} reviews</p>
              <div className="flex items-center justify-center gap-1 mt-2">
                <TrendingUp className="h-4 w-4 text-green-600" />
                <span className="text-sm text-green-600">+15% this month</span>
              </div>
            </div>
            
            <div className="space-y-2">
              {ratingDistribution.map((rating) => (
                <div key={rating.stars} className="flex items-center gap-2">
                  <span className="text-sm w-8">{rating.stars}★</span>
                  <div className="flex-1 bg-muted rounded-full h-2">
                    <div 
                      className="bg-yellow-400 h-2 rounded-full" 
                      style={{ width: `${rating.percentage}%` }}
                    />
                  </div>
                  <span className="text-sm text-muted-foreground w-12 text-right">
                    {rating.count}
                  </span>
                </div>
              ))}
            </div>

            <div className="space-y-3">
              <Button className="w-full">Write a Review</Button>
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-2">
                  Help others choose the right {data.title.toLowerCase()}
                </p>
                <div className="flex justify-center gap-1">
                  <Badge variant="outline" className="text-xs">Expert Verified</Badge>
                  <Badge variant="outline" className="text-xs">Real Customers</Badge>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Review Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary">All Reviews</Badge>
              <Badge variant="outline">5 Stars</Badge>
              <Badge variant="outline">4 Stars</Badge>
              <Badge variant="outline">Verified Only</Badge>
              <Badge variant="outline">With Photos</Badge>
              <Badge variant="outline">Recent</Badge>
            </div>
            <div className="flex gap-2 md:ml-auto">
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
              <Button variant="outline" size="sm">
                Sort: Most Helpful
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Category Insights */}
      <Card>
        <CardHeader>
          <CardTitle>Customer Insights for {data.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-green-600 mb-1">92%</div>
              <div className="text-sm text-muted-foreground">Would Recommend</div>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-blue-600 mb-1">4.2</div>
              <div className="text-sm text-muted-foreground">Avg. Sleep Quality Improvement</div>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-purple-600 mb-1">30</div>
              <div className="text-sm text-muted-foreground">Days Avg. Trial Period</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Individual Reviews */}
      <div className="space-y-6">
        <h2 className="text-xl font-semibold">Customer Reviews</h2>
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
                    <span className="text-muted-foreground text-sm">•</span>
                    <span className="text-muted-foreground text-sm">{review.author.reviewCount} reviews</span>
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
                    <div className="flex gap-2">
                      <Badge variant="outline" className="text-xs">{review.brand}</Badge>
                      <Badge variant="outline" className="text-xs">{review.product}</Badge>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-2">{review.title}</h4>
                    <p className="text-muted-foreground">{review.content}</p>
                  </div>
                  
                  {review.images > 0 && (
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">
                        📷 {review.images} {review.images === 1 ? 'photo' : 'photos'}
                      </Badge>
                    </div>
                  )}
                  
                  <div className="flex items-center gap-4 pt-2">
                    <Button variant="ghost" size="sm" className="text-muted-foreground">
                      <ThumbsUp className="h-4 w-4 mr-1" />
                      Helpful ({review.helpful})
                    </Button>
                    <Button variant="ghost" size="sm" className="text-muted-foreground">
                      <MessageSquare className="h-4 w-4 mr-1" />
                      Reply
                    </Button>
                    <Button variant="ghost" size="sm" className="text-muted-foreground">
                      Share
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
        <Button variant="outline" size="lg">
          Load More Reviews
        </Button>
        <p className="text-sm text-muted-foreground mt-2">
          Showing {mockReviews.length} of {totalReviews} reviews
        </p>
      </div>

      {/* Review Guidelines */}
      <Card>
        <CardHeader>
          <CardTitle>Review Guidelines</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-3">What makes a helpful review?</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Detailed experience with the product</li>
                <li>• Specific features you liked or disliked</li>
                <li>• How it compares to your expectations</li>
                <li>• Photos or videos when possible</li>
                <li>• Honest and constructive feedback</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-3">Review verification</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Reviews are checked for authenticity</li>
                <li>• Verified purchases are clearly marked</li>
                <li>• We remove fake or misleading reviews</li>
                <li>• All reviews follow our community guidelines</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 