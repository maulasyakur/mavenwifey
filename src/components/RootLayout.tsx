import { Outlet } from "react-router";
import Navbar from "./Navbar";

export default function RootLayout() {
  return (
    <div className="m-0 p-0 relative pixel-art text-white pixelify-sans">
      {/* Background layer */}
      <div className="absolute inset-0 bg-[url(./assets/wallpaper.jpg)] bg-cover blur-sm brightness-50"></div>

      {/* Content container */}
      <div className="relative z-10 max-w-md h-dvh mx-auto flex flex-col bg-[url(./assets/wallpaper.jpg)] bg-cover">
        <Navbar />
        <Outlet />
      </div>
    </div>
  );
}
