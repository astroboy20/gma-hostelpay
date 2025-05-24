"use client";
import { usePathname, useSearchParams } from "next/navigation";
import { createContext, ReactNode, useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { setAccessToken, setIsRestoring } from "../store/auth-slice";

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
  const pathname = usePathname();
  const dispatch = useDispatch();
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);
  const isRestoring = useSelector((state: RootState) => state.auth.isRestoring);

  const updateAccessToken = (token: string | null) => {
    dispatch(setAccessToken(token));
  };

  const restoreAccessToken = async () => {
    dispatch(setIsRestoring(true));

    if (!refreshToken) {
      dispatch(setAccessToken(null));
      dispatch(setIsRestoring(false));
      return;
    }

    try {
      const response = await fetch(
        "https://hostel-management-wky9.onrender.com/api/validate-refreshToken/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ refreshToken }),
        }
      );
      if (response.ok) {
        const data = await response.json();
        dispatch(setAccessToken(data?.accessToken));
        console.log("Access token restored:", data?.accessToken);
      } else if (response.status === 403) {
        window.location.href = `/login?returnURL=${encodeURIComponent(
          pathname
        )}`;
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
      value={{
        accessToken,
        setAccessToken: updateAccessToken,
        restoreAccessToken,
      }}
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
