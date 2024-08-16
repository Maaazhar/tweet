"use client"

import { Session, createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AuthButtonClient({ session }: { session: Session | null }) {
  const [profileClicked, setProfileClicked] = useState(false);
  const supabase = createClientComponentClient<Database>();
  const router = useRouter()

  const profileSwitcher = () => {
    setProfileClicked((toggle) => !toggle);
  }

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.refresh();
  };

  return session && (<div>

    <button
      className="flex flex-col justify-center items-center text-md font-medium text-slate-500 p-2 rounded-full transition-all duration-300 ease-in-out hover:shadow-[0px_0px_15px] hover:shadow-red-600 hover:bg-transparent hover:text-red-600"
      title="Click to logout."
      onClick={profileSwitcher}>
      {/* <div className="flex flex-col gap-y-1">
        <span className="w-6 h-0.5  bg-slate-500"></span>
        <span className="w-6 h-0.5  bg-slate-500"></span>
        <span className="w-6 h-0.5  bg-slate-500"></span>
      </div> */}
      <Image
        src="/userBG1.jpg"
        alt="User profile picture."
        className="size-10 rounded-full"
        width={50} height={50}>

      </Image>
      {/*  */}
    </button>
    {profileClicked &&
      <div className="absolute z-50 mt-10 p-2 flex flex-col gap-1 rounded-md border border-sky-500/20 transition-all duration-300 ease-in-out shadow-[0px_0px_15px] shadow-sky-500/30 ">
        <Link
        href="/">
          <button
            className="w-full flex gap-2 justify-start items-center text-md font-medium text-slate-500 p-1.5 rounded-md transition-all duration-300 ease-in-out hover:bg-sky-600/10 hover:text-sky-600"
            title="Click to edit this tweet.">

            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-5">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
            </svg>
            <span>Profile</span>
          </button>
        </Link>
        <button
          className="w-full flex gap-2 justify-start items-center text-md font-medium text-slate-500 p-1.5 rounded-md transition-all duration-300 ease-in-out hover:bg-red-600/10 hover:text-red-600"
          title="Click to delete this tweet. Once deleted it can't be retrieved."
          onClick={handleSignOut}>
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
          <span>Logout</span>
        </button>
      </div>
    }
  </div>);

}