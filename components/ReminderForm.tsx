import React, { useState } from 'react';
import { TextField, Button, Stack } from '@mui/material';

interface ReminderFormProps {
  handleSetReminder: (duration?: string) => Promise<void>;
}

export const ReminderForm: React.FC<ReminderFormProps> = ({ handleSetReminder }) => {
  const [reminder, setReminder] = useState('');  
  const [dateField, setDateField] = useState('');

  return (
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
  )
}

export default ReminderForm;
