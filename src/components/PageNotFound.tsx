import PhotoAlbumIcon from "../assets/photo-album.png";

export default function PageNotFound() {
  return (
    <div className="flex flex-col gap-2 m-auto">
      <h1 className="text-2xl text-center">Page Not Found</h1>
      <img src={PhotoAlbumIcon} alt="COming soon icon" className="pixel-art " />
    </div>
  );
}
