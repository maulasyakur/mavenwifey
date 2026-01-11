import { usePost, type Post } from "@/lib/blog";
import { useParams } from "react-router";
import { SimpleEditor } from "@/components/tiptap-templates/simple/simple-editor";
import { createContext, Suspense } from "react";
import { Spinner } from "@/components/ui/8bit/spinner";

export const PostContext = createContext<Post | null>(null);

// TODO: Look for editor components that can:
// - support markdown editing with preview ✅
// - simple text formatting like bold ✅, italics ✅, headings ✅, lists ✅
// - image embedding ✅
// - link embedding ✅
// - youtube embedding
// - code block support with syntax highlighting ✅
// - math support (LaTeX)
export default function BlogPostEditor() {
  const { slug } = useParams();
  const { data, isPending, error } = usePost(slug!);

  if (isPending) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Spinner variant="diamond" />
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
      <Suspense fallback={<Spinner variant="diamond" />}>
        <SimpleEditor content={data?.content || ""} />
      </Suspense>
    </PostContext.Provider>
  );
}
