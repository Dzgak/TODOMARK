"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Plus, Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import TagSelector from "@/components/tag-selector"
import { MDXContent } from "@/components/mdx-content"
import type { Tag } from "@/lib/types"

interface TodoFormProps {
  tags: Tag[]
  onAddTodo: (content: string, tags: string[]) => void
}

export default function TodoForm({ tags, onAddTodo }: TodoFormProps) {
  const [content, setContent] = useState("")
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [isExpanded, setIsExpanded] = useState(false)
  const [activeTab, setActiveTab] = useState<string>("write")
  const [splitView, setSplitView] = useState<boolean>(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (content.trim()) {
      onAddTodo(content, selectedTags)
      setContent("")
      setSelectedTags([])
      setIsExpanded(false)
      setActiveTab("write")
    }
  }

  // Auto-switch to preview when typing stops
  useEffect(() => {
    if (!splitView) return

    const timer = setTimeout(() => {
      if (content && activeTab === "write") {
        setActiveTab("preview")
      }
    }, 1000)

    return () => clearTimeout(timer)
  }, [content, activeTab, splitView])

  return (
    <Card className="border border-border shadow-sm">
      <CardContent className="p-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          {!isExpanded ? (
            <Textarea
              placeholder="Add a new todo... (supports Markdown)"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              onFocus={() => setIsExpanded(true)}
              className="min-h-[40px] bg-background border-input focus:border-primary transition-colors"
            />
          ) : (
            <div className="animate-fade-in space-y-4">
              <div className="flex items-center justify-between">
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <div className="flex justify-between items-center mb-2">
                    <TabsList>
                      <TabsTrigger value="write">Write</TabsTrigger>
                      <TabsTrigger value="preview">Preview</TabsTrigger>
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
                        placeholder="What needs to be done? (supports Markdown)"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        className="min-h-[150px] bg-background border-input focus:border-primary transition-colors markdown-editor"
                      />
                    </div>

                    <div
                      className={
                        splitView
                          ? "block border border-border rounded-md p-3 bg-background"
                          : activeTab === "preview"
                            ? "block"
                            : "hidden"
                      }
                    >
                      {content ? (
                        <div className="min-h-[150px] overflow-auto">
                          <MDXContent content={content} />
                        </div>
                      ) : (
                        <div className="text-muted-foreground italic min-h-[150px] flex items-center justify-center">
                          Preview will appear here...
                        </div>
                      )}
                    </div>
                  </div>
                </Tabs>
              </div>

              <TagSelector tags={tags} selectedTags={selectedTags} onChange={setSelectedTags} />

              <div className="flex justify-between">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => {
                    setIsExpanded(false)
                    setContent("")
                    setSelectedTags([])
                    setSplitView(false)
                  }}
                >
                  Cancel
                </Button>
                <Button type="submit">
                  <Plus className="h-4 w-4 mr-2" /> Add Todo
                </Button>
              </div>
            </div>
          )}
        </form>
      </CardContent>
    </Card>
  )
}

