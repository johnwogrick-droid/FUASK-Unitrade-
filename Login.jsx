import { useState } from 'react'
import {
  ArrowLeft,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  ShieldCheck,
  ShoppingBag,
} from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import './Login.css'

function Login() {
  const navigate = useNavigate()

  const [loginType, setLoginType] = useState('email')
  const [identifier, setIdentifier] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const identifierLabel =
    loginType === 'email' ? 'Student email' : 'Matric number'

  const identifierPlaceholder =
    loginType === 'email'
      ? 'you@school.edu.ng'
      : 'e.g. FUAS/01/01/01/0010'

  const handleSubmit = (event) => {
    event.preventDefault()
    setError('')

    const trimmedIdentifier = identifier.trim()

    if (!trimmedIdentifier || !password) {
      setError('Please enter your login details.')
      return
    }

    if (loginType === 'email' && !trimmedIdentifier.includes('@')) {
      setError('Please enter a valid student email address.')
      return
    }

    if (loginType === 'matric' && trimmedIdentifier.length < 4) {
      setError('Please enter a valid matric number.')
      return
    }

    if (password.length < 6) {
      setError('Password must contain at least 6 characters.')
      return
    }

    setIsLoading(true)

    const profile = {
      name: 'John Doe',
      initials: 'JD',
      email:
        loginType === 'email'
          ? trimmedIdentifier
          : 'student@unitrade.edu.ng',
      matricNumber:
        loginType === 'matric' ? trimmedIdentifier : '',
      school: 'FUASK',
      verified: true,
    }

    localStorage.setItem('unitrade-session', 'active')
    localStorage.setItem('unitrade-profile', JSON.stringify(profile))

    if (rememberMe) {
      localStorage.setItem('unitrade-remember', 'true')
    } else {
      localStorage.removeItem('unitrade-remember')
    }

    setTimeout(() => {
      navigate('/dashboard', { replace: true })
    }, 400)
  }

  return (
    <div className="login-page">
      <header className="login-header">
        <Link to="/" className="login-logo">
          <span className="login-logo-icon">
            <ShoppingBag size={22} strokeWidth={2.2} />
          </span>

          <span className="login-logo-text">UniTrade</span>
        </Link>

        <Link to="/" className="login-back-link">
          <ArrowLeft size={17} />
          Back to home
        </Link>
      </header>

      <main className="login-main">
        <section className="login-card">
          <div className="login-intro">
            <div className="login-icon">
              <LockKeyhole size={25} strokeWidth={2} />
            </div>

            <span className="login-eyebrow">Welcome back</span>

            <h1>Log in to UniTrade</h1>

            <p>
              Access your campus marketplace, listings, messages and
              trades.
            </p>
          </div>

          <div className="login-switcher">
            <button
              type="button"
              className={loginType === 'email' ? 'active' : ''}
              onClick={() => {
                setLoginType('email')
                setIdentifier('')
                setError('')
              }}
            >
              Student email
            </button>

            <button
              type="button"
              className={loginType === 'matric' ? 'active' : ''}
              onClick={() => {
                setLoginType('matric')
                setIdentifier('')
                setError('')
              }}
            >
              Matric number
            </button>
          </div>

          <form className="login-form" onSubmit={handleSubmit}>
            <div className="login-field">
              <label htmlFor="identifier">{identifierLabel}</label>

              <div className="login-input-wrap">
                {loginType === 'email' ? (
                  <Mail size={19} />
                ) : (
                  <ShieldCheck size={19} />
                )}

                <input
                  id="identifier"
                  type={loginType === 'email' ? 'email' : 'text'}
                  value={identifier}
                  onChange={(event) => setIdentifier(event.target.value)}
                  placeholder={identifierPlaceholder}
                  autoComplete={
                    loginType === 'email'
                      ? 'email'
                      : 'username'
                  }
                />
              </div>
            </div>

            <div className="login-field">
              <div className="login-label-row">
                <label htmlFor="password">Password</label>

                <button
                  type="button"
                  className="forgot-password"
                  onClick={() =>
                    setError(
                      'Password recovery will be connected to the backend.'
                    )
                  }
                >
                  Forgot password?
                </button>
              </div>

              <div className="login-input-wrap">
                <LockKeyhole size={19} />

                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                />

                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword((current) => !current)}
                  aria-label={
                    showPassword
                      ? 'Hide password'
                      : 'Show password'
                  }
                >
                  {showPassword ? (
                    <EyeOff size={19} />
                  ) : (
                    <Eye size={19} />
                  )}
                </button>
              </div>
            </div>

            <label className="remember-row">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(event) =>
                  setRememberMe(event.target.checked)
                }
              />

              <span>Remember me on this device</span>
            </label>

            {error && (
              <div className="login-error" role="alert">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="login-submit"
              disabled={isLoading}
            >
              {isLoading ? 'Signing in...' : 'Log in'}
            </button>
          </form>

          <div className="login-divider">
            <span>or</span>
          </div>

          <div className="login-signup">
            <span>Don't have a UniTrade account?</span>

            <Link to="/signup">Create an account</Link>
          </div>

          <div className="login-security">
            <ShieldCheck size={18} />

            <div>
              <strong>Student-first marketplace</strong>
              <span>
                Your student identity helps keep campus trading
                trustworthy.
              </span>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default Login