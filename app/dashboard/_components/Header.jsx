"use client"

import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import React ,{useEffect} from 'react'
import './Header.css'
import { usePathname } from 'next/navigation'

const Header = () => {
  const path = usePathname();

  useEffect(()=>{
    console.log(path);
  },[])
  return (
<div className="nav-links">
      <Image src={'/logo.svg'} width={160}height ={50} alt ="logo"/>
      <ul className='middle'>
        <li className={path === '/dashboard' ?'active':""}>Dashboard</li>
        <li className={path === '/dashboard/questions' ? 'active':""}>Questions</li>
        <li className={path === '/dashboard/upgrade' ?'active':""}>Upgrade</li>
        <li className={path === '/dashboard/work' ?'active':""}>How it works?</li>
      </ul>
      <UserButton/>
    </div>
  )
}

export default Header
