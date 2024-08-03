
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import AuthButtonServer from "../../auth-button-server";
import { redirect } from "next/navigation";
import NewTweet from "../../new-tweet";
import Tweets from "../../tweets";
import Image from "next/image";
import Link from "next/link";

export const dynamicParams = true
export const dynamic = "force-dynamic";

interface Props {
  params: {
    user_name: string;
  }
  source: string;
}

export default async function UserDetails({ params }: Props) {
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
        id="top"
        className="sticky top-0 flex justify-between items-center px-4 py-6 border border-gray-800 border-t-0 bg-gray-900/50 backdrop-blur z-10">
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

          <div className="flex flex-col">
            <h1 className="text-gray-100 text-3xl font-bolt">Tweet</h1>
            <p
              className="text-sm text-gray-400"
            >
              Welcome, {session.user.user_metadata.full_name}. <br /> hope you&apos;re having a good day.
            </p>
          </div>
        </div>
        <AuthButtonServer />
      </div>
      <NewTweet user={session.user} />
      {/* <pre>{JSON.stringify(tweets, null, 2)}</pre> */}
      <Tweets tweets={tweets} user={params.user_name}/>
    </div>)
}


