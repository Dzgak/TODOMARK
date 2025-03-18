"use client"

import { useState } from "react"
import type { Todo, Tag } from "@/lib/types"
import TodoItem from "@/components/todo-item"
import TodoForm from "@/components/todo-form"

interface TodoListProps {
  todos: Todo[]
  tags: Tag[]
  onToggle: (id: string) => void
  onUpdate: (id: string, content: string, tags: string[]) => void
  onDelete: (id: string) => void
  onAddTodo: (content: string, tags: string[]) => void
}

export default function TodoList({ todos, tags, onToggle, onUpdate, onDelete, onAddTodo }: TodoListProps) {
  const [editingId, setEditingId] = useState<string | null>(null)

  const handleEdit = (id: string) => {
    setEditingId(id)
  }

  const handleUpdate = (id: string, content: string, todoTags: string[]) => {
    onUpdate(id, content, todoTags)
    setEditingId(null)
  }

  const handleCancelEdit = () => {
    setEditingId(null)
  }

  // Sort todos by creation date (newest first) and completion status
  const sortedTodos = [...todos].sort((a, b) => {
    // First sort by completion status
    if (a.completed !== b.completed) {
      return a.completed ? 1 : -1
    }
    // Then sort by creation date
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  })

  return (
    <div className="space-y-6">
      <TodoForm tags={tags} onAddTodo={onAddTodo} />

      <div className="space-y-3">
        {sortedTodos.length === 0 ? (
          <div className="text-center py-10 text-muted-foreground animate-pulse">No todos yet. Add one above!</div>
        ) : (
          sortedTodos.map((todo, index) => (
            <div key={todo.id} className="animate-fade-in" style={{ animationDelay: `${index * 50}ms` }}>
              <TodoItem
                todo={todo}
                tags={tags}
                isEditing={editingId === todo.id}
                onToggle={onToggle}
                onEdit={handleEdit}
                onUpdate={handleUpdate}
                onCancelEdit={handleCancelEdit}
                onDelete={onDelete}
              />
            </div>
          ))
        )}
      </div>
    </div>
  )
}

