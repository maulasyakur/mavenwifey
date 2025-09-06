import Image from "next/image";
import BlogIcon from "../public/blog.png";
import ContactIcon from "../public/contact.png";
import GuestBookIcon from "../public/guest-book.png";
import ChatRoomIcon from "../public/chat-room.png";
import PhotoAlbumIcon from "../public/photo-album.png";
import AboutMeIcon from "../public/about-me.png";
import AppIcon from "./components/app-icon";

export default function Home() {
  return (
    <div className="flex flex-col justify-between flex-1 p-4">
      {/* app grid */}
      <div className="grid grid-cols-4 gap-4 justify-items-center">
        {[
          BlogIcon,
          ContactIcon,
          GuestBookIcon,
          ChatRoomIcon,
          PhotoAlbumIcon,
          AboutMeIcon,
        ].map((icon, index) => {
          return <AppIcon icon={icon} name="Icon" key={index} />;
        })}
      </div>

      {/* dock */}
      <div className="bg-neutral-500/75 grid grid-cols-4 gap-4 justify-items-center py-2 rounded-2xl">
        <div>
          <div className="bg-white/50 w-16 h-16 rounded-lg relative">
            <Image
              src={BlogIcon}
              alt={"Blog Icon"}
              fill
              className="pixel-art p-1"
            />
          </div>
        </div>

        <div>
          <div className="bg-white/50 w-16 h-16 rounded-lg relative">
            <Image
              src={ContactIcon}
              alt={"Contact Icon"}
              fill
              className="pixel-art p-1"
            />
          </div>
        </div>

        <div>
          <div className="bg-white/50 w-16 h-16 rounded-lg relative">
            <Image
              src={GuestBookIcon}
              alt={"Guest Book Icon"}
              fill
              className="pixel-art p-1"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
