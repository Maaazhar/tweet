import Link from "next/link";
import Image from "next/image";

interface LoggedInUser {
  loggedInUser: string;
}
interface User {
  user: {
    id: string;
    name: string;
    email: string;
    userName: string;
    avatar: string;
  }
}

export default function UserDetails({ user }: User, loggedInUser: LoggedInUser) {
  return (
    <div
      className="border border-gray-800 border-t-0 border-x-0 ">
      <div className="flex flex-col">
        <div className="flex justify-center p-5 h-60">
          <Image
            src="/userBG.jpeg"
            alt="User Background"
            className="object-cover"
            width={600} height={100} />
        </div>
        <div className="w-fit rounded-full bg-slate-900 p-2 ml-10 -mt-20">
          <Image
            src={user.avatar}
            alt={"Image of" + user.name}
            className="rounded-full"
            width={100} height={100} />
        </div>
      </div>
      <div className="flex flex-col px-10 pb-5">
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