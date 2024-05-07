import { ChevronLeft, ChevronRight, Search, ShoppingCart } from 'lucide-react'
import React from 'react'

export default function Header() {
    return (
        <nav className='flex flex-col'>
            {/* First Section */}
            <div className='h-[15%] flex justify-end mt-2'>
                <div className='flex gap-x-5 mr-10 items-center'>
                    <p className='cursor-pointer text-sm'>Help</p>
                    <p className='cursor-pointer text-sm'>Orders & Returns</p>
                    <p className='cursor-pointer text-sm'>Hi,John</p>
                </div>
            </div>
            {/* Second Section */}
            <div className='flex-1 mx-10 flex justify-between  items-center mt-5'>
                <h1 className='font-bold text-2xl'>ECOMMERCE</h1>
                <div className='flex gap-x-10'>
                    <p className='text-base font-semibold cursor-pointer'>Categories</p>
                    <p className='text-base font-semibold cursor-pointer'>Sales</p>
                    <p className='text-base font-semibold cursor-pointer'>Clearance</p>
                    <p className='text-base font-semibold cursor-pointer'>New Stock</p>
                    <p className='text-base font-semibold cursor-pointer'>Trending</p>
                </div>

                <div className='flex gap-x-10'>
                    <Search className='cursor-pointer' />
                    <ShoppingCart className='cursor-pointer' />
                </div>
            </div>

            {/* Grey Border */}
            <div className='w-full h-10 bg-[#F4F4F4] mt-3 flex items-center justify-center gap-x-12'>
                <ChevronLeft size={18}/>
                <p className='text-sm font-normal'>Get 10% off on business sign up</p>
                <ChevronRight size={18}/>
            </div>
        </nav>
    )
}
