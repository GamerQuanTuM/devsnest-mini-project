"use client"
import React, { useState } from 'react'
import EmailVerifyForm from '@/components/EmailVerifyForm'
import SignInForm from '@/components/SignUpForm'

export default function SignIn() {
  const [stage, setStage] = useState<"form" | "emailVerify">("form")
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [name, setName] = useState<string>("")
  return (
    <div className='h-full w-full flex justify-center items-center'>
      {stage === "form" ? <SignInForm setStage={setStage} setEmail={setEmail} setPassword={setPassword} setName={setName} /> : <EmailVerifyForm email={email} password={password} name={name} />}
    </div>
  )
}
