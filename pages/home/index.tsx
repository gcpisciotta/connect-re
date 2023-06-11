import React, { Fragment, useState, useEffect } from 'react'
import { Dialog, Menu, Transition } from '@headlessui/react'
import {
  ChartBarSquareIcon,
  Cog6ToothIcon,
  FolderIcon,
  GlobeAltIcon,
  ServerIcon,
  SignalIcon,
  XMarkIcon,
  BellIcon,
  UserCircleIcon,

} from '@heroicons/react/24/outline'

import Page from '../../components/Page'
import { supabase } from '../../lib/initSupabase'
import { User } from '@supabase/supabase-js'

import { Bars3Icon, ChevronRightIcon, ChevronUpDownIcon, MagnifyingGlassIcon } from '@heroicons/react/20/solid'
import { GetServerSideProps, NextPage } from 'next'
import Link from 'next/link'
import { Avatar } from '@material-ui/core'

import { Auth } from '@supabase/ui';


const activityItems = [
  {
    user: {
      name: 'Michael Foster',
      imageUrl:
        'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    projectName: 'ios-app',
    commit: '2d89f0c8',
    branch: 'main',
    date: '1h',
    dateTime: '2023-01-23T11:00',
  },
  {
    user: {
      name: 'Michael Foster',
      imageUrl:
        'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    projectName: 'ios-app',
    commit: '2d89f0c8',
    branch: 'main',
    date: '1h',
    dateTime: '2023-01-23T11:00',
  },
  {
    user: {
      name: 'Michael Foster',
      imageUrl:
        'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    projectName: 'ios-app',
    commit: '2d89f0c8',
    branch: 'main',
    date: '1h',
    dateTime: '2023-01-23T11:00',
  },
  // More items...
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

interface ProfileProps {
  user: User | null
  contacts: any[]
}

const contacts = [
  {
    "id": 1,
    "photo": "https://www.hampshirere.com/sites/hampshire/files/images/people/Jon_Hanson.jpg",
    "name": "John Doe",
    "email": "johndoe@example.com",
    "phone": "123-456-7890",
    "company": "Example Company",
    "position": "Software Engineer",
    "social": {
      "linkedin": "https://www.linkedin.com/in/johndoe",
      "twitter": "https://twitter.com/johndoe"
    },
    "dob": "1990-01-01",
    "tags": [
      "friend",
      "colleague"
    ],
    "dateMet": "2022-05-10",
    "howMet": "Attended a conference together",
    "conversations": [
      {
        "id": 1,
        "date": "2022-06-01",
        "notes": "Discussed project collaboration"
      },
      {
        "id": 2,
        "date": "2022-06-15",
        "notes": "Follow-up on previous conversation"
      }
    ],
    "reminders": [
      {
        "id": 1,
        "date": "2022-07-01",
        "description": "Follow up with John regarding project"
      },
      {
        "id": 2,
        "date": "2022-08-15",
        "description": "Send birthday greetings"
      }
    ]
  },
  {
    "id": 1,
    "photo": "https://www.hampshirere.com/sites/hampshire/files/images/people/Jon_Hanson.jpg",
    "name": "John Doe",
    "email": "johndoe@example.com",
    "phone": "123-456-7890",
    "company": "Example Company",
    "position": "Software Engineer",
    "social": {
      "linkedin": "https://www.linkedin.com/in/johndoe",
      "twitter": "https://twitter.com/johndoe"
    },
    "dob": "1990-01-01",
    "tags": [
      "friend",
      "colleague"
    ],
    "dateMet": "2022-05-10",
    "howMet": "Attended a conference together",
    "conversations": [
      {
        "id": 1,
        "date": "2022-06-01",
        "notes": "Discussed project collaboration"
      },
      {
        "id": 2,
        "date": "2022-06-15",
        "notes": "Follow-up on previous conversation"
      }
    ],
    "reminders": [
      {
        "id": 1,
        "date": "2022-07-01",
        "description": "Follow up with John regarding project"
      },
      {
        "id": 2,
        "date": "2022-08-15",
        "description": "Send birthday greetings"
      }
    ]
  }
]

interface HomePageProps {
  user: User | null
}

const HomePage: React.FC<HomePageProps> = ({ user }) => {

  // const { user } = Auth.useUser();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [contacts, setContacts] = useState([]);

  const fetchContacts = async () => {
    if (!user) return;  // if no user, return
    const { data: contacts, error } = await supabase.from('contacts').select();

    if (error) return;
    setContacts(contacts);
  };


  useEffect(() => {

    fetchContacts();



  }, [user]);



  return (
    <>
      <Page user={user}>


        <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-6 border-b border-white/5 bg-white px-4 shadow-sm sm:px-6 lg:px-8">
          <button type="button" className="-m-2.5 p-2.5 text-slate-800 xl:hidden" onClick={() => setSidebarOpen(true)}>
            <span className="sr-only">Open sidebar</span>
            <Bars3Icon className="h-5 w-5" aria-hidden="true" />
          </button>

          <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
            <form className="flex flex-1" action="#" method="GET">
              <label htmlFor="search-field" className="sr-only">
                Search
              </label>
              <div className="relative w-full">
                <MagnifyingGlassIcon
                  className="pointer-events-none absolute inset-y-0 left-0 h-full w-5 text-gray-500"
                  aria-hidden="true"
                />
                <input
                  id="search-field"
                  className="block h-full w-full border-0 bg-transparent py-0 pl-8 pr-0 text-slate-800 focus:ring-0 sm:text-sm"
                  placeholder="Search..."
                  type="search"
                  name="search"
                />
              </div>
            </form>
          </div>
        </div>

        <main className="lg:pr-96">
          <header className="flex items-center justify-between border-b border-white/5 px-4 py-4 sm:px-6 sm:py-6 lg:px-8">
            <h1 className="text-base font-semibold leading-7 text-slate-800">
              Contacts ({contacts.length} Total)
            </h1>

            {/* Sort dropdown */}
            <Menu as="div" className="relative">
              <Menu.Button className="flex items-center gap-x-1 text-sm font-medium leading-6 text-slate-800">
                Sort by
                <ChevronUpDownIcon className="h-5 w-5 text-gray-500" aria-hidden="true" />
              </Menu.Button>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 z-10 mt-2.5 w-40 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        href="#"
                        className={classNames(
                          active ? 'bg-gray-50' : '',
                          'block px-3 py-1 text-sm leading-6 text-gray-900'
                        )}
                      >
                        Name
                      </a>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        href="#"
                        className={classNames(
                          active ? 'bg-gray-50' : '',
                          'block px-3 py-1 text-sm leading-6 text-gray-900'
                        )}
                      >
                        Date updated
                      </a>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        href="#"
                        className={classNames(
                          active ? 'bg-gray-50' : '',
                          'block px-3 py-1 text-sm leading-6 text-gray-900'
                        )}
                      >
                        Environment
                      </a>
                    )}
                  </Menu.Item>
                </Menu.Items>
              </Transition>
            </Menu>
          </header>

          {/* Deployment list */}
          <ul role="list" className="divide-y divide-white/5">
            {contacts && contacts.length > 0 ? (
              contacts.map((contact) => (
                <li key={contact.id} className="relative flex items-center space-x-4 px-4 py-4 sm:px-6 lg:px-8">
                  <div className="min-w-0 flex-auto">
                    <div className="flex items-center gap-x-3">
                      <h2 className="min-w-0 text-sm font-semibold leading-6 text-slate-800">
                        <Link href={`/contact/${contact.id}`} className="flex gap-x-2">
                          <span className="truncate">{contact.name}</span>
                          <span className="text-gray-400">/</span>
                          <span className="whitespace-nowrap">{contact.company}</span>
                          <span className="absolute inset-0" />
                        </Link>
                      </h2>
                    </div>
                    <div className="mt-3 flex items-center gap-x-2.5 text-xs leading-5 text-gray-400">
                      <p className="truncate">{contact.position}</p>
                      <svg viewBox="0 0 2 2" className="h-0.5 w-0.5 flex-none fill-gray-300">
                        <circle cx={1} cy={1} r={1} />
                      </svg>
                      <p className="whitespace-nowrap">{contact.phone} </p>
                      
                    </div>
                  </div>
                  <div className="rounded-full flex-none py-1 px-2 text-xs font-medium ring-1 ring-inset">
                    {/* {contact.tags.join(', ')} */}
                  </div>
                  <div className="text-xs leading-5 text-gray-400">
                    {/* {contact.reminders[0]?.date || 'No reminders set'} */}
                  </div>
                </li>
              ))
            ) : (
              <div>No contacts available</div>
            )}
          </ul>

        </main>

        {/* Activity feed */}
        <aside className="bg-white lg:fixed lg:bottom-0 lg:right-0 lg:top-16 lg:w-96 lg:overflow-y-auto lg:border-l lg:border-white/5">
          <header className="flex items-center justify-between border-b border-white/5 px-4 py-4 sm:px-6 sm:py-6 lg:px-8">
            <h2 className="text-base font-semibold leading-7 text-slate-800">Reminders</h2>
            <a href="#" className="text-sm font-semibold leading-6 text-indigo-400">
              View all
            </a>
          </header>
          <ul role="list" className="divide-y divide-white/5">
            {activityItems.map((item) => (
              <li key={item.commit} className="px-4 py-4 sm:px-6 lg:px-8">
                <div className="flex items-center gap-x-3">
                  <img src={item.user.imageUrl} alt="" className="h-6 w-6 flex-none rounded-full bg-gray-800" />
                  <h3 className="flex-auto truncate text-sm font-semibold leading-6 text-slate-800">{item.user.name}</h3>
                  <time dateTime={item.dateTime} className="flex-none text-xs text-gray-600">
                    {item.date}
                  </time>
                </div>
                <p className="mt-3 truncate text-sm text-gray-500">
                  Pushed to <span className="text-gray-400">{item.projectName}</span> (
                  <span className="font-mono text-gray-400">{item.commit}</span> on{' '}
                  <span className="text-gray-400">{item.branch}</span>)
                </p>
              </li>
            ))}

          </ul>
        </aside>

      </Page>
    </>
  )
}

export default HomePage


export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const { user } = await supabase.auth.api.getUserByCookie(req)

  if (!user) {
    // If no user, redirect to index.
    return { props: {}, redirect: { destination: '/', permanent: false } }
  }

  // If there is a user, return it.
  return { props: { user } }
}