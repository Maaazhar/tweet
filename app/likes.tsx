"use client"

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useRouter } from "next/navigation"

export default function Likes({ tweet, addOptimisticTweet }: { tweet: TweetWithAuthor; addOptimisticTweet: (newTweet: TweetWithAuthor) => void }) {
  const router = useRouter()
  const handleLikes = async () => {
    const supabase = createClientComponentClient<Database>()
    const { data: { user } } = await supabase.auth.getUser();

    if (user) {
      if (tweet.user_has_liked_tweet) {
        addOptimisticTweet({
          ...tweet,
          likes: tweet.likes - 1,
          user_has_liked_tweet: !tweet.user_has_liked_tweet,
        });
        await supabase.from("likes").delete().match({ user_id: user.id, tweet_id: tweet.id })
      }
      else {
        addOptimisticTweet({
          ...tweet,
          likes: tweet.likes + 1,
          user_has_liked_tweet: !tweet.user_has_liked_tweet,
        });
        await supabase.from("likes").insert({ user_id: user.id, tweet_id: tweet.id })
      }
      router.refresh();
    }
  }
  return (
    <button
      onClick={handleLikes}
      className="group flex items-center justify-center gap-x-2 mt-2 -translate-x-2 px-2 py-1 rounded hover:bg-gray-800 z-0"
      title={tweet.user_has_liked_tweet ? "Click to unlike." : "Click to like."}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className={`size-[1.15rem] group-hover:stroke-red-600 ${tweet.user_has_liked_tweet ? "fill-red-600 stroke-red-600" : "fill-none stroke-gray-500"}`}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
      </svg>

      <span className={` text-md group-hover:text-red-600 ${tweet.user_has_liked_tweet ? "text-red-600" : "text-gray-500"}`}>
        {tweet.likes}
      </span>
    </button>
  )
}
