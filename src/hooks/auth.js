import useSWR from 'swr'
import axios from 'lib/axios'
import {useEffect} from 'react'
import {useNavigate, useParams} from 'react-router-dom';

export const useAuth = ({middleware, redirectIfAuthenticated} = {}) => {

  const headers = { 'Authorization': 'Bearer ' + localStorage.getItem('token') };

  let navigate = useNavigate();
  let params = useParams();

  const {data: user, error, mutate} = useSWR('/api/user', () =>
    axios
      .get('/api/user', {headers})
      .then(res => res.data)
      .catch(error => {
        console.log('error', error.response)
        if (error.response.status !== 409) throw error

        mutate('/verify-email')
      }),
  {
    revalidateIfStale: false,
    revalidateOnFocus: false
  }
  )

  const csrf = () => axios.get('/sanctum/csrf-cookie')

  const register = async ({setErrors, ...props}) => {
    await csrf()
    setErrors([])
    axios
      .post(import.meta.env.VITE_APP_BACKEND_URL_API + '/register', props)
      .then((response) => {
            mutate()
            localStorage.setItem('token', response.data.token)
            localStorage.setItem('userId', response.data.user.userId)
      })
      .catch(error => {
        console.log(error)
        if (error.response.status !== 422) throw error
        setErrors(Object.values(error.response.data.errors).flat())
      })
  }

  const login = async ({setErrors, setStatus, ...props}) => {
    await csrf()
    setErrors([])
    setStatus(null)


    axios
      .post(import.meta.env.VITE_APP_BACKEND_URL_API + '/login', props)
      .then((response) => {
        console.log('data', response.data)
        localStorage.setItem('token', response.data.token)
        localStorage.setItem('userId', response.data.user.userId)
        console.log(localStorage)
        mutate()
        window.location.reload()
      })
      .catch(error => {
        if (error.response.status !== 422) throw error
        setErrors(Object.values(error.response.data.errors).flat())
      })
  }

  const invite = async ({setErrors, setStatus, ...props}) => {
    await csrf()
    setErrors([])
    setStatus(null)


    axios
        .post(import.meta.env.VITE_APP_BACKEND_URL_API + '/chats', {...props}, {headers})
        .then((response) => {
          console.log('data', response.data)
          console.log(localStorage)
          mutate()
          window.location.reload()
        })
        .catch(error => {
          if (error.response.status !== 422) throw error
          setErrors(Object.values(error.response.data.errors).flat())
        })
  }

  const forgotPassword = async ({setErrors, setStatus, email}) => {
    await csrf()
    setErrors([])
    setStatus(null)
    axios
      .post('/forgot-password', {email})
      .then(response => setStatus(response.data.status))
      .catch(error => {
        if (error.response.status !== 422) throw error
        setErrors(Object.values(error.response.data.errors).flat())
      })
  }

  const resetPassword = async ({setErrors, setStatus, ...props}) => {
    await csrf()
    setErrors([])
    setStatus(null)
    axios
      .post('/reset-password', {token: params.token, ...props})
      .then(response => navigate(`/login?reset=${  btoa(response.data.status)}`))
      .catch(error => {
        if (error.response.status !== 422) throw error
        setErrors(Object.values(error.response.data.errors).flat())
      })
  }

  const resendEmailVerification = ({setStatus}) => {
    axios
      .post('/email/verification-notification')
      .then(response => setStatus(response.data.status))
  }

  const logout = async () => {
    if (!error) {
      await axios.post('/logout').catch(error => {
        console.log('error', error.response)
      })
      mutate()
    }
    localStorage.removeItem('token')
    localStorage.removeItem('userId')
    window.location.pathname = '/login'
  }

  useEffect(() => {
    if (middleware === 'guest' && redirectIfAuthenticated && user) navigate(redirectIfAuthenticated)
    if (middleware === 'auth' && error) logout()
  }, [user, error])

  return {
    user,
    register,
    login,
    invite,
    forgotPassword,
    resetPassword,
    resendEmailVerification,
    logout
  }
}
