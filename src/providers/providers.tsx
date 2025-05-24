"use client";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { ReactNode, useEffect, useState } from "react";

export function Providers({
  children,
  refreshToken,
}: {
  children: ReactNode;
  refreshToken: string | null;
}) {
  const [cookies, setCookies] = useState(refreshToken);

  useEffect(() => {
    if (cookies) {
      setCookies(refreshToken);
    }
  }, [refreshToken]);
  return <Provider store={store}>{children}</Provider>;
}
