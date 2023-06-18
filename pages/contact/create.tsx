import React, { use } from 'react'
import Page from '../../components/Page'
import { ContactForm } from '../../components/ContactForm'
import { GetServerSideProps } from 'next'
import { PaperClipIcon } from '@heroicons/react/20/solid'
import { supabase } from '../../lib/initSupabase'
import { User } from '@supabase/supabase-js'
import { Auth } from '@supabase/ui'
import { useState, useEffect } from 'react'

interface ContactPageProps {
  user: User | null;
}


const ContactPage: React.FC<ContactPageProps> = () => {

  const [isMounted, setIsMounted] = useState(false)
  const { user } = Auth.useUser()

  useEffect(() => {
    setIsMounted(true)
  }, [])



  if (!user || !isMounted) return null;

    return (
        <Page user={user}>
        <div>
            <ContactForm mode={'Create'} />
        </div>
        </Page>
    );
}

export default ContactPage;
