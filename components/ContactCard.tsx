import React, { useState } from 'react';
import { Cake as CakeIcon, Work as WorkIcon, LinkedIn as LinkedInIcon, Twitter as TwitterIcon, Instagram as InstagramIcon } from '@material-ui/icons';
import { DocumentText as DocumentTextIcon } from '@heroicons/react/outline'
import { Field } from './Field';
import Conversations from './Conversations';
import Avatar from '@mui/material/Avatar';

import { useForm, Controller } from "react-hook-form";
import { supabase } from '../lib/initSupabase'
import { TextField, Button, FormControl, InputLabel, MenuItem, Select, Autocomplete } from '@mui/material';
import { Stack } from '@mui/material';
import { useRouter } from 'next/navigation';
import { TagsManager } from './TagsManager';


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
    <div className="mx-8 my-4 bg-white p-8 rounded-lg h-full">

      <div className="px-4 sm:px-0">
        <Stack direction="row" spacing={4} alignItems="center">
          <div>
            <h1 className="text-xl font-semibold leading-7 text-gray-900">{contact?.name}</h1>
            <div className="flex">
              <h2 className="text-lg font-medium leading-7 text-gray-900">{contact?.position}</h2>
              <h2 className="ml-2 text-lg leading-7 text-gray-900">{contact?.company}</h2>
            </div>
          </div>
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
          <Field label="Email address">{contact?.email}</Field>
          <Field label="Phone">{contact?.phone}</Field>
          <Field label="Social">
            {contact?.linkedin && (
              <a href={contact.linkedin} className="mr-2" style={{ color: "#0077b5" }}>
                <LinkedInIcon />
              </a>
            )}
            {contact?.twitter && (
              <a href={contact.twitter} style={{ color: "#1DA1F2" }}>
                <TwitterIcon />
              </a>
            )}
            {contact?.instagram && (
              <a href={contact.instagram} className="ml-2" style={{ color: "#E1306C" }}>
                <InstagramIcon />
              </a>
            )}
            {!contact?.linkedin && !contact?.twitter && !contact?.instagram && (
              <span>None</span>
            )}
          </Field>


          <Field label="Date of Birth">
            <CakeIcon className="inline text-red-600 mr-1" /> {contact.dob}
          </Field>
          <Field label="How You Met">
            {contact?.date_met}: {contact?.how_met}
          </Field>
          {/* <Field label="Tags">
            <TagsManager contact={contact} />
          </Field> */}
          <Conversations contact={contact} />
        </dl>
      </div>


    </div>
  )
}

export default ContactCard;