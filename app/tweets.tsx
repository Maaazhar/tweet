"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Likes from "./likes";
import { useEffect, useOptimistic } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

export default function Tweets({ tweets }: { tweets: TweetWithAuthor[] }) {
  const [optimisticTweets, addOptimisticTweet] = useOptimistic<
    TweetWithAuthor[],
    TweetWithAuthor
  >(tweets, (currentOptimisticTweets, newTweet) => {
    const newOptimisticTweets = [...currentOptimisticTweets];
    const index = newOptimisticTweets.findIndex(
      (tweet) => tweet.id === newTweet.id
    );
    newOptimisticTweets[index] = newTweet;
    return newOptimisticTweets;
  });

  const supabase = createClientComponentClient()
  const router = useRouter()
  useEffect(() => {
    const channel = supabase.channel("realtime tweet").on("postgres_changes", {
      event: "*",
      schema: "public",
      table: "tweets"
    }, (payload) => {
      router.refresh()
    }).subscribe();
    return () => {
      supabase.removeChannel(channel)
    }
  }, [supabase, router])

  return optimisticTweets.map((tweet, i) => (
    <div key={tweet.id}
      className={`border border-gray-800 p-6 flex flex-col ${i === 0 ? ` ` : `border-t-0`}`}>
      <div className="flex items-center mb-3">
        <div className="h-12 w-12">
          <Image
            src={tweet.author.avatar_url}
            alt="tweeter"
            className="rounded-full"
            width={48} height={48} />
        </div>
        <div className="ml-4 ">
          <div className="mb-1">
            <p>
              <span className="text-slate-400 font-bold">
                {tweet.author.name}
              </span>
              <Link
                // href="/user/"
                href={`/users/${tweet.author.user_name}`}
                className="text-sm ml-3 text-slate-500 py-1 px-2 rounded hover:bg-gray-800">
                @{tweet.author.user_name}
              </Link>
            </p>
            {/* <time dateTime={tweet.created_at}>{tweet.created_at}</time> */}
          </div>
          <div>
            <p className="text-sm text-slate-500">Created at {tweet.created_at}</p>
          </div>
        </div>
      </div>
      <div className="ml-2">
        <p className="text-slate-300/85">{tweet.title}</p>
        <Likes tweet={tweet} addOptimisticTweet={addOptimisticTweet} />
      </div>
    </div >
  ));
}