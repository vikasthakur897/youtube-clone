import { SidebarTrigger } from '@/components/ui/sidebar'
import Link from 'next/link'
import Image from 'next/image'
import React from 'react'
import SearchInput from './search-input'
import AuthButton from '@/modules/auth/ui/components/auth-button'
import ThemeModeToggle from '@/app/(home)/theme'

const HomeNavbar = () => {
  return (
    <nav className='fixed top-0 left-0 right-0 h-16 flex item-center px-2 pr-5 z-50'>
      <div className='flex items-center gap-4 w-full'>
       {/* Menu and Logo */}
       <div className='flex items-center flex-shrink-0'>
        <SidebarTrigger />
        <Link href="/">
          <div className='p-4 flex items-center gap-2'>
          <Image src="/youtube-logo.svg" alt='logo' width={32} height={32} />
          <p className='text-xl font-semibold tracking-tight'>Youtube</p>
          </div>
        </Link>
        </div> 

        {/* Search bar */}
        <div className='flex-1 flex justify-center max-w-[720px] mx-auto'>
          <SearchInput />
        </div>

        <div>
          <ThemeModeToggle />
        </div>

        <div className='flex flex-shrink-0 items-center gap-4'>
            <AuthButton />

        </div>
      </div>
    </nav>
  )
}

export default HomeNavbar
