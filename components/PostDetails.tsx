import { Post } from '../typings'
import { urlFor } from '../sanity'

interface Props {
  post: Post
}

function PostDetails({ post }: Props) {
  return (
    <main>
      <img
        src={
          post.mainImage
            ? urlFor(post.mainImage).url()!
            : post.imageUrl
            ? post.imageUrl
            : 'https://c4.wallpaperflare.com/wallpaper/173/114/541/minimalism-black-background-error-simple-background-not-available-hd-wallpaper-preview.jpg'
        }
        alt=''
        className='w-full h-80 object-cover'
      />
      <article className='mx-auto max-w-3xl p-5'>
        <h1 className='mt-5 mb-3 text-3xl font-bold'>{post.title}</h1>
        <h2 className='text-xl text-gray-500 mb-2 font-semibold'>
          {post.description}
        </h2>
        <div className='flex items-center space-x-3 mt-3'>
          <img
            src={
              post.author.image
                ? urlFor(post.author.image).url()!
                : post.author.imageUrl
                ? post.author.imageUrl
                : 'https://www.insoundtrack.com/images/unknown-artist.gif?v=4.6.3'
            }
            alt=''
            className='h-10 w-10 object-cover rounded-full'
          />
          <p className='font-extralight text-sm'>
            Blog post by{' '}
            <span className='text-green-600'>{post.author.name}</span> -
            Published at {new Date(post._createdAt).toLocaleString()}.
          </p>
        </div>
        <div className='mt-10'>
          <p className='whitespace-pre-line'>{post.body}</p>
        </div>
      </article>
    </main>
  )
}

export default PostDetails
