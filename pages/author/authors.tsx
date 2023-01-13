import Authors from '../../components/Authors'
import { Author } from '../../typings'
import { client } from '../../sanity'

interface Props {
  authors: Author[]
}

function author({ authors }: Props) {
  return <Authors authors={authors} />
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
