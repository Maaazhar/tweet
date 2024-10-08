"use client"

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Image from "next/image";

export default function LoginButton({ provider, img }) {
  // const supabase = createClientComponentClient<Database>()
  const supabase = createClientComponentClient()
  const handleSignIn = async () => {
    await supabase.auth.signInWithOAuth({
      provider: provider,
      options: {
        redirectTo: `${location.origin}/auth/callback`,
      },
    });
  };
  return (
    <button onClick={handleSignIn}
      className="p-2 mx-1 rounded-full transition-all duration-500 ease-in-out hover:shadow-[1px_1px_10px_6px_#0F2F40]  "
      title={"Signin with " + provider + " account"}
    >
      <Image
        src={img}
        alt={provider + " logo"}
        width={40} height={40}
      />
    </button>
  )
}

