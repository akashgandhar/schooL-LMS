import UserState from '../components/context/userState'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return <UserState><Component {...pageProps} /></UserState>
}

export default MyApp
