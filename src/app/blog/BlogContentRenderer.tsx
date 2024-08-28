// components/BlogContentRenderer.tsx
'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { Color } from "@tiptap/extension-color"
import ListItem from "@tiptap/extension-list-item"
import TextStyle from "@tiptap/extension-text-style"
import { extensions } from "@/lib/tiptap";


interface BlogContentRendererProps {
  content: string
}

export function BlogContentRenderer({ content }: BlogContentRendererProps) {
  const editor = useEditor({
    extensions: extensions ,
    content,
    editable: false,
    immediatelyRender: false,
  })

  return (
    <div className="blog-content no-scroll">
      <EditorContent editor={editor} className='' />
    </div>
  )
}