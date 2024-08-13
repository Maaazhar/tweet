import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import AuthButtonServer from "../auth-button-server";
import { redirect } from "next/navigation";
import NewTweet from "../new-tweet";
import Tweets from "../tweets";
import Link from "next/link";
import Footer from "@/app/footer";
import UserDetails from "./user-details";

export const dynamicParams = true
export const dynamic = "force-dynamic";

interface Params {
  params: {
    user: string;
  }
}

export default async function IndividualUser({ params }: Params) {
  const supabase = createServerComponentClient<Database>({ cookies })

  const { data: { session } } = await supabase.auth.getSession()
  if (!session) {
    redirect("/login")
  }

  // Step 1: Fetch the user ID from the profiles table
  const { data: userData } = await supabase
    .from("profiles")
    .select("*")
    .eq("user_name", params.user)
    .single();

  const userId = userData?.id as string;

  // Step 2: Fetch the tweets by the fetched user ID
  const { data: tweetData } = await supabase
    .from("tweets")
    .select("*, author:profiles(*), likes(user_id)")
    .order("created_at", { ascending: false })
    .eq("user_id", userId)

  const totalPost = tweetData?.length;

  const tweets = tweetData?.map(tweet => ({
    ...tweet,
    author: Array.isArray(tweet.author) ? tweet.author[0] : tweet.author,
    user_has_liked_tweet: !!tweet.likes.find((like) => like.user_id === session.user.id),
    likes: tweet.likes.length,
    deleteButton: userId === session.user.id ? true : false
  })) ?? [];

  const user = {
    "id": userData?.id as string,
    "name": userData?.name as string,
    "email": userData?.user_email as string,
    "userName": userData?.user_name as string,
    "avatar": userData?.avatar_url as string,
    "joinedAt": userData?.joined_at as string,
    "loggedInUserID": session.user.id as string,
    "loggedInUserName": session.user.user_metadata.full_name as string,
  }

  return (
    <div className="w-full mx-auto flex flex-col justify-between items-center">
      <div className="sm:max-w-xl w-11/12 flex flex-col justify-center items-between">
        <div
          id="top"
          className="sticky top-0 flex justify-between items-center gap-x-1.5 my-3 px-4 py-2 border border-gray-800 bg-gray-900/85 backdrop-blur z-10">
          <Link
            href="/"
            title="Go back to the home"
            className="p-3 bg-sky-600 text-slate-200 rounded-full transition-all duration-300 ease-in-out hover:shadow-[0px_0px_15px] hover:shadow-sky-600 hover:text-sky-600 hover:bg-transparent">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
              className="w-4 h-4 sm:w-5 sm:h-5"
              fill="currentColor"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round">
              <path
                d="M257.5 445.1l-22.2 22.2c-9.4 9.4-24.6 9.4-33.9 0L7 273c-9.4-9.4-9.4-24.6 0-33.9L201.4 44.7c9.4-9.4 24.6-9.4 33.9 0l22.2 22.2c9.5 9.5 9.3 25-.4 34.3L136.6 216H424c13.3 0 24 10.7 24 24v32c0 13.3-10.7 24-24 24H136.6l120.5 114.8c9.8 9.3 10 24.8 .4 34.3z" />
            </svg>
          </Link>
          <div className="flex flex-col items-center">
            <div className="flex max-[400px]:flex-col max-[400px]:text-center items-center gap-x-3">
              <div className="flex flex-col items-center text-gray-400">
                <Link
                  href="#top"
                  title="Go to top"
                >
                  <h1 className="text-gray-300/80 text-lg max-[350px]:text-md font-bolt capitalize hover:text-sky-400">{userData?.name}</h1>
                </Link>
                <p className="text-sm max-[350px]:text-xs">
                  {totalPost &&
                    totalPost > 1 ? ("Total " + totalPost + " posts.")
                    : totalPost === 1 ? "Only a single post."
                      : "Doesn't post anything."}
                </p>
              </div>
            </div>
          </div>
          <AuthButtonServer />
        </div>
        <div className="border border-gray-800 border-b-0">
          <UserDetails user={user} />
          {session.user.id === user.id && <NewTweet user={session.user} />}
          <Tweets tweets={tweets} />
        </div>
      </div>
      <Footer />
    </div>)
}