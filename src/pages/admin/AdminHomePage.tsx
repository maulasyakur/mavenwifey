import { Button } from "@/components/ui/button";
import { Link } from "react-router";

export default function AdminHomePage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4">
      <h1 className="text-2xl">What do you want to do today?</h1>
      <ul className="space-y-2">
        <li>
          <Button className="w-full" asChild>
            <Link to="/admin/blog-posts">Manage Blog Posts</Link>
          </Button>
        </li>
        <li>
          <Button className="w-full" asChild>
            <Link to="/admin/albums">Manage Albums</Link>
          </Button>
        </li>
      </ul>
    </div>
  );
}
