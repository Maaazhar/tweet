import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import AuthButtonServer from "./auth-button-server";
import { redirect } from "next/navigation";
import NewTweet from "./new-tweet";
import Likes from "./likes";
import Tweets from "./tweets";
import Image from "next/image";
import Link from "next/link";
import Footer from "./footer";

export const dynamic = "force-dynamic";

export default async function Home() {
  const supabase = createServerComponentClient<Database>({ cookies })

  const { data: { session } } = await supabase.auth.getSession()
  if (!session) {
    redirect("/login")
  }
  
  const { data: tweetData } = await supabase.from("tweets").select("*, author: profiles(*), likes(user_id)").order("created_at", { ascending: false })

  const tweets = tweetData?.map(tweet => ({
    ...tweet,
    author: Array.isArray(tweet.author) ? tweet.author[0] : tweet.author,
    user_has_liked_tweet: !!tweet.likes.find((like) => like.user_id === session.user.id),
    likes: tweet.likes.length,
    optionButton: false
  })) ?? []

  return (
    <div className="w-full mx-auto flex flex-col justify-between items-center">
      <div className="sm:max-w-xl w-11/12 flex flex-col justify-center items-between">
        <div
          id="top"
          className="sticky top-0 flex justify-between items-center my-3 px-4 py-2 border border-gray-800 bg-gray-900/85 backdrop-blur z-10">
          <div
            className="flex gap-4 justify-around items-center">
            <Link
              href="#top"
              className="p-2 rounded-full shadow-[0px_0px_10px] shadow-cyan-500/50 hover:shadow-[0px_0px_15px] hover:shadow-cyan-500/50">
              <Image
                src="/logo.png"
                alt="logo"
                width={50} height={50}
              />
            </Link>

            <div className="flex flex-col  text-center sm:text-left">
              <h1 className="text-slate-400 text-3xl max-[400px]:text-2xl font-bolt">Tweet</h1>
              <p
                className="text-sm max-[400px]:text-xs text-gray-400"
              >
                Hi, {session.user.user_metadata.full_name}. <br /> hope you&apos;re having a good day.
              </p>
            </div>
          </div>
          <AuthButtonServer />
        </div>
        <div className="border border-gray-800 border-b-0">
          <NewTweet user={session.user} />
          <Tweets tweets={tweets} />
        </div>
      </div>
      <Footer />
    </div>)
}
