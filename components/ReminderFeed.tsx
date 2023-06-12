import React, { use, useState, useEffect } from 'react';
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
import { IconButton } from '@mui/material';
import { Delete as DeleteIcon } from '@material-ui/icons';
import { Check as CheckIcon } from '@material-ui/icons';
interface ContactCardProps {
  contact: any;
}


export const ReminderFeed: React.FC<ContactCardProps> = ({ contact }) => {
  const user = supabase.auth.user();

  const [reminder, setReminder] = useState('');  // State to keep track of reminder text
  const [dateField, setDateField] = useState('');  // State to keep track of reminder text
  const [reminders, setReminders] = useState([]);

  const handleSetReminder = async (duration?: string) => {

    let newDate;

    switch (duration) {
      case "1 day":
        newDate = new Date();
        newDate.setDate(newDate.getDate() + 1);
        break;
      case "1 week":
        newDate = new Date();
        newDate.setDate(newDate.getDate() + 7);
        break;
      case "1 month":
        newDate = new Date();
        newDate.setDate(newDate.getDate() + 30);
        break;
      default:
        newDate = new Date(dateField);
    }

    const new_reminder = {
      contact_id: contact.id,
      message: reminder,
      reminder_date: newDate,
      user_id: user?.id
    }

    const { data, error } = await supabase.from('reminders').upsert(new_reminder);

    console.log(data, error);

    if (error) {
      console.log('Error creating comment:', error);
    }

    if (data) {
      setReminders([...reminders, data[0]]);
      setReminder('');
      fetchReminders(contact);
    }
  }

  const fetchReminders = async (contact) => {

    const { data: reminders, error } = await supabase
      .from('reminders')
      .select()
      .eq('contact_id', contact.id)
      .eq('acknowledged', false)
      .order('reminder_date', { ascending: true });

    if (error) {
      console.error(error);
      return;
    }

    setReminders(reminders);
  };

  useEffect(() => {
    if (user && contact.id) {
      console.log(contact.id)
      fetchReminders(contact);
    }
  }, [contact.id, user]);

  const handleAcknowledge = async (reminder) => {
    const { data, error } = await supabase
      .from('reminders')
      .update({ acknowledged: true })
      .eq('id', reminder.id);

    if (error) {
      console.error(error);
      return;
    }

    fetchReminders(contact);
  }

  return (
    <>
      <header className="flex items-center justify-between border-b border-white/5 px-4 py-4 sm:px-6 sm:py-6 lg:px-8">
        <h2 className="text-base font-semibold leading-7 text-slate-800">Reminders</h2>
      </header>
      <Stack spacing={1} p={2} className="border-b border-white/5">
        <TextField
          label="Create a reminder"
          multiline

          value={reminder}
          onChange={(e) => setReminder(e.target.value)}
          variant="outlined"
        />
        <Stack direction="row" spacing={2} justifyContent="space-between">
          <Button variant="outlined" onClick={() => handleSetReminder("1 day")}>1 Day</Button>
          <Button variant="outlined" onClick={() => handleSetReminder("1 week")}>1 Week</Button>
          <Button variant="outlined" onClick={() => handleSetReminder("1 month")}>1 Month</Button>
        </Stack>
        <div className='w-full text-center text-gray-700 bold'>
          OR
        </div>
        <Stack direction="row" spacing={2} justifyContent="center">
          <TextField
            type="date"
            label="Set a custom date"
            fullWidth
            value={dateField}
            onChange={(e) => setDateField(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <Button variant="outlined" onClick={() => handleSetReminder()}>Set</Button>
        </Stack>
      </Stack>
      <ul role="list" className="divide-y divide-white/5">
        {reminders.map((item, index) => (
          <li key={item} className="px-4 py-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-x-3">
              <h3 className="flex-auto text-sm font-semibold leading-6 ">
                <time
                  dateTime={item.reminder_date}
                  style={{
                    fontWeight: new Date(item.reminder_date) < new Date() ? "bold" : "600",
                    color: new Date(item.reminder_date) < new Date() ? "red" : "#505050",
                  }}
                >
                  {new Date(item.reminder_date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                </time>
              </h3>

              <div className="ml-auto border-2 rounded-3xl">
                <IconButton
                  onClick={() => handleAcknowledge(item)}
                  aria-label="delete conversation"
                  color="success"
                >
                  <CheckIcon />
                </IconButton>
              </div>
            </div>
            <p className="mt-3 text-sm text-gray-500">
              <span className="text-gray-400">
                {item.message}
              </span>
            </p>
          </li>
        ))}

      </ul>
    </>
  )
}

export default ReminderFeed;