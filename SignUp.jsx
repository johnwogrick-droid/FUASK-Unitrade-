import { useState } from 'react'
import {
  ArrowLeft,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  ShieldCheck,
  ShoppingBag,
  UserRound,
} from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import './SignUp.css'

function SignUp() {
  const navigate = useNavigate()

  const [form, setForm] = useState({
    fullName: '',
    email: '',
    matricNumber: '',
    password: '',
    confirmPassword: '',
  })

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [agreeTerms, setAgreeTerms] = useState(false)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const updateField = (field, value) => {
    setForm((current) => ({
      ...current,
      [field]: value,
    }))

    setError('')
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setError('')

    const fullName = form.fullName.trim()
    const email = form.email.trim()
    const matricNumber = form.matricNumber.trim()

    if (!fullName || !email || !matricNumber || !form.password) {
      setError('Please complete all required fields.')
      return
    }

    if (!email.includes('@')) {
      setError('Please enter a valid student email address.')
      return
    }

    if (matricNumber.length < 4) {
      setError('Please enter a valid matric number.')
      return
    }

    if (form.password.length < 6) {
      setError('Password must contain at least 6 characters.')
      return
    }

    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match.')
      return
    }

    if (!agreeTerms) {
      setError('Please agree to the UniTrade terms before continuing.')
      return
    }

    setIsLoading(true)

    const nameParts = fullName.split(/\s+/)
    const initials =
      nameParts.length >= 2
        ? `${nameParts[0][0]}${nameParts[nameParts.length - 1][0]}`
        : fullName.slice(0, 2)

    const profile = {
      name: fullName,
      initials: initials.toUpperCase(),
      email,
      matricNumber,
      school: 'FUASK',
      verified: false,
    }

    localStorage.setItem('unitrade-session', 'active')
    localStorage.setItem('unitrade-profile', JSON.stringify(profile))
    localStorage.setItem('unitrade-mode', 'buyer')

    setTimeout(() => {
      navigate('/dashboard', { replace: true })
    }, 400)
  }

  return (
    <div className="signup-page">
      <header className="signup-header">
        <Link to="/" className="signup-logo">
          <span className="signup-logo-icon">
            <ShoppingBag size={22} strokeWidth={2.2} />
          </span>

          <span className="signup-logo-text">UniTrade</span>
        </Link>

        <Link to="/" className="signup-back-link">
          <ArrowLeft size={17} />
          Back to home
        </Link>
      </header>

      <main className="signup-main">
        <section className="signup-card">
          <div className="signup-intro">
            <div className="signup-icon">
              <UserRound size={25} strokeWidth={2} />
            </div>

            <span className="signup-eyebrow">Join your campus</span>

            <h1>Create your UniTrade account</h1>

            <p>
              Create your student account and start buying and selling
              within your campus community.
            </p>
          </div>

          <form className="signup-form" onSubmit={handleSubmit}>
            <div className="signup-field">
              <label htmlFor="fullName">Full name</label>

              <div className="signup-input-wrap">
                <UserRound size={19} />

                <input
                  id="fullName"
                  type="text"
                  value={form.fullName}
                  onChange={(event) =>
                    updateField('fullName', event.target.value)
                  }
                  placeholder="Enter your full name"
                  autoComplete="name"
                />
              </div>
            </div>

            <div className="signup-field">
              <label htmlFor="email">Student email</label>

              <div className="signup-input-wrap">
                <Mail size={19} />

                <input
                  id="email"
                  type="email"
                  value={form.email}
                  onChange={(event) =>
                    updateField('email', event.target.value)
                  }
                  placeholder="you@school.edu.ng"
                  autoComplete="email"
                />
              </div>

              <span className="signup-hint">
                Use the email associated with your school.
              </span>
            </div>

            <div className="signup-field">
              <label htmlFor="matricNumber">Matric number</label>

              <div className="signup-input-wrap">
                <ShieldCheck size={19} />

                <input
                  id="matricNumber"
                  type="text"
                  value={form.matricNumber}
                  onChange={(event) =>
                    updateField(
                      'matricNumber',
                      event.target.value
                    )
                  }
                  placeholder="e.g. FUAS/01/01/01/0010"
                  autoComplete="off"
                />
              </div>

              <span className="signup-hint">
                Your matric number helps establish your student identity.
              </span>
            </div>

            <div className="signup-field">
              <label htmlFor="password">Password</label>

              <div className="signup-input-wrap">
                <LockKeyhole size={19} />

                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={form.password}
                  onChange={(event) =>
                    updateField('password', event.target.value)
                  }
                  placeholder="Create a password"
                  autoComplete="new-password"
                />

                <button
                  type="button"
                  className="signup-password-toggle"
                  onClick={() =>
                    setShowPassword((current) => !current)
                  }
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

              <span className="signup-hint">
                Use at least 6 characters.
              </span>
            </div>

            <div className="signup-field">
              <label htmlFor="confirmPassword">
                Confirm password
              </label>

              <div className="signup-input-wrap">
                <LockKeyhole size={19} />

                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={form.confirmPassword}
                  onChange={(event) =>
                    updateField(
                      'confirmPassword',
                      event.target.value
                    )
                  }
                  placeholder="Enter your password again"
                  autoComplete="new-password"
                />

                <button
                  type="button"
                  className="signup-password-toggle"
                  onClick={() =>
                    setShowConfirmPassword(
                      (current) => !current
                    )
                  }
                  aria-label={
                    showConfirmPassword
                      ? 'Hide password'
                      : 'Show password'
                  }
                >
                  {showConfirmPassword ? (
                    <EyeOff size={19} />
                  ) : (
                    <Eye size={19} />
                  )}
                </button>
              </div>
            </div>

            <label className="signup-terms">
              <input
                type="checkbox"
                checked={agreeTerms}
                onChange={(event) =>
                  setAgreeTerms(event.target.checked)
                }
              />

              <span>
                I agree to UniTrade's terms and understand that
                student verification may be required.
              </span>
            </label>

            {error && (
              <div className="signup-error" role="alert">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="signup-submit"
              disabled={isLoading}
            >
              {isLoading ? 'Creating account...' : 'Create account'}
            </button>
          </form>

          <div className="signup-divider">
            <span>Already have an account?</span>
          </div>

          <Link to="/login" className="signup-login-link">
            Log in to UniTrade
          </Link>

          <div className="signup-security">
            <ShieldCheck size={18} />

            <div>
              <strong>Built around student trust</strong>

              <span>
                Verified identities, ratings and completed trades
                help make campus trading safer.
              </span>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default SignUp