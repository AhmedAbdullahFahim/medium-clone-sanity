import { useRouter } from 'next/router'
import { signIn, useSession } from 'next-auth/react'
import { Provider } from '../typings'

interface Props {
  providers: [Provider]
}

function AuthorForm({ providers }: Props) {
  const router = useRouter()
  const { data: session } = useSession()
  return (
    <div className='flex flex-col justify-center items-center mt-20'>
      <img src='/google-logo.png' height={300} width={300} alt='google' />
      {Object.values(providers).map((provider) => (
        <div key={provider.name}>
          <button
            onClick={() => signIn(provider.id, { callbackUrl: '/' })}
            className='py-5 px-20 bg-green-600 rounded-full text-white text-center cursor-pointer mt-10'
          >
            Sign in with {provider.name}
          </button>
        </div>
      ))}
    </div>
  )
}

export default AuthorForm
