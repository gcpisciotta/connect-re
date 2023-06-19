import React from 'react';
import { IconButton } from '@mui/material';
import { Check as CheckIcon } from '@material-ui/icons';
import Link from 'next/link';

interface ReminderListItemProps {
  item: any;
  handleAcknowledge: (reminder: any) => Promise<void>;
  contact?: any;
  key?: any;
}

export const ReminderListItem: React.FC<ReminderListItemProps> = ({ key, item, handleAcknowledge, contact }) => (
  
  <li >
    <div className="border-t mx-4 py-2 sm:px-6 lg:px-8">
      { (!contact) && (
        <Link href={`/contact/${item.contact?.id}`}>
        <h2 className="text-gray-700">{item?.contact?.name}</h2>
        </Link>
      )
      }
    <div className="flex items-center gap-x-2">
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
    <p className="mt-2 text-sm text-gray-500">
      <span className="text-gray-400">
        {item.message}
      </span>
    </p>
    </div>
  </li>
  
)

export default ReminderListItem;
