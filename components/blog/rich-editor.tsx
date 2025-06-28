"use client"

import type React from "react"

import { useCallback, useMemo } from "react"
import { createEditor, type Descendant, Editor, Transforms, Element as SlateElement } from "slate"
import { Slate, Editable, withReact } from "slate-react"
import { withHistory } from "slate-history"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Toggle } from "@/components/ui/toggle"
import {
  Bold,
  Italic,
  Underline,
  Code,
  Quote,
  List,
  ListOrdered,
  Link,
  ImageIcon,
  Heading1,
  Heading2,
  Heading3,
} from "lucide-react"

interface RichEditorProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

const HOTKEYS = {
  "mod+b": "bold",
  "mod+i": "italic",
  "mod+u": "underline",
  "mod+`": "code",
}

const LIST_TYPES = ["numbered-list", "bulleted-list"]
const TEXT_ALIGN_TYPES = ["left", "center", "right", "justify"]

export function RichEditor({ value, onChange, placeholder = "Start writing..." }: RichEditorProps) {
  const renderElement = useCallback((props: any) => <Element {...props} />, [])
  const renderLeaf = useCallback((props: any) => <Leaf {...props} />, [])
  const editor = useMemo(() => withHistory(withReact(createEditor())), [])

  const initialValue: Descendant[] = useMemo(() => {
    if (!value) {
      return [
        {
          type: "paragraph",
          children: [{ text: "" }],
        },
      ]
    }

    try {
      return JSON.parse(value)
    } catch {
      return [
        {
          type: "paragraph",
          children: [{ text: value }],
        },
      ]
    }
  }, [value])

  const handleChange = (newValue: Descendant[]) => {
    const isAstChange = editor.operations.some((op) => "set_selection" !== op.type)
    if (isAstChange) {
      onChange(JSON.stringify(newValue))
    }
  }

  return (
    <div className="border rounded-lg">
      <Slate editor={editor} initialValue={initialValue} onChange={handleChange}>
        <div className="border-b p-2 flex flex-wrap gap-1">
          <MarkButton format="bold" icon={<Bold className="h-4 w-4" />} />
          <MarkButton format="italic" icon={<Italic className="h-4 w-4" />} />
          <MarkButton format="underline" icon={<Underline className="h-4 w-4" />} />
          <MarkButton format="code" icon={<Code className="h-4 w-4" />} />

          <Separator orientation="vertical" className="h-6" />

          <BlockButton format="heading-one" icon={<Heading1 className="h-4 w-4" />} />
          <BlockButton format="heading-two" icon={<Heading2 className="h-4 w-4" />} />
          <BlockButton format="heading-three" icon={<Heading3 className="h-4 w-4" />} />

          <Separator orientation="vertical" className="h-6" />

          <BlockButton format="block-quote" icon={<Quote className="h-4 w-4" />} />
          <BlockButton format="numbered-list" icon={<ListOrdered className="h-4 w-4" />} />
          <BlockButton format="bulleted-list" icon={<List className="h-4 w-4" />} />

          <Separator orientation="vertical" className="h-6" />

          <Button variant="ghost" size="sm" onClick={() => insertLink(editor)}>
            <Link className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" onClick={() => insertImage(editor)}>
            <ImageIcon className="h-4 w-4" />
          </Button>
        </div>

        <div className="p-4 min-h-[400px]">
          <Editable
            renderElement={renderElement}
            renderLeaf={renderLeaf}
            placeholder={placeholder}
            spellCheck
            autoFocus
            onKeyDown={(event) => {
              for (const hotkey in HOTKEYS) {
                if (isHotkey(hotkey, event as any)) {
                  event.preventDefault()
                  const mark = HOTKEYS[hotkey as keyof typeof HOTKEYS]
                  toggleMark(editor, mark)
                }
              }
            }}
            className="outline-none"
          />
        </div>
      </Slate>
    </div>
  )
}

const toggleBlock = (editor: Editor, format: string) => {
  const isActive = isBlockActive(editor, format, TEXT_ALIGN_TYPES.includes(format) ? "align" : "type")
  const isList = LIST_TYPES.includes(format)

  Transforms.unwrapNodes(editor, {
    match: (n) =>
      !Editor.isEditor(n) &&
      SlateElement.isElement(n) &&
      LIST_TYPES.includes(n.type as string) &&
      !TEXT_ALIGN_TYPES.includes(format),
    split: true,
  })

  let newProperties: Partial<SlateElement>
  if (TEXT_ALIGN_TYPES.includes(format)) {
    newProperties = {
      align: isActive ? undefined : format,
    } as any
  } else {
    newProperties = {
      type: isActive ? "paragraph" : isList ? "list-item" : format,
    } as any
  }

  Transforms.setNodes<SlateElement>(editor, newProperties)

  if (!isActive && isList) {
    const block = { type: format, children: [] } as any
    Transforms.wrapNodes(editor, block)
  }
}

const toggleMark = (editor: Editor, format: string) => {
  const isActive = isMarkActive(editor, format)

  if (isActive) {
    Editor.removeMark(editor, format)
  } else {
    Editor.addMark(editor, format, true)
  }
}

