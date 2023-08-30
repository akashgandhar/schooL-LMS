import Head from 'next/head'
import UserState from '../components/context/userState'
import '../styles/globals.css'
import { Analytics } from '@vercel/analytics/react'
// import '../public/custom.js';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title> M J PUBLIC SCHOOL</title>
        <meta name="description" content="Created by akash gandhar" />
        <meta name="viewport" content="width=1024"></meta>
        <link rel="icon" href="/logot.png" />
      </Head>
      <UserState>
        <Component {...pageProps} />
      </UserState>
      <Analytics />
    </>
  )
}

export default MyApp
