export default function ErrorScreen({ message }: { message: string }) {
  return (
    <div className="flex items-center justify-center h-screen-header">
      <p>{message}</p>
      <p> 😭</p>
    </div>
  );
}
