interface Props {
  user: {
    name: string;
    user_name: string;
    user_email: string;
    avatar_url: string;
  }
}

export default function UserDetails({ user }: Props) {
  return (
    <div>
      <h1>Name: {user?.name}</h1>
      <p>username: {}</p>
      <p>email: {}</p>
    </div>
  )
}

