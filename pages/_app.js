import Head from 'next/head'
import UserState from '../components/context/userState'
import '../styles/globals.css'
import { Analytics } from '@vercel/analytics/react'
import NextNProgress from 'nextjs-progressbar'

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
        <NextNProgress
          color="#fff"
          startPosition={0.3}
          stopDelayMs={200}
          height={3}
          showOnShallow={true}
        />
        <Component {...pageProps} />
      </UserState>
      <Analytics />
    </>
  )
}

export default MyApp
