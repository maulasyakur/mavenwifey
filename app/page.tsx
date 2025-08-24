export default function Home() {
  return (
    <div className="flex flex-col justify-between flex-1 p-4">
      {/* app grid */}
      <div className="grid grid-cols-4 gap-4 justify-items-center">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="bg-emerald-100 w-16 h-16 rounded-lg"></div>
        ))}
      </div>

      {/* dock */}
      <div className="bg-amber-100 grid grid-cols-4 gap-4 justify-items-center py-2 rounded-2xl">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-emerald-100 w-16 h-16 rounded-lg"></div>
        ))}
      </div>
    </div>
  );
}
