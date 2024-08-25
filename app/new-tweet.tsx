import { User, createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Image from "next/image";
// import { useRef } from "react";

export const dynamic = "force-dynamic";

export default function NewTweet({ user }: { user: User }) {

  const addTweet = async (formData: FormData) => {
    "use server"
    const title = String(formData.get("title"));
    const supabase = createServerActionClient<Database>({ cookies });
    await supabase
    .from("tweets")
    .insert({ title, user_id: user.id });

    console.log("submitted");
     // Clear the input field
    //  const tweetTitle = document.getElementById('tweetTitle') as HTMLInputElement;
    //  if (tweetTitle) {
    //   tweetTitle.value = "";
    //  }
  }


  // const ref = useRef<HTMLFormElement>(null)

  // const addTweet = async (formData: FormData) => {
  //   "use server"
  //   const title = String(formData.get("title"));
  //   const supabase = createServerActionClient<Database>({ cookies });
  //   // const { data: { user } } = await supabase.auth.getUser()

  //   // user && 
  //   await supabase.from("tweets").insert({ title, user_id: user.id })

  //   console.log("submitted");
  //   // formData.reset();
  //   // ref.current?.reset();
  // }


  return (
    <form
      action={addTweet}
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
        <textarea
          name="title"
          required
          id="tweetTitle"
          className="bg-inherit flex-1 ml-2 px-2 text-gray-100 text-md leading-loose focus:outline-none placeholder:text-slate-500 resize-none"
          placeholder="What is happening..!" />
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

