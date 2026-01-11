import { Spinner } from "@/components/ui/8bit/spinner";
import { usePublicPosts } from "@/lib/blog";
import { Link } from "react-router";

export default function Blog() {
  const { data, error, isPending } = usePublicPosts();

  if (isPending) {
    return (
      <div className="p-6 w-full h-full overflow-auto mx-auto bg-black/70">
        <div className="flex items-center justify-center">
          <Spinner variant="diamond" />
        </div>
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
        {data.length > 0 ? (
          data?.map((post) => (
            <Link
              to={`/blog/${post.slug}`}
              className="text-xl font-semibold hover:underline"
              key={post.slug}
            >
              <li className="mb-4 border border-orange-400 p-2">
                {post.title}
                <p className="text-gray-200 text-sm">
                  {new Date(post.created_at).toLocaleString()}
                </p>
              </li>
            </Link>
          ))
        ) : (
          <li className="flex items-center justify-center">
            More posts coming soon... 🚧
          </li>
        )}
      </ul>
    </div>
  );
}
