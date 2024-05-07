import React from 'react'
import { useRouter } from 'next/navigation'

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

type Props = {
    setStage: React.Dispatch<React.SetStateAction<"form" | "emailVerify">>,
    setEmail: React.Dispatch<React.SetStateAction<string>>,
    setPassword: React.Dispatch<React.SetStateAction<string>>,
    setName: React.Dispatch<React.SetStateAction<string>>,
}

export default function SignInForm({ setStage, setEmail, setName, setPassword }: Props) {
    const router = useRouter()
    return (
        <Card className="w-[30rem] h-[32rem] py-5 rounded-2xl">
            <CardHeader>
                <CardTitle className='text-center'>Create your account</CardTitle>
            </CardHeader>
            <CardContent>
                <form className='flex flex-col gap-6'>
                    <div className="grid w-full items-center gap-4">
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="name">Name</Label>
                            <Input type='text' id="name" placeholder="Enter your name" onChange={(e) => setName(e.target.value)} />
                        </div>
                    </div>
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
                <Button className='w-full' onClick={() => setStage("emailVerify")}>CREATE ACCOUNT</Button>
                <p className='text-sm font-normal'>Have an account? <span onClick={() => router.push("/sign-in")} className='text-base font-medium cursor-pointer'>Login</span></p>
            </CardFooter>
        </Card>

    )
}
