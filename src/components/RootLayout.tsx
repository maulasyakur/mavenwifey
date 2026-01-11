import { Outlet, useLocation } from "react-router";
import Navbar from "./Navbar";
import { useEffect, useState } from "react";
import DefaultWallpaper from "../assets/wallpaper.jpg";
import BlogWallpaper from "../assets/blog-bg.webp";
import LoadingScreen from "./ui/8bit/blocks/loading-screen";
import { useLoadingProgress } from "@/hooks/use-loading-progress";

const routeBackgrounds: Record<string, string> = {
  "/blog": BlogWallpaper,
  "/post": BlogWallpaper,
  "/": DefaultWallpaper,
};

export default function RootLayout() {
  const location = useLocation();
  const [bgImg, setBgImg] = useState(DefaultWallpaper);
  const isLoading = useLoadingProgress();

  useEffect(() => {
    const matched = Object.keys(routeBackgrounds).find((route) =>
      location.pathname.startsWith(route)
    );

    setBgImg(routeBackgrounds[matched || "/"]);
  }, [location]);

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
      <div className="fixed inset-0 bg-[url(./assets/wallpaper.jpg)] bg-cover blur-sm brightness-25"></div>

      {/* Content container */}
      <div
        className="relative max-w-lg h-dvh mx-auto flex flex-col bg-cover overflow-hidden"
        style={{ backgroundImage: `url(${bgImg})` }}
      >
        <Navbar />
        <Outlet />
      </div>
    </div>
  );
}
