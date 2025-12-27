"use client";

import { ReactNode, useEffect } from "react";
import { Session } from "@/features/auth/type";
import { useSessionStore } from "@/features/auth/store/session.store";

const CustomSessionProvider = ({
  session,
  children,
}: {
  session: Session;
  children: ReactNode;
}) => {
  const setSession = useSessionStore((s) => s.setSession);

  useEffect(() => {
    setSession(session);
  }, [session, setSession]);

  return <>{children}</>;
};

export default CustomSessionProvider;