const isBlockActive = (editor: Editor, format: string, blockType = "type") => {
  const { selection } = editor
  if (!selection) return false

  const [match] = Array.from(
    Editor.nodes(editor, {
      at: Editor.unhangRange(editor, selection),
      match: (n) => !Editor.isEditor(n) && SlateElement.isElement(n) && (n as any)[blockType] === format,
    }),
  )

  return !!match
}

const isMarkActive = (editor: Editor, format: string) => {
  const marks = Editor.marks(editor)
  return marks ? (marks as any)[format] === true : false
}

const Element = ({ attributes, children, element }: any) => {
  const style = { textAlign: element.align }
  switch (element.type) {
    case "block-quote":
      return (
        <blockquote style={style} {...attributes} className="border-l-4 border-muted pl-4 italic">
          {children}
        </blockquote>
      )
    case "bulleted-list":
      return (
        <ul style={style} {...attributes} className="list-disc list-inside">
          {children}
        </ul>
      )
    case "heading-one":
      return (
        <h1 style={style} {...attributes} className="text-3xl font-bold">
          {children}
        </h1>
      )
    case "heading-two":
      return (
        <h2 style={style} {...attributes} className="text-2xl font-bold">
          {children}
        </h2>
      )
    case "heading-three":
      return (
        <h3 style={style} {...attributes} className="text-xl font-bold">
          {children}
        </h3>
      )
    case "list-item":
      return (
        <li style={style} {...attributes}>
          {children}
        </li>
      )
    case "numbered-list":
      return (
        <ol style={style} {...attributes} className="list-decimal list-inside">
          {children}
        </ol>
      )
    case "link":
      return (
        <a {...attributes} href={element.url} className="text-primary underline">
          {children}
        </a>
      )
    case "image":
      return (
        <div {...attributes}>
          <div contentEditable={false}>
            <img src={element.url || "/placeholder.svg"} alt={element.alt} className="max-w-full h-auto" />
          </div>
          {children}
        </div>
      )
    default:
      return (
        <p style={style} {...attributes}>
          {children}
        </p>
      )
  }
}

const Leaf = ({ attributes, children, leaf }: any) => {
  if (leaf.bold) {
    children = <strong>{children}</strong>
  }

  if (leaf.code) {
    children = <code className="bg-muted px-1 rounded">{children}</code>
  }

  if (leaf.italic) {
    children = <em>{children}</em>
  }

  if (leaf.underline) {
    children = <u>{children}</u>
  }

  return <span {...attributes}>{children}</span>
}

const BlockButton = ({ format, icon }: { format: string; icon: React.ReactNode }) => {
  const editor = useReactSlate()
  return (
    <Toggle
      pressed={isBlockActive(editor, format, TEXT_ALIGN_TYPES.includes(format) ? "align" : "type")}
      onPressedChange={() => toggleBlock(editor, format)}
      size="sm"
    >
      {icon}
    </Toggle>
  )
}

const MarkButton = ({ format, icon }: { format: string; icon: React.ReactNode }) => {
  const editor = useReactSlate()
  return (
    <Toggle pressed={isMarkActive(editor, format)} onPressedChange={() => toggleMark(editor, format)} size="sm">
      {icon}
    </Toggle>
  )
}

const insertLink = (editor: Editor) => {
  const url = window.prompt("Enter the URL of the link:")
  if (!url) return

  const { selection } = editor
  const isCollapsed = selection && Range.isCollapsed(selection)
  const link = {
    type: "link",
    url,
    children: isCollapsed ? [{ text: url }] : [],
  }

  if (isCollapsed) {
    Transforms.insertNodes(editor, link)
  } else {
    Transforms.wrapNodes(editor, link, { split: true })
    Transforms.collapse(editor, { edge: "end" })
  }
}

const insertImage = (editor: Editor) => {
  const url = window.prompt("Enter the URL of the image:")
  if (!url) return

  const image = { type: "image", url, alt: "", children: [{ text: "" }] }
  Transforms.insertNodes(editor, image)
}

// Helper functions
function isHotkey(hotkey: string, event: KeyboardEvent): boolean {
  const keys = hotkey.split("+")
  const modKey = keys.includes("mod")
  const ctrlKey = keys.includes("ctrl")
  const altKey = keys.includes("alt")
  const shiftKey = keys.includes("shift")
  const key = keys[keys.length - 1]

  return (
    (!modKey || event.ctrlKey || event.metaKey) &&
    (!ctrlKey || event.ctrlKey) &&
    (!altKey || event.altKey) &&
    (!shiftKey || event.shiftKey) &&
    event.key.toLowerCase() === key.toLowerCase()
  )
}

function useReactSlate() {
  const editor = useSlateStatic()
  return editor
}

function useSlateStatic() {
  const editor = useMemo(() => withHistory(withReact(createEditor())), [])
  return editor
}

function Range() {
  return {
    isCollapsed: (range: any) => range && range.anchor.offset === range.focus.offset,
  }
}
