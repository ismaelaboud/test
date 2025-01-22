import React, { useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Bold from "@tiptap/extension-bold";
import Italic from "@tiptap/extension-italic";
import Underline from "@tiptap/extension-underline";
import Strike from "@tiptap/extension-strike";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import Blockquote from "@tiptap/extension-blockquote";
import CodeBlock from "@tiptap/extension-code-block";
import TextAlign from "@tiptap/extension-text-align";
import { 
  Bold as BoldIcon, Italic as ItalicIcon, Underline as UnderlineIcon, Strikethrough, List, ListOrdered, Quote, Code2 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Card, CardHeader, CardContent } from "@/components/ui/card";

const RichTextEditor: React.FC = () => {
  const [isPreview, setIsPreview] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Bold,
      Italic,
      Underline,
      Strike,
      BulletList,
      OrderedList,
      Blockquote,
      CodeBlock,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
    ],
    content: "<p>Start writing...</p>", // Placeholder-like initial content
    onUpdate: ({ editor }) => {
      if (editor.isEmpty) {
        editor.commands.setContent("<p>Start writing...</p>");
      }
    },
  });

  if (!editor) {
    return <div>Loading editor...</div>;
  }

  return (
    <Card className="p-4 space-y-4 shadow-lg">
      <CardHeader className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <span className="text-sm">Preview</span>
          <Switch
            checked={isPreview}
            onCheckedChange={setIsPreview}
            className="bg-gray-200"
          />
        </div>
      </CardHeader>
      <CardContent>
        {isPreview ? (
          <div className="border border-gray-300 p-4 rounded-md min-h-[200px] bg-gray-50 shadow-inner">
            <div
              className="prose prose-gray max-w-none"
              dangerouslySetInnerHTML={{ __html: editor.getHTML() }}
            />
          </div>
        ) : (
          <>
            <div className="flex flex-wrap space-x-2 bg-gray-100 p-2 rounded-md border border-gray-200">
              {/* Formatting Tools */}
              <Button
                title="Bold"
                variant={editor.isActive("bold") ? "default" : "outline"}
                onClick={() => editor.chain().focus().toggleBold().run()}
                disabled={!editor.can().chain().focus().toggleBold().run()}
              >
                <BoldIcon className="w-4 h-4" />
              </Button>

              <Button
                title="Italic"
                variant={editor.isActive("italic") ? "default" : "outline"}
                onClick={() => editor.chain().focus().toggleItalic().run()}
                disabled={!editor.can().chain().focus().toggleItalic().run()}
              >
                <ItalicIcon className="w-4 h-4" />
              </Button>

              <Button
                title="Underline"
                variant={editor.isActive("underline") ? "default" : "outline"}
                onClick={() => editor.chain().focus().toggleUnderline().run()}
                disabled={!editor.can().chain().focus().toggleUnderline().run()}
              >
                <UnderlineIcon className="w-4 h-4" />
              </Button>

              <Button
                title="Strikethrough"
                variant={editor.isActive("strike") ? "default" : "outline"}
                onClick={() => editor.chain().focus().toggleStrike().run()}
              >
                <Strikethrough className="w-4 h-4" />
              </Button>

              <Button
                title="Bullet List"
                variant={editor.isActive("bulletList") ? "default" : "outline"}
                onClick={() => editor.chain().focus().toggleBulletList().run()}
              >
                <List className="w-4 h-4" />
              </Button>

              <Button
                title="Numbered List"
                variant={editor.isActive("orderedList") ? "default" : "outline"}
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
              >
                <ListOrdered className="w-4 h-4" />
              </Button>

              <Button
                title="Blockquote"
                variant={editor.isActive("blockquote") ? "default" : "outline"}
                onClick={() => editor.chain().focus().toggleBlockquote().run()}
              >
                <Quote className="w-4 h-4" />
              </Button>

              <Button
                title="Code Block"
                variant={editor.isActive("codeBlock") ? "default" : "outline"}
                onClick={() => editor.chain().focus().toggleCodeBlock().run()}
              >
                <Code2 className="w-4 h-4" />
              </Button>
            </div>

            <div className="relative mt-4 border border-gray-300 p-4 rounded-md min-h-[200px] focus:outline-none bg-white shadow-inner">
              {editor.isEmpty && (
                <p className="absolute text-gray-400 pointer-events-none">
                  Start writing...
                </p>
              )}
              <EditorContent editor={editor} />
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default RichTextEditor;
