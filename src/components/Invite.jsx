import AuthSessionStatus from 'components/AuthSessionStatus'
import AuthValidationErrors from 'components/AuthValidationErrors'
import Button from 'components/Button'
import Label from 'components/Label'
import { useState } from 'react'
import {useAuth} from "../hooks/auth.js";
import SelectAsyncPaginate from "./SelectAsyncPaginate.jsx";

const Login = () => {

  const { invite } = useAuth({
    middleware: 'guest',
    redirectIfAuthenticated: '/dashboard'
  })

  const [errors, setErrors] = useState([])
  const [status, setStatus] = useState(null)
  const [currentUser, setCurrentUser] = useState(null);

  const submitForm = async event => {
     console.log('test', currentUser)
      const  userId = currentUser.userId
    event.preventDefault()
      invite({ userId, setErrors, setStatus })
  }

  return (
      <div className="col-md-2  offset-md-1">
        <div className="w-full sm:max-w-md  px-6 py-4 bg-white shadow-md  sm:rounded-lg">
        {/* Session Status */}
        <AuthSessionStatus className="mb-4" status={status}/>
        {/* Validation Errors */}
        <AuthValidationErrors className="mb-4" errors={errors}/>
        <form onSubmit={submitForm}>
          {/* User */}
          <div>
            <Label htmlFor="email">User</Label>
              <SelectAsyncPaginate
                  value={currentUser}
                  onChange={(user) => setCurrentUser(user)}
              />
          </div>
          <div className="flex items-center justify-end mt-4">
            <Button className="ml-3">
              Invite
            </Button>
          </div>
        </form>
        </div>
      </div>
  )
}

export default Login
