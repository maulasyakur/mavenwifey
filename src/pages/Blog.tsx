import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import { fetchPosts } from "../utils/blog";

export default function Blog() {
  const { data, error, isLoading } = useQuery({
    queryKey: ["blog"],
    queryFn: fetchPosts,
  });

  if (isLoading) {
    return (
      <div className="p-6 w-full h-full overflow-auto mx-auto bg-black/70">
        <h1>Loading...</h1>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 w-full h-full overflow-auto mx-auto bg-black/70">
        <h1>Error loading blog posts: {error.message}</h1>
      </div>
    );
  }

  return (
    <div className="p-6 w-full h-full overflow-auto mx-auto bg-black/70">
      <h1 className="text-3xl font-bold mb-6">📰 Blog</h1>
      <ul>
        {data?.map((post) => (
          <Link
            to={`/blog/${post.slug}`}
            className="text-xl font-semibold hover:underline"
            key={post.slug}
          >
            <li className="mb-4 border border-orange-400 p-2">
              {post.title}
              <p className="text-gray-200 text-sm">
                {new Date(post.date).toLocaleString()}
              </p>
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
}
