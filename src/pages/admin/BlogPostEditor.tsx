import { Spinner } from "@/components/ui/spinner";
import { usePost } from "@/lib/blog";
import { useParams } from "react-router";
import { useEditor, EditorContent, EditorContext } from "@tiptap/react";
import { FloatingMenu, BubbleMenu } from "@tiptap/react/menus";
import StarterKit from "@tiptap/starter-kit";
import { useEffect, useMemo } from "react";
import { Markdown } from "@tiptap/markdown";
import { HeadingButton } from "@/components/tiptap-ui/heading-button";

// TODO: Look for editor components that can:
// - support markdown editing with preview
// - simple text formatting like bold, italics, headings, lists
// - image embedding
// - link embedding
// - youtube embedding
// - code block support with syntax highlighting
export default function BlogPostEditor() {
  const { slug } = useParams();
  const { data, isLoading, error } = usePost(slug!);
  const editor = useEditor({
    extensions: [StarterKit, Markdown], // define your extension array
    content: "<p>Hello World!</p>", // initial content
    editorProps: {
      attributes: {
        class:
          "prose dark:prose-invert prose-sm sm:prose-base lg:prose-lg xl:prose-2xl m-5 focus:outline-none mx-auto",
      },
    },
    contentType: "markdown",
  });

  useEffect(() => {
    if (data && editor) {
      editor.commands.setContent(data.content || "Hello World!", {
        contentType: "markdown",
      });
    }
  }, [data, editor]);

  const providerValue = useMemo(() => ({ editor }), [editor]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Spinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Error loading post: {error.message}</p>
      </div>
    );
  }

  return (
    <EditorContext.Provider value={providerValue}>
      <HeadingButton level={1}>Heading 1</HeadingButton>
      <HeadingButton level={2}>Heading 2</HeadingButton>
      <HeadingButton level={3}>Heading 3</HeadingButton>
      <EditorContent editor={editor} />
      <FloatingMenu editor={editor}>This is the floating menu</FloatingMenu>
      <BubbleMenu editor={editor}>This is the bubble menu</BubbleMenu>
    </EditorContext.Provider>
  );
}
