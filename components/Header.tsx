import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import { Menu, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import {
  ArrowRightOnRectangleIcon,
  ChevronDownIcon,
} from '@heroicons/react/24/outline'
import { useRouter } from 'next/router'

function Header() {
  const { data: session } = useSession<any>()
  const router = useRouter()
  return (
    <header className='max-w-7xl mx-auto sticky top-0 z-50 bg-white flex justify-between p-5'>
      <div className='flex space-x-5 items-center'>
        <Link href='/'>
          <img
            src='https://links.papareact.com/yvf'
            alt=''
            className='w-44 object-contain cursor-pointer'
          />
        </Link>
        <div className='hidden lg:inline-flex items-center space-x-5'>
          <h3>About</h3>
          <h3>Contact</h3>
          <Link href='/author/authors'>
            <h3 className='text-white bg-green-600 rounded-full px-4 py-1'>
              Authors
            </h3>
          </Link>
        </div>
      </div>
      <div className='relative flex items-center space-x-5'>
        {!session && (
          <Link href='/author'>
            <h3 className='text-white bg-green-600 rounded-full px-4 py-1 text-center'>
              Become An Author
            </h3>
          </Link>
        )}
        {session && (
          <>
            <Link href='/post/createPost'>
              <h3 className='text-white bg-green-600 rounded-full px-4 py-1 text-center'>
                Create Post
              </h3>
            </Link>
            <Menu>
              <Menu.Button>
                <div className='flex items-center space-x-1'>
                  <img
                    src={
                      session.user?.image
                        ? session.user?.image
                        : 'https://links.papareact.com/yvf'
                    }
                    alt='user image'
                    className='h-11 w-11 rounded-full cursor-pointer'
                  />
                  <ChevronDownIcon className='hidden sm:inline-flex w-4' />
                </div>
              </Menu.Button>
              <Transition
                as={Fragment}
                enter='transition ease-out duration-100'
                enterFrom='transform opacity-0 scale-95'
                enterTo='transform opacity-100 scale-100'
                leave='transition ease-in duration-75'
                leaveFrom='transform opacity-100 scale-100'
                leaveTo='transform opacity-0 scale-95'
              >
                <Menu.Items className='absolute right-0 top-11 w-56 origin-top-right divide-y divide-yellow-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
                  <Menu.Item>
                    {({ active }) => (
                      <div
                        className={`${
                          active ? 'bg-gray-100' : 'text-gray-900'
                        } group flex space-x-3 font-medium w-full items-center rounded-md px-2 py-2 text-sm cursor-pointer`}
                      >
                        <img
                          src={
                            session.user?.image
                              ? session.user?.image
                              : 'https://links.papareact.com/yvf'
                          }
                          width={40}
                          height={40}
                          className='rounded-full object-cover'
                        />
                        <p>{session.user?.name}</p>
                      </div>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <div
                        className={`${
                          active ? 'bg-gray-100' : 'text-gray-900'
                        } group flex space-x-3 font-medium w-full items-center rounded-md px-2 py-2 text-sm cursor-pointer`}
                        onClick={() => signOut()}
                      >
                        <ArrowRightOnRectangleIcon className='h-10 w-10 p-2 bg-gray-200 rounded-full' />
                        <p>Log Out</p>
                      </div>
                    )}
                  </Menu.Item>
                </Menu.Items>
              </Transition>
            </Menu>
          </>
        )}
      </div>
    </header>
  )
}

export default Header
