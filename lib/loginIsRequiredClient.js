import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { authConfig } from "./auth";

export async function loginIsRequiredClient() {
  if (typeof window !== "undefined") {
    const session = useSession();
    const router = useRouter;
    if (!session) router.push("/login");
  }
}
