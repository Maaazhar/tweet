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
      className="border border-gray-800 mb-3">
      <div className="flex justify-center pt-5 h-60">
        <Image
          src="/userBG.jpeg"
          alt="User Background"
          className="w-11/12 object-cover"
          width={100} height={100} />
      </div>
      
      <Image
        src={user.avatar}
        alt={"Image of" + user.name}
        className="rounded-lg max-[400px]:rounded-t-lg max-[400px]:rounded-b-none transition-all duration-300 ease-in-out  hover:shadow-[0px_0px_15px] hover:shadow-sky-600"
        width={60} height={60} />
      <h1>{user.name}</h1>
      <Link
        href={"/users/" + user.name}
        className="text-sm max-[350px]:text-xs hover:text-sky-500">@{user.userName}
      </Link>
      <Link
        href={"mailto:" + user.email}
        className="text-sm max-[350px]:text-xs hover:text-sky-500">{user.email}
      </Link>
    </div>
  )
}

