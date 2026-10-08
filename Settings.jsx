import { useEffect, useState } from 'react'
import {
  ArrowLeft,
  Bell,
  ChevronRight,
  Eye,
  EyeOff,
  LockKeyhole,
  LogOut,
  Moon,
  ShieldCheck,
  ShoppingBag,
  UserRound,
  HelpCircle,
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'

function Settings() {
  const navigate = useNavigate()

  const [notificationsEnabled, setNotificationsEnabled] = useState(true)
  const [showOnlineStatus, setShowOnlineStatus] = useState(true)
  const [showProfile, setShowProfile] = useState(true)
  const [darkMode, setDarkMode] = useState(false)

  const [showPassword, setShowPassword] = useState(false)
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [passwordMessage, setPasswordMessage] = useState('')

  useEffect(() => {
    try {
      const savedSettings = localStorage.getItem('unitrade-settings')

      if (savedSettings) {
        const settings = JSON.parse(savedSettings)

        if (typeof settings.notificationsEnabled === 'boolean') {
          setNotificationsEnabled(settings.notificationsEnabled)
        }

        if (typeof settings.showOnlineStatus === 'boolean') {
          setShowOnlineStatus(settings.showOnlineStatus)
        }

        if (typeof settings.showProfile === 'boolean') {
          setShowProfile(settings.showProfile)
        }

        if (typeof settings.darkMode === 'boolean') {
          setDarkMode(settings.darkMode)
        }
      }
    } catch {
      // Keep default settings.
    }
  }, [])

  useEffect(() => {
    try {
      localStorage.setItem(
        'unitrade-settings',
        JSON.stringify({
          notificationsEnabled,
          showOnlineStatus,
          showProfile,
          darkMode,
        }),
      )
    } catch {
      // Ignore localStorage errors.
    }
  }, [
    notificationsEnabled,
    showOnlineStatus,
    showProfile,
    darkMode,
  ])

  const handlePasswordChange = (event) => {
    event.preventDefault()
    setPasswordMessage('')

    if (!currentPassword || !newPassword || !confirmPassword) {
      setPasswordMessage('Please complete all password fields.')
      return
    }

    if (newPassword.length < 8) {
      setPasswordMessage(
        'Your new password must contain at least 8 characters.',
      )
      return
    }

    if (newPassword !== confirmPassword) {
      setPasswordMessage('The new passwords do not match.')
      return
    }

    setPasswordMessage('Password change saved successfully.')

    setCurrentPassword('')
    setNewPassword('')
    setConfirmPassword('')
  }

  const handleLogout = () => {
    localStorage.removeItem('unitrade-session')
    navigate('/login')
  }

  return (
    <div className="settings-page">
      <header className="settings-header">
        <div className="settings-header-inner">
          <button
            type="button"
            className="settings-back-button"
            onClick={() => navigate('/profile')}
            aria-label="Back to profile"
          >
            <ArrowLeft size={20} />
          </button>

          <button
            type="button"
            className="settings-logo"
            onClick={() => navigate('/')}
            aria-label="Go to UniTrade home"
          >
            <span className="settings-logo-icon">
              <ShoppingBag size={22} strokeWidth={2.2} />
            </span>

            <span className="settings-logo-text">UniTrade</span>
          </button>
        </div>
      </header>

      <main className="settings-main">
        <div className="settings-title">
          <h1>Settings</h1>
          <p>
            Manage your UniTrade account, privacy, notifications and security.
          </p>
        </div>

        <div className="settings-layout">
          <aside className="settings-sidebar">
            <button
              type="button"
              className="settings-side-item settings-side-item-active"
            >
              <UserRound size={18} />
              Account
            </button>

            <button
              type="button"
              className="settings-side-item"
              onClick={() => navigate('/notifications')}
            >
              <Bell size={18} />
              Notifications
            </button>

            <button
              type="button"
              className="settings-side-item"
              onClick={() => navigate('/account-details')}
            >
              <ShieldCheck size={18} />
              Security
            </button>

            <button
              type="button"
              className="settings-side-item"
              onClick={() => navigate('/help-support')}
            >
              <HelpCircle size={18} />
              Help & Support
            </button>
          </aside>

          <section className="settings-content">
            <div className="settings-card">
              <div className="settings-card-heading">
                <div>
                  <h2>Account</h2>
                  <p>Manage your profile and account information.</p>
                </div>
              </div>

              <div className="settings-option">
                <div className="settings-option-icon">
                  <UserRound size={19} />
                </div>

                <div className="settings-option-content">
                  <strong>Edit profile</strong>
                  <span>
                    Change your name, username, phone number and bio.
                  </span>
                </div>

                <button
                  type="button"
                  className="settings-option-button"
                  onClick={() => navigate('/edit-profile')}
                  aria-label="Edit profile"
                >
                  <ChevronRight size={19} />
                </button>
              </div>

              <div className="settings-option">
                <div className="settings-option-icon">
                  <ShieldCheck size={19} />
                </div>

                <div className="settings-option-content">
                  <strong>Account details</strong>
                  <span>
                    View your email, student verification and account status.
                  </span>
                </div>

                <button
                  type="button"
                  className="settings-option-button"
                  onClick={() => navigate('/account-details')}
                  aria-label="Account details"
                >
                  <ChevronRight size={19} />
                </button>
              </div>
            </div>

            <div className="settings-card">
              <div className="settings-card-heading">
                <div>
                  <h2>Notifications</h2>
                  <p>Choose how UniTrade keeps you informed.</p>
                </div>
              </div>

              <div className="settings-toggle-row">
                <div className="settings-option-icon">
                  <Bell size={19} />
                </div>

                <div className="settings-option-content">
                  <strong>Push notifications</strong>
                  <span>
                    Receive updates about messages, listings and account
                    activity.
                  </span>
                </div>

                <button
                  type="button"
                  className={`settings-switch ${
                    notificationsEnabled
                      ? 'settings-switch-on'
                      : ''
                  }`}
                  onClick={() =>
                    setNotificationsEnabled((current) => !current)
                  }
                  aria-label="Toggle push notifications"
                  aria-pressed={notificationsEnabled}
                >
                  <span />
                </button>
              </div>
            </div>

            <div className="settings-card">
              <div className="settings-card-heading">
                <div>
                  <h2>Privacy</h2>
                  <p>Control what other UniTrade users can see.</p>
                </div>
              </div>

              <div className="settings-toggle-row">
                <div className="settings-option-icon">
                  <Eye size={19} />
                </div>

                <div className="settings-option-content">
                  <strong>Show online status</strong>
                  <span>
                    Let other users know when you are currently active.
                  </span>
                </div>

                <button
                  type="button"
                  className={`settings-switch ${
                    showOnlineStatus ? 'settings-switch-on' : ''
                  }`}
                  onClick={() =>
                    setShowOnlineStatus((current) => !current)
                  }
                  aria-label="Toggle online status"
                  aria-pressed={showOnlineStatus}
                >
                  <span />
                </button>
              </div>

              <div className="settings-toggle-row">
                <div className="settings-option-icon">
                  {showProfile ? (
                    <Eye size={19} />
                  ) : (
                    <EyeOff size={19} />
                  )}
                </div>

                <div className="settings-option-content">
                  <strong>Profile visibility</strong>
                  <span>
                    Allow other verified students to discover your profile.
                  </span>
                </div>

                <button
                  type="button"
                  className={`settings-switch ${
                    showProfile ? 'settings-switch-on' : ''
                  }`}
                  onClick={() =>
                    setShowProfile((current) => !current)
                  }
                  aria-label="Toggle profile visibility"
                  aria-pressed={showProfile}
                >
                  <span />
                </button>
              </div>
            </div>

            <div className="settings-card">
              <div className="settings-card-heading">
                <div>
                  <h2>Appearance</h2>
                  <p>Choose how UniTrade looks on your device.</p>
                </div>
              </div>

              <div className="settings-toggle-row">
                <div className="settings-option-icon">
                  <Moon size={19} />
                </div>

                <div className="settings-option-content">
                  <strong>Dark mode</strong>
                  <span>
                    Dark mode will be available across the complete UniTrade
                    interface.
                  </span>
                </div>

                <button
                  type="button"
                  className={`settings-switch ${
                    darkMode ? 'settings-switch-on' : ''
                  }`}
                  onClick={() => setDarkMode((current) => !current)}
                  aria-label="Toggle dark mode"
                  aria-pressed={darkMode}
                >
                  <span />
                </button>
              </div>

              {darkMode && (
                <div className="settings-info-message">
                  Dark mode preference has been saved. The full dark theme
                  will be connected across the application when the global
                  theme system is implemented.
                </div>
              )}
            </div>

            <div className="settings-card">
              <div className="settings-card-heading">
                <div>
                  <h2>Security</h2>
                  <p>Keep your UniTrade account protected.</p>
                </div>

                <LockKeyhole size={20} />
              </div>

              <form
                className="settings-password-form"
                onSubmit={handlePasswordChange}
              >
                <div className="settings-input-group">
                  <label htmlFor="current-password">
                    Current password
                  </label>

                  <input
                    id="current-password"
                    type={showPassword ? 'text' : 'password'}
                    value={currentPassword}
                    onChange={(event) =>
                      setCurrentPassword(event.target.value)
                    }
                    placeholder="Enter current password"
                  />
                </div>

                <div className="settings-input-group">
                  <label htmlFor="new-password">New password</label>

                  <input
                    id="new-password"
                    type={showPassword ? 'text' : 'password'}
                    value={newPassword}
                    onChange={(event) =>
                      setNewPassword(event.target.value)
                    }
                    placeholder="At least 8 characters"
                  />
                </div>

                <div className="settings-input-group">
                  <label htmlFor="confirm-password">
                    Confirm new password
                  </label>

                  <input
                    id="confirm-password"
                    type={showPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(event) =>
                      setConfirmPassword(event.target.value)
                    }
                    placeholder="Repeat new password"
                  />
                </div>

                <label className="settings-password-visibility">
                  <input
                    type="checkbox"
                    checked={showPassword}
                    onChange={(event) =>
                      setShowPassword(event.target.checked)
                    }
                  />
                  <span>Show passwords</span>
                </label>

                {passwordMessage && (
                  <div
                    className={`settings-password-message ${
                      passwordMessage.includes('successfully')
                        ? 'settings-password-success'
                        : 'settings-password-error'
                    }`}
                  >
                    {passwordMessage}
                  </div>
                )}

                <button
                  type="submit"
                  className="settings-save-password"
                >
                  Update password
                </button>
              </form>
            </div>

            <div className="settings-danger-card">
              <div>
                <h2>Sign out</h2>
                <p>
                  Sign out of UniTrade on this device.
                </p>
              </div>

              <button
                type="button"
                className="settings-logout-button"
                onClick={handleLogout}
              >
                <LogOut size={17} />
                Sign out
              </button>
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}

export default Settings