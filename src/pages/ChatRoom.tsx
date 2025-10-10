import useUsername from "@/components/ChatComponent/hooks/use-username";
import { RealtimeChat } from "@/components/ChatComponent/RealtimeChat";
import UsernameSetting from "@/components/ChatComponent/UsernameSetting";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import HCaptcha from "@hcaptcha/react-hcaptcha";

const roomName = "test_room";

export default function ChatRoom() {
  const {
    username,
    setCaptchaToken,
    captcha,
    loggedIn,
    loading,
    userId,
    setUsername,
  } = useUsername();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {loggedIn ? (
        <>
          <UsernameSetting
            username={username}
            setUsername={setUsername}
            className="absolute right-2 top-12"
          />
          <RealtimeChat
            roomName={roomName}
            username={username}
            userId={userId}
          />
        </>
      ) : (
        <div className="flex justify-center items-center min-h-64">
          <HCaptcha
            sitekey="e5c40166-ad9e-4e86-9d22-2446d418269a"
            onVerify={(token) => {
              setCaptchaToken(token);
            }}
            onError={() => {
              console.error("Captcha error");
              setCaptchaToken("");
            }}
            onExpire={() => {
              setCaptchaToken("");
            }}
            ref={captcha}
          />
        </div>
      )}
    </>
  );
}
