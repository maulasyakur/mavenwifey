import { Spinner } from "@/components/ui/spinner";
import { usePost } from "@/utils/blog";
import { useParams } from "react-router";

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
