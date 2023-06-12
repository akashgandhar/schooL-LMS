import Head from 'next/head'
import React from 'react'
import Header from '../../components/landing/Header'
import Footer from '../../components/footer'
import StaffDetails from '../../components/staffDetails'

export default function index() {
  return (
    <>
      <Head>
        <title> M J PUBLIC SCHOOL</title>
        <meta name="description" content="Created by akash gandhar" />
        <meta name="viewport" content="width=1024"></meta>
        <link rel="icon" href="/LOGOT.png" />
      </Head>
      <div className="bg-gradient-to-r from-red-400 via-yellow-400 to-green-500">
        <div className="overflow-hidden top-0 fixed w-full z-[100]">
          <Header />
        </div>
        <div className="xl:h-5 sm:h-20 "></div>
        <StaffDetails/>
        <Footer />
      </div>
    </>
  )
}
