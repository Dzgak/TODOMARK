"use client"

import { useState, useEffect } from "react"
import ReactMarkdown from "react-markdown"

interface MDXContentProps {
  content: string
}

export function MDXContent({ content }: MDXContentProps) {
  const [mdxContent, setMdxContent] = useState<string>(content)

  useEffect(() => {
    setMdxContent(content)
  }, [content])

  return (
    <div className="mdx-content">
      <ReactMarkdown
        components={{
          h1: (props) => <h1 className="text-xl font-bold my-2" {...props} />,
          h2: (props) => <h2 className="text-lg font-bold my-2" {...props} />,
          h3: (props) => <h3 className="text-base font-bold my-2" {...props} />,
          p: (props) => <p className="my-2" {...props} />,
          ul: (props) => <ul className="list-disc pl-5 my-2" {...props} />,
          ol: (props) => <ol className="list-decimal pl-5 my-2" {...props} />,
          li: (props) => <li className="my-1" {...props} />,
          a: (props) => (
            <a
              className="text-primary hover:underline transition-colors"
              target="_blank"
              rel="noopener noreferrer"
              {...props}
            />
          ),
          blockquote: (props) => <blockquote className="border-l-2 border-primary pl-3 italic my-2" {...props} />,
          code: (props) => (
            <code className="bg-secondary text-secondary-foreground px-1.5 py-0.5 rounded text-sm" {...props} />
          ),
          pre: (props) => (
            <pre
              className="bg-secondary text-secondary-foreground p-3 rounded-md overflow-x-auto my-2 text-sm"
              {...props}
            />
          ),
          strong: (props) => <strong className="font-bold" {...props} />,
          em: (props) => <em className="italic" {...props} />,
          hr: () => <hr className="border-t border-border my-4" />,
          img: (props) => (
            <img className="max-w-full rounded-md my-2 border border-border" {...props} alt={props.alt || ""} />
          ),
          // Table-related styles
          table: (props) => (
            <table className="min-w-full my-4 border-collapse" {...props} />
          ),
          thead: (props) => (
            <thead className="bg-gray-200" {...props} />
          ),
          tbody: (props) => <tbody {...props} />,
          tr: (props) => <tr className="border-t border-b" {...props} />,
          th: (props) => (
            <th className="px-4 py-2 font-semibold text-left border-b border-gray-300" {...props} />
          ),
          td: (props) => (
            <td className="px-4 py-2 text-left border-b border-gray-300" {...props} />
          ),
        }}
      >
        {mdxContent}
      </ReactMarkdown>
    </div>
  )
}
