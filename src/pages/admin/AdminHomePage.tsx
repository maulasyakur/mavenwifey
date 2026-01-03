import { Button } from "@/components/ui/button";
import { Link } from "react-router";

export default function AdminHomePage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4">
      <h1 className="text-2xl">What do you want to do today?</h1>
      <ul className="space-y-2">
        <li>
          <Link to="/admin/blog-posts">
            <Button className="w-full">Manage Blog Posts</Button>
          </Link>
        </li>
        <li>
          <Link to="/admin/albums">
            <Button className="w-full">Manage Albums</Button>
          </Link>
        </li>
      </ul>
    </div>
  );
}
