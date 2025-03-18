import TodoApp from "@/components/todo-app"

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center py-10 px-4 md:px-6">
      <h1 className="text-3xl font-bold mb-10 tracking-tight flex items-center gap-2">
        <span className="text-primary">mark</span>
        <span className="text-foreground">todo</span>
      </h1>
      <div className="w-full max-w-3xl">
        <TodoApp />
      </div>
    </main>
  )
}

