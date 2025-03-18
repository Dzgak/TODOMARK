"use client"

import { useState, useEffect } from "react"
import { Plus, TagIcon, HelpCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import TodoList from "@/components/todo-list"
import type { Todo, Tag } from "@/lib/types"
import { nanoid } from "@/lib/utils"
import MarkdownHelp from "@/components/markdown-help"

export default function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [tags, setTags] = useState<Tag[]>([
    { id: "work", name: "Work", color: "tag-blue" },
    { id: "personal", name: "Personal", color: "tag-green" },
    { id: "urgent", name: "Urgent", color: "tag-red" },
    { id: "ideas", name: "Ideas", color: "tag-purple" },
    { id: "fun", name: "Fun", color: "tag-yellow" },
  ])
  const [newTagName, setNewTagName] = useState("")
  const [showTagInput, setShowTagInput] = useState(false)
  const [activeFilter, setActiveFilter] = useState<string | null>(null)
  const [showMarkdownHelp, setShowMarkdownHelp] = useState(false)

  // Load todos from localStorage on component mount
  useEffect(() => {
    const savedTodos = localStorage.getItem("mdx-todos")
    if (savedTodos) {
      setTodos(JSON.parse(savedTodos))
    }

    const savedTags = localStorage.getItem("mdx-tags")
    if (savedTags) {
      setTags(JSON.parse(savedTags))
    }
  }, [])

  // Save todos to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("mdx-todos", JSON.stringify(todos))
  }, [todos])

  // Save tags to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("mdx-tags", JSON.stringify(tags))
  }, [tags])

  const addTodo = (content: string, selectedTags: string[]) => {
    const newTodo: Todo = {
      id: nanoid(),
      content,
      completed: false,
      tags: selectedTags,
      createdAt: new Date().toISOString(),
    }
    setTodos([...todos, newTodo])
  }

  const toggleTodo = (id: string) => {
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)))
  }

  const updateTodo = (id: string, content: string, todoTags: string[]) => {
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, content, tags: todoTags } : todo)))
  }

  const deleteTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id))
  }

  const addTag = () => {
    if (newTagName.trim()) {
      const tagId = newTagName.toLowerCase().replace(/\s+/g, "-")
      const colors = [
        "tag-blue",
        "tag-green",
        "tag-purple",
        "tag-yellow",
        "tag-red",
        "tag-cyan",
        "tag-pink",
        "tag-indigo",
      ]
      const randomColor = colors[Math.floor(Math.random() * colors.length)]

      const newTag: Tag = {
        id: tagId,
        name: newTagName,
        color: randomColor,
      }

      setTags([...tags, newTag])
      setNewTagName("")
      setShowTagInput(false)
    }
  }

  const filteredTodos = activeFilter ? todos.filter((todo) => todo.tags.includes(activeFilter)) : todos

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2 items-center">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setActiveFilter(null)}
          className={`transition-all duration-200 ${!activeFilter ? "bg-primary text-primary-foreground" : ""}`}
        >
          All
        </Button>
        {tags.map((tag) => (
          <Button
            key={tag.id}
            variant="outline"
            size="sm"
            className={`flex items-center gap-1 transition-all duration-200 ${
              activeFilter === tag.id ? "bg-primary text-primary-foreground" : ""
            }`}
            onClick={() => setActiveFilter(tag.id)}
          >
            <span className={`w-2 h-2 rounded-full ${tag.color}`} />
            {tag.name}
          </Button>
        ))}
        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setShowTagInput(!showTagInput)}>
          <TagIcon className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 ml-auto"
          onClick={() => setShowMarkdownHelp(!showMarkdownHelp)}
        >
          <HelpCircle className="h-4 w-4" />
        </Button>
      </div>

      {showTagInput && (
        <div className="flex gap-2 animate-fade-in">
          <Input
            placeholder="New tag name"
            value={newTagName}
            onChange={(e) => setNewTagName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addTag()}
            className="h-9"
          />
          <Button size="sm" onClick={addTag}>
            <Plus className="h-4 w-4 mr-2" /> Add
          </Button>
        </div>
      )}

      {showMarkdownHelp && <MarkdownHelp />}

      <TodoList
        todos={filteredTodos}
        tags={tags}
        onToggle={toggleTodo}
        onUpdate={updateTodo}
        onDelete={deleteTodo}
        onAddTodo={addTodo}
      />
    </div>
  )
}

