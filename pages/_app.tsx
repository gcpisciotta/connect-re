import { Auth } from '@supabase/ui'
import { supabase } from '../lib/initSupabase'
import './../style.css'
import { AppProps } from 'next/app' // Needed for TypeScript

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  
  return (
    <main className='dark'>
      <Auth.UserContextProvider supabaseClient={supabase}>
        <Component {...pageProps} />
      </Auth.UserContextProvider>
    </main>
  )
}

export default MyApp
