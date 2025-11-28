import { Button } from '@/components/ui/button'
import { UserCircleIcon } from 'lucide-react'
import React from 'react'

const AuthButton = () => {
  return (
    <Button>
        <UserCircleIcon />
        Sign In
    </Button>
  )
}

export default AuthButton
