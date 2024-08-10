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
    TweetWithAuthor>(tweets, (currentOptimisticTweets, newTweet) => {
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
  }, [supabase, router]);

  //converting time in to user timezone
  const convertToUserTimeZone = (dateString: string): string => {
    // Parse the date string into a Date object
    const date = new Date(dateString);

    // Get the user's local time components
    const options: Intl.DateTimeFormatOptions = {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    };

    // Use Intl.DateTimeFormat to get the formatted string
    const formattedDate = new Intl.DateTimeFormat('en-US', options).format(date);

    // Return the final string
    // return `posted on ${formattedDate}`;
    return formattedDate;
  };

  // const dateString = "2024-08-06T05:30:09.643539+00:00";
  // const result = convertToUserTimeZone(dateString);
  // console.log(result);



  // Alternative way
  const convertToUserTimeZone1 = (dateString: string): string => {
    const date = new Date(dateString);

    // Get individual components of the date
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const dayOfWeek = date.toLocaleString('en-US', { weekday: 'long' });
    const month = date.toLocaleString('en-US', { month: 'long' });
    const day = date.getDate();
    const year = date.getFullYear();

    // Format hours and minutes to 12-hour format with leading zeros
    const formattedHours = hours % 12 || 12; // Convert 0 to 12 for 12 AM
    const formattedMinutes = minutes.toString().padStart(2, '0');
    const period = hours >= 12 ? 'PM' : 'AM';

    // Format the final string
    return `posted at ${formattedHours}:${formattedMinutes} ${period} on ${dayOfWeek}, ${month} ${day}, ${year}`;
  };

  // const dateString1 = "2024-08-06T05:30:09.643539+00:00";
  // const result1 = convertToUserTimeZone1(dateString1);
  // console.log(result1);

  // Alternative way










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
              <Link
                href={`/users/${tweet.author.user_name}`}
                className="text-slate-400 font-bold capitalize hover:text-sky-500">
                {tweet.author.name}
              </Link>
              <Link
                // href="/user/"
                href={`/users/${tweet.author.user_name}`}
                className="text-sm ml-1 text-slate-500 py-0.5 px-1 rounded hover:bg-gray-800">
                @{tweet.author.user_name}
              </Link>
            </p>
          </div>
          <div className="flex items-start gap-x-1">
            {/* Created on  */}
            <svg xmlns="http://www.w3.org/2000/svg"
              className="text-slate-500 self-center"
              width="15" height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10"></circle>
              <polyline points="12 6 12 12 16 14"></polyline>
            </svg>
            <p className="text-sm text-slate-500">
              {convertToUserTimeZone(tweet.created_at)}</p>
          </div>
        </div>
      </div>
      <div className="ml-2">
        <p className="text-slate-300/85 break-words ">{tweet.title}</p>
        <Likes tweet={tweet} addOptimisticTweet={addOptimisticTweet} />
      </div>
    </div >
  ));
}