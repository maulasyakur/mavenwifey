import ReactMarkdown from "react-markdown";
import { useParams } from "react-router";
import { usePost } from "../utils/blog";
import remarkGfm from "remark-gfm";

export default function Post() {
  const { slug } = useParams();
  const { data, error, isLoading } = usePost(slug);

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
          {new Date(data?.date!).toLocaleString()}
        </h2>
      </div>
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{data?.content}</ReactMarkdown>
    </div>
  );
}
