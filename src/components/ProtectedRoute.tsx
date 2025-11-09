import { createContext, useEffect, useState } from "react";
import supabase from "../utils/supabase";
import { type Session } from "@supabase/supabase-js";
import { Navigate, Outlet } from "react-router";

export const SessionContext = createContext<Session | null>(null);

export default function ProtectedRoute() {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_OUT") {
        setSession(null);
      } else if (session) {
        setSession(session);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Or your custom loading component
  }

  return (
    <SessionContext.Provider value={session}>
      {session ? <Outlet /> : <Navigate to="/admin/login" />}
    </SessionContext.Provider>
  );
}
