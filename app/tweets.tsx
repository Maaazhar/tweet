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


  const handleDelete = async (id: string) => {
    const { data, error } = await supabase
      .from("tweets")
      .delete()
      .eq("id", id)
      .single();

    error && console.log("Error: ", error);
    data && console.log("Deleted data: ", data);
    router.refresh();
  };

  const handleEdit = async (id: string) => {
    router.refresh();
  };

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
      className={`border border-t-0 border-x-0 border-gray-800 p-6 flex flex-col `}>
      <div className="flex justify-between">
        <div className="flex  mb-3">
          <div className="h-12 w-12 max-[380px]:mt-1">
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
                  href={`/${tweet.author.user_name}`}
                  className="text-slate-400 font-bold capitalize hover:text-sky-500">
                  {tweet.author.name}
                </Link>
                <Link
                  href={`/${tweet.author.user_name}`}
                  className="text-sm ml-1 text-slate-500 py-0.5 px-1 rounded hover:bg-gray-800">
                  @{tweet.author.user_name}
                </Link>
              </p>
            </div>
            <div className="flex items-start min:items-center gap-x-1">
              <svg xmlns="http://www.w3.org/2000/svg"
                className="text-slate-500 mt-0.5 min:m-t-0"
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
        <div>
          {tweet.optionButton &&
            <div className="flex flex-col items-end">
              <button className="group size-8 flex justify-center items-center rounded-full transition-all duration-300 ease-in-out hover:shadow-[0px_0px_15px] hover:shadow-sky-500/50 hover:bg-transparent"
                title="Click to see the options.">
                <div className="flex gap-0.5">
                  <span className="size-1 bg-slate-500 rounded-full group-hover:bg-sky-600"></span>
                  <span className="size-1 bg-slate-500 rounded-full group-hover:bg-sky-600"></span>
                  <span className="size-1 bg-slate-500 rounded-full group-hover:bg-sky-600"></span>
                </div>
              </button>
              <div className="mt-4 p-2 flex flex-col gap-1 rounded-md border border-sky-500/20 transition-all duration-300 ease-in-out shadow-[0px_0px_15px] shadow-sky-500/30 ">
                <button
                  className="w-full flex gap-2 justify-start items-center text-md font-medium text-slate-500 p-1.5 rounded-md transition-all duration-300 ease-in-out hover:bg-red-600/10 hover:text-red-600"
                  title="Click to delete this tweet. Once deleted it can't be retrieved."
                  onClick={() => handleDelete(tweet.id)}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-5 ">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                  </svg>
                  <span>Delete</span>
                </button>
                <button
                  className="w-full flex gap-2 justify-start items-center text-md font-medium text-slate-500 p-1.5 rounded-md transition-all duration-300 ease-in-out hover:bg-sky-600/10 hover:text-sky-600"
                  title="Click to edit this tweet."
                  onClick={() => handleEdit(tweet.id)}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-5">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                  </svg>
                  <span>Edit</span>
                </button>
              </div>
            </div>}
        </div>
      </div>
      <div className="ml-2">
        <p className="text-slate-300/85 break-words">{tweet.title}</p>
        <Likes tweet={tweet} addOptimisticTweet={addOptimisticTweet} />
      </div>
    </div >
  ));
}