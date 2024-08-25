"use client";
import { User, createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";

export const dynamic = "force-dynamic";

export default function NewTweetT({ user }: { user: User }) {
  const [tweetTitle, setTweetTitle] = useState<string>("");
  const supabase = createClientComponentClient();
  const router = useRouter();

  // const addTweet = async (formData: FormData) => {
  //   "use server"
  //   const title = String(formData.get("title"));
  //   await supabase
  //   .from("tweets")
  //   .insert({ title, user_id: user.id });

  //   console.log("submitted");
  // }

  const addTweet = async (title: string) => {
    !!title &&  await supabase
    .from("tweets")
    .insert({ title, user_id: user.id });
    router.refresh();
  };

  return (
    <form
      // action={addTweet}
      onSubmit={() => addTweet(tweetTitle)}
      className="border border-gray-800 border-t-0 border-x-0"
    >
      <div className="flex py-5 px-4">
        <div className="h-12 w-12">
          <Image
            src={user.user_metadata.avatar_url}
            alt="user avatar"
            className="rounded-full"
            width={48} height={48} />
        </div>
        <div>
          <span
            id="tweetTitle"
            className="bg-inherit flex-1 ml-2 px-2 text-gray-100 text-md leading-loose focus:outline-none placeholder:text-slate-500 resize-none" ></span>
        </div>
      </div>
      <div className="flex items-center justify-end mr-5 mb-5">
        <button
          type="submit"
          className="py-1 px-5 text-gray-100 bg-sky-600 rounded-full transition-all duration-300 ease-in-out hover:shadow-[0px_0px_15px] hover:shadow-sky-600 hover:bg-transparent hover:text-sky-500"
        >
          Post
        </button>
      </div>
    </form>
  )
}

