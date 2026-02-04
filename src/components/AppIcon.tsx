import { Link } from "react-router";

export default function AppIcon({
  icon,
  name,
  url,
}: {
  icon: string;
  name: string;
  url: string;
}) {
  return (
    <Link
      to={url}
      className="flex flex-col items-center w-full h-full bg-amber-200/25 p-2 rounded-lg hover:bg-amber-100/50 transition-colors"
    >
      <div className="w-20 h-20 rounded-lg relative">
        <img
          src={icon}
          alt={`${name} icon`}
          className="pixel-art p-1 object-cover w-full h-full"
        />
      </div>
      <p className="text-center text-xs capitalize">{name}</p>
    </Link>
  );
}
