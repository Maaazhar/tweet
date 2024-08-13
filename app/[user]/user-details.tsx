import Link from "next/link";
import Image from "next/image";

interface User {
  user: {
    id: string;
    name: string;
    email: string;
    userName: string;
    avatar: string;
    joinedAt: string;
    loggedInUserID: string;
    loggedInUserName: string;
  }
}

export default function UserDetails({ user }: User) {
  //converting time in to user timezone
  const convertToUserTimeZone = (dateString: string): string => {
    // Parse the date string into a Date object
    const date = new Date(dateString);

    // Get the user's local time components
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    };

    // Use Intl.DateTimeFormat to get the formatted string
    const formattedDate = new Intl.DateTimeFormat('en-US', options).format(date);
    return formattedDate;
  };

  return (
    <div
      className="border border-gray-800 border-t-0 border-x-0 p-5">
      <div className="border border-gray-800 p-1 mb-3 text-center text-slate-400 text-md">
        <h4>Hi, <span className="capitalize"> {user.loggedInUserName}</span>, welcome
          {user.id === user.loggedInUserID ?
            " back to your profile."
            : (<span> to the profile of
              <span className="capitalize"> {user.name}. </span>
            </span>)}
        </h4>
      </div>
      <div className="flex justify-center h-48">
        <Image
          src="/userBG.jpg"
          alt="User Background"
          className="object-cover"
          width={600} height={192} />
      </div>
      <div className="w-full flex flex-col items-center pr-2 pb-3 -mt-16">
        <div className="w-fit rounded-full bg-slate-900 p-2">
          <Image
            src={user.avatar}
            alt={"Image of" + user.name}
            className="rounded-full"
            width={100} height={100} />
        </div>
        <h1 className="text-slate-400 text-2xl">{user.name}</h1>
        <Link
          href={"/" + user.userName}
          className="w-fit text-md text-slate-500 hover:text-sky-500">@{user.userName}
        </Link>
        <Link
          href={"mailto:" + user.email}
          className="w-fit text-md text-slate-500 hover:text-sky-500">{user.email}
        </Link>
        <p className="w-fit text-md text-slate-500">Joined at {convertToUserTimeZone(user.joinedAt)}</p>
      </div>
    </div>
  )
}