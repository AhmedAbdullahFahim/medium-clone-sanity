import AuthorForm from '../../components/AuthorForm'
import { getProviders, getSession } from 'next-auth/react'
import { Provider } from '../../typings'
import { client } from '../../sanity'
import Head from 'next/head'

interface Props {
  providers: [Provider]
}

function createAuthor({ providers }: Props) {
  return (
    <div>
      <Head>
        <title>Become An Author</title>
      </Head>
      <AuthorForm providers={providers} />
    </div>
  )
}

export const getServerSideProps = async (context: any) => {
  const providers = await getProviders()
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
  return {
    props: {
      providers,
    },
  }
}

export default createAuthor
