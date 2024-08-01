import { User, createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Image from "next/image";
// import { useRef } from "react";

export const dynamic = "force-dynamic";


// const ref = useRef<HTMLFormElement>(null)
export default function addTweet(formData: FormData) => {
  "use server"
  const title = String(formData.get("title"));
  const supabase = createServerActionClient<Database>({ cookies });
  // const { data: { user } } = await supabase.auth.getUser()

  // user && 
  await supabase.from("tweets").insert({ title, user_id: user.id })

  console.log("submitted");
  // formData.reset();
  // ref.current?.reset();
  return (formData)
}