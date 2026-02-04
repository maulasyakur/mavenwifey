import AboutMeIcon from "../assets/about-me.png";
import InstagramLogo from "../assets/instagram_logo.png";
import TiktokLogo from "../assets/tiktok_logo.png";
import YoutubeLogo from "../assets/youtube_logo.png";
import MailLogo from "../assets/mail_logo.png";

export default function Contact() {
  return (
    <div className="bg-[url(./assets/wallpaper.jpg)] bg-cover bg-blend-darken bg-black/50 h-full flex flex-col items-center justify-center">
      <img
        src={AboutMeIcon}
        alt="Coming soon icon"
        className="pixel-art w-32 h-32"
      />
      <h1 className="text-4xl font-bold text-center">
        Hi! Let's get in touch!
      </h1>
      <div className="grid grid-cols-2 gap-4 mt-4 items-center">
        <a
          href="https://www.instagram.com/mavenwifey/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src={InstagramLogo}
            alt="Instagram logo"
            className="pixel-art w-32 h-32"
          />
        </a>
        <a
          href="https://www.tiktok.com/@nadita.raisha"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src={TiktokLogo}
            alt="TikTok logo"
            className="pixel-art w-32 h-32"
          />
        </a>
        <a
          href="https://www.youtube.com/@naditasyarfina"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src={YoutubeLogo}
            alt="YouTube logo"
            className="pixel-art w-32"
          />
        </a>
        <a
          href="mailto:nadita.raisha@gmail.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={MailLogo} alt="Email logo" className="pixel-art w-32" />
        </a>
      </div>
    </div>
  );
}
