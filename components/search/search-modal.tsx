"use client"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Package, FileText, MessageSquare, Loader2 } from "lucide-react"
import { useSearchBox, useHits } from "react-instantsearch"
import { InstantSearch, Configure } from "react-instantsearch"
import { searchClient } from "@/lib/algolia"
import Link from "next/link"
import Image from "next/image"

interface SearchModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

function SearchResults() {
  const { hits, isLoading } = useHits()

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="h-6 w-6 animate-spin" />
      </div>
    )
  }

  if (hits.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        <Search className="h-12 w-12 mx-auto mb-4 opacity-50" />
        <p>No results found. Try adjusting your search terms.</p>
      </div>
    )
  }

  const groupedHits = hits.reduce((acc: any, hit: any) => {
    const type = hit.objectID.startsWith("product_")
      ? "products"
      : hit.objectID.startsWith("post_")
        ? "posts"
        : "threads"
    if (!acc[type]) acc[type] = []
    acc[type].push(hit)
    return acc
  }, {})

  return (
    <div className="space-y-6">
      {groupedHits.products && (
        <div>
          <h3 className="font-semibold mb-3 flex items-center gap-2">
            <Package className="h-4 w-4" />
            Products ({groupedHits.products.length})
          </h3>
          <div className="space-y-2">
            {groupedHits.products.slice(0, 3).map((hit: any) => (
              <Link
                key={hit.objectID}
                href={`/products/${hit.slug}`}
                className="block p-3 rounded-lg border hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 relative bg-muted rounded-lg overflow-hidden">
                    <Image src={hit.image || "/placeholder.svg"} alt={hit.name} fill className="object-cover" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium">{hit.name}</h4>
                    <p className="text-sm text-muted-foreground">{hit.brand}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="outline" className="text-xs">
                        {hit.categories[0]}
                      </Badge>
                      {hit.price && <span className="text-sm font-medium">${hit.price}</span>}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {groupedHits.posts && (
        <div>
          <h3 className="font-semibold mb-3 flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Blog Posts ({groupedHits.posts.length})
          </h3>
          <div className="space-y-2">
            {groupedHits.posts.slice(0, 3).map((hit: any) => (
              <Link
                key={hit.objectID}
                href={`/blog/${hit.slug}`}
                className="block p-3 rounded-lg border hover:bg-muted/50 transition-colors"
              >
                <h4 className="font-medium mb-1">{hit.title}</h4>
                <p className="text-sm text-muted-foreground line-clamp-2">{hit.excerpt}</p>
                <div className="flex items-center gap-2 mt-2">
                  <Badge variant="outline" className="text-xs">
                    {hit.categories[0]}
                  </Badge>
                  <span className="text-xs text-muted-foreground">By {hit.author}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {groupedHits.threads && (
        <div>
          <h3 className="font-semibold mb-3 flex items-center gap-2">
            <MessageSquare className="h-4 w-4" />
            Forum Threads ({groupedHits.threads.length})
          </h3>
          <div className="space-y-2">
            {groupedHits.threads.slice(0, 3).map((hit: any) => (
              <Link
                key={hit.objectID}
                href={`/forum/threads/${hit.slug}`}
                className="block p-3 rounded-lg border hover:bg-muted/50 transition-colors"
              >
                <h4 className="font-medium mb-1">{hit.title}</h4>
                <div className="flex items-center gap-2 mt-2">
                  <Badge variant="outline" className="text-xs">
                    {hit.category}
                  </Badge>
                  <span className="text-xs text-muted-foreground">By {hit.author}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

function SearchBox() {
  const { query, refine } = useSearchBox()

  return (
    <div className="relative">
      <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
      <Input
        placeholder="Search products, articles, discussions..."
        className="pl-10"
        value={query}
        onChange={(e) => refine(e.target.value)}
        autoFocus
      />
    </div>
  )
}

export function SearchModal({ open, onOpenChange }: SearchModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle>Search</DialogTitle>
        </DialogHeader>
        <InstantSearch searchClient={searchClient} indexName="products">
          <Configure hitsPerPage={20} />
          <div className="space-y-4">
            <SearchBox />
            <div className="max-h-96 overflow-y-auto">
              <SearchResults />
            </div>
          </div>
        </InstantSearch>
      </DialogContent>
    </Dialog>
  )
}
