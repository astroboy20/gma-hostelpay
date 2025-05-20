"use client";

import { createContext, ReactNode, useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { setAccessToken, setIsRestoring } from "../store/auth-slice";
import { usePathname } from "next/navigation";

type AuthContextType = {
  accessToken: string | null;
  setAccessToken: (token: string | null) => void;
  restoreAccessToken: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({
  children,
  refreshToken,
}: {
  children: ReactNode;
  refreshToken: string | null;
}) => {
const dispatch = useDispatch();
const pathname = usePathname();
const redirectUrl = encodeURIComponent(pathname || "/");
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);
  const isRestoring = useSelector((state: RootState) => state.auth.isRestoring);

  const restoreAccessToken = async () => {
    dispatch(setIsRestoring(true));

    if (!refreshToken) {
      dispatch(setAccessToken(null));
      dispatch(setIsRestoring(false));
      return;
    }

    try {
      const request = await fetch(
        "https://hostel-management-wky9.onrender.com/api/validate-refreshToken",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ refreshToken }),
        }
      );
      if (request.ok) {
        const data = await request.json();
        dispatch(setAccessToken(data?.accessToken));
      } else if (request.status === 401) {
        window.location.href = `/auth/login?returnURL=${redirectUrl}`;
      }
    } catch (error) {
      console.error("Error restoring access token:", error);
      dispatch(setAccessToken(null));
    } finally {
      dispatch(setIsRestoring(false));
    }
  };

  useEffect(() => {
    restoreAccessToken();
  }, [refreshToken]);

  if (isRestoring) {
    return <div className="w-full fixed top-0 left-0 h-screen bg-[#202124]" />;
  }

  return (
    <AuthContext.Provider
      value={{ setAccessToken, accessToken, restoreAccessToken }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
