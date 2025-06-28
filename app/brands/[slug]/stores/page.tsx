import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { MapPin, ExternalLink, Phone, Clock, Navigation } from "lucide-react";

export default async function BrandStoresPage({ params }: { params: { slug: string } }) {
  const brand = await prisma.brand.findUnique({
    where: { slug: params.slug },
    include: { 
      categories: true,
    },
  });
  
  if (!brand) notFound();

  // Mock store data for demonstration
  const mockStores = [
    {
      id: 1,
      name: `${brand.name} Flagship Store`,
      address: "123 Sleep Street, London, SW1A 1AA",
      phone: "+44 20 7946 0958",
      type: "Flagship",
      hours: {
        "Monday": "9:00 AM - 8:00 PM",
        "Tuesday": "9:00 AM - 8:00 PM",
        "Wednesday": "9:00 AM - 8:00 PM",
        "Thursday": "9:00 AM - 8:00 PM",
        "Friday": "9:00 AM - 9:00 PM",
        "Saturday": "9:00 AM - 9:00 PM",
        "Sunday": "11:00 AM - 6:00 PM",
      },
      features: ["Sleep Consultations", "Product Trials", "Delivery Service", "Expert Fitting"],
      distance: "2.3 miles",
    },
    {
      id: 2,
      name: `${brand.name} Oxford Street`,
      address: "456 Oxford Street, London, W1C 1AP",
      phone: "+44 20 7946 0959",
      type: "Retail",
      hours: {
        "Monday": "10:00 AM - 7:00 PM",
        "Tuesday": "10:00 AM - 7:00 PM",
        "Wednesday": "10:00 AM - 7:00 PM",
        "Thursday": "10:00 AM - 7:00 PM",
        "Friday": "10:00 AM - 8:00 PM",
        "Saturday": "10:00 AM - 8:00 PM",
        "Sunday": "12:00 PM - 5:00 PM",
      },
      features: ["Product Display", "Click & Collect", "Expert Advice"],
      distance: "4.7 miles",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Online Store */}
      {brand.websiteUrl && (
        <Card>
          <CardHeader>
            <CardTitle>Online Store</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <ExternalLink className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">Shop Online</h3>
                  <p className="text-muted-foreground text-sm">
                    Browse the full {brand.name} collection with free delivery options
                  </p>
                  <div className="flex gap-2 mt-2">
                    <Badge variant="secondary">Free Delivery</Badge>
                    <Badge variant="secondary">30-Day Returns</Badge>
                    <Badge variant="secondary">24/7 Support</Badge>
                  </div>
                </div>
              </div>
              <Button asChild>
                <Link href={brand.websiteUrl} target="_blank">
                  Visit Store
                  <ExternalLink className="h-4 w-4 ml-2" />
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Store Locator */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Store Locations</CardTitle>
            <Button variant="outline">
              <Navigation className="h-4 w-4 mr-2" />
              Find Nearest Store
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {brand.locations && brand.locations.length > 0 ? (
              brand.locations.map((location, index) => (
                <div key={index} className="flex items-start gap-4 p-4 border rounded-lg">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold">{location}</h3>
                    <p className="text-muted-foreground text-sm">Store location</p>
                  </div>
                  <Button variant="outline" size="sm">
                    Get Directions
                  </Button>
                </div>
              ))
            ) : (
              mockStores.map((store) => (
                <div key={store.id} className="border rounded-lg p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold text-lg">{store.name}</h3>
                        <Badge variant={store.type === "Flagship" ? "default" : "secondary"}>
                          {store.type}
                        </Badge>
                      </div>
                      <p className="text-muted-foreground flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {store.address}
                      </p>
                      <p className="text-muted-foreground flex items-center gap-1 mt-1">
                        <Phone className="h-4 w-4" />
                        {store.phone}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Navigation className="h-4 w-4 mr-1" />
                        Directions
                      </Button>
                      <Button variant="outline" size="sm">
                        <Phone className="h-4 w-4 mr-1" />
                        Call
                      </Button>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium mb-2 flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        Opening Hours
                      </h4>
                      <div className="space-y-1 text-sm">
                        {Object.entries(store.hours).map(([day, hours]) => (
                          <div key={day} className="flex justify-between">
                            <span className="text-muted-foreground">{day}</span>
                            <span>{hours}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-2">Store Features</h4>
                      <div className="flex flex-wrap gap-1">
                        {store.features.map((feature, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {feature}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>

      {/* Store Services */}
      <Card>
        <CardHeader>
          <CardTitle>In-Store Services</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="text-center p-4 border rounded-lg">
              <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Clock className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="font-semibold mb-1">Sleep Consultations</h3>
              <p className="text-sm text-muted-foreground">Expert advice from certified sleep specialists</p>
            </div>
            
            <div className="text-center p-4 border rounded-lg">
              <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center mx-auto mb-3">
                <MapPin className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="font-semibold mb-1">Product Trials</h3>
              <p className="text-sm text-muted-foreground">Try before you buy with in-store testing</p>
            </div>
            
            <div className="text-center p-4 border rounded-lg">
              <div className="w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center mx-auto mb-3">
                <ExternalLink className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="font-semibold mb-1">Home Delivery</h3>
              <p className="text-sm text-muted-foreground">Professional delivery and setup service</p>
            </div>
            
            <div className="text-center p-4 border rounded-lg">
              <div className="w-12 h-12 bg-orange-50 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Phone className="h-6 w-6 text-orange-600" />
              </div>
              <h3 className="font-semibold mb-1">Expert Support</h3>
              <p className="text-sm text-muted-foreground">Ongoing customer care and warranty service</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 