import Link from 'next/link'
import React from 'react'

function Header() {
  return (
    <header className='flex justify-between p-5'>
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
      <div className='flex items-center space-x-5'>
        <Link href='/author/createAuthor'>
          <h3 className='text-white bg-green-600 rounded-full px-4 py-1 text-center'>
            Become An Author
          </h3>
        </Link>
        <Link href='/post/createPost'>
          <h3 className='text-green-600 border border-green-600 rounded-full px-4 py-1 text-center'>
            Create A Post
          </h3>
        </Link>
      </div>
    </header>
  )
}

export default Header
