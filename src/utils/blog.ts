import { useQuery } from "@tanstack/react-query";
import supabase from "./supabase";

export function usePostsList() {
  return useQuery({
    queryKey: ["post-list"],
    queryFn: async () => {
      const { data: posts, error } = await supabase
        .from("posts")
        .select("title, created_at, slug");

      if (error) {
        throw error;
      }

      return posts?.map(({ created_at, ...rest }) => ({
        ...rest,
        date: created_at,
      }));
    },
  });
}

// utils/blog.ts
export function usePost(slug: string | undefined) {
  return useQuery({
    queryKey: ["post", slug], // Include slug in query key
    queryFn: async () => {
      if (!slug) {
        return {
          title: "",
          date: "",
          content: "",
        };
      }

      const { data: posts, error } = await supabase
        .from("posts")
        .select("title, created_at, content")
        .eq("slug", slug);

      if (error) {
        throw error;
      }

      if (!posts || posts.length === 0) {
        throw new Error("Post not found");
      }

      return {
        title: posts[0].title,
        date: posts[0].created_at,
        content: posts[0].content,
      };
    },
    enabled: !!slug, // Only run query when slug exists
  });
}

export async function imageUploadHandler(image: File) {
  image.arrayBuffer();
  const formData = new FormData();
  formData.append("image", image);
  const bucket = "posts";

  const { data: UploadData, error: UploadError } = await supabase.storage
    .from(bucket)
    .upload(image.name, formData, {
      cacheControl: "3600",
      upsert: true,
    });
  if (UploadError) throw UploadError;

  const { data: URLdata } = supabase.storage
    .from(bucket)
    .getPublicUrl(UploadData.path);

  return URLdata.publicUrl;
}
