// "use client"
// import { User } from "@supabase/auth-helpers-nextjs";
// import { addTweet } from "./new-tweet-add-tweet";
// import Image from "next/image";

// export const dynamic = "force-dynamic";

// export default function NewTweetUP({ user }: { user: User }) {
//   const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();

//     const formData = new FormData(event.target as HTMLFormElement);
//     const response = await addTweet(formData);

//     // Clear the input field based on the server's response
//     if (response.success) {
//       const tweetTitleInput = document.getElementById('tweetTitle') as HTMLInputElement;
//       if (tweetTitleInput) {
//         tweetTitleInput.value = '';
//       }
//     }
//   };


//   return (
//     <form
//       // ref={ref}
//       onSubmit={handleSubmit}
//       className="border border-gray-800 mb-3"
//     >
//       <div className="flex py-5 px-4">
//         <div className="h-12 w-12">
//           <Image
//             src={user.user_metadata.avatar_url}
//             alt="user avatar"
//             className="rounded-full"
//             width={48} height={48} />
//         </div>
//         <textarea
//           name="title"
//           required
//           id="tweetTitle"
//           className="bg-inherit flex-1 ml-2 px-2 text-gray-100 text-md leading-loose focus:outline-none placeholder:text-slate-500 resize-none"
//           placeholder="What is happening..!" />
//       </div>
//       <div className="flex items-center justify-end mr-5 mb-5">
//         <button
//           type="submit"
//           className="py-1 px-5 text-gray-100 bg-sky-600 rounded-full transition-all duration-300 ease-in-out hover:shadow-[0px_0px_15px] hover:shadow-sky-600 hover:bg-transparent hover:text-sky-500"
//         >
//           Post
//         </button>
//       </div>
//     </form>
//   )
// }

