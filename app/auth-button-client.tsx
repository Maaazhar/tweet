"use client"

import { Session, createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Image from "next/image";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";
import { useRef, useState } from "react";

export default function AuthButtonClient({ session }: { session: Session | null }) {
  if (!session) {
    redirect("/login")
  }
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

  const userName = session.user.user_metadata.user_name ? session.user.user_metadata.user_name : session.user.user_metadata.email.split('@')[0];



  const menuRef = useRef();
  const switchRef = useRef();


  return session && (<div className="relative">

    <button
      className="flex flex-col justify-center items-center text-md font-medium text-slate-500 p-1.5 rounded-full transition-all duration-300 ease-in-out hover:shadow-[0px_0px_15px] hover:shadow-sky-600 hover:text-sky-600 hover:bg-transparent"
      title="Click to open more."
      onClick={profileSwitcher}>
      {/* <div className="flex flex-col gap-y-1">
        <span className="w-6 h-0.5  bg-slate-500"></span>
        <span className="w-6 h-0.5  bg-slate-500"></span>
        <span className="w-6 h-0.5  bg-slate-500"></span>
      </div> */}
      <Image
        src={session.user.user_metadata.avatar_url}
        alt="User profile picture."
        className="size-10 rounded-full"
        width={50} height={50}>

      </Image>
      {/*  */}
    </button>
    {profileClicked &&
      <div 
      className="absolute z-20 mt-3 -ml-12 p-2 flex flex-col gap-1 rounded-md bg-slate-900 border border-slate-800 transition-all duration-300 ease-in-out shadow-[0px_0px_10px] shadow-slate-950 ">
        <Link
          href={"/" + userName}>
          <button
            className="w-full flex gap-2 justify-start items-center text-md font-medium text-slate-500 p-1.5 rounded-md transition-all duration-300 ease-in-out hover:bg-sky-600/10 hover:text-sky-600"
            title="Click to open your profile.">

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
                d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
            </svg>

            <span>Profile</span>
          </button>
        </Link>
        <button
          className="w-full flex gap-2 justify-start items-center text-md font-medium text-slate-500 p-1.5 rounded-md transition-all duration-300 ease-in-out hover:bg-red-600/10 hover:text-red-600"
          title="Click to logout."
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