"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Check, ChevronsUpDown, Plus } from "lucide-react"
import { cn } from "@/lib/utils"
import type { BlogTag } from "@prisma/client"

interface TagInputProps {
  tags: BlogTag[]
  selectedTagIds: string[]
  onChange: (tagIds: string[]) => void
}

export function TagInput({ tags, selectedTagIds, onChange }: TagInputProps) {
  const [open, setOpen] = useState(false)
  const [newTagName, setNewTagName] = useState("")

  const availableTags = tags.filter((tag) => !selectedTagIds.includes(tag.id))

  const handleCreateTag = async () => {
    if (!newTagName.trim()) return

    // In a real app, you'd create the tag via API
    const newTag = {
      id: `temp-${Date.now()}`,
      name: newTagName.trim(),
      slug: newTagName.toLowerCase().replace(/\s+/g, "-"),
    }

    // Add to available tags and select it
    onChange([...selectedTagIds, newTag.id])
    setNewTagName("")
    setOpen(false)
  }

  return (
    <div className="space-y-2">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" role="combobox" aria-expanded={open} className="w-full justify-between">
            Select tags...
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0">
          <Command>
            <CommandInput placeholder="Search tags..." />
            <CommandList>
              <CommandEmpty>
                <div className="p-2 space-y-2">
                  <p className="text-sm text-muted-foreground">No tags found.</p>
                  <div className="flex gap-2">
                    <Input
                      value={newTagName}
                      onChange={(e) => setNewTagName(e.target.value)}
                      placeholder="New tag name"
                      className="h-8"
                    />
                    <Button size="sm" onClick={handleCreateTag}>
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CommandEmpty>
              <CommandGroup>
                {availableTags.map((tag) => (
                  <CommandItem
                    key={tag.id}
                    onSelect={() => {
                      onChange([...selectedTagIds, tag.id])
                      setOpen(false)
                    }}
                  >
                    <Check
                      className={cn("mr-2 h-4 w-4", selectedTagIds.includes(tag.id) ? "opacity-100" : "opacity-0")}
                    />
                    {tag.name}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  )
}
