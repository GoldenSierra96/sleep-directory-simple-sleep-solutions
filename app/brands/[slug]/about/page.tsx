import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Award, Calendar, MapPin, Users, ExternalLink, Shield, Leaf, Heart } from "lucide-react";

export default async function BrandAboutPage({ params }: { params: { slug: string } }) {
  const brand = await prisma.brand.findUnique({
    where: { slug: params.slug },
    include: { 
      categories: true,
    },
  });
  
  if (!brand) notFound();

  // Mock additional brand data
  const brandDetails = {
    founded: "2015",
    headquarters: "London, UK",
    employees: "50-100",
    mission: "To revolutionize sleep quality through innovative, sustainable products that enhance well-being and promote healthier lifestyles.",
    story: `Founded in 2015 by a team of sleep specialists and engineers, ${brand.name} began with a simple mission: to help people achieve better sleep through innovative technology and thoughtful design. 

What started as a small startup in London has grown into a trusted brand serving customers across the UK and Europe. Our commitment to quality, sustainability, and customer satisfaction has earned us recognition from industry experts and thousands of satisfied customers.

Today, we continue to push the boundaries of sleep technology while maintaining our core values of innovation, sustainability, and exceptional customer service.`,
    values: [
      {
        icon: <Heart className="h-5 w-5" />,
        title: "Customer First",
        description: "Every decision we make prioritizes our customers' sleep quality and satisfaction."
      },
      {
        icon: <Leaf className="h-5 w-5" />,
        title: "Sustainability",
        description: "We're committed to environmentally responsible manufacturing and materials."
      },
      {
        icon: <Shield className="h-5 w-5" />,
        title: "Quality Assurance",
        description: "Rigorous testing and premium materials ensure lasting product quality."
      },
    ],
    certifications: [
      "OEKO-TEX Standard 100",
      "CertiPUR-US Certified",
      "Carbon Neutral Shipping",
      "FSC Certified Materials",
      "ISO 9001 Quality Management",
    ],
  };

  return (
    <div className="space-y-8">
      {/* Brand Story */}
      <Card>
        <CardHeader>
          <CardTitle>Our Story</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="prose prose-gray max-w-none">
            {brandDetails.story.split('\n\n').map((paragraph, index) => (
              <p key={index} className="text-muted-foreground leading-relaxed mb-4">
                {paragraph}
              </p>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Company Details */}
      <Card>
        <CardHeader>
          <CardTitle>Company Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                <Calendar className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Founded</p>
                <p className="font-semibold">{brandDetails.founded}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
                <MapPin className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Headquarters</p>
                <p className="font-semibold">{brandDetails.headquarters}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center">
                <Users className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Team Size</p>
                <p className="font-semibold">{brandDetails.employees}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-orange-50 rounded-lg flex items-center justify-center">
                <Shield className="h-5 w-5 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Business Type</p>
                <p className="font-semibold">{brand.isOnline ? "Online + Retail" : "Retail Store"}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Mission & Values */}
      <Card>
        <CardHeader>
          <CardTitle>Mission & Values</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-lg mb-2">Our Mission</h3>
              <p className="text-muted-foreground leading-relaxed">{brandDetails.mission}</p>
            </div>
            
            <div>
              <h3 className="font-semibold text-lg mb-4">Our Values</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {brandDetails.values.map((value, index) => (
                  <div key={index} className="flex gap-3 p-4 border rounded-lg">
                    <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      {value.icon}
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">{value.title}</h4>
                      <p className="text-sm text-muted-foreground">{value.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Awards & Recognition */}
      {brand.awards && brand.awards.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5" />
              Awards & Recognition
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {brand.awards.map((award, index) => (
                <div key={index} className="flex items-start gap-3 p-4 border rounded-lg">
                  <div className="w-8 h-8 bg-yellow-50 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Award className="h-4 w-4 text-yellow-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold">{award}</h4>
                    <p className="text-sm text-muted-foreground">Industry Recognition</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Certifications */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Certifications & Standards
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {brandDetails.certifications.map((cert, index) => (
              <div key={index} className="flex items-center gap-2 p-3 border rounded-lg">
                <Shield className="h-4 w-4 text-green-600 flex-shrink-0" />
                <span className="text-sm font-medium">{cert}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 p-4 bg-muted/50 rounded-lg">
            <p className="text-sm text-muted-foreground">
              These certifications ensure our products meet the highest standards for safety, 
              quality, and environmental responsibility. We're committed to maintaining these 
              standards across all our product lines.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Contact Information */}
      <Card>
        <CardHeader>
          <CardTitle>Get in Touch</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-3">Customer Support</h3>
              <div className="space-y-2 text-sm">
                <p className="text-muted-foreground">Phone: +44 (0) 800 123 4567</p>
                <p className="text-muted-foreground">Email: support@{brand.slug}.com</p>
                <p className="text-muted-foreground">Hours: Mon-Fri 9AM-6PM GMT</p>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-3">Business Inquiries</h3>
              <div className="space-y-2 text-sm">
                <p className="text-muted-foreground">Email: business@{brand.slug}.com</p>
                <p className="text-muted-foreground">Partnerships: partners@{brand.slug}.com</p>
                <p className="text-muted-foreground">Press: press@{brand.slug}.com</p>
              </div>
            </div>
          </div>
          
          {brand.websiteUrl && (
            <div className="mt-6 pt-6 border-t">
              <Button asChild>
                <Link href={brand.websiteUrl} target="_blank">
                  Visit Official Website
                  <ExternalLink className="h-4 w-4 ml-2" />
                </Link>
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
} 