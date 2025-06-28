import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import Image from "next/image";

export interface SubNiche {
  title: string;
  description: string;
  icon?: React.ReactNode;
  image?: string;
}
export interface Product {
  name: string;
  usp: string;
  link?: string;
  image?: string;
}
export interface Benefit {
  text: string;
  icon?: React.ReactNode;
  image?: string;
}
export interface FAQ {
  q: string;
  a: string;
}
export interface CTA {
  text: string;
  links: { label: string; href: string }[];
}
export interface RelatedPage {
  text: string;
  href: string;
}
export interface CollectionPageData {
  slug?: string;
  title: string;
  tagline: string;
  intro: string;
  benefits: (string | Benefit)[];
  subNiches: SubNiche[];
  tips: string[];
  science: string[];
  products: Product[];
  faq: FAQ[];
  cta: CTA;
  related: RelatedPage[];
}

export function CollectionPage({ data }: { data: CollectionPageData }) {
  // Helper to render a benefit (with optional icon/image)
  const renderBenefit = (b: string | Benefit, i: number) => {
    if (typeof b === "string") {
      return <div key={i} className="flex flex-col items-center justify-center h-full p-4"><span dangerouslySetInnerHTML={{ __html: b }} /></div>;
    }
    return (
      <div key={i} className="flex flex-col items-center justify-center h-full p-4">
        {b.icon && <span className="mb-2 text-primary text-3xl">{b.icon}</span>}
        {b.image && <Image src={b.image} alt="" width={48} height={48} className="mb-2" />}
        <span dangerouslySetInnerHTML={{ __html: b.text }} />
      </div>
    );
  };

  // Helper to render a product card (with optional image)
  const renderProduct = (prod: Product, i: number) => (
    <Card key={i} className="h-full flex flex-col">
      {prod.image && (
        <div className="aspect-video relative overflow-hidden rounded-t-lg">
          <Image src={prod.image} alt={prod.name} fill className="object-cover" />
        </div>
      )}
      <CardHeader>
        <CardTitle>{prod.name}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col flex-1 justify-between">
        <p className="mb-4">{prod.usp}</p>
        <Button asChild>
          <a href={prod.link} target="_blank" rel="noopener noreferrer">
            Buy Now
          </a>
        </Button>
      </CardContent>
    </Card>
  );

  // Render
  return (
    <div className="bg-background">
      {/* Hero Section */}
      <section className="py-12 bg-gradient-to-b from-primary/10 to-background">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-2">
            {data.title} <span className="text-primary">– {data.tagline}</span>
          </h1>
          <p
            className="text-lg text-muted-foreground max-w-2xl mx-auto mb-6"
            dangerouslySetInnerHTML={{ __html: data.intro }}
          />
          <Button size="lg" asChild>
            <a href={`/directory/products?category=${data.slug}`}>See All {data.title} Products</a>
          </Button>
        </div>
      </section>

      {/* Benefits Section (Carousel if >3, else grid) */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-6 text-center">
            Why {data.title} Can Transform Your Sleep
          </h2>
          {data.benefits.length > 3 ? (
            <Carousel className="relative">
              <CarouselContent>
                {data.benefits.map((b, i) => (
                  <CarouselItem key={i} className="md:basis-1/2 lg:basis-1/3">
                    <Card className="h-full flex items-center justify-center">
                      <CardContent>{renderBenefit(b, i)}</CardContent>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {data.benefits.map((b, i) => (
                <Card key={i} className="h-full flex items-center justify-center">
                  <CardContent>{renderBenefit(b, i)}</CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Sub-niches Section (Horizontal Carousel) */}
      <section className="py-12 bg-muted/50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-6 text-center">
            Types & Sub-niches of {data.title}
          </h2>
          <Carousel className="relative">
            <CarouselContent>
              {data.subNiches.map((niche: SubNiche, i: number) => (
                <CarouselItem key={i} className="md:basis-1/2 lg:basis-1/4">
                  <Card className="h-full flex flex-col items-center text-center overflow-hidden">
                    {niche.image && (
                      <div className="aspect-square w-full relative overflow-hidden">
                        <Image src={niche.image} alt={niche.title} fill className="object-cover" />
                      </div>
                    )}
                    <CardHeader>
                      {niche.icon && <span className="mb-2 text-primary text-3xl flex justify-center">{niche.icon}</span>}
                      <CardTitle>{niche.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p>{niche.description}</p>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </section>

      {/* Tips Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-6 text-center">
            How to Choose the Best {data.title}
          </h2>
          <ol className="max-w-2xl mx-auto space-y-3 text-lg list-decimal list-inside">
            {data.tips.map((tip: string, i: number) => (
              <li key={i}>{tip}</li>
            ))}
          </ol>
        </div>
      </section>

      {/* Science Section */}
      <section className="py-12 bg-muted/50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-6 text-center">
            The Science Behind {data.title}
          </h2>
          <div className="max-w-3xl mx-auto space-y-4 text-lg">
            {data.science.map((para: string, i: number) => (
              <p key={i} dangerouslySetInnerHTML={{ __html: para }} />
            ))}
          </div>
        </div>
      </section>

      {/* Top Picks & Featured Products */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-6 text-center">
            Top Picks & Featured Products
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.products.map(renderProduct)}
          </div>
        </div>
      </section>

      {/* FAQ Section (Accordion) */}
      <section className="py-12 bg-muted/50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-6 text-center">FAQ</h2>
          <Accordion type="single" collapsible className="max-w-3xl mx-auto">
            {data.faq.map((q: FAQ, i: number) => (
              <AccordionItem key={i} value={`faq-${i}`}>
                <AccordionTrigger className="text-lg">Q: {q.q}</AccordionTrigger>
                <AccordionContent>
                  <p className="text-base">A: {q.a}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-4">Next Steps</h2>
          <p className="text-lg mb-6">{data.cta.text}</p>
          <div className="flex flex-wrap justify-center gap-4">
            {data.cta.links.map((l: { label: string; href: string }, i: number) => (
              <Button key={i} asChild size="lg">
                <a href={l.href}>{l.label}</a>
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Related Pages Section */}
      <section className="py-8 bg-muted/50">
        <div className="container mx-auto px-4">
          <h3 className="text-lg font-semibold mb-4">Related Pages</h3>
          <ul className="flex flex-wrap gap-4">
            {data.related.map((rel: RelatedPage, i: number) => (
              <li key={i}>
                <a href={rel.href} className="underline text-primary hover:text-primary/80">
                  {rel.text}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
} 