import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { TextField, Button, Autocomplete, Stack } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import { supabase } from '../lib/initSupabase';

interface ContactProps {
  id: number;
  photo: FileList;
  name: string;
  email: string;
  phone: string;
  company: string;
  position: string;
  twitter: string;
  linkedin: string;
  instagram: string;
  dob: Date;
  howMet: string;
  dateMet: Date;
  tags: string[];
  user_id: string;
}

interface ContactFormProps {
  mode: string;
  contact?: ContactProps;
}

export const ContactForm: React.FC<ContactFormProps> = ({ mode, contact }) => {
  const router = useRouter();
  const user = supabase.auth.user();
  const { control, handleSubmit } = useForm<ContactProps>();

  const onSubmit = async (formData: ContactProps) => {

    formData.id = contact?.id;
    formData.user_id = user.id;

    const {
      id,
      name,
      email,
      phone,
      company,
      position,
      linkedin,
      twitter,
      instagram,
      howMet: how_met,
      user_id,
      dob,
    } = formData;

    const { data, error } = await supabase
      .from('contacts')
      .upsert({
        id,
        name,
        email,
        phone,
        company,
        position,
        linkedin,
        twitter,
        instagram,
        how_met,
        user_id,
        dob,
      });

    console.log(data, error);

    if (error) {
      console.log("Error creating contact: ", error);
    }

    if (data && data[0]?.id) {
      console.log("Contact created successfully");
      router.push(`/contact/${data[0].id}`);
    }
  };

  return (
    <div className="m-8 bg-white p-8 rounded-lg h-full">
      <h1 className="text-2xl font-bold mb-8">{mode}</h1>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack direction="column" spacing={2} justifyContent="center">
            <Controller
              name="name"
              control={control}
              defaultValue={contact?.name}
              render={({ field }) => <TextField {...field} label="Full Name" />}
            />
            <Controller
              name="email"
              control={control}
              defaultValue={contact?.email}
              render={({ field }) => <TextField {...field} label="Email" />}
            />
            <Controller
              name="phone"
              control={control}
              defaultValue={contact?.phone}
              render={({ field }) => <TextField {...field} label="Phone" />}
            />
            <Controller
              name="company"
              control={control}
              defaultValue={contact?.company}
              render={({ field }) => <TextField {...field} label="Company" />}
            />
            <Controller
              name="position"
              control={control}
              defaultValue={contact?.position}
              render={({ field }) => <TextField {...field} label="Position" />}
            />

            <Controller
              name="twitter"
              control={control}
              defaultValue={contact?.twitter}
              render={({ field }) => <TextField {...field} label="Twitter" />}
            />
            <Controller
              name="linkedin"
              control={control}
              defaultValue={contact?.linkedin}
              render={({ field }) => <TextField {...field} label="LinkedIn" />}
            />
            <Controller
              name="instagram"
              control={control}
              defaultValue={contact?.instagram}
              render={({ field }) => <TextField {...field} label="Instagram" />}
            />
            <Controller
              name="dob"
              control={control}
              defaultValue={contact?.dob ? contact?.dob : null}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Birthday"
                  type="date"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={field.value ? dayjs(field.value).format("YYYY-MM-DD") : ""}
                />
              )}
            />
            <Controller
              name="dateMet"
              control={control}
              defaultValue={contact?.dateMet ? dayjs(contact?.dateMet).toDate() : new Date()}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="When you met"
                  type="date"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={field.value ? dayjs(field.value).format("YYYY-MM-DD") : ""}
                />
              )}
            />
            <Controller
              name="howMet"
              control={control}
              defaultValue={contact?.howMet}
              render={({ field }) => <TextField {...field} label="How You Met" />}
            />
            {/* <Controller
            name="tags"
            control={control}
            defaultValue={contact?.tags}
            render={({ field }) => (
              <Autocomplete
                {...field}
                options={['Tag1', 'Tag2', 'Tag3']} // replace with your actual tags
                renderInput={(params) => <TextField {...params} label="Tags" />}
              />
            )}
          /> */}
            <Button type="submit">Submit</Button>
          </Stack>
        </form>
      </LocalizationProvider>
    </div>
  );
};

export default ContactForm;
