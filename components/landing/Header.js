/* eslint-disable @next/next/no-html-link-for-pages */

import Link from 'next/link'

export default function Header() {
  return (
    <>
      <div
        className="
          bg-blue-700
          
          grotesk
          absolute
          top-0
          h-7
          w-full 
          text-center
          text-sm
          leading-6
          text-white
          
        "
      >
        Admission Open
        <Link href="/" className="pl-2 underline">
          Connect
        </Link>
      </div>
      <div className="bg-gradient-to-r from-red-400 via-yellow-400 to-green-500 grotesk mt-6 mb-16 flex items-center justify-between py-4 px-4 sm:mx-0 sm:mb-20 sm:px-0 md:px-6 bg-white">
        <div className="flex  items-center ">
          <img
            className="w-16 mx-4"
            src="https://firebasestorage.googleapis.com/v0/b/assign-eefa5.appspot.com/o/Akash%20Gandhar%2Flogot.png?alt=media&token=540fefbf-9a2d-45f3-ae7c-a20dd013c018"
          />

          <Link
            href="/"
            className="xl:inline-block  lg:inline-block hidden align-middle text-4xl font-bold font-serif text-black"
          >
            M J Public School
          </Link>

          <div className="hidden pl-24 align-middle xl:inline-block">
            <Link href="#" className="pr-12 text-xl text-black">
              Events
            </Link>
            <Link href="#" className="pr-12 text-xl text-black">
              Gallery
            </Link>
            <Link href="#" className="text-xl text-black">
              About
            </Link>
          </div>
        </div>
        <div className="flex items-center pr-12">
          <div className=" px-1 text-right ">
            <Link
              className="hover:border-blue-700 border-2  mt-2   items-center px-12 py-3 text-lg font-semibold tracking-tighter text-black"
              href="/login"
            >
              Log in
            </Link>
            <Link
              className="xl:inline-block  hidden hover:scale-105 bg-blue-700   items-center px-8 py-3 text-lg font-semibold tracking-tighter text-white"
              href="#"
            >
              Enquire Now
            </Link>
          </div>
          {/* <button className="pr-12 pl-4">
            <svg
              className="mr-auto inline-block text-black xl:hidden"
              width="33"
              height="50"
              viewBox="0 0 23 30"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0.892578 10.8691H22.1058"
                stroke="black"
                strokeLinecap="square"
                strokeLinejoin="round"
              />
              <path
                d="M0.892578 18.8691H22.1058"
                stroke="black"
                strokeLinecap="square"
                strokeLinejoin="round"
              />
              <path
                d="M22.1066 14.8688H0.893399"
                stroke="black"
                strokeLinecap="square"
                strokeLinejoin="round"
              />
            </svg>
          </button> */}
        </div>
      </div>
    </>
  )
}
