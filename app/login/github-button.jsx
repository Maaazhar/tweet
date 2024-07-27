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
        redirectTo: "http://localhost:3000/auth/callback",
      },
    });
  };
  return (
    <button onClick={handleSignIn}
    className="hover:bg-gray-800 p-3 rounded-lg"
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

