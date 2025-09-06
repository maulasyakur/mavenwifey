import Image, { StaticImageData } from "next/image";

export default function AppIcon({
  icon,
  name,
}: {
  icon: StaticImageData;
  name: string;
}) {
  return (
    <div>
      <div className="bg-white/50 w-16 h-16 rounded-lg relative">
        <Image src={icon} alt={`${name} icon`} fill className="pixel-art p-1" />
      </div>
      <p className="text-center text-sm capitalize">{name}</p>
    </div>
  );
}
