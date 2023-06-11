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
  const [conversations, setConversations] = useState<any>([]);

  const fetchConversations = async (contact) => {

    const { data: conversations, error } = await supabase
      .from('conversations')
      .select()
      .eq('contact_id', contact.id);
  
    if (error) {
      console.error(error);
      return;
    }
  
    setConversations(conversations);
  };

  useEffect(() => {
    if (user && contact.id) {
      console.log(contact.id)
      fetchConversations(contact);
    }
  }, [contact.id, user]);
    

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
      setConversations([...conversations, data[0]]);
      setComment('');
    }

  };

  return (
    <>
      <div className="py-4">
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
                <div className="flex justify-between gap-x-4">
                  <p className="text-sm leading-6 text-gray-500">{conversation.notes}</p>
                  <time
                    dateTime={conversation.created_at}
                    className="flex-none py-0.5 text-xs leading-5 text-gray-500"
                  >
                    {conversation.created_at}
                  </time>
                </div>
              </div>
            </li>
          ))}
        </ul>

        {/* New comment form */}
        <div className="mt-6 flex gap-x-3">
          <img
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            alt=""
            className="h-6 w-6 flex-none rounded-full bg-gray-50"
          />
          <form onSubmit={handleCommentSubmit} className="relative flex-auto">
            <div className="overflow-hidden rounded-lg pb-12 shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-indigo-600">
              <textarea
                rows={2}
                name="comment"
                id="comment"
                className="p-4 block w-full resize-none border-0 bg-transparent py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                placeholder="Add your comment..."
                value={comment}
                onChange={handleCommentChange}
              />
            </div>

            <div className="absolute inset-x-0 bottom-0 flex justify-between py-2 pl-3 pr-2">
              <button
                type="submit"
                className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
              >
                Comment
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Conversations;
