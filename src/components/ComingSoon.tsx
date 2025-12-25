import AboutMeIcon from "../assets/about-me.png";

export default function ComingSoon() {
  return (
    <div className="flex flex-col gap-2 m-auto">
      <h1 className="text-2xl text-center">Coming Soon</h1>
      <img src={AboutMeIcon} alt="COming soon icon" className="pixel-art " />
    </div>
  );
}
