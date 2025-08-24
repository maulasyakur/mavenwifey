import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col justify-between flex-1 p-4">
      {/* app grid */}
      <div className="grid grid-cols-4 gap-4 justify-items-center">
        <div>
          <div className="bg-white/50 w-16 h-16 rounded-lg relative">
            <Image
              src={"/blog.png"}
              alt={"Blog Icon"}
              fill
              className="pixel-art p-1"
            />
          </div>
          <p className="text-center text-sm">Blog</p>
        </div>

        <div>
          <div className="bg-white/50 w-16 h-16 rounded-lg relative">
            <Image
              src={"/contact.png"}
              alt={"Blog Icon"}
              fill
              className="pixel-art p-1"
            />
          </div>
          <p className="text-center text-sm">Contact</p>
        </div>

        <div>
          <div className="bg-white/50 w-16 h-16 rounded-lg relative">
            <Image
              src={"/guest_book.png"}
              alt={"Blog Icon"}
              fill
              className="pixel-art p-1"
            />
          </div>
          <p className="text-center text-sm">Guest Book</p>
        </div>
      </div>

      {/* dock */}
      <div className="bg-neutral-500/75 grid grid-cols-4 gap-4 justify-items-center py-2 rounded-2xl">
        <div>
          <div className="bg-white/50 w-16 h-16 rounded-lg relative">
            <Image
              src={"/blog.png"}
              alt={"Blog Icon"}
              fill
              className="pixel-art p-1"
            />
          </div>
        </div>

        <div>
          <div className="bg-white/50 w-16 h-16 rounded-lg relative">
            <Image
              src={"/contact.png"}
              alt={"Blog Icon"}
              fill
              className="pixel-art p-1"
            />
          </div>
        </div>

        <div>
          <div className="bg-white/50 w-16 h-16 rounded-lg relative">
            <Image
              src={"/guest_book.png"}
              alt={"Blog Icon"}
              fill
              className="pixel-art p-1"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
