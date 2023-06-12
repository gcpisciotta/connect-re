import React, { useEffect, useState } from 'react'
import Page from '../../../components/Page'
import { ContactCard } from '../../../components/ContactCard'
import { Auth } from '@supabase/ui';
import { GetServerSideProps, NextPage } from 'next'
import { supabase } from '../../../lib/initSupabase'
import { PaperClipIcon } from '@heroicons/react/20/solid'
import { User } from '@supabase/supabase-js'
import ReminderFeed from '../../../components/ReminderFeed';

interface ContactPageProps {
  slug: string;
  user: User | null;
}


const ContactPage: NextPage<ContactPageProps> = ({ slug, user }) => {
  const [contact, setContact] = useState<any>();

  const fetchContact = async () => {
    const { data: contacts, error } = await supabase
      .from('contacts')
      .select()
      .eq('id', slug)
      .single();

    if (error) {
      console.error(error);
      return;
    }

    if (contacts) {
      setContact(contacts);
    }
  };

  useEffect(() => {
    if (user) fetchContact();
  }, [slug, user]);

  if (!contact) return null;

  return (
    <Page user={user}>
      <div>
        <main className="lg:pr-96">
          <ContactCard contact={contact} />
        </main>
        <aside className="bg-white lg:fixed lg:bottom-0 lg:right-0 lg:top-0 lg:w-96 lg:overflow-y-auto lg:border-l lg:border-white/5">
          <ReminderFeed contact={contact} />
        </aside>
      </div>
    </Page>
  );
};


export default ContactPage;

export const getServerSideProps: GetServerSideProps = async ({ params, req }) => {
  const slug = params?.slug as string;

  const { user } = await supabase.auth.api.getUserByCookie(req)

  if (!user) {
    // If no user, redirect to index.
    return { props: {}, redirect: { destination: '/', permanent: false } }
  }

  // If there is a user, return the user and the slug.
  return { props: { user, slug } }
}