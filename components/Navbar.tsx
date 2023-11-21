"use client"

import React from 'react'
import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import Image from 'next/image'
import { useState } from 'react'

const Navbar = () => {

  const { status, data: session } = useSession();

  const [isPopupVisible, setIsPopupVisible] = useState(false)

  return (
    <div className='flex justify-between pb-4 border-b mb-4 relative'>
      <div className=''>
        <Link href={'/'}>
          <h1 className='text-dark text-4xl font-bold tracking-tighter'>Emerging Tech Blog</h1>
        </Link>
        <p className='text-sm'>
          Exploring Tomorrow&apos;s Innovation
        </p>
      </div>
      {
        status === 'authenticated' ? (
          <>

            <div className={`absolute z-30 right-0 top-20 custom-bg-color  p-6 shadow-lg rounded-md flex-col gap-2 text-right min-w-[160px] ${isPopupVisible ? "flex" : "hidden"
              }`} onMouseLeave={() => setIsPopupVisible(false)}>
              <div className='font-bold'>{session?.user?.name}</div>
              <div>{session?.user?.email}</div>
              <Link className="hover:underline" href={"/dashboard"}>Dashboard</Link>
              <Link className="hover:underline" href={"/create-post"}>Create Post</Link>
              <button onClick={() => signOut()} className='btn'>Sign out</button>
            </div>
            <div className='flex gap-2 item-center'>
              <Link href={"./create-post"} className='hidden md:flex gap-2 item-center mr-6 mt-3'>
                <span>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>

                </span>
                <span>Create Post</span>
              </Link>
              <Image
                src={session?.user?.image || ''}
                width={60}
                height={30}
                alt="profile photo"
                className='rounded-full cursor-pointer'
                onMouseEnter={() => setIsPopupVisible(true)}
              />
            </div>
          </>
        ) : (
          <div className='flex items-center'>
            <Link className='btn' href={"/sign-in"}>
              Sign In
            </Link>
          </div>
        )
      }

    </div>
  )
}

export default Navbar