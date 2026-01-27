import { PostContextProvider, usePost } from "@/lib/blog";
import { useParams } from "react-router";
import { lazy, Suspense } from "react";
import LoadingScreen from "@/components/LoadingScreen";
import ErrorScreen from "@/components/ErrorScreen";

const TextEditor = lazy(() => import("@/components/PostEditor"));

// TODO: Look for editor components that can:
// - support markdown editing with preview ✅
// - simple text formatting like bold, italics, headings, lists ✅
// - image embedding ✅
// - link embedding ✅
// - youtube embedding
// - code block support with syntax highlighting
// - math support (LaTeX)
export default function BlogPostEditor() {
  const { slug } = useParams();
  const { data, isPending, error } = usePost(slug!);

  if (isPending) return <LoadingScreen />;
  if (error) {
    return (
      <ErrorScreen message={`Error loading blog post: ${error.message}`} />
    );
  }

  return (
    <PostContextProvider post={data}>
      <Suspense fallback={<LoadingScreen />}>
        <TextEditor content={data.content || ""} />
      </Suspense>
    </PostContextProvider>
  );
}
