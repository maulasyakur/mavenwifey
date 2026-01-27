import { Spinner } from "./ui/8bit/spinner";

export default function LoadingScreen() {
  return (
    <div className="h-screen-header flex items-center justify-center">
      <Spinner variant="diamond" />
    </div>
  );
}
