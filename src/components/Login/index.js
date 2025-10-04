import {useState, useEffect} from 'react'
import {withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

const Login = props => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMsg, setErrorMsg] = useState('')

  useEffect(() => {
    const token = Cookies.get('jwt_token')
    if (token) {
      const {history} = props
      history.replace('/')
    }
  }, [props])

  const onSubmitForm = async e => {
    e.preventDefault()
    const userDetails = {username, password}

    const response = await fetch('https://apis.ccbp.in/login', {
      method: 'POST',
      body: JSON.stringify(userDetails),
    })
    const data = await response.json()

    if (response.ok) {
      Cookies.set('jwt_token', data.jwt_token, {expires: 30})
      const {history} = props
      history.replace('/')
    } else {
      setErrorMsg(data.error_msg)
    }
  }

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={onSubmitForm}>
        <h1 className="login-heading">Login</h1>

        <label htmlFor="username" className="login-label">
          USERNAME
        </label>
        <input
          id="username"
          type="text"
          value={username}
          onChange={e => setUsername(e.target.value)}
          className="login-input"
        />

        <label htmlFor="password" className="login-label">
          PASSWORD
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="login-input"
        />

        <button type="submit" className="login-btn">
          Login
        </button>

        {errorMsg !== '' && <p className="error-msg">{errorMsg}</p>}
      </form>
    </div>
  )
}

export default withRouter(Login)
