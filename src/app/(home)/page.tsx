"use client"
import React, { useEffect, useState } from 'react'
import { useUser } from "@clerk/clerk-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { axiosInstance } from '@/lib/axiosInstance';


export default function Home() {

  const [page, setPage] = useState("1")
  const [perPage, setPerPage] = useState("6")

  useEffect(() => {
    const getCategory = async () => {
      const { data } = await axiosInstance.get(`/category/paginated?page=${page}&perPage=${perPage}`)
      console.log(data.message)
    }

    getCategory()
  }, [])

  const { isLoaded, isSignedIn, user } = useUser();
  if (!isLoaded || !isSignedIn) {
    return null;
  }
  return (
    <div className='w-full h-full flex justify-center items-center'>
      <Card className="w-[30rem] h-[32rem] py-5 rounded-2xl">
        <CardHeader>
          <CardTitle className='text-center text-3xl font-semibold'>Please mark your interest</CardTitle>
          <CardDescription className='text-center text-base font-medium'>We will keep you notified.</CardDescription>
        </CardHeader>
        <CardContent>

        </CardContent>
      </Card>

    </div>
  )
}
