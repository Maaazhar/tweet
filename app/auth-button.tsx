"use client"

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

const AuthButton = () => {
  const supabase = createClientComponentClient()
  const handleSignIn = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: "http://localhost:3001/auth/callback"
      }
    }) 
  }
  return (
    <>
      <button onClick={handleSignIn}>Login</button>
    </>
  )
}

export default AuthButton