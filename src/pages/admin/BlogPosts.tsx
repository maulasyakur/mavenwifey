import { Link } from "react-router";
import { usePostsList } from "../../utils/blog";
import { Spinner } from "@/components/ui/spinner";

export default function BlogEditList() {
  const { data, isLoading, error } = usePostsList();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center">
        <Spinner />
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
      <button className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
        Write a new post
      </button>
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
                {new Date(post.date).toLocaleString()}
              </p>
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
}
