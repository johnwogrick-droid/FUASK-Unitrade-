import { useEffect, useState } from 'react'
import {
  ArrowLeft,
  BadgeCheck,
  ChevronRight,
  Eye,
  EyeOff,
  KeyRound,
  LockKeyhole,
  Mail,
  Phone,
  Settings,
  ShieldCheck,
  ShoppingBag,
  UserRound,
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import './AccountDetails.css'

const DEFAULT_PROFILE = {
  firstName: 'John',
  lastName: 'Doe',
  username: 'johndoe',
  phone: '',
  email: 'john.doe@student.fuask.edu.ng',
}

function AccountDetails() {
  const navigate = useNavigate()

  const [profile, setProfile] = useState(DEFAULT_PROFILE)
  const [showPassword, setShowPassword] = useState(false)

  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const [passwordMessage, setPasswordMessage] = useState('')
  const [passwordError, setPasswordError] = useState('')

  useEffect(() => {
    try {
      const storedProfile = localStorage.getItem('unitrade-profile')

      if (storedProfile) {
        const parsedProfile = JSON.parse(storedProfile)

        setProfile({
          ...DEFAULT_PROFILE,
          ...parsedProfile,
        })
      }
    } catch (error) {
      console.error('Unable to load stored UniTrade profile:', error)
      setProfile(DEFAULT_PROFILE)
    }
  }, [])

  const fullName =
    `${profile.firstName || ''} ${profile.lastName || ''}`.trim() ||
    'John Doe'

  const initials =
    `${profile.firstName?.charAt(0) || 'J'}${
      profile.lastName?.charAt(0) || 'D'
    }`.toUpperCase()

  function handlePasswordChange(event) {
    event.preventDefault()

    setPasswordMessage('')
    setPasswordError('')

    if (!currentPassword.trim()) {
      setPasswordError('Enter your current password.')
      return
    }

    if (!newPassword.trim()) {
      setPasswordError('Enter a new password.')
      return
    }

    if (newPassword.length < 8) {
      setPasswordError(
        'Your new password must contain at least 8 characters.',
      )
      return
    }

    if (newPassword !== confirmPassword) {
      setPasswordError('The new passwords do not match.')
      return
    }

    /*
      Frontend-only for now.
      Replace this section with the backend password-change API
      when authentication is connected.
    */
    setPasswordMessage(
      'Password change request validated. The backend will complete the password change when authentication is connected.',
    )

    setCurrentPassword('')
    setNewPassword('')
    setConfirmPassword('')
  }

  return (
    <div className="account-details-page">
      {/* HEADER */}
      <header className="account-details-header">
        <div className="account-details-header-inner">
          <button
            type="button"
            className="account-details-back"
            onClick={() => navigate('/profile')}
            aria-label="Go back to profile"
          >
            <ArrowLeft size={19} />
            <span>Back to Profile</span>
          </button>

          <button
            type="button"
            className="unitrade-account-logo"
            onClick={() => navigate('/onboarding')}
            aria-label="Go to UniTrade onboarding"
          >
            <span className="unitrade-account-logo-icon">
              <ShoppingBag
                size={22}
                strokeWidth={2.2}
              />
            </span>

            <span className="unitrade-account-logo-text">
              UniTrade
            </span>
          </button>

          <div className="account-details-header-space" />
        </div>
      </header>

      <main className="account-details-main">
        {/* PAGE INTRO */}
        <section className="account-details-intro">
          <span className="account-details-eyebrow">
            Account
          </span>

          <h1>Account Details</h1>

          <p>
            View your account information and manage your UniTrade
            security settings.
          </p>
        </section>

        {/* ACCOUNT OVERVIEW */}
        <section className="account-details-card">
          <div className="account-details-card-heading">
            <div>
              <h2>Account overview</h2>

              <p>
                Your basic UniTrade account information.
              </p>
            </div>

            <div className="account-security-badge">
              <ShieldCheck size={16} />
              <span>Secure</span>
            </div>
          </div>

          <div className="account-profile-summary">
            <div
              className="account-profile-avatar"
              aria-label={`Profile initials for ${fullName}`}
            >
              {initials}
            </div>

            <div className="account-profile-summary-info">
              <div className="account-profile-name">
                <h3>{fullName}</h3>

                <BadgeCheck
                  size={18}
                  aria-label="Verified"
                />
              </div>

              <p>
                @{profile.username || 'johndoe'}
              </p>

              <span>
                Verified student account
              </span>
            </div>

            <button
              type="button"
              className="account-edit-profile-button"
              onClick={() => navigate('/edit-profile')}
            >
              Edit Profile
              <ChevronRight size={16} />
            </button>
          </div>
        </section>

        {/* ACCOUNT INFORMATION */}
        <section className="account-details-card">
          <div className="account-details-card-heading">
            <div>
              <h2>Account information</h2>

              <p>
                Information associated with your UniTrade account.
              </p>
            </div>
          </div>

          <div className="account-information-list">
            {/* EMAIL */}
            <div className="account-information-item">
              <div className="account-information-icon">
                <Mail size={18} />
              </div>

              <div className="account-information-content">
                <span>Email address</span>

                <strong>
                  {profile.email || 'Not available'}
                </strong>

                <small>
                  This email is verified and cannot be changed here.
                </small>
              </div>

              <BadgeCheck
                size={18}
                className="account-verified-icon"
              />
            </div>

            {/* USERNAME */}
            <div className="account-information-item">
              <div className="account-information-icon">
                <UserRound size={18} />
              </div>

              <div className="account-information-content">
                <span>Username</span>

                <strong>
                  @{profile.username || 'johndoe'}
                </strong>
              </div>
            </div>

            {/* PHONE */}
            <div className="account-information-item">
              <div className="account-information-icon">
                <Phone size={18} />
              </div>

              <div className="account-information-content">
                <span>Phone number</span>

                <strong>
                  {profile.phone || 'Not added'}
                </strong>

                {!profile.phone && (
                  <small>
                    Add a phone number from Edit Profile.
                  </small>
                )}
              </div>
            </div>

            {/* VERIFICATION */}
            <div className="account-information-item">
              <div className="account-information-icon">
                <BadgeCheck size={18} />
              </div>

              <div className="account-information-content">
                <span>Student verification</span>

                <strong>Verified</strong>

                <small>
                  Your student identity has been verified.
                </small>
              </div>

              <span className="account-verified-label">
                Verified
              </span>
            </div>
          </div>
        </section>

        {/* SECURITY */}
        <section className="account-details-card">
          <div className="account-details-card-heading">
            <div>
              <h2>Security</h2>

              <p>
                Manage the security of your UniTrade account.
              </p>
            </div>
          </div>

          <div className="account-security-item">
            <div className="account-security-item-icon">
              <LockKeyhole size={19} />
            </div>

            <div className="account-security-item-content">
              <h3>Password</h3>

              <p>
                Change your account password regularly to keep
                your account secure.
              </p>
            </div>
          </div>

          <form
            className="account-password-form"
            onSubmit={handlePasswordChange}
          >
            {/* CURRENT PASSWORD */}
            <div className="account-password-field">
              <label htmlFor="currentPassword">
                Current password
              </label>

              <div className="password-input-wrapper">
                <input
                  id="currentPassword"
                  name="currentPassword"
                  type={showPassword ? 'text' : 'password'}
                  value={currentPassword}
                  onChange={(event) =>
                    setCurrentPassword(event.target.value)
                  }
                  placeholder="Enter current password"
                  autoComplete="current-password"
                />

                <button
                  type="button"
                  className="password-visibility-button"
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
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>
            </div>

            {/* NEW + CONFIRM PASSWORD */}
            <div className="account-password-grid">
              <div className="account-password-field">
                <label htmlFor="newPassword">
                  New password
                </label>

                <input
                  id="newPassword"
                  name="newPassword"
                  type={showPassword ? 'text' : 'password'}
                  value={newPassword}
                  onChange={(event) =>
                    setNewPassword(event.target.value)
                  }
                  placeholder="At least 8 characters"
                  autoComplete="new-password"
                />
              </div>

              <div className="account-password-field">
                <label htmlFor="confirmPassword">
                  Confirm new password
                </label>

                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(event) =>
                    setConfirmPassword(event.target.value)
                  }
                  placeholder="Repeat your new password"
                  autoComplete="new-password"
                />
              </div>
            </div>

            {/* ERROR */}
            {passwordError && (
              <div
                className="account-password-error"
                role="alert"
              >
                {passwordError}
              </div>
            )}

            {/* SUCCESS */}
            {passwordMessage && (
              <div
                className="account-password-success"
                role="status"
              >
                {passwordMessage}
              </div>
            )}

            <button
              type="submit"
              className="account-change-password-button"
            >
              <KeyRound size={17} />
              <span>Change Password</span>
            </button>
          </form>
        </section>

        {/* VERIFICATION */}
        <section className="account-verification-card">
          <div className="account-verification-icon">
            <BadgeCheck size={24} />
          </div>

          <div>
            <h2>Verified student account</h2>

            <p>
              UniTrade uses student verification to help create a
              safer campus marketplace. Your verification status
              is tied to your account and cannot be manually edited.
            </p>
          </div>
        </section>

        {/* ACCOUNT ACTIONS */}
        <section className="account-details-card account-actions-card">
          <div className="account-details-card-heading">
            <div>
              <h2>Account actions</h2>

              <p>
                Other actions related to your account.
              </p>
            </div>
          </div>

          <button
            type="button"
            className="account-action-row"
            onClick={() => navigate('/settings')}
          >
            <div className="account-action-row-left">
              <Settings size={18} />
              <span>Account Settings</span>
            </div>

            <ChevronRight size={18} />
          </button>

          <button
            type="button"
            className="account-action-row"
            onClick={() => navigate('/help-support')}
          >
            <div className="account-action-row-left">
              <ShieldCheck size={18} />
              <span>Help &amp; Support</span>
            </div>

            <ChevronRight size={18} />
          </button>
        </section>
      </main>
    </div>
  )
}

export default AccountDetails