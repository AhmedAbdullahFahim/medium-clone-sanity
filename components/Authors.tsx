import { urlFor } from '../sanity'
import { Author } from '../typings'

interface Props {
  authors: Author[]
}

function Authors({ authors }: Props) {
  console.log(authors[0])

  return (
    <main className='max-w-4xl p-10 mx-auto'>
      <h3 className='text-3xl font-bold'>Authors</h3>
      <hr className='pb-2 my-5' />
      {authors.map((author) => (
        <div
          key={author._id}
          className='flex items-center shadow shadow-yellow-500 p-5 mb-5 hover:shadow-lg hover:shadow-yellow-500 transition-all duration-150 ease-in-out'
        >
          <img
            src={
              author.image
                ? urlFor(author.image).url()!
                : author.imageUrl
                ? author.imageUrl
                : 'https://www.insoundtrack.com/images/unknown-artist.gif?v=4.6.3'
            }
            alt=''
            className='w-12 h-12 object-cover rounded-full'
          />
          <h1 className='ml-4 text-xl font-semibold'>{author.name}</h1>
          <h2 className='ml-auto text-sm font-extralight'>
            {new Date(author._createdAt).toLocaleString()}
          </h2>
        </div>
      ))}
    </main>
  )
}

export default Authors
