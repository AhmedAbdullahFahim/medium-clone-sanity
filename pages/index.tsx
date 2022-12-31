import Head from 'next/head'
import Banner from '../components/Banner'
import { sanityClient } from '../sanity'
import { Post } from '../typings'
import Posts from '../components/Posts'

interface Props {
  posts: [Post]
}

export default function Home({ posts }: Props) {
  return (
    <div className='max-w-7xl mx-auto'>
      <Head>
        <title>Medium Blog</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Banner />
      <Posts posts={posts} />
    </div>
  )
}

// Returning Posts to send them as params to the <Posts /> component

export const getServerSideProps = async () => {
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

  const posts = await sanityClient.fetch(query)

  return {
    props: {
      posts,
    },
  }
}
