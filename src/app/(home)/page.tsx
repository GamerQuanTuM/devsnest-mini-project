"use client"
import React from 'react'
import { useUser } from "@clerk/clerk-react";


export default function Home() {
  const { isLoaded, isSignedIn, user } = useUser();
  if (!isLoaded || !isSignedIn) {
    return null;
  }
  return (
    <div>Home</div>
  )
}
