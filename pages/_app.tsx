import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Header from '../components/Header'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <div className='max-w-7xl mx-auto'>
        <Header />
      </div>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp