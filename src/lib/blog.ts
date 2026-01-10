import { useMutation, useQuery } from "@tanstack/react-query";
import supabase from "./supabase";

// For public posts only
export function usePublicPosts() {
  return useQuery({
    queryKey: ["posts", "public"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("posts")
        .select("title, created_at, slug")
        .eq("public", true)
        .order("created_at", { ascending: false });

      if (error) throw error;

      return data;
    },
  });
}

// For all posts (admin view)
export function useAllPosts() {
  return useQuery({
    queryKey: ["posts", "all"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("posts")
        .select("title, created_at, slug, public") // Include public status
        .order("created_at", { ascending: false });

      if (error) throw error;

      return data;
    },
  });
}

export interface Post {
  content: string | null;
  created_at: string;
  id: number;
  slug: string;
  title: string | null;
  public: boolean;
}

// utils/blog.ts
export function usePost(slug: string) {
  return useQuery({
    queryKey: ["post", slug], // Include slug in query key
    queryFn: async (): Promise<Post> => {
      if (slug === "new" || !slug) {
        return {
          content: "",
          created_at: "",
          id: 0,
          slug: "",
          title: "",
          public: false,
        };
      }

      const { data: post, error } = await supabase
        .from("posts")
        .select("*")
        .eq("slug", slug)
        .limit(1)
        .maybeSingle();

      if (error) {
        throw error;
      }

      if (!post) {
        throw new Error("Post not found");
      }

      return post;
    },
    refetchOnWindowFocus: false,
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

export function useSavePost({ id, title, slug, content }: Post) {
  return useMutation({
    mutationFn: async () => {
      const { data, error } = await supabase
        .from("posts")
        .upsert({ id, title, slug, content })
        .select();

      if (error) {
        throw error;
      }

      return data;
    },
  });
}
