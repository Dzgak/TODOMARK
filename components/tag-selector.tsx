"use client"

import type { Tag } from "@/lib/types"
import { Badge } from "@/components/ui/badge"

interface TagSelectorProps {
  tags: Tag[]
  selectedTags: string[]
  onChange: (selectedTags: string[]) => void
}

export default function TagSelector({ tags, selectedTags, onChange }: TagSelectorProps) {
  const toggleTag = (tagId: string) => {
    if (selectedTags.includes(tagId)) {
      onChange(selectedTags.filter((id) => id !== tagId))
    } else {
      onChange([...selectedTags, tagId])
    }
  }

  return (
    <div className="space-y-2">
      <p className="text-sm font-medium text-blue-400">Tags</p>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <Badge
            key={tag.id}
            variant={selectedTags.includes(tag.id) ? "default" : "outline"}
            className={`cursor-pointer transition-all duration-200 hover:scale-105 ${
              selectedTags.includes(tag.id) ? tag.color : "hover:bg-gray-500/10"
            }`}
            onClick={() => toggleTag(tag.id)}
          >
            {tag.name}
          </Badge>
        ))}
      </div>
    </div>
  )
}

