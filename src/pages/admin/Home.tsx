import { Link } from "react-router";

export default function AdminHome() {
  return (
    <div>
      <ul>
        <Link to={"/admin/blog-upload"}>
          <li>
            <h1>Blog Upload</h1>
          </li>
        </Link>
      </ul>
    </div>
  );
}
