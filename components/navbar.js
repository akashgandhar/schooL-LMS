import { signOut } from 'firebase/auth'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { auth } from '../firebase'

export default function Nav() {
  const router = useRouter()
  const signout = () => {
    signOut(auth)
      .then(() => {
        router.push('/login')
        router.reload()
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
      })
  }
  const [navbar, setNavbar] = useState(false)

  return (
    
        <div className='flex justify-center items-center text-5xl font-extrabold font-serif bg-blue-600 p-3'>
          <div className='text-white'>
            M J PUBLIC SCHOOL
          </div>
          
        </div>
  )
}
