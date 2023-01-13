import AuthorForm from '../../components/AuthorForm'
import { getProviders, getSession } from 'next-auth/react'
import { Provider } from '../../typings'
import { client } from '../../sanity'

interface Props {
  providers: [Provider]
}

function createAuthor({ providers }: Props) {
  return <AuthorForm providers={providers} />
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
      console.log('author not found', data)
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
    } else {
      console.log('author was found')
    }
  }
  return {
    props: {
      providers,
    },
  }
}

export default createAuthor