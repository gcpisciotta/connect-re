import React from 'react'
import Page from '../../components/Page'
import { ContactForm } from '../../components/ContactForm'
import { GetServerSideProps } from 'next'
import { PaperClipIcon } from '@heroicons/react/20/solid'
import { supabase } from '../../lib/initSupabase'
import { User } from '@supabase/supabase-js'

interface ContactPageProps {
  user: User | null;
}


const ContactPage: React.FC<ContactPageProps> = ({user}) => {

  if (!user) return null;

    return (
        <Page user={user}>
        <div>
            <ContactForm mode={'Create'} />
        </div>
        </Page>
    );
}

export default ContactPage;


export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const { user } = await supabase.auth.api.getUserByCookie(req)

  if (!user) {
    // If no user, redirect to index.
    return { props: {}, redirect: { destination: '/', permanent: false } }
  }

  // If there is a user, return it.
  return { props: { user } }
}
