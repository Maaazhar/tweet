import Image from "next/image";
import Link from "next/link";

interface User {
  user: {
    id: string;
    name: string;
    email: string;
    userName: string;
    avatar: string;
  }
}

export default function UserDetails({ user }: User) {
  return (
    <div>
      <Image
        src={user.avatar}
        alt={"Image of" + user.name}
        className="rounded-lg max-[400px]:rounded-t-lg max-[400px]:rounded-b-none transition-all duration-300 ease-in-out  hover:shadow-[0px_0px_15px] hover:shadow-sky-600"
        width={60} height={60} />
      <Link
        href={"mailto:" + user.email}
        className="text-sm max-[350px]:text-xs hover:text-sky-500">{user.email}
      </Link>
      <Link
        href={"/users/" + user.name}
        className="text-sm max-[350px]:text-xs hover:text-sky-500">@{user.userName}
      </Link>
    </div>
  )
}

