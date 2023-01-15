import Authors from '../../components/Authors'
import { Author } from '../../typings'
import { client } from '../../sanity'
import Head from 'next/head'

interface Props {
  authors: Author[]
}

function author({ authors }: Props) {
  return (
    <div>
      <Head>
        <title>Authors</title>
      </Head>
      <Authors authors={authors} />
    </div>
  )
}

export default author

export const getServerSideProps = async () => {
  const query = `*[_type == "author"]{
    _id,
    _createdAt,
    name,
    image,
    imageUrl,
  }`

  const authors = await client.fetch(query)

  return {
    props: {
      authors,
    },
  }
}
