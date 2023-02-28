import Head from 'next/head'
import UserState from '../components/context/userState'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title> M J PUBLIC SCHOOL</title>
        <meta name="description" content="Created by akash gandhar" />
        <meta name="viewport" content="width=1024"></meta>
        <link rel="icon" href="/LOGOT.png" />
      </Head>
      <UserState>
        <Component {...pageProps} />
      </UserState>
    </>
  )
}

export default MyApp
