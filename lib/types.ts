export interface Todo {
  id: string
  content: string
  completed: boolean
  tags: string[]
  createdAt: string
}

export interface Tag {
  id: string
  name: string
  color: string
}

