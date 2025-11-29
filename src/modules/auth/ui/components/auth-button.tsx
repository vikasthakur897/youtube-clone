import { Button } from '@/components/ui/button'
import { UserCircleIcon } from 'lucide-react'
import React from 'react'

const AuthButton = () => {
  return (
    <Button variant="outline" size="lg" className='px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-500 border-gray-500/2 rounded-full shadow-none'>
        <UserCircleIcon />
        Sign In
    </Button>
  )
}

export default AuthButton
