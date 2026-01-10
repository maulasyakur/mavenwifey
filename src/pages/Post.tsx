import ReactMarkdown from "react-markdown";
import { useParams } from "react-router";
import { usePost } from "../lib/blog";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";

export default function Post() {
  const { slug } = useParams();
  const { data, error, isLoading } = usePost(slug!);

  if (isLoading) {
    return (
      <div className="p-6 w-full h-full mx-auto bg-black/70 overflow-auto space-y-6">
        <h1>Loading...</h1>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 w-full h-full mx-auto bg-black/70 overflow-auto space-y-6">
        <h1>Error loading post: {error.message}</h1>
      </div>
    );
  }

  return (
    <div className="p-6 w-full h-full mx-auto bg-black/70 overflow-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold">{data?.title}</h1>
        <h2 className="text-sm text-gray-200">
          {data?.created_at
            ? new Date(data?.created_at).toLocaleString()
            : "Upload date unknown"}
        </h2>
      </div>
      <article className="prose prose-invert max-w-none overflow-hidden">
        <ReactMarkdown
          remarkPlugins={[remarkGfm, remarkMath]}
          rehypePlugins={[rehypeKatex]}
        >
          {data?.content}
        </ReactMarkdown>
      </article>
    </div>
  );
}
