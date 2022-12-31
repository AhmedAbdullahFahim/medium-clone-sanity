import Authors from '../../components/Authors'
import { Author } from '../../typings'
import { sanityClient } from '../../sanity'

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

  const authors = await sanityClient.fetch(query)

  return {
    props: {
      authors,
    },
  }
}
