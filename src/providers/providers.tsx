"use client";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { ReactNode, useEffect, useState } from "react";
import { AuthProvider } from "./states/auth-context";

export function Providers({
  children,
  refreshToken,
}: {
  children: ReactNode;
  refreshToken: string | null;
}) {
  const [cookies, setCookies] = useState(refreshToken);

  const restoreAccessToken = async () => {
    try {
      const request = await fetch(
        "https://hostel-management-wky9.onrender.com/api/validate-refreshToken",
        {
          method: "POST",
          body: JSON.stringify({ refreshToken }),
        }
      );
      if (request.ok) {
        const data = await request.json();
        // dispatch(setAccessToken(data?.accessToken));
      } else if (request.status === 401) {
        window.location.href = "/login";
      }
    } catch (error) {
      console.error("Error restoring access token:", error);
      // dispatch(setAccessToken(null));
    } finally {
      // dispatch(setIsRestoring(false));
    }
  };

  useEffect(() => {
    restoreAccessToken();
  }, []);
  useEffect(() => {
    if (cookies) {
      setCookies(refreshToken);
    }
  }, [refreshToken]);
  return (
    <Provider store={store}>
      <AuthProvider refreshToken={cookies}>{children}</AuthProvider>
    </Provider>
  );
}
