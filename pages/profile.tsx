import Link from 'next/link'
import { GetServerSideProps, NextPage } from 'next'
import { Card, Typography, Space } from '@supabase/ui'
import { supabase } from '../lib/initSupabase'
import { User } from '@supabase/supabase-js'
import { Auth } from '@supabase/ui'

interface ProfileProps {
  user: User | null
}

const Profile: NextPage<ProfileProps> = () => {

  const { user, session } = Auth.useUser()


  return (
    <div style={{ maxWidth: '420px', margin: '96px auto' }}>
      <Card>
        <Space direction="vertical" size={6}>
          <Typography.Text>You're signed in</Typography.Text>
          <Typography.Text strong>Email: {user?.email}</Typography.Text>
          <Typography.Text type="success">
            User data retrieved server-side (from Cookie in getServerSideProps):
          </Typography.Text>

          <Typography.Text>
            <pre>{JSON.stringify(user, null, 2)}</pre>
          </Typography.Text>

          <Typography.Text>
            <Link href="/">Static example with useSWR</Link>
          </Typography.Text>
        </Space>
      </Card>
    </div>
  )
}

export default Profile
