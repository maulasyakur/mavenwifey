import supabase from "./supabase";

export async function fetchPosts() {
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
}

export async function fetchPost(slug: string | undefined) {
  if (!slug) {
    throw new Error("Slug is not provided.");
  }

  const { data: posts, error } = await supabase
    .from("posts")
    .select("title, created_at, content")
    .eq("slug", slug);

  if (error) {
    throw error;
  }

  return {
    title: posts[0].title,
    date: posts[0].created_at,
    content: posts[0].content,
  };
}
