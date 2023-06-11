import React from 'react';
import { Auth } from '@supabase/ui'
import { supabase } from '../lib/initSupabase'
import './globals.css'
import { AppProps } from 'next/app'
import { NextComponentType } from 'next'

interface MyAppProps extends AppProps {
  Component: NextComponentType;
}

const MyApp: React.FC<MyAppProps> = ({ Component, pageProps }) => {

  

  return (
    
    <Auth.UserContextProvider supabaseClient={supabase}>
      <main className=''>
      <Component {...pageProps} />
      </main>
    </Auth.UserContextProvider>
  
  )
}

export default MyApp
