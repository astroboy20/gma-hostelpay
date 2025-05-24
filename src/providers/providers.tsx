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
  console.log("provider initialized with refreshToken:", refreshToken);
  const [cookies, setCookies] = useState(refreshToken);
  const restoreAccessToken = async () => {
    // dispatch(setIsRestoring(true));

    // if (!refreshToken) {
    //   dispatch(setAccessToken(null));
    //   dispatch(setIsRestoring(false));
    //   console.log("No refresh token available");
    //   return;
    // }

    // dispatch(setIsRestoring(true));
    try {
      const response = await fetch(
        "https://hostel-management-wky9.onrender.com/api/validate-refreshToken/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            refreshToken, // Send the refresh token in the body
          }),
        }
      );
      if (response.ok) {
        const data = await response.json();
        // dispatch(setAccessToken(data?.access));
        console.log(data);
      } else if (response.status === 403) {
        // window.location.href = "/login";
        console.log("401");
      }
    } catch (error) {
      console.error("Error restoring access token:", error);
      // dispatch(setAccessToken(null));
    }
  };

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
