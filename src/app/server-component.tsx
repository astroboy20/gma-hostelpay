import { Providers } from "@/providers/providers";
import { cookies } from "next/headers";
import { ReactNode } from "react";

export default async function ServerComponent({
  children,
}: {
  children: ReactNode;
}) {
  const cookieStore = await cookies();
  const refreshToken: string | null =
    cookieStore.get("refreshToken")?.value || "";

  return <Providers refreshToken={refreshToken}>{children}</Providers>;
}
