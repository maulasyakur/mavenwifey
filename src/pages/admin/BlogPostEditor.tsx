import { Spinner } from "@/components/ui/spinner";
import { usePost, type Post } from "@/lib/blog";
import { useParams } from "react-router";
// import { useEditor, EditorContent, EditorContext } from "@tiptap/react";
// import { FloatingMenu, BubbleMenu } from "@tiptap/react/menus";
// import StarterKit from "@tiptap/starter-kit";
// import { useEffect, useMemo } from "react";
// import { Markdown } from "@tiptap/markdown";
// import { HeadingButton } from "@/components/tiptap-ui/heading-button";
import { SimpleEditor } from "@/components/tiptap-templates/simple/simple-editor";
import { createContext } from "react";

export const PostContext = createContext<Post | null>(null);

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
  // const editor = useEditor({
  //   extensions: [StarterKit, Markdown], // define your extension array
  //   content: "<p>Hello World!</p>", // initial content
  //   editorProps: {
  //     attributes: {
  //       class:
  //         "prose dark:prose-invert prose-sm sm:prose-base lg:prose-lg xl:prose-2xl m-5 focus:outline-none mx-auto",
  //     },
  //   },
  //   contentType: "markdown",
  // });

  // useEffect(() => {
  //   if (data && editor) {
  //     editor.commands.setContent(data.content || "Hello World!", {
  //       contentType: "markdown",
  //     });
  //   }
  // }, [data, editor]);

  // const providerValue = useMemo(() => ({ editor }), [editor]);

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

  console.log("rendering...");

  return (
    <PostContext.Provider
      value={
        data || {
          content: "",
          created_at: "",
          id: 0,
          slug: "",
          title: "",
          public: false,
        }
      }
    >
      <SimpleEditor content={data?.content || ""} />
    </PostContext.Provider>
  );
}
