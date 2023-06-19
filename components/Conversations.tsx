import { Fragment, useState, ChangeEvent, FormEvent, useEffect } from 'react'
import { CheckCircleIcon } from '@heroicons/react/24/solid'
import {
  FaceFrownIcon,
  FaceSmileIcon,
  FireIcon,
  HandThumbUpIcon,
  HeartIcon,
  PaperClipIcon,
  XMarkIcon,
} from '@heroicons/react/20/solid'
import { Listbox, Transition } from '@headlessui/react'
import { supabase } from '../lib/initSupabase'
import { Button } from '@mui/material';
import { IconButton } from '@mui/material';
import { Delete as DeleteIcon } from '@material-ui/icons';


interface Activity {
  id: number;
  type: string;
  person: {
    name: string;
    imageUrl?: string;
  };
  date: string;
  dateTime: string;
  comment?: string;
}

function classNames(...classes: (false | null | undefined | string)[]) {
  return classes.filter(Boolean).join(' ');
}

interface ConversationProps {
  contact: any;
}

interface Comment {
  id?: number;
  user_id: string;
  contact_id: string;
  notes: string;
}

const Conversations: React.FC<ConversationProps> = ({ contact }) => {
  const user = supabase.auth.user();
  const [comment, setComment] = useState('');
  const [conversations, setConversations] = useState<any>(
    contact.conversations.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
  );  
  

  const handleCommentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };

  const handleCommentSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newComment: Comment = {
      notes: comment,
      user_id: user?.id,
      contact_id: contact.id,
    };

    const { data, error } = await supabase.from('conversations').upsert(newComment);

    console.log(data, error);

    if (error) {
      console.log('Error creating comment:', error);
    }

    if (data && data.length) {
      setConversations([data[0], ...conversations]);
      setComment('');
    }

  };

  const handleDeleteConversation = async (conversationId: number) => {
    const { data, error } = await supabase
      .from('conversations')
      .delete()
      .eq('id', conversationId);

    if (error) {
      console.log('Error deleting conversation:', error);
      return;
    }

    // Remove the deleted conversation from the local state
    setConversations(conversations.filter(conversation => conversation.id !== conversationId));
  };

  return (
    <>
      <div className="py-2">
        {/* New comment form */}
        <div className="mb-3 flex gap-x-3">

          <form onSubmit={handleCommentSubmit} className="relative flex-auto">
            <div className="overflow-hidden rounded-lg pb-12 shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-gray-300">
              <textarea
                rows={3}
                name="comment"
                id="comment"
                className="p-4 block w-full resize-none border-0 bg-transparent py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-0 ring-gray-300 sm:text-sm sm:leading-6 border-b"
                placeholder="Add your comment..."
                value={comment}
                onChange={handleCommentChange}
              />
            </div>

            <div className="absolute inset-x-0 bottom-0 flex justify-between py-2 pl-3 pr-2">
              <Button
                color="primary"
                variant="outlined"

                type="submit"
                className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
              >
                Log Conversation
              </Button>
            </div>
          </form>
        </div>

        <ul role="list" className="space-y-6">
          {conversations.map((conversation, index) => (
            <li key={index} className="relative flex gap-x-4">
              <div
                className={classNames(
                  index === conversations.length - 1 ? 'h-6' : '-bottom-6',
                  'ablute left-0 top-0 flex w-6 justify-center'
                )}
              >
                <div className="w-px bg-gray-200" />
              </div>
              <div className="relative flex h-6 w-6 flex-none items-center justify-center bg-white">
                <div className="h-1.5 w-1.5 rounded-full bg-gray-100 ring-1 ring-gray-300" />
              </div>
              <div className="flex-auto rounded-md p-3 ring-1 ring-inset ring-gray-200">
                <div className="flex justify-between items-start gap-x-4">
                  <time
                    dateTime={conversation.created_at}
                    className="flex-none py-0.5 text-xs leading-5 text-gray-900 text-md font-weight-bold"
                  >
                    {new Date(conversation.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                  </time>
                  <p className="text-sm leading-6 text-gray-500 flex-grow">{conversation.notes}</p>
                  <div className="ml-auto border b-1 rounded-3xl">
                    <IconButton
                      onClick={() => handleDeleteConversation(conversation.id)}
                      aria-label="delete conversation"
                      color="error"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </div>
                </div>
              </div>

            </li>
          ))}
        </ul>


      </div>
    </>
  );
};

export default Conversations;
