import { supabase } from "@/lib/supabase";
import type HCaptcha from "@hcaptcha/react-hcaptcha";
import { useEffect, useRef, useState } from "react";

export default function useUsername() {
  const [userId, setUserId] = useState<string>("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState("Anonymous");
  const [captchaToken, setCaptchaToken] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const captcha = useRef<HCaptcha>(null);

  useEffect(() => {
    async function fetchUser() {
      try {
        const {
          data: { user },
          error,
        } = await supabase.auth.getUser();

        if (error) throw error;

        if (user) {
          setUserId(user.id);
          setUsername(`user-${user.id.slice(0, 4)}`);
          setLoggedIn(true);
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchUser();
  }, []); // Empty dependency array - runs once on mount

  useEffect(() => {
    async function signIn() {
      if (!captchaToken) return;

      try {
        setLoading(true);
        const { data, error } = await supabase.auth.signInAnonymously({
          options: { captchaToken },
        });

        if (error) throw error;

        if (data.user) {
          setUsername(`user-${data.user.id.slice(0, 4)}`);
          setLoggedIn(true);
        }
      } catch (error) {
        console.error("Sign in error:", error);
        // Reset captcha on error
        captcha.current?.resetCaptcha();
        setCaptchaToken("");
      } finally {
        setLoading(false);
      }
    }

    if (captchaToken && !loggedIn) {
      signIn();
    }
  }, [captchaToken, loggedIn]); // Only run when captchaToken or loggedIn changes

  return {
    username,
    setCaptchaToken,
    captcha,
    loggedIn,
    loading,
    userId,
    setUsername,
  };
}
