"use client"

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function SignUp() {
  const router = useRouter()
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  return (
    <div className='h-full w-full flex justify-center items-center'>
      <Card className="w-[30rem] h-[32rem] py-5 rounded-2xl">
        <CardHeader>
          <CardTitle className='text-center'>Welcome back to ECOMMERCE</CardTitle>
          <CardDescription className='text-center font-normal text-black'>The next gen business marketplace</CardDescription>
        </CardHeader>
        <CardContent>
          <form className='flex flex-col gap-6'>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input type='email' id="email" placeholder="Enter your email" onChange={(e) => setEmail(e.target.value)} />
              </div>
            </div>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <Input type='password' id="password" placeholder="Enter your password" onChange={(e) => setPassword(e.target.value)} />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex w-full mt-3 flex-col gap-y-4">
          <Button className='w-full'>LOGIN</Button>
          <p className='text-sm font-normal'>Don&apos;t have an Account? <span onClick={() => router.push("/sign-up")} className='text-base font-medium cursor-pointer'>Sign Up</span></p>
        </CardFooter>
      </Card>
    </div>
  )
}
