import { useState, useEffect } from 'react'
import { userService } from '../services/user.service'
import { useNavigate } from 'react-router-dom'

export const SignupPage = () => {
    const navigate = useNavigate()
  const [name, setName] = useState('')

  useEffect(() => {
    userService.remove()
  }, [])

  const onSignup = async (ev) => {
    ev.preventDefault()
    try {
      await userService.signup(name)
      navigate('/')
    } catch (error) {
      console.log('error: ', error)
    }
  }

  const handleChange = ({ target }) => {
    const field = target.name
    let value = target.value
    switch (target.type) {
      case 'number':
      case 'range':
        value = +value
        break
      case 'checkbox':
        value = target.checked
        break
      default:
        break
    }

    setName(value)
  }

  return (
    <section className='signup-page'>
      <h1>Unlock the power of crypto with Mister Bitcoin</h1>
      <h3>Sign up now to start building wealth!</h3>
      <form onSubmit={onSignup}>
        <input
          onChange={handleChange}
          type='text'
          name='name'
          id='name'
          value={name}
          placeholder='insert your name...'
        />
        <button>signup</button>
      </form>
    </section>
  )
}
