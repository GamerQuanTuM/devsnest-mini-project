"use client"
import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { useUser } from "@clerk/clerk-react";
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Category as PrismaCategory } from '@prisma/client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { axiosInstance } from '@/lib/axiosInstance';
import Category from '@/components/Category';

export default function Home() {
  const [categories, setCategories] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [perPage, setPerPage] = useState("6");


  useEffect(() => {
    const getCategory = async () => {
      const { data } = await axiosInstance.get(`/category/paginated?page=${currentPage + 1}&perPage=${perPage}`);
      setCategories(data.message);
      setPageCount(data.pageCount);
    }
    getCategory();
  }, [currentPage, perPage]);

  const handlePageChange = (selectedPage: any) => {
    setCurrentPage(selectedPage.selected);
  };


  const { isLoaded, isSignedIn, user } = useUser();
  if (!isLoaded || !isSignedIn) {
    return null;
  }

  return (
    <div className='w-full h-full flex justify-center items-center'>
      <Card className="w-[34rem] h-[32rem] py-5 rounded-2xl flex flex-col gap-y-3">
        <CardHeader className='h-[25%]'>
          <CardTitle className='text-center text-3xl font-semibold'>Please mark your interest</CardTitle>
          <CardDescription className='text-center text-base font-medium'>We will keep you notified.</CardDescription>
        </CardHeader>
        <CardContent className='flex flex-col gap-y-5 flex-1'>
          <div className='flex-1 mx-5'>
            <h1 className='text-xl font-medium mb-3'>My Saved Interest!</h1>
            {categories.map((category: PrismaCategory) => (
              <Category key={category.id} category={category} user={user} />
            ))}
          </div>
          <div className='w-full px-2 h-[20%]'>
            <ReactPaginate
              pageCount={pageCount}
              onPageChange={handlePageChange}
              containerClassName={'flex justify-center mt-8'}
              pageClassName={'bg-white border border-gray-300 w-11 h-11 mx-1 px-3 py-2 cursor-pointer text-center'}
              activeClassName={'bg-red-600 text-white mx-1 px-3 py-2 cursor-pointer'}
              previousLabel={<ChevronLeft className='mt-3' />}
              nextLabel={<ChevronRight className='mt-3' />}
              marginPagesDisplayed={1}
              breakLabel={'...'}
              breakClassName={'border border-transparent mx-1 px-3 py-2 cursor-pointer'}
              pageRangeDisplayed={2}
              disableInitialCallback={true}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
