import BlogIcon from "../assets/blog.png";
import ContactIcon from "../assets/contact.png";
import GuestBookIcon from "../assets/guest-book.png";
import ChatRoomIcon from "../assets/chat-room.png";
import PhotoAlbumIcon from "../assets/photo-album.png";
import AboutMeIcon from "../assets/about-me.png";
import AppIcon from "../components/AppIcon";

export default function Home() {
  return (
    <div className="flex flex-col justify-between flex-1 p-4 bg-[url(./assets/wallpaper.jpg)] bg-cover">
      {/* app grid */}
      <div className="grid grid-cols-4 gap-4 justify-items-center">
        {[
          { icon: BlogIcon, name: "Blog", url: "/blog" },
          { icon: ContactIcon, name: "Contact", url: "/contact" },
          { icon: GuestBookIcon, name: "Guest Book", url: "/guest-book" },
          { icon: ChatRoomIcon, name: "Chat Room", url: "/chat-room" },
          { icon: PhotoAlbumIcon, name: "Photo Album", url: "/photo-album" },
          { icon: AboutMeIcon, name: "About Me", url: "/about-me" },
        ].map((item, index) => {
          return (
            <AppIcon
              icon={item.icon}
              name={item.name}
              key={index}
              url={item.url}
            />
          );
        })}
      </div>

      {/* dock */}
      <div className="bg-neutral-500/75 grid grid-cols-4 gap-4 justify-items-center py-2 rounded-2xl">
        {[
          { icon: BlogIcon, name: "Blog", url: "/blog" },
          { icon: ContactIcon, name: "Contact", url: "/contact" },
          { icon: GuestBookIcon, name: "Guest Book", url: "/guest-book" },
          { icon: ChatRoomIcon, name: "Chat Room", url: "/chat-room" },
        ].map((item, index) => {
          return (
            <AppIcon
              icon={item.icon}
              name={item.name}
              key={index}
              url={item.url}
            />
          );
        })}
      </div>
    </div>
  );
}
