import ReactMarkdown from "react-markdown";
import { useParams } from "react-router";
import fm from "front-matter";
import { useQuery } from "@tanstack/react-query";

interface Attributes {
  title: string;
  date: string;
}

export default function Post() {
  const { slug } = useParams();

  const { data } = useQuery({
    queryKey: ["post", slug],
    queryFn: async () => {
      const file = await import(`../features/Blog/posts/${slug}.md?raw`);
      const { attributes, body } = fm<Attributes>(file.default);
      return {
        title: attributes.title,
        content: body,
      };
    },
    enabled: !!slug, // only run if slug is defined
  });

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">{data?.title}</h1>
      <ReactMarkdown>{data?.content}</ReactMarkdown>
    </div>
  );
}
