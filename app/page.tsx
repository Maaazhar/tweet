import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import AuthButtonServer from "./auth-button-server";
import { redirect } from "next/navigation";
import NewTweet from "./new-tweet";
import Likes from "./likes";
import Tweets from "./tweets";
import Image from "next/image";

export const dynamic = "force-dynamic";

export default async function Home() {
  const supabase = createServerComponentClient<Database>({ cookies })

  const { data: { session } } = await supabase.auth.getSession()
  if (!session) {
    redirect("/login")
  }

  const { data } = await supabase.from("tweets").select("*, author: profiles(*), likes(user_id)").order("created_at", { ascending: false })

  const tweets = data?.map(tweet => ({
    ...tweet,
    author: Array.isArray(tweet.author) ? tweet.author[0] : tweet.author,
    user_has_liked_tweet: !!tweet.likes.find((like) => like.user_id === session.user.id),
    likes: tweet.likes.length
  })) ?? []

  return (
    <div className="w-full max-w-xl mx-auto">
      <div
        className="flex justify-between items-center px-4 py-6 border border-gray-800 border-t-0">
        <div
          className="flex gap-3 justify-around items-center">

          <Image
            src="/logo.png"
            alt="logo"
            width={50} height={50}
          />
          <h1 className="text-gray-100 text-3xl font-bolt">Tweet</h1>
        </div>
        <AuthButtonServer />
      </div>
      <NewTweet user={session.user} />
      {/* <pre>{JSON.stringify(tweets, null, 2)}</pre> */}
      <Tweets tweets={tweets} />
    </div>)
}
