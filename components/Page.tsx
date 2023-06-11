import React, { ReactNode } from 'react';
import { Fragment, useState } from 'react'
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

import Link from 'next/link'
import { User } from '@supabase/supabase-js'
import { useUser } from '@supabase/auth-helpers-react';


import { Bars3Icon, ChevronRightIcon, ChevronUpDownIcon, MagnifyingGlassIcon } from '@heroicons/react/20/solid'
import { GetServerSideProps, NextPage } from 'next'


const navigation = [
  { name: 'Contacts', href: '/home', icon: FolderIcon, current: false },
  { name: 'Reminders', href: '#', icon: BellIcon, current: true },
  { name: 'Add a Contact', href: '/contact/create', icon: UserCircleIcon, current: false },
  { name: 'Settings', href: '#', icon: Cog6ToothIcon, current: false }, 
]

const statuses = {
  offline: 'text-gray-500 bg-gray-100/10',
  online: 'text-green-400 bg-green-400/10',
  error: 'text-rose-400 bg-rose-400/10',
}
const environments = {
  Preview: 'text-gray-400 bg-gray-400/10 ring-gray-400/20',
  Production: 'text-indigo-400 bg-indigo-400/10 ring-indigo-400/30',
}
const deployments = [
  {
    id: 1,
    href: '#',
    projectName: 'ios-app',
    teamName: 'Planetaria',
    status: 'offline',
    statusText: 'Initiated 1m 32s ago',
    description: 'Deploys from GitHub',
    environment: 'Preview',
  },
  {
    id: 2,
    href: '#',
    projectName: 'ios-app',
    teamName: 'Planetaria',
    status: 'offline',
    statusText: 'Initiated 1m 32s ago',
    description: 'Deploys from GitHub',
    environment: 'Preview',
  },
  {
    id: 3,
    href: '#',
    projectName: 'ios-app',
    teamName: 'Planetaria',
    status: 'offline',
    statusText: 'Initiated 1m 32s ago',
    description: 'Deploys from GitHub',
    environment: 'Preview',
  },
  // More deployments...
]
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

interface LayoutProps {
  children: ReactNode,
  user?: User
}

import { Auth } from '@supabase/ui';

const Page: React.FC<LayoutProps> = ({ children, user }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div style={{ position: 'absolute', width: '100%', height: '100%' }} className="h-full bg-white">
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog as="div" className="relative z-50 xl:hidden" onClose={setSidebarOpen}>
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-white" />
            </Transition.Child>

            <div className="fixed inset-0 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                      <button type="button" className="-m-2.5 p-2.5" onClick={() => setSidebarOpen(false)}>
                        <span className="sr-only">Close sidebar</span>
                        <XMarkIcon className="h-6 w-6 text-slate-800" aria-hidden="true" />
                      </button>
                    </div>
                  </Transition.Child>
                  {/* Sidebar component, swap this element with another sidebar if you like */}
                  <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6 ring-1 ring-white/10">
                    <div className="flex h-16 shrink-0 items-center">
                      <img
                        className="h-8 w-auto"
                        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                        alt="Your Company"
                      />
                    </div>
                    <nav className="flex flex-1 flex-col">
                      <ul role="list" className="flex flex-1 flex-col gap-y-7">
                        <li>
                          <ul role="list" className="-mx-2 space-y-1">
                            {navigation.map((item) => (
                              <li key={item.name}>
                                <Link
                                  href={item.href}
                                  className={classNames(
                                    item.current
                                      ? 'bg-gray-100 text-slate-800'
                                      : 'text-gray-400 hover:text-slate-800 hover:bg-gray-100',
                                    'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                                  )}
                                >
                                  <item.icon className="h-6 w-6 shrink-0" aria-hidden="true" />
                                  {item.name}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </li>
                        
                        <li className="-mx-6 mt-auto bg-gray-100">
                          <a
                            href="#"
                            className="flex items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6 text-slate-800 hover:bg-white"
                          >
                            <span className="sr-only">Your profile</span>
                            <span aria-hidden="true">{user?.email}</span>
                          </a>
                        </li>
                      </ul>
                    </nav>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        {/* Static sidebar for desktop */}
        <div className="hidden xl:fixed xl:inset-y-0 xl:z-50 xl:flex xl:w-72 xl:flex-col">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 ring-1 ring-white/5 h-full">
            <div className="flex h-16 shrink-0 items-center">
              <img
                className="h-8 w-auto"
                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                alt="Your Company"
              />
            </div>
            <nav className="flex flex-1 flex-col">
              <ul role="list" className="flex flex-1 flex-col gap-y-7">
                <li>
                  <ul role="list" className="-mx-2 space-y-1">
                    {navigation.map((item) => (
                      <li key={item.name}>
                        <a
                          href={item.href}
                          className={classNames(
                            item.current
                              ? 'bg-gray-100 text-slate-800'
                              : 'text-gray-400 hover:text-slate-800 hover:bg-gray-100',
                            'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                          )}
                        >
                          <item.icon className="h-6 w-6 shrink-0" aria-hidden="true" />
                          {item.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </li>
                
                <li className="-mx-6 mt-auto bg-gray-100">
                  <a
                    href="#"
                    className="flex items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6 text-slate-800 hover:bg-white"
                  >
                    <span className="sr-only">Your profile</span>
                    <span aria-hidden="true">
                      
                      {user?.email}
                    
                    </span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
        <div className="xl:pl-72">
        {children}
          {/* Sticky search header */}
          
        </div>
      
    </div>
  );
}

export default Page;
