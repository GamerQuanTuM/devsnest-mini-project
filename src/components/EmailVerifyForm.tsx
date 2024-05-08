"use client"
import React from 'react'
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
import { Label } from "@/components/ui/label"
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "@/components/ui/input-otp"
import { useSignUp } from '@clerk/nextjs'

type Props = {
    name: string,
    email: string,
    password: string,
    otp: string | null,
    setOtp: React.Dispatch<React.SetStateAction<string | null>>
}


export default function EmailVerifyForm({ email, password, name, otp, setOtp }: Props) {
    const router = useRouter()
    const { isLoaded, signUp, setActive } = useSignUp();

    const emailName = email.split("@")[0].slice(0, 3)
    const emailExtension = email.split("@")[1]

    const Email = email.split("@")[0].length > 3 ? emailName + "***@" + emailExtension : emailName + "@" + emailExtension

    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        if (!isLoaded) {
            return;
        }
        if (!otp) {
            return;
        }
        try {
            const completeSignUp = await signUp.attemptEmailAddressVerification({
                code: otp
            });
            if (completeSignUp.status !== "complete") {
                console.log(JSON.stringify(completeSignUp, null, 2));
            }
            if (completeSignUp.status === "complete") {
                await setActive({ session: completeSignUp.createdSessionId })
                router.push("/");
            }
        } catch (err: any) {
            console.error(JSON.stringify(err, null, 2));
        }
    }
    return (
        <Card className="w-[28rem] h-[23rem] py-5 rounded-2xl">
            <CardHeader className='flex flex-col gap-y-3'>
                <CardTitle className='text-center'>Create your account</CardTitle>
                <CardDescription className='text-center font-normal text-black'>Enter the 8 digit code you have received on <span className='font-medium'>{Email}</span></CardDescription>
            </CardHeader>
            <CardContent>
                <form className='flex flex-col gap-6'>
                    <div className="grid w-full items-center gap-4">
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="name">Code</Label>
                            <InputOTP maxLength={6} onChange={(value) => setOtp(value)}>
                                <InputOTPGroup className='flex justify-center w-full gap-x-5'>
                                    <InputOTPSlot index={0} />
                                    <InputOTPSlot index={1} />
                                    <InputOTPSlot index={2} />
                                    <InputOTPSlot index={3} />
                                    <InputOTPSlot index={4} />
                                    <InputOTPSlot index={5} />
                                </InputOTPGroup>
                            </InputOTP>
                        </div>
                    </div>
                </form>
            </CardContent>
            <CardFooter className="flex w-full mt-3 flex-col">
                <Button className='w-full' onClick={handleSubmit}>VERIFY</Button>
            </CardFooter>
        </Card>
    )
}
