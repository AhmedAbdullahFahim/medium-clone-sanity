import { Post } from '../typings'
import { urlFor } from '../sanity'
import Link from 'next/link'
import { useEffect } from 'react'

interface Props {
  posts: [Post]
}

function Posts({ posts }: Props) {
  return (
    <div className='grid grild-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 p-2 md:p-6'>
      {posts.map((post) => {
        return (
          <Link key={post._id} href={`/post/${post.slug.current}`}>
            <div className='border rounded-lg group cursor-pointer overflow-hidden'>
              <img
                src={
                  post.mainImage
                    ? urlFor(post.mainImage).url()!
                    : post.imageUrl
                    ? post.imageUrl
                    : 'https://c4.wallpaperflare.com/wallpaper/173/114/541/minimalism-black-background-error-simple-background-not-available-hd-wallpaper-preview.jpg'
                }
                alt=''
                className='h-60 w-full object-cover group-hover:scale-105 transition-transform ease-in-out duration-200'
              />
              <div className='flex justify-between p-5 bg-white'>
                <div>
                  <p className='text-lg font-bold'>{post.title}</p>
                  <p className='text-sm'>
                    {post.description.slice(0, 30)}
                    {post.description.slice(30).length > 0 && '...'} by{' '}
                    <span className='font-bold'>{post.author.name}</span>
                  </p>
                </div>
                <img
                  className='h-12 w-12 object-cover rounded-full my-auto'
                  src={
                    post.author.image
                      ? urlFor(post.author.image).url()!
                      : post.author.imageUrl
                      ? post.author.imageUrl
                      : 'https://www.insoundtrack.com/images/unknown-artist.gif?v=4.6.3'
                  }
                  alt=''
                />
              </div>
            </div>
          </Link>
        )
      })}
    </div>
  )
}

export default Posts
