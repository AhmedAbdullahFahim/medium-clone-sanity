import { useSession } from 'next-auth/react'
import { useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'

interface IFormInput {
  _id: string
  name: string
  email: string
  comment: string
}

interface Props {
  postId: string
}

function CommentForm({ postId }: Props) {
  const { data: session } = useSession()
  const [submitted, setSubmitted] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>()

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    await fetch('/api/createComment', {
      method: 'POST',
      body: JSON.stringify(data),
    })
      .then(() => {
        console.log(data)
        setSubmitted(true)
      })
      .catch((err) => {
        console.log(err)
        setSubmitted(false)
      })
  }

  return (
    <>
      {session && (
        <div>
          {submitted ? (
            <div className='flex flex-col bg-yellow-500 p-10 my-10 text-white max-w-2xl mx-auto space-y-5'>
              <h3 className='text-3xl font-bold'>
                Thank you for submitting your comment!
              </h3>
              <p>Once it has been approved, it will appear below!</p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit(onSubmit)}
              className='flex flex-col p-5 max-w-2xl mx-auto mb-10'
            >
              <h3 className='text-md text-yellow-500'>Enjoyed this article?</h3>
              <h4 className='text-3xl font-bold'>Leave a comment below!</h4>
              <hr className='py-3 mt-2' />

              <input
                {...register('_id')}
                type='hidden'
                name='_id'
                value={postId}
              />

              <input
                {...register('name', { required: true })}
                type='hidden'
                name='name'
                value={session?.user.name}
              />
              <input
                {...register('email', { required: true })}
                type='hidden'
                name='email'
                value={session?.user.email}
              />
              <label>
                <span className='block'>Comment</span>
                <textarea
                  {...register('comment', { required: true })}
                  placeholder='Leave your comment here'
                  rows={8}
                  className='block w-full shadow border rounded py-2 px-3 form-textarea mb-4 mt-1 ring-yellow-500 outline-none focus:ring'
                />
              </label>

              <div className='flex flex-col p-5'>
                {errors.comment && (
                  <span className='text-red-500'>
                    - The Comment field is required
                  </span>
                )}
              </div>

              <input
                type='submit'
                className='shadow bg-yellow-500 hover:bg-yellow:400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded cursor-pointer w-40 mr-auto'
              />
            </form>
          )}{' '}
        </div>
      )}
    </>
  )
}

export default CommentForm
