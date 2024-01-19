import React from 'react'
import InputTag from '../components/InputTag'

const UserAuthForm = ({type}) => {
  return (
    <section className='h-cover flex items-center justify-center'>
        <form className='w-[80%] max-h-[400px]'>
            <h1 className='text-4xl font-gelasio capitalize text-center mb-24'>
                {type === 'sign-in' ? 'Welcome back' : 'Create an account'}
            </h1>
            {
                type != "sing-in" ?
                <InputTag/> : ""
            }
            
        </form>
    </section>
  )
}

export default UserAuthForm