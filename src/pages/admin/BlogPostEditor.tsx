import { Spinner } from "@/components/ui/spinner";
import { usePost } from "@/lib/blog";
import { useParams } from "react-router";

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
    <>
      <div>BlogPostEditor, {slug}</div>
      <div>{data?.content}</div>
    </>
  );
}
