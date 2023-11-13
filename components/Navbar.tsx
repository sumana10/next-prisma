"use client"

import React from 'react'
import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'

const Navbar = () => {

  const { status } = useSession();

  return (
    <div className='flex justify-between pb-4 border-b mb-4'>
      <div>
        <Link href={''}>
          <h1 className='text-dark text-4xl font-bold tracking-tighter'>Emerging Tech Blog</h1>
        </Link>
        <p className='text-sm'>
          Exploring Tomorrow's Innovation
        </p>
      </div>
      {
        status === 'authenticated' ? (
        <div>
          <button onClick={() => signOut()} className='btn'>Sign out</button>
        </div>
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