import '../styles/globals.css'
import UserState from './context/userState'

function MyApp({ Component, pageProps }) {
  return <UserState><Component {...pageProps} /></UserState>
}

export default MyApp
