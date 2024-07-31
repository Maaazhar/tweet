"use client"

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Image from "next/image";

export default function GithubButton() {
  // const supabase = createClientComponentClient<Database>()
  const supabase = createClientComponentClient()
  const handleSignIn = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: `${location.origin}/auth/callback`,
      },
    });
  };
  return (
    <button onClick={handleSignIn}
    className="p-3 rounded-lg transition-all duration-500 ease-in-out hover:shadow-[1px_1px_10px_6px_#0F2F40]  "
    title="Signin with github"
    >
      <Image
      src="/github-mark-white.png"
      alt="github logo"
      width={35} height={35}
      />
    </button>
  )
}

