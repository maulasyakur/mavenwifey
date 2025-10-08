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
    <div>
      <Link to={url}>
        <div className="bg-white/50 w-16 h-16 rounded-lg relative">
          <img
            src={icon}
            alt={`${name} icon`}
            className="pixel-art p-1 object-cover w-full h-full"
          />
        </div>
        <p className="text-center text-xs capitalize">{name}</p>
      </Link>
    </div>
  );
}
