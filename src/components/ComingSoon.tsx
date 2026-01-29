import AboutMeIcon from "../assets/about-me.png";

export default function ComingSoon() {
  return (
    <div className="flex flex-col gap-2 items-center justify-center h-screen bg-[url(./assets/wallpaper.jpg)] bg-cover">
      <h1 className="text-2xl text-center">Coming Soon</h1>
      <img
        src={AboutMeIcon}
        alt="Coming soon icon"
        className="pixel-art w-32 h-32"
      />
    </div>
  );
}
