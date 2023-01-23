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

export const getServerSideProps = async () => {
  const providers = await getProviders()
  return {
    props: {
      providers,
    },
  }
}

export default createAuthor
