// FREE Search component using PostgreSQL
"use client"

import { useState, useEffect } from "react"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import type { SearchResult } from "@/lib/search-postgres"

export function PostgresSearch() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<SearchResult[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const searchTimeout = setTimeout(async () => {
      if (query.length > 2) {
        setLoading(true)
        try {
          const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`)
          const data = await response.json()
          setResults(data.results || [])
        } catch (error) {
          console.error("Search error:", error)
        } finally {
          setLoading(false)
        }
      } else {
        setResults([])
      }
    }, 300)

    return () => clearTimeout(searchTimeout)
  }, [query])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="relative w-full justify-start text-sm text-muted-foreground sm:pr-12 md:w-40 lg:w-64"
        >
          <Search className="mr-2 h-4 w-4" />
          Search...
          <kbd className="pointer-events-none absolute right-1.5 top-1.5 hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
            <span className="text-xs">⌘</span>K
          </kbd>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle>Search</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input
            placeholder="Search products, blog posts, forum threads..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full"
          />

          {loading && <div className="text-center py-4 text-sm text-muted-foreground">Searching...</div>}

          {results.length > 0 && (
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {results.map((result) => (
                <div
                  key={`${result.type}-${result.id}`}
                  className="p-3 rounded-lg border hover:bg-muted/50 cursor-pointer"
                  onClick={() => {
                    const url =
                      result.type === "product"
                        ? `/products/${result.slug}`
                        : result.type === "blog"
                          ? `/blog/${result.slug}`
                          : `/forum/threads/${result.slug}`
                    window.location.href = url
                    setOpen(false)
                  }}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-medium">{result.title}</h4>
                      <p className="text-sm text-muted-foreground line-clamp-2">{result.description}</p>
                    </div>
                    <span className="text-xs bg-muted px-2 py-1 rounded capitalize">{result.type}</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {query.length > 2 && results.length === 0 && !loading && (
            <div className="text-center py-4 text-sm text-muted-foreground">No results found for "{query}"</div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
