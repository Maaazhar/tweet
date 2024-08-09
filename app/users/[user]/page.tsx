import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import AuthButtonServer from "../../auth-button-server";
import { redirect } from "next/navigation";
import NewTweet from "../../new-tweet";
import Tweets from "../../tweets";
import Image from "next/image";
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

  const user = {
    "id": userData?.id as string,
    "name": userData?.name as string,
    "email": userData?.user_email as string,
    "userName": userData?.user_name as string,
    "avatar": userData?.avatar_url as string,
  }
  const userId: string = userData?.id as string;
  const userName: string = userData?.name as string;
  const userEmail: string = userData?.user_email as string;
  const userUserName: string = userData?.user_name as string;
  const userAvatar: string = userData?.avatar_url as string;

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
    likes: tweet.likes.length
  })) ?? [];

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
            {/* <Image
              src="/logo.png"
              alt="logo"
              width={50} height={50}
            /> */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
              // width="20" height="20"
              className="w-3 h-3 sm:w-5 sm:h-5"
              fill="currentColor"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round">
              <path
                d="M257.5 445.1l-22.2 22.2c-9.4 9.4-24.6 9.4-33.9 0L7 273c-9.4-9.4-9.4-24.6 0-33.9L201.4 44.7c9.4-9.4 24.6-9.4 33.9 0l22.2 22.2c9.5 9.5 9.3 25-.4 34.3L136.6 216H424c13.3 0 24 10.7 24 24v32c0 13.3-10.7 24-24 24H136.6l120.5 114.8c9.8 9.3 10 24.8 .4 34.3z" />
            </svg>
          </Link>
          <div className="flex flex-col items-center">
            {/* <p className="text-center text-sm text-slate-400">Hi, {session.user.user_metadata.full_name},
              {session.user.id === userId ? " welcome to your profile" : (<br /> + " welcome to the profile of " + userName)}
            </p> */}
            {/* <p className="text-center text-sm text-slate-400 mb-0.5">Hi, {session.user.user_metadata.full_name}, <br />
              {session.user.id === userId ? " welcome back to your profile." : (" welcome to  the profile of " + userName) + "."}
            </p> */}
            <div className="flex max-[400px]:flex-col max-[400px]:text-center items-center gap-x-3">
              {/* <Link href="#top" title="Go to top">
               
              </Link> */}
              <div className="flex flex-col items-center text-gray-400">
                <h1 className="text-gray-300/80 text-lg max-[350px]:text-md font-bolt capitalize hover:text-gray-300/90">{userData?.name}</h1>

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
        <UserDetails user={user} />
        {session.user.id === userId && <NewTweet user={session.user} />}
        <Tweets tweets={tweets} />
      </div>
      <Footer />
    </div>)
}




// BEGIN
//   INSERT INTO public.profiles(id, name, user_name, user_email, avatar_url)
//   VALUES (
//     NEW.id,
//     NEW.raw_user_meta_data->>'name',
//     NEW.raw_user_meta_data->>'user_name',
//     NEW.raw_user_meta_data->>'email',
//     NEW.raw_user_meta_data->>'avatar_url'
//   );
//   RETURN NEW;
// END;


// BEGIN
//   INSERT INTO public.profiles(id, name, user_name, user_email, avatar_url)
//   VALUES (
//     NEW.id,
//     NEW.raw_user_meta_data->>'name',
//     CASE
//       WHEN NEW.raw_user_meta_data ? 'user_name' THEN NEW.raw_user_meta_data->>'user_name'
//       ELSE split_part(NEW.raw_user_meta_data->>'email', '@', 1)
//     END,
//     split_part(NEW.raw_user_meta_data->>'email', '@', 1),
//     NEW.raw_user_meta_data->>'avatar_url'
//   );
//   RETURN NEW;
// END;

