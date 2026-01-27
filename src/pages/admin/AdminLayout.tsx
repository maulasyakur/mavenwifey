import { ThemeToggle } from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { useSession } from "@/lib/session-hook";
import supabase from "@/lib/supabase";
import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";
import PhotoAlbumIcon from "@/assets/photo-album.png";
import { toast, Toaster } from "sonner";
import LoadingScreen from "@/components/LoadingScreen";

export default function AdminLayout() {
  const { session, isLoading } = useSession();
  const navigate = useNavigate();

  const { mutate: signOut, isPending } = useMutation({
    mutationFn: async () => {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      return null;
    },
    onError: (error) => {
      toast(`Logout failed: ${error.message}`);
    },
  });

  useEffect(() => {
    if (!isLoading && !session) {
      navigate("/admin/login", { replace: true });
    }
  }, [session, isLoading, navigate]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (!session) {
    return null;
  }

  return (
    <>
      <nav className="h-header px-2 shadow-md flex items-center justify-between">
        <div className="flex items-center text-center gap-2">
          <img src={PhotoAlbumIcon} alt="Logo" className="h-8 w-8" />
          <p>Welcome Dita!!!</p>
        </div>
        <div className="flex gap-2 items-center">
          <ThemeToggle />
          <Button onClick={() => signOut()} disabled={isPending}>
            {isPending ? <Spinner /> : "Logout"}
          </Button>
        </div>
      </nav>
      <div className="pixelify-sans">
        <Outlet />
        <Toaster />
      </div>
    </>
  );
}
