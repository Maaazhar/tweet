"use client"

import { Session, createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";

export default function AuthButtonClient({ session }: { session: Session | null }) {
  const supabase = createClientComponentClient<Database>();
  const router = useRouter()


  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.refresh();
  };

  const handleSignIn = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: `${location.origin}/auth/callback`,
      },
    });
  };

  return session ? (<button className="text-md font-medium text-gray-400 py-1 px-2 rounded-lg transition-all duration-300 ease-in-out hover:shadow-[0px_0px_10px] hover:shadow-red-500 hover:text-red-700" onClick={handleSignOut}>Logout</button>)
    : (<button className="text-sm text-gray-400 py-1 px-2 rounded hover:bg-gray-800 " onClick={handleSignIn}>Login</button>);

}