
import Image from "next/image";
import addTweet from "./new-tweet-actions";
import { useRef } from "react";

export const dynamic = "force-dynamic";

export default function NewTweet({ user }: { user: User }) {
  const ref = useRef<HTMLFormElement>(null)

  return (
    <form
      ref={ref}
      // action={addTweet}
      action={async (formData) => {
        await addTweet(formData)
        ref.current?.reset()
      }}
      className="border border-gray-800 border-t-0"
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
          className="bg-inherit flex-1 ml-2 px-2 text-gray-100 text-md leading-loose focus:outline-none placeholder-color-gray-500 resize-none"
          placeholder="What is happening..!" />
      </div>
      <div className="flex items-center justify-end mr-5 mb-5">
        <button
          type="submit"
          className="py-1 px-5 text-gray-100 bg-sky-600 rounded-full transition-all duration-300 ease-in-out hover:shadow-[0px_0px_10px] hover:shadow-sky-600 hover:bg-transparent hover:text-sky-500"
        >
          Post
        </button>
      </div>
    </form>
  )
}

