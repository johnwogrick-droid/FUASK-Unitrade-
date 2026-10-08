import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronLeft,
  GraduationCap,
  Mail,
  MapPin,
  ShieldCheck,
  ShoppingBag,
  UserRound,
} from 'lucide-react'

const steps = [
  {
    number: 1,
    title: 'About you',
  },
  {
    number: 2,
    title: 'Your school',
  },
  {
    number: 3,
    title: 'Student identity',
  },
  {
    number: 4,
    title: 'Complete',
  },
]

function Onboarding() {
  const navigate = useNavigate()

  const [step, setStep] = useState(1)

  const [form, setForm] = useState({
    fullName: '',
    email: '',
    school: '',
    faculty: '',
    department: '',
    matricNumber: '',
  })

  const [error, setError] = useState('')

  const updateField = (field, value) => {
    setForm((current) => ({
      ...current,
      [field]: value,
    }))

    setError('')
  }

  const validateStep = () => {
    if (step === 1) {
      if (!form.fullName.trim()) {
        setError('Please enter your full name.')
        return false
      }

      if (!form.email.trim()) {
        setError('Please enter your email address.')
        return false
      }
    }

    if (step === 2) {
      if (!form.school.trim()) {
        setError('Please enter your school or university.')
        return false
      }

      if (!form.faculty.trim()) {
        setError('Please enter your faculty.')
        return false
      }

      if (!form.department.trim()) {
        setError('Please enter your department.')
        return false
      }
    }

    if (step === 3) {
      if (!form.matricNumber.trim()) {
        setError('Please enter your matric number.')
        return false
      }
    }

    return true
  }

  const nextStep = () => {
    if (!validateStep()) {
      return
    }

    setError('')

    if (step < 4) {
      setStep((current) => current + 1)
    }
  }

  const previousStep = () => {
    setError('')

    if (step > 1) {
      setStep((current) => current - 1)
    }
  }

  const finishOnboarding = () => {
    navigate('/dashboard')
  }

  return (
    <div className="onboarding-page">

      <header className="onboarding-header">

        <Link to="/" className="auth-logo">
          <div className="auth-logo-icon">
            <ShoppingBag size={20} />
          </div>

          <span>UniTrade</span>
        </Link>

        <Link to="/" className="auth-back">
          Exit
        </Link>

      </header>

      <main className="onboarding-main">

        <div className="onboarding-container">

          {/* Progress */}

          <div className="onboarding-progress">

            <div className="progress-top">
              <span>Account setup</span>
              <span>Step {step} of 4</span>
            </div>

            <div className="progress-track">
              <div
                className="progress-fill"
                style={{
                  width: `${(step / 4) * 100}%`,
                }}
              />
            </div>

            <div className="step-labels">

              {steps.map((item) => (
                <div
                  key={item.number}
                  className={
                    item.number <= step
                      ? 'step-label active'
                      : 'step-label'
                  }
                >
                  <span>{item.number}</span>
                  {item.title}
                </div>
              ))}

            </div>

          </div>

          {/* Main Card */}

          <div className="onboarding-card">

            {step === 1 && (
              <div className="onboarding-step">

                <div className="onboarding-step-icon">
                  <UserRound size={24} />
                </div>

                <div className="onboarding-heading">
                  <span>STEP 1</span>
                  <h1>Tell us about yourself</h1>
                  <p>
                    We'll use these details to set up your UniTrade
                    identity.
                  </p>
                </div>

                <div className="onboarding-form">

                  <label>Full name</label>

                  <div className="auth-input-wrapper">
                    <UserRound size={18} />

                    <input
                      value={form.fullName}
                      onChange={(event) =>
                        updateField(
                          'fullName',
                          event.target.value
                        )
                      }
                      placeholder="Enter your full name"
                    />
                  </div>

                  <label>Email address</label>

                  <div className="auth-input-wrapper">
                    <Mail size={18} />

                    <input
                      type="email"
                      value={form.email}
                      onChange={(event) =>
                        updateField(
                          'email',
                          event.target.value
                        )
                      }
                      placeholder="Enter your email"
                    />
                  </div>

                </div>

              </div>
            )}

            {step === 2 && (
              <div className="onboarding-step">

                <div className="onboarding-step-icon">
                  <GraduationCap size={24} />
                </div>

                <div className="onboarding-heading">
                  <span>STEP 2</span>
                  <h1>Tell us about your school</h1>
                  <p>
                    This helps UniTrade keep your marketplace focused
                    on your campus community.
                  </p>
                </div>

                <div className="onboarding-form">

                  <label>School / University</label>

                  <div className="auth-input-wrapper">
                    <GraduationCap size={18} />

                    <input
                      value={form.school}
                      onChange={(event) =>
                        updateField(
                          'school',
                          event.target.value
                        )
                      }
                      placeholder="Enter your school"
                    />
                  </div>

                  <label>Faculty</label>

                  <div className="auth-input-wrapper">
                    <GraduationCap size={18} />

                    <input
                      value={form.faculty}
                      onChange={(event) =>
                        updateField(
                          'faculty',
                          event.target.value
                        )
                      }
                      placeholder="Enter your faculty"
                    />
                  </div>

                  <label>Department</label>

                  <div className="auth-input-wrapper">
                    <GraduationCap size={18} />

                    <input
                      value={form.department}
                      onChange={(event) =>
                        updateField(
                          'department',
                          event.target.value
                        )
                      }
                      placeholder="Enter your department"
                    />
                  </div>

                </div>

              </div>
            )}

            {step === 3 && (
              <div className="onboarding-step">

                <div className="onboarding-step-icon">
                  <ShieldCheck size={24} />
                </div>

                <div className="onboarding-heading">
                  <span>STEP 3</span>
                  <h1>Confirm your student identity</h1>
                  <p>
                    Your matric number will help associate your account
                    with your student identity.
                  </p>
                </div>

                <div className="onboarding-form">

                  <label>Matric number</label>

                  <div className="auth-input-wrapper">
                    <ShieldCheck size={18} />

                    <input
                      value={form.matricNumber}
                      onChange={(event) =>
                        updateField(
                          'matricNumber',
                          event.target.value
                        )
                      }
                      placeholder="Enter your matric number"
                    />
                  </div>

                  <div className="onboarding-info">
                    <ShieldCheck size={18} />

                    <div>
                      <strong>Why do we ask for this?</strong>

                      <p>
                        UniTrade is designed around trusted campus
                        communities. Your student identity can later
                        be verified through the school's verification
                        system.
                      </p>
                    </div>
                  </div>

                </div>

              </div>
            )}

            {step === 4 && (
              <div className="onboarding-complete">

                <div className="complete-icon">
                  <Check size={30} />
                </div>

                <span>YOU'RE ALL SET</span>

                <h1>
                  Welcome to UniTrade,
                  <br />
                  {form.fullName || 'Student'}.
                </h1>

                <p>
                  Your account setup is complete. You can now enter
                  UniTrade and choose whether you want to buy or sell.
                </p>

                <div className="complete-summary">

                  <div>
                    <UserRound size={17} />
                    <span>{form.fullName}</span>
                  </div>

                  <div>
                    <GraduationCap size={17} />
                    <span>{form.school}</span>
                  </div>

                  <div>
                    <ShieldCheck size={17} />
                    <span>{form.matricNumber}</span>
                  </div>

                </div>

              </div>
            )}

            {error && (
              <div className="auth-error onboarding-error">
                {error}
              </div>
            )}

            <div className="onboarding-actions">

              {step > 1 && step < 4 ? (
                <button
                  type="button"
                  className="onboarding-back-button"
                  onClick={previousStep}
                >
                  <ChevronLeft size={18} />
                  Back
                </button>
              ) : (
                <div />
              )}

              {step < 3 && (
                <button
                  type="button"
                  className="auth-submit onboarding-next"
                  onClick={nextStep}
                >
                  Continue
                  <ArrowRight size={18} />
                </button>
              )}

              {step === 3 && (
                <button
                  type="button"
                  className="auth-submit onboarding-next"
                  onClick={nextStep}
                >
                  Complete setup
                  <ArrowRight size={18} />
                </button>
              )}

              {step === 4 && (
                <button
                  type="button"
                  className="auth-submit onboarding-next"
                  onClick={finishOnboarding}
                >
                  Enter UniTrade
                  <ArrowRight size={18} />
                </button>
              )}

            </div>

          </div>

        </div>

      </main>

    </div>
  )
}

export default Onboarding