import Image from 'next/image'
import Link from 'next/link'

import { signOut } from '@/auth'
import { Button } from './ui/button'

const Header = () => {
  return (
    <header className="my-10 flex justify-between gap-5">
      <Link href="/">
        <Image src="/icons/logo.svg" alt="logo" width={40} height={40} />
      </Link>

      <form
        action={async () => {
          'use server'

          await signOut()
        }}
        className="mb-10"
      >
        <Button>Logout</Button>
      </form>
    </header>
  )
}
export default Header
