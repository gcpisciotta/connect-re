import Link from 'next/link'
import useSWR from 'swr'
import { Auth, Card, Typography, Space, Button, Icon } from '@supabase/ui'
import { supabase } from '../lib/initSupabase'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'


const fetcher = ([url, token]) =>
  fetch(url, {
    method: 'GET',
    headers: new Headers({ 'Content-Type': 'application/json', token }),
    credentials: 'same-origin',
  }).then((res) => res.json())

const Index = () => {
  const router = useRouter()
  const { user, session } = Auth.useUser()
  const { data, error } = useSWR(
    session ? ['/api/getUser', session.access_token] : null,
    fetcher
  )

  const [authView, setAuthView] = useState('sign_in')
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === 'PASSWORD_RECOVERY') setAuthView('update_password')
        if (event === 'USER_UPDATED')
          setTimeout(() => setAuthView('sign_in'), 1000)
        // Send session to /api/auth route to set the auth cookie.
        // NOTE: this is only needed if you're doing SSR (getServerSideProps)!
        fetch('/api/auth', {
          method: 'POST',
          headers: new Headers({ 'Content-Type': 'application/json' }),
          credentials: 'same-origin',
          body: JSON.stringify({ event, session }),
        }).then((res) => res.json())
      }
    )

    return () => {
      authListener.unsubscribe()
    }
  }, [])

  const View = () => {

    const currentTime = Math.floor(Date.now() / 1000);
    if (user && session && session?.expires_at > currentTime) {
      router.push('/home');
      return (
        <Typography.Title level={3}>
          Loading...
        </Typography.Title>
      )
    } else {
      return (
        <Space direction="vertical" size={8}>
          <div>
            <img
              src="https://app.supabase.io/img/supabase-light.svg"
              width="96"
            />
            <Typography.Title level={3}>
              Welcome to ConectRE
            </Typography.Title>
          </div>
          <Auth
            supabaseClient={supabase}
            providers={['google']}
            socialLayout="horizontal"
            socialButtonSize="xlarge"
          />
        </Space>
      )
    }
  }

  if (!isMounted) return null;

  return (
    <div style={{ maxWidth: '420px', margin: '96px auto' }}>
      <Card>
        <View />
      </Card>
    </div>
  )
}

export default Index