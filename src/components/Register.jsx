import ApplicationLogo from 'components/ApplicationLogo'
import AuthCard from 'components/AuthCard'
import AuthValidationErrors from 'components/AuthValidationErrors'
import Button from 'components/Button'
import GuestLayout from 'components/Layouts/GuestLayout'
import Input from 'components/Input'
import Label from 'components/Label'

import { useState } from 'react'
import {Link, NavLink} from 'react-router-dom';
import {useAuth} from "../hooks/auth.js";

const Register = () => {
  const { register } = useAuth({
    middleware: 'guest',
    redirectIfAuthenticated: '/dashboard'
  })

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [password_confirmation, setPasswordConfirmation] = useState('')
  const [errors, setErrors] = useState([])

  const submitForm = event => {
    event.preventDefault()
    register({ firstName, lastName, email, password, password_confirmation, setErrors })
  }

  return (
    <GuestLayout>
      <AuthCard
        logo={
          <Link to="/">
            <ApplicationLogo className="w-40 h-40" />
          </Link>
        }>
        {/* Validation Errors */}
        <AuthValidationErrors className="mb-4" errors={errors} />
        <form onSubmit={submitForm}>
          {/* Name */}
          <div>
            <Label htmlFor="first_name">First Name</Label>
            <Input
                id="first_name"
                type="text"
                value={firstName}
                className="block mt-1 w-full"
                onChange={event => setFirstName(event.target.value)}
                required
                autoFocus
            />
          </div>
          <div>
            <Label htmlFor="last_name">Last Name</Label>
            <Input
                id="last_name"
                type="text"
                value={lastName}
                className="block mt-1 w-full"
                onChange={event => setLastName(event.target.value)}
                required
            />
          </div>
          {/* Email Address */}
          <div className="mt-4">
            <Label htmlFor="email">Email</Label>
            <Input
                id="email"
                type="email"
                value={email}
                className="block mt-1 w-full"
                onChange={event => setEmail(event.target.value)}
                required
            />
          </div>
          {/* Password */}
          <div className="mt-4">
            <Label htmlFor="password">Password</Label>
            <Input
                id="password"
                type="password"
                value={password}
                className="block mt-1 w-full"
                onChange={event => setPassword(event.target.value)}
                required
                autoComplete="new-password"
            />
          </div>
          {/* Confirm Password */}
          <div className="mt-4">
            <Label htmlFor="password_confirmation">
              Confirm Password
            </Label>
            <Input
                id="password_confirmation"
                type="password"
                value={password_confirmation}
                className="block mt-1 w-full"
                onChange={event =>
                    setPasswordConfirmation(event.target.value)
                }
                required
            />
          </div>
          <div className="flex items-center justify-end mt-4">
            <NavLink
                to="/login"
                className="underline text-sm text-gray-600 hover:text-gray-900"
            >
              Already registered?
            </NavLink>
            <Button className="ml-4">Register</Button>
          </div>
        </form>
      </AuthCard>
    </GuestLayout>
  )
}

export default Register
