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

  return session ? (<div>

    <button
      className="flex flex-col justify-center items-center text-md font-medium text-slate-500 p-2 rounded-full transition-all duration-300 ease-in-out hover:shadow-[0px_0px_15px] hover:shadow-red-600 hover:bg-transparent hover:text-red-600"
      title="Click to logout."
      onClick={handleSignOut}>
      {/* <div className="flex flex-col gap-y-1">
        <span className="w-6 h-0.5  bg-slate-500"></span>
        <span className="w-6 h-0.5  bg-slate-500"></span>
        <span className="w-6 h-0.5  bg-slate-500"></span>
      </div> */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="size-6">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9" />
      </svg>
    </button>
  </div>)
    : (<button className="text-sm text-gray-400 py-1 px-2 rounded hover:bg-gray-800 " onClick={handleSignIn}>Login</button>);

}