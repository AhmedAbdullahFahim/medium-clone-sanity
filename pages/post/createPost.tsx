import { Fragment, useState } from 'react'
import Link from 'next/link'
import { Dialog, Transition } from '@headlessui/react'
import PostForm from '../../components/PostForm'
import { client } from '../../sanity'
import { Author } from '../../typings'
import { getSession, useSession } from 'next-auth/react'
import Head from 'next/head'

interface Props {
  author: Author
}

function createPost({ author }: Props) {
  const { data: session } = useSession()
  let [isOpen, setIsOpen] = useState(true)
  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }
  return (
    <>
      <Head>
        <title>Create Post</title>
      </Head>
      {session ? (
        <PostForm author={author} />
      ) : (
        <div className='w-full h-screen' onClick={openModal}>
          <Transition appear show={isOpen} as={Fragment}>
            <Dialog as='div' className='relative z-60' onClose={closeModal}>
              <Transition.Child
                as={Fragment}
                enter='ease-out duration-300'
                enterFrom='opacity-0'
                enterTo='opacity-100'
                leave='ease-in duration-200'
                leaveFrom='opacity-100'
                leaveTo='opacity-0'
              >
                <div className='fixed inset-0 bg-white' />
              </Transition.Child>

              <div className='fixed inset-0 overflow-y-auto'>
                <div className='flex min-h-full items-center justify-center p-4 text-center'>
                  <Transition.Child
                    as={Fragment}
                    enter='ease-out duration-300'
                    enterFrom='opacity-0 scale-95'
                    enterTo='opacity-100 scale-100'
                    leave='ease-in duration-200'
                    leaveFrom='opacity-100 scale-100'
                    leaveTo='opacity-0 scale-95'
                  >
                    <Dialog.Panel className='w-full max-w-md transform overflow-hidden rounded-2xl bg-gray-300 p-6 text-left align-middle shadow-md shadow-gray-600 transition-all'>
                      <Dialog.Title
                        as='h3'
                        className='text-lg font-bold leading-6 text-gray-900'
                      >
                        You are not an Author
                      </Dialog.Title>
                      <div className='mt-2'>
                        <p className='text-sm text-gray-600'>
                          You must sign in first to access this page
                        </p>
                      </div>

                      <div className='mt-4 flex justify-evenly'>
                        <Link href='/'>
                          <button
                            type='button'
                            className='inline-flex justify-center rounded-md border border-green-600 bg-white px-4 py-2 text-sm font-medium text-green-600 hover:border-green-700 hover:text-green-700 hover: active:bg-green-600 active:text-white focus:outline-none'
                          >
                            Home Page
                          </button>
                        </Link>
                        <Link href='/author'>
                          <button
                            type='button'
                            className='inline-flex justify-center rounded-md border border-green-600 bg-green-600 text-white px-4 py-2 text-sm font-medium hover:bg-green-700 focus:outline-none active:bg-white active:border-green-600  active:text-green-600'
                          >
                            Sign In
                          </button>
                        </Link>
                      </div>
                    </Dialog.Panel>
                  </Transition.Child>
                </div>
              </div>
            </Dialog>
          </Transition>
        </div>
      )}
    </>
  )
}

export const getServerSideProps = async (context: any) => {
  const session = await getSession(context)
  let author = ''
  if (session) {
    const query = `*[_type == "author" && email == $email][0]{
      _id,
    }`
    author = await client.fetch(query, { email: session.user.email })
  }
  return {
    props: {
      author,
    },
  }
}

export default createPost
