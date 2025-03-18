"use client"

import { useState } from "react"
import { Trash2, Edit, Check, X, Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { Todo, Tag } from "@/lib/types"
import { Textarea } from "@/components/ui/textarea"
import TagSelector from "@/components/tag-selector"
import { MDXContent } from "@/components/mdx-content"

interface TodoItemProps {
  todo: Todo
  tags: Tag[]
  isEditing: boolean
  onToggle: (id: string) => void
  onEdit: (id: string) => void
  onUpdate: (id: string, content: string, tags: string[]) => void
  onCancelEdit: () => void
  onDelete: (id: string) => void
}

export default function TodoItem({
  todo,
  tags,
  isEditing,
  onToggle,
  onEdit,
  onUpdate,
  onCancelEdit,
  onDelete,
}: TodoItemProps) {
  const [editContent, setEditContent] = useState(todo.content)
  const [selectedTags, setSelectedTags] = useState<string[]>(todo.tags)
  const [activeTab, setActiveTab] = useState<string>("write")
  const [splitView, setSplitView] = useState<boolean>(false)

  const handleSave = () => {
    if (editContent.trim()) {
      onUpdate(todo.id, editContent, selectedTags)
    }
  }

  const todoTags = tags.filter((tag) => todo.tags.includes(tag.id))

  if (isEditing) {
    return (
      <Card className="border border-blue-500/30 shadow-md bg-card/80 backdrop-blur-sm animate-scale-in">
        <CardContent className="p-4 space-y-4">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="flex justify-between items-center mb-2">
              <TabsList className="bg-secondary/50">
                <TabsTrigger value="write" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white">
                  Write
                </TabsTrigger>
                <TabsTrigger
                  value="preview"
                  className="data-[state=active]:bg-violet-500 data-[state=active]:text-white"
                >
                  Preview
                </TabsTrigger>
              </TabsList>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setSplitView(!splitView)}
                className="text-muted-foreground"
              >
                {splitView ? <EyeOff className="h-4 w-4 mr-1" /> : <Eye className="h-4 w-4 mr-1" />}
                {splitView ? "Single View" : "Split View"}
              </Button>
            </div>

            <div className={splitView ? "grid grid-cols-2 gap-4" : "block"}>
              <div className={splitView ? "block" : activeTab === "write" ? "block" : "hidden"}>
                <Textarea
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  className="min-h-[150px] bg-background/50 border-blue-500/30 focus:border-blue-500/50 transition-colors markdown-editor"
                  placeholder="Todo content (supports Markdown)"
                />
              </div>

              <div
                className={
                  splitView
                    ? "block border border-violet-500/30 rounded-md p-3 bg-background/30"
                    : activeTab === "preview"
                      ? "block"
                      : "hidden"
                }
              >
                <div className="min-h-[150px] overflow-auto">
                  <MDXContent content={editContent} />
                </div>
              </div>
            </div>
          </Tabs>

          <TagSelector tags={tags} selectedTags={selectedTags} onChange={setSelectedTags} />
          <div className="flex justify-end space-x-2">
            <Button variant="ghost" size="sm" onClick={onCancelEdit}>
              <X className="h-4 w-4 mr-1" /> Cancel
            </Button>
            <Button
              size="sm"
              onClick={handleSave}
              className="bg-gradient-to-r from-blue-500 to-violet-500 hover:from-blue-600 hover:to-violet-600"
            >
              <Check className="h-4 w-4 mr-1" /> Save
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card
      className={`border border-border/30 shadow-md bg-card/80 backdrop-blur-sm transition-all duration-300 hover:border-blue-500/30 group ${
        todo.completed ? "opacity-70" : ""
      }`}
    >
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <Checkbox
            checked={todo.completed}
            onCheckedChange={() => onToggle(todo.id)}
            className="mt-1 transition-all duration-300 data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-blue-500 data-[state=checked]:to-violet-500"
          />
          <div className="flex-1 space-y-2">
            <div
              className={`${todo.completed ? "line-through text-muted-foreground" : ""} transition-all duration-300`}
            >
              <MDXContent content={todo.content} />
            </div>
            {todoTags.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-2">
                {todoTags.map((tag) => (
                  <span
                    key={tag.id}
                    className={`px-2 py-0.5 rounded-full text-xs text-white ${tag.color} transition-all duration-200 hover:opacity-90`}
                  >
                    {tag.name}
                  </span>
                ))}
              </div>
            )}
          </div>
          <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onEdit(todo.id)}
              className="h-8 w-8 hover:bg-blue-500/20 hover:text-blue-400"
            >
              <Edit className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onDelete(todo.id)}
              className="h-8 w-8 text-destructive hover:bg-red-500/20"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

