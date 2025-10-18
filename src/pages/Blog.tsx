import fm from "front-matter";
import { useQuery } from "@tanstack/react-query";

export interface Post {
  title: string;
  date: string;
  slug: string;
}

export default function Blog() {
  const { data } = useQuery({
    queryKey: ["blog"],
    queryFn: async () => {
      const files = import.meta.glob("../features/Blog/posts/*.md", {
        as: "raw",
      });
      const loadedPosts: Post[] = [];

      for (const path in files) {
        const content = await files[path]();
        const { attributes } = fm<Post>(content);
        const slug = path.split("/").pop()?.replace(".md", "") || "";

        loadedPosts.push({
          title: attributes.title,
          date: attributes.date,
          slug,
        });
      }

      return loadedPosts.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );
    },
  });

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">📰 Blog</h1>
      <ul>
        {data?.map((post) => (
          <li key={post.slug} className="mb-4">
            <a
              href={`/post/${post.slug}`}
              className="text-xl font-semibold text-blue-600 hover:underline"
            >
              {post.title}
            </a>
            <p className="text-gray-500 text-sm">{post.date}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
