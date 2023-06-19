import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/initSupabase'
import ReminderForm from './ReminderForm';
import ReminderListItem from './ReminderListItem';

interface ContactCardProps {
  contact?: any;
  showForm?: boolean;
}

export const ReminderFeed: React.FC<ContactCardProps> = ({ contact, showForm=true }) => {
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
      contact_id: contact?.id,
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
    let query = supabase
      .from('reminders')
      .select(`
      id,
      contact_id,
      message,
      reminder_date,
      acknowledged,
      user_id,
      contact: contact_id (
        id,
        name
      )
      `)
      .eq('acknowledged', false)
      .eq('user_id', user?.id)
      .order('reminder_date', { ascending: true });

    // Add contact_id filter only if contact is defined
    if (contact?.id) {
      query = query.eq('contact_id', contact?.id);
    }

  
    const { data: reminders, error } = await query;
  
    if (error) {
      console.error(error);
      return;
    }

    setReminders(reminders);
  };
  

  useEffect(() => {
    if (user && (!contact || (contact && contact?.id))) {
      console.log(contact?.id)
      fetchReminders(contact);
    }
  }, [contact, user]);

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
      <header className="flex items-center justify-between px-4 py-4 sm:px-6 sm:py-6 lg:px-8">
        <h2 className="text-base font-semibold leading-7 text-slate-800">Reminders</h2>
      </header>
      {showForm && (
      <ReminderForm
        handleSetReminder={handleSetReminder}
        reminder={reminder}
        setReminder={setReminder} 
        dateField={dateField}
        setDateField={setDateField}
      />
      )}
      <ul role="list" className="divide-y divide-white/5">
        {reminders.map((item, index) => (
          <ReminderListItem key={index} item={item} handleAcknowledge={handleAcknowledge} contact={contact}/>
        ))}
      </ul>
    </>
  )
}
