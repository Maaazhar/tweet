// import { User, createServerActionClient } from "@supabase/auth-helpers-nextjs";
// import { cookies } from "next/headers";

// export const addTweet = async (formData: FormData) => {
//   "use server"
  
//   const title = String(formData.get("title"));
//   const supabase = createServerActionClient<Database>({ cookies });
//   const { data: { session } } = await supabase.auth.getSession()
//   await supabase.from("tweets").insert({ title, user_id: session.user.id })

//   console.log("submitted");
//   return { success: true };
// }
