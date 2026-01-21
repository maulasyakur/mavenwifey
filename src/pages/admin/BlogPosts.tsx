import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import { useAllPosts } from "@/lib/blog";
import { Spinner } from "@/components/ui/8bit/spinner";

export default function BlogEditList() {
  const { data, isPending, error } = useAllPosts();

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
        <p>Error loading post...</p>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-3">
      <h1 className="text-4xl text-center">Edit Blog Posts</h1>
      <Button asChild className="w-full">
        <Link to="/admin/blog-posts/new">Write a new post</Link>
      </Button>
      <ul>
        {data?.map((post) => (
          <Link
            to={`/admin/blog-posts/${post.slug}`}
            className="text-xl font-semibold hover:underline"
            key={post.slug}
          >
            <li className="mb-4 border-2 p-2">
              {post.title}
              <p className="text-foreground text-sm">
                {new Date(post.created_at).toLocaleString()}
              </p>
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
}
