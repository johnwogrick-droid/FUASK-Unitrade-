import { useEffect, useState } from 'react'
import {
  ArrowLeft,
  BadgeCheck,
  Camera,
  Check,
  Mail,
  Phone,
  Save,
  ShoppingBag,
  UserRound,
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const DEFAULT_PROFILE = {
  firstName: 'John',
  lastName: 'Doe',
  username: 'johndoe',
  bio: 'Student and active member of the UniTrade community.',
  phone: '',
  email: 'john.doe@student.fuask.edu.ng',
}

function EditProfile() {
  const navigate = useNavigate()

  const [formData, setFormData] = useState(DEFAULT_PROFILE)
  const [errors, setErrors] = useState({})
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    try {
      const storedProfile = localStorage.getItem(
        'unitrade-profile',
      )

      if (storedProfile) {
        setFormData({
          ...DEFAULT_PROFILE,
          ...JSON.parse(storedProfile),
        })
      }
    } catch {
      setFormData(DEFAULT_PROFILE)
    }
  }, [])

  function handleChange(event) {
    const { name, value } = event.target

    setFormData((current) => ({
      ...current,
      [name]: value,
    }))

    setErrors((current) => ({
      ...current,
      [name]: '',
    }))

    setSaved(false)
  }

  function validateForm() {
    const newErrors = {}

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required.'
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required.'
    }

    if (
      formData.phone.trim() &&
      formData.phone.trim().length < 10
    ) {
      newErrors.phone = 'Enter a valid phone number.'
    }

    if (formData.bio.length > 160) {
      newErrors.bio = 'Bio cannot exceed 160 characters.'
    }

    setErrors(newErrors)

    return Object.keys(newErrors).length === 0
  }

  function handleSubmit(event) {
    event.preventDefault()

    if (!validateForm()) {
      return
    }

    localStorage.setItem(
      'unitrade-profile',
      JSON.stringify(formData),
    )

    setSaved(true)

    setTimeout(() => {
      navigate('/profile')
    }, 700)
  }

  const initials =
    `${formData.firstName.charAt(0)}${formData.lastName.charAt(
      0,
    )}`.toUpperCase()

  return (
    <div className="edit-profile-page">
      {/* HEADER */}
      <header className="edit-profile-header">
        <div className="edit-profile-header-inner">
          <button
            type="button"
            className="edit-profile-back"
            onClick={() => navigate('/profile')}
          >
            <ArrowLeft size={19} />
            <span>Back to Profile</span>
          </button>

          <button
            type="button"
            className="unitrade-edit-logo"
            onClick={() => navigate('/')}
            aria-label="Go to UniTrade home"
          >
            <span className="unitrade-edit-logo-icon">
              <ShoppingBag size={22} strokeWidth={2.2} />
            </span>

            <span className="unitrade-edit-logo-text">
              UniTrade
            </span>
          </button>

          <div className="edit-profile-header-space" />
        </div>
      </header>

      <main className="edit-profile-main">
        <section className="edit-profile-intro">
          <span className="edit-profile-eyebrow">
            Account profile
          </span>

          <h1>Edit Profile</h1>

          <p>
            Update the information other UniTrade users see on
            your profile.
          </p>
        </section>

        <form
          className="edit-profile-form"
          onSubmit={handleSubmit}
        >
          {/* PROFILE PHOTO */}
          <section className="edit-profile-card">
            <div className="edit-profile-card-heading">
              <h2>Profile photo</h2>

              <p>
                Your initials are used until a profile photo is
                uploaded.
              </p>
            </div>

            <div className="edit-avatar-area">
              <div className="edit-avatar">
                {initials || <UserRound size={35} />}
              </div>

              <div>
                <button
                  type="button"
                  className="change-photo-button"
                  onClick={() => {
                    alert(
                      'Profile photo upload will be connected to the backend later.',
                    )
                  }}
                >
                  <Camera size={16} />
                  Change photo
                </button>

                <p className="photo-note">
                  JPG or PNG · Recommended square image
                </p>
              </div>
            </div>
          </section>

          {/* PERSONAL INFORMATION */}
          <section className="edit-profile-card">
            <div className="edit-profile-card-heading">
              <h2>Personal information</h2>

              <p>
                Keep your basic profile information up to date.
              </p>
            </div>

            <div className="edit-form-grid">
              <div className="edit-form-field">
                <label htmlFor="firstName">
                  First name
                </label>

                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="John"
                />

                {errors.firstName && (
                  <span className="edit-error">
                    {errors.firstName}
                  </span>
                )}
              </div>

              <div className="edit-form-field">
                <label htmlFor="lastName">
                  Last name
                </label>

                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Doe"
                />

                {errors.lastName && (
                  <span className="edit-error">
                    {errors.lastName}
                  </span>
                )}
              </div>

              <div className="edit-form-field full-width">
                <label htmlFor="username">
                  Username
                </label>

                <div className="input-with-prefix">
                  <span>@</span>

                  <input
                    id="username"
                    name="username"
                    type="text"
                    value={formData.username}
                    onChange={handleChange}
                    placeholder="johndoe"
                  />
                </div>
              </div>

              <div className="edit-form-field full-width">
                <label htmlFor="bio">
                  Bio
                </label>

                <textarea
                  id="bio"
                  name="bio"
                  rows="4"
                  maxLength="160"
                  value={formData.bio}
                  onChange={handleChange}
                  placeholder="Tell other students a little about yourself."
                />

                <div className="field-bottom-row">
                  <span>
                    {errors.bio || 'Keep it short and useful.'}
                  </span>

                  <span>
                    {formData.bio.length}/160
                  </span>
                </div>
              </div>
            </div>
          </section>

          {/* CONTACT INFORMATION */}
          <section className="edit-profile-card">
            <div className="edit-profile-card-heading">
              <h2>Contact information</h2>

              <p>
                Your verified student information is shown below.
              </p>
            </div>

            <div className="edit-contact-list">
              <div className="edit-contact-item">
                <div className="edit-contact-icon">
                  <Mail size={18} />
                </div>

                <div>
                  <span>Email address</span>
                  <strong>{formData.email}</strong>
                </div>

                <BadgeCheck className="contact-verified" size={19} />
              </div>

              <div className="edit-contact-item edit-contact-editable">
                <div className="edit-contact-icon">
                  <Phone size={18} />
                </div>

                <div className="edit-contact-input-area">
                  <label htmlFor="phone">
                    Phone number
                  </label>

                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="08012345678"
                  />

                  {errors.phone && (
                    <span className="edit-error">
                      {errors.phone}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </section>

          {/* VERIFICATION */}
          <section className="edit-profile-verification">
            <div className="verification-icon">
              <BadgeCheck size={23} />
            </div>

            <div>
              <h3>Verified student profile</h3>

              <p>
                Your school verification is controlled by UniTrade
                account verification and cannot be changed from
                this page.
              </p>
            </div>
          </section>

          {/* BUTTONS */}
          <div className="edit-profile-actions">
            <button
              type="button"
              className="edit-cancel-button"
              onClick={() => navigate('/profile')}
            >
              Cancel
            </button>

            <button
              type="submit"
              className={`edit-save-button ${
                saved ? 'saved' : ''
              }`}
              disabled={saved}
            >
              {saved ? (
                <>
                  <Check size={18} />
                  Saved
                </>
              ) : (
                <>
                  <Save size={18} />
                  Save Changes
                </>
              )}
            </button>
          </div>
        </form>
      </main>
    </div>
  )
}

export default EditProfile