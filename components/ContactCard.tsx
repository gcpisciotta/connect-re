import React, { useState } from 'react';
import { Cake as CakeIcon, Work as WorkIcon, LinkedIn as LinkedInIcon, Twitter as TwitterIcon } from '@material-ui/icons';
import { DocumentText as DocumentTextIcon } from '@heroicons/react/outline'
import { Field } from './Field';
import Conversations from './Conversations';
import Avatar from '@mui/material/Avatar';

import { useForm, Controller } from "react-hook-form";
import { supabase } from '../lib/initSupabase'
import { TextField, Button, FormControl, InputLabel, MenuItem, Select, Autocomplete } from '@mui/material';
import { Stack } from '@mui/material';
import { useRouter } from 'next/navigation';

interface ContactCardProps {
  contact: any;
}




export const ContactCard: React.FC<ContactCardProps> = ({ contact }) => {
  const router = useRouter();

  function setEditMode() {
    router.push(`/contact/${contact.id}/edit`)
  }

  const deleteContact = async (id: number) => {

    if (!window.confirm('Are you sure you want to delete this contact?')) {
      return;
    }

    const { data, error } = await supabase
      .from('contacts')
      .delete()
      .match({ id });

    if (error) {
      console.error(error);
      return;
    }

    if (data) {
      console.log('Contact deleted successfully');
      router.push('/home');
    }
  }

  return (
    <div className="m-8 bg-white p-8 rounded-lg h-full">

      <div className="px-4 sm:px-0">
        <Stack direction="row" spacing={4} alignItems="center">
          <h1 className="text-xl font-semibold leading-7 text-gray-900">{contact?.name}</h1>
          <div className="flex-grow" /> {/* Empty div to push delete button to the right */}
          <Button 
            onClick={setEditMode}
            color="primary"
            variant="contained"
          >
            Edit
          </Button>
          <Button
            onClick={() => deleteContact(contact.id)}
            variant="contained"
            color="secondary" // Set the button color to red
          >
            Delete
          </Button>
          
        </Stack>


      </div>
      <div className="mt-6 border-t border-gray-100">
        <dl className="divide-y divide-gray-100">
          <Field label="Email address">{contact.email}</Field>
          <Field label="Phone">{contact.phone}</Field>
          <Field label="Company">{contact.company}</Field>
          <Field label="Position">{contact.position}</Field>
          <Field label="Social">
            <a href={contact.linkedin} className="mr-2 text-blue-600"><LinkedInIcon /></a>
            <a href={contact.twitter} className="text-blue-600"><TwitterIcon /></a>
          </Field>
          <Field label="Date of Birth">
            <CakeIcon className="inline text-red-600 mr-1" /> {contact.dob}
          </Field>
          <Field label="How You Met">
            {contact.dateMet}: {contact.how_met}
          </Field>
          <Conversations contact={contact} />
        </dl>
      </div>


    </div>
  )
}

export default ContactCard;