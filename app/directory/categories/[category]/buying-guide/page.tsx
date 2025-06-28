import { categoryData } from "../../categoryData";
import { notFound } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle, AlertTriangle, Info, Star, DollarSign, Shield } from "lucide-react";

interface CategoryBuyingGuidePageProps {
  params: {
    category: string;
  };
}

export default function CategoryBuyingGuidePage({ params }: CategoryBuyingGuidePageProps) {
  const data = Object.values(categoryData).find(category => category.slug === params.category);
  
  if (!data) {
    notFound();
  }

  // Generate buying guide content based on category
  const buyingGuide = {
    quickTips: data.tips || [],
    budgetGuide: [
      { range: "Under £100", description: "Basic options with essential features", recommended: "Entry-level products" },
      { range: "£100 - £500", description: "Good quality with additional comfort features", recommended: "Most popular choice" },
      { range: "£500 - £1000", description: "Premium materials and advanced features", recommended: "High-end options" },
      { range: "Over £1000", description: "Luxury products with cutting-edge technology", recommended: "Premium luxury" },
    ],
    features: [
      { name: "Material Quality", importance: "High", description: "Look for certified, durable materials" },
      { name: "Comfort Level", importance: "High", description: "Consider your personal preferences" },
      { name: "Size Options", importance: "Medium", description: "Ensure proper fit for your space" },
      { name: "Warranty", importance: "Medium", description: "Good coverage for peace of mind" },
      { name: "Certifications", importance: "Medium", description: "Safety and quality standards" },
    ],
    commonMistakes: [
      "Not considering your specific sleep position and preferences",
      "Focusing only on price without considering long-term value",
      "Ignoring return policies and trial periods",
      "Not reading customer reviews and expert recommendations",
      "Overlooking maintenance requirements and care instructions",
    ],
  };

  return (
    <div className="space-y-8">
      {/* Quick Start Guide */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="h-5 w-5 text-yellow-500" />
            Quick Start Guide
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">
            New to shopping for {data.title.toLowerCase()}? Follow these essential steps to make the right choice.
          </p>
          <ol className="space-y-3">
            {buyingGuide.quickTips.map((tip, index) => (
              <li key={index} className="flex items-start gap-3">
                <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0 mt-0.5">
                  {index + 1}
                </div>
                <span>{tip}</span>
              </li>
            ))}
          </ol>
        </CardContent>
      </Card>

      {/* Budget Guide */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-green-500" />
            Budget Planning Guide
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {buyingGuide.budgetGuide.map((budget, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold">{budget.range}</h3>
                  <Badge variant="outline">{budget.recommended}</Badge>
                </div>
                <p className="text-sm text-muted-foreground">{budget.description}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 p-4 bg-blue-50 rounded-lg">
            <div className="flex items-start gap-2">
              <Info className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm text-blue-800">
                  <strong>Pro Tip:</strong> Consider the cost per year of use. A higher upfront investment often provides better long-term value through durability and performance.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Key Features to Consider */}
      <Card>
        <CardHeader>
          <CardTitle>Key Features to Consider</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {buyingGuide.features.map((feature, index) => (
              <div key={index} className="flex items-start gap-4 p-4 border rounded-lg">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold">{feature.name}</h3>
                    <Badge 
                      variant={feature.importance === "High" ? "default" : feature.importance === "Medium" ? "secondary" : "outline"}
                      className="text-xs"
                    >
                      {feature.importance} Priority
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Common Mistakes to Avoid */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-orange-500" />
            Common Mistakes to Avoid
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {buyingGuide.commonMistakes.map((mistake, index) => (
              <div key={index} className="flex items-start gap-3 p-3 bg-orange-50 rounded-lg">
                <AlertTriangle className="h-4 w-4 text-orange-600 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-orange-800">{mistake}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Warranty and Returns */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-blue-500" />
            Warranty & Returns Guide
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-3">What to Look For</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  Minimum 1-year warranty coverage
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  30-day return or trial period
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  Clear warranty terms and conditions
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  Responsive customer service
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-3">Red Flags</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                  No warranty or very short coverage
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                  Restocking fees for returns
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                  Unclear or hidden terms
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                  Poor customer service reviews
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Steps */}
      <Card>
        <CardHeader>
          <CardTitle>Ready to Shop?</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-muted-foreground">
              Now that you know what to look for, start exploring our curated selection of {data.title.toLowerCase()}.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button asChild>
                <a href={`/directory/categories/${data.slug}/products`}>
                  Browse Products
                </a>
              </Button>
              <Button variant="outline" asChild>
                <a href={`/directory/categories/${data.slug}/brands`}>
                  Compare Brands
                </a>
              </Button>
              <Button variant="outline" asChild>
                <a href={`/directory/categories/${data.slug}/reviews`}>
                  Read Reviews
                </a>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 