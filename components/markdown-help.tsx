"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function MarkdownHelp() {
  return (
    <Card className="border border-violet-500/30 shadow-md bg-card/80 backdrop-blur-sm animate-fade-in">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg text-violet-400">Markdown Cheatsheet</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="basic">
          <TabsList className="bg-secondary/50 mb-4">
            <TabsTrigger value="basic" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white">
              Basic
            </TabsTrigger>
            <TabsTrigger value="advanced" className="data-[state=active]:bg-violet-500 data-[state=active]:text-white">
              Advanced
            </TabsTrigger>
            <TabsTrigger value="examples" className="data-[state=active]:bg-emerald-500 data-[state=active]:text-white">
              Examples
            </TabsTrigger>
          </TabsList>

          <TabsContent value="basic" className="space-y-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="space-y-1">
                <p className="font-bold text-blue-400"># Heading 1</p>
                <p className="font-bold text-blue-400">## Heading 2</p>
                <p className="font-bold text-blue-400">### Heading 3</p>
                <p className="text-emerald-400">**Bold text**</p>
                <p className="text-emerald-400">*Italic text*</p>
              </div>
              <div className="space-y-1">
                <p className="text-amber-400">- Bullet point</p>
                <p className="text-amber-400">1. Numbered list</p>
                <p className="text-rose-400">[Link text](URL)</p>
                <p className="text-violet-400">&gt; Blockquote</p>
                <p className="text-cyan-400">`inline code`</p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="advanced" className="space-y-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="space-y-1">
                <p className="text-cyan-400">
                  ```
                  <br />
                  Code block
                  <br />
                  ```
                </p>
                <p className="text-rose-400">~~Strikethrough~~</p>
                <p className="text-amber-400">- [ ] Task list</p>
                <p className="text-amber-400">- [x] Completed task</p>
              </div>
              <div className="space-y-1">
                <p className="text-violet-400">
                  ---
                  <br />
                  (Horizontal rule)
                </p>
                <p className="text-emerald-400">![Alt text](image URL)</p>
                <p className="text-blue-400">
                  ### Tables
                  <br />| Header | Header |<br />| ------ | ------ |<br />| Cell | Cell |
                </p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="examples" className="space-y-4">
            <div className="bg-secondary/30 p-3 rounded-md text-sm font-mono">
              <p className="text-blue-400"># Project Update</p>
              <p className="mt-2">We need to:</p>
              <p className="text-amber-400">- Complete the design</p>
              <p className="text-amber-400">- Implement the API</p>
              <p className="text-amber-400">- Write tests</p>
              <p className="mt-2 text-emerald-400">**Important:** Deadline is Friday!</p>
              <p className="mt-2 text-violet-400">{">"} Note: Check with the team before deploying.</p>
              <p className="mt-2">
                See documentation at <span className="text-rose-400">[our wiki](https://example.com)</span>
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

