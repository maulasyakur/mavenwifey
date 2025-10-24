import { Outlet, useLocation } from "react-router";
import Navbar from "./Navbar";
import { useEffect, useState } from "react";
import DefaultWallpaper from "../assets/wallpaper.jpg";
import BlogWallpaper from "../assets/blog-bg.webp";

const routeBackgrounds: Record<string, string> = {
  "/blog": BlogWallpaper,
  "/post": BlogWallpaper,
  "/": DefaultWallpaper,
};

export default function RootLayout() {
  const location = useLocation();
  const [bgImg, setBgImg] = useState(DefaultWallpaper);

  useEffect(() => {
    const matched = Object.keys(routeBackgrounds).find((route) =>
      location.pathname.startsWith(route)
    );

    setBgImg(routeBackgrounds[matched || "/"]);
  }, [location]);

  return (
    <div className="m-0 p-0 relative pixel-art text-white pixelify-sans">
      {/* Background layer */}
      <div className="fixed inset-0 bg-[url(./assets/wallpaper.jpg)] bg-cover blur-sm brightness-25"></div>

      {/* Content container */}
      <div
        className={`relative z-10 max-w-md h-dvh mx-auto flex flex-col bg-cover`}
        style={{ backgroundImage: `url(${bgImg})` }}
      >
        <Navbar />
        <Outlet />
      </div>
    </div>
  );
}
