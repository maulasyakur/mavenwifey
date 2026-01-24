import { usePost } from "@/lib/blog";
import { useParams } from "react-router";
import { lazy } from "react";
import { Spinner } from "@/components/ui/8bit/spinner";

const TextEditor = lazy(() => import("@/components/PostEditor"));

// TODO: Look for editor components that can:
// - support markdown editing with preview ✅
// - simple text formatting like bold, italics, headings, lists ✅
// - image embedding
// - link embedding
// - youtube embedding
// - code block support with syntax highlighting
// - math support (LaTeX)
export default function BlogPostEditor() {
  const { slug } = useParams();
  const { data, isPending, error } = usePost(slug!);

  if (isPending) {
    return (
      <div className="h-screen flex items-center justify-center">
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

  return <TextEditor content={data.content || ""} />;
}
