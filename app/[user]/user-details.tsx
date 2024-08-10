import Link from "next/link";
import Image from "next/image";

interface User {
  user: {
    id: string;
    name: string;
    email: string;
    userName: string;
    avatar: string;
    loggedInUserID: string;
    loggedInUserName: string;
  }
}

export default function UserDetails({ user }: User) {
  return (
    <div
      className="border border-gray-800 border-t-0 border-x-0 p-5">
      <div className="border border-gray-800 p-1 mb-3 text-center text-sky-500 text-md">
        <h4>Hi, <span className="capitalize"> {user.loggedInUserName}</span>, welcome
          {user.id === user.loggedInUserID ?
            " back to your profile."
            : (<span>to the profile of
              <span className="capitalize"> {user.name}. </span>
            </span>)}
        </h4>
      </div>
      <div className="flex flex-col">
        <div className="flex justify-center h-60">
          <Image
            src="/userBG.jpeg"
            alt="User Background"
            className="object-cover"
            width={600} height={100} />
        </div>
        <div className="w-fit rounded-full bg-slate-900 p-2 ml-6 -mt-20">
          <Image
            src={user.avatar}
            alt={"Image of" + user.name}
            className="rounded-full"
            width={100} height={100} />
        </div>
      </div>
      <div className="flex flex-col pl-8 pb-3">
        <h1 className="text-slate-400 text-2xl">{user.name}</h1>
        <Link
          href={"/" + user.userName}
          className="w-fit text-md text-slate-500 hover:text-sky-500">@{user.userName}
        </Link>
        <Link
          href={"mailto:" + user.email}
          className="w-fit text-md text-slate-500 hover:text-sky-500">{user.email}
        </Link>
      </div>
    </div>
  )
}