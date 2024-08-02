import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import AuthButtonClient from "../auth-button-client";
import GithubButton from "./github-button";
import LoginButton from "./login-button";
import { redirect } from "next/navigation";
import Image from "next/image";

export const dynamic = "force-dynamic";

export default async function Login() {
  const supabase = createServerComponentClient<Database>({ cookies })
  const { data: { session } } = await supabase.auth.getSession()
  if (session) {
    redirect("/")
  }

  return (
    <div className="flex-1 flex flex-col justify-center items-center">
      <div className="p-5 mb-5 rounded-full shadow-[1px_1px_100px_6px] shadow-cyan-500/50">
        <Image
          src="/logo.png"
          alt="logo"
          width={50} height={50}
        />
      </div>
      <div className="flex flex-col justify-center items-center mb-3">
        <h2 className="text-3xl tracking-wider text-gray-400">Welcome to Tweet</h2>
        <h4 className="text-lg text-gray-500 text-center">Please use one of the following platforms to <br /> Login to  the Tweet.</h4>
      </div>
      <div className="flex gap-2 justify-center items-center">
        <LoginButton provider={"google"} img="/google.png"/>
        {/* <LoginButton provider={"facebook"} img="/facebook.png"/> */}
        <LoginButton provider={"github"} img="/github.png"/>
        {/* <GithubButton /> */}
      </div>
      {/* <AuthButtonClient session={session} /> */}
    </div>
  )
}