import Head from 'next/head'
import Banner from '../components/Banner'
import { client } from '../sanity'
import { Post } from '../typings'
import Posts from '../components/Posts'
import { getSession } from 'next-auth/react'

interface Props {
  posts: [Post]
}

export default function Home({ posts }: Props) {
  return (
    <div className='max-w-7xl mx-auto'>
      <Head>
        <title>Medium Blog</title>
        <link rel='icon' href='/favicon.ico' />
        <meta charSet='utf-8' />
      </Head>
      <Banner />
      <Posts posts={posts} />
    </div>
  )
}

// Returning Posts to send them as params to the <Posts /> component

export const getServerSideProps = async (context: any) => {
  const session = await getSession(context)
  if (session) {
    const query = `*[_type=="author" && email == $email]{
      name,
      _id,
      email,
    }`
    const authors = await client.fetch(query, {
      email: session?.user.email,
    })
    if (authors.length === 0) {
      const data = {
        ...session.user,
        tempSlug: session.user.email
          .toLowerCase()
          .replaceAll('@', '-')
          .replaceAll('.', '-')
          .replaceAll('_', '-'),
      }
      await client.create({
        _type: 'author',
        name: data.name,
        email: data.email,
        slug: {
          _type: 'slug',
          current: data.tempSlug,
        },
        imageUrl: data.image,
      })
    }
  }
  const query = `*[_type == "post"]{
    _id,
    title,
    author-> {
      name,
      image,
      imageUrl
    },
    'comments': *[
      _type == "comment" &&
      post._ref == ^._id &&
      approved == true],
    description,
    mainImage,
    slug,
    imageUrl
  }`

  const posts = await client.fetch(query)

  return {
    props: {
      posts,
    },
  }
}
