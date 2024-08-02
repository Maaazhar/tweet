"use client"
import { useParams } from "next/navigation"

export default function UserDetails() {
  return (
    <div>{useParams().username}</div>
  )
}

