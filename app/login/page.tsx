import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import AuthButtonClient from "../auth-button-client";
import GithubButton from "./github-button";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function Login() {
  const supabase = createServerComponentClient<Database>({ cookies })
  const { data: { session } } = await supabase.auth.getSession()
  if (session) {
    redirect("/")
  }

  return (
    <div className="flex-1 flex flex-col justify-center items-center">
      <div className="flex flex-col justify-center items-center">
        <h2>Login to Tweet</h2>
        <h4>by using one of the following platforms</h4>
      </div>

      <GithubButton />
      {/* <AuthButtonClient session={session} /> */}
    </div>
  )
}