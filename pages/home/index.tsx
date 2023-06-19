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

import { Chip, Autocomplete, TextField, Button } from '@mui/material';

import Page from '../../components/Page'
import { supabase } from '../../lib/initSupabase'
import { User } from '@supabase/supabase-js'

import { Bars3Icon, ChevronRightIcon, ChevronUpDownIcon, MagnifyingGlassIcon } from '@heroicons/react/20/solid'
import { GetServerSideProps, NextPage } from 'next'
import Link from 'next/link'
import { Avatar } from '@material-ui/core'
import { Auth } from '@supabase/ui';
import { ReminderFeed } from '../../components/ReminderFeed'
import { useRouter } from 'next/router'


const activityItems = [

]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

interface ProfileProps {
  user: User | null
  contacts: any[]
}

interface HomePageProps {
  user: User | null
}

const HomePage: React.FC<HomePageProps> = () => {

  const { user } = Auth.useUser()
  const router = useRouter()
  const [selectedCompany, setSelectedCompany] = useState("");
  const [selectedPosition, setSelectedPosition] = useState("");
  const [searchText, setSearchText] = useState("");
  const [companies, setCompanies] = useState([]);
  const [positions, setPositions] = useState([]);
  const [tags, setTags] = useState([]);
  const [isMounted, setIsMounted] = useState(false);


  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push('/')
  }

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    const fetchOptions = async () => {
      const { data: allContacts } = await supabase.from('contacts').select("company, position");

      const companies = [...new Set(allContacts.map(contact => contact.company))].filter(Boolean);
      const positions = [...new Set(allContacts.map(contact => contact.position))].filter(Boolean);
      setCompanies(companies);
      setPositions(positions);

      const { data: allTags } = await supabase.from('tags').select("name");
      const tags = allTags.map(tag => tag.name);
      setTags(tags);
    };

    setIsMounted(true);
    fetchContacts();
    fetchOptions();
  }, [user]);


  const fetchContacts = async () => {
    if (!user) return;  // if no user, return

    // Construct filters
    let filters = [];
    if (selectedCompany) {
      filters.push({ column: 'company', operator: 'eq', value: selectedCompany });
    }
    if (selectedPosition) {
      filters.push({ column: 'position', operator: 'eq', value: selectedPosition });
    }
    if (searchText) {
      filters.push({ column: 'name', operator: 'ilike', value: `%${searchText}%` });
    }


    let query = supabase
      .from('contacts')
      .select();


    // Apply filters
    filters.forEach(filter => {
      query = query.filter(filter.column, filter.operator, filter.value);
    });

    // Execute the query
    const { data: contacts, error } = await query;

    if (error) return;

    setContacts(contacts);
  };





  useEffect(() => {
    setIsMounted(true);
    fetchContacts();
  }, [user, selectedCompany, selectedPosition, searchText]);


  if (!isMounted) return null;

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
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                />

              </div>
            </form>
          </div>
        </div>

        <main className="lg:pr-96">
          <header className="flex items-center justify-between   px-4 py-2 sm:px-6 sm:py-3 lg:px-8">
            <h1 className="text-base font-semibold leading-7 text-slate-800">
              Contacts ({contacts.length} Total)
            </h1>
          </header>
          <div className="flex items-center justify-between  px-4 sm:px-6 lg:px-8 gap-2">
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={companies}
              sx={{ width: 300 }}
              onChange={(event, newValue) => setSelectedCompany(newValue)}
              renderInput={(params) => <TextField {...params} label="Filter by company" />}
            />
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={positions}
              sx={{ width: 300 }}
              onChange={(event, newValue) => setSelectedPosition(newValue)}
              renderInput={(params) => <TextField {...params} label="Filter by position" />}
            />


          </div>

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
                  {/* <div className="rounded-full flex-none py-1 px-2 text-xs font-medium ring-1 ring-inset">
                    {contact.tags.join(', ')}
                  </div> */}
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
        <aside className="bg-white lg:fixed lg:bottom-0 lg:right-0 lg:top-16 lg:w-96 lg:overflow-y-auto lg:border-l">
          <ReminderFeed showForm={false} />
        </aside>

      </Page>
    </>
  )
}

export default HomePage

