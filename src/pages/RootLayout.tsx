import { Outlet } from "react-router";
import Navbar from "../components/Navbar";
import LoadingScreen from "../components/ui/8bit/blocks/loading-screen";
import { useLoadingProgress } from "@/hooks/use-loading-progress";

export default function RootLayout() {
  const isLoading = useLoadingProgress();

  if (isLoading) {
    return (
      <LoadingScreen
        variant="fullscreen"
        title="Welcome to Nadita's website!!!"
        autoProgress
      />
    );
  }

  return (
    <div className="m-0 p-0 relative pixel-art text-white">
      {/* Background layer */}
      <div className="fixed inset-0 bg-[url(./assets/wallpaper.jpg)] bg-cover blur-sm brightness-25 -z-20"></div>

      {/* Content container */}
      <div className="relative max-w-md h-dvh mx-auto flex flex-col overflow-hidden">
        <Navbar />
        <Outlet />
      </div>
    </div>
  );
}
