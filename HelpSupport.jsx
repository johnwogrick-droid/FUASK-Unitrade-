import { useMemo, useState } from 'react'
import {
  ArrowLeft,
  Bell,
  ChevronDown,
  ChevronRight,
  Mail,
  MessageCircle,
  Search,
  Send,
  Settings,
  ShoppingBag,
  ShieldCheck,
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const faqData = [
  {
    id: 1,
    question: 'What is UniTrade?',
    answer:
      'UniTrade is a campus marketplace that allows verified students to buy and sell items within their school community. You can discover products, create listings, communicate with sellers and complete trades.',
  },
  {
    id: 2,
    question: 'How do I create a listing?',
    answer:
      'Open Create Listing from the marketplace or Sell from the navigation menu. Add your product photos, title, description, category, condition, price and meeting location. You can also use the AI assistant to improve your product description and suggest a price.',
  },
  {
    id: 3,
    question: 'Can I edit my listing after publishing it?',
    answer:
      'Yes. Your published listings can be managed from your profile. When the backend is connected, you will be able to update information such as the price, description, photos and availability.',
  },
  {
    id: 4,
    question: 'How does student verification work?',
    answer:
      'UniTrade is designed around student verification so that members of the campus community can trade with greater confidence. Your school identity can be connected to your account during onboarding and verification.',
  },
  {
    id: 5,
    question: 'How do I contact a seller?',
    answer:
      'Open the item you are interested in and select Message Seller. This opens a private buyer-seller conversation. The actual trade conversation is between you and the seller; the AI assistant is not a participant in that chat.',
  },
  {
    id: 6,
    question: 'Is the AI assistant part of my seller conversation?',
    answer:
      'No. UniTrade keeps the actual buyer-seller conversation between the buyer and seller. AI assistance is provided separately for tasks such as improving listing descriptions and suggesting prices.',
  },
  {
    id: 7,
    question: 'How do ratings and trust scores work?',
    answer:
      'After a completed trade, users can rate their trading experience. Completed trades, ratings and student verification contribute to the trust information displayed on profiles.',
  },
  {
    id: 8,
    question: 'What should I do if I suspect a scam?',
    answer:
      'Do not send money or personal information if you are unsure about a transaction. Keep communication within UniTrade, verify the other student and use safe meeting practices. Report suspicious behaviour to UniTrade support.',
  },
  {
    id: 9,
    question: 'Can I change my account information?',
    answer:
      'Yes. Go to Profile and select Edit Profile for information such as your name, username, phone number and bio. Account Details contains information about your account and verification status.',
  },
  {
    id: 10,
    question: 'How do I change my password?',
    answer:
      'Open Settings and go to the Security section. Enter your current password, choose a new password and confirm it. Your new password should contain at least eight characters.',
  },
]

function HelpSupport() {
  const navigate = useNavigate()

  const [searchTerm, setSearchTerm] = useState('')
  const [openFaq, setOpenFaq] = useState(null)

  const [supportCategory, setSupportCategory] = useState('General')
  const [supportMessage, setSupportMessage] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const filteredFaqs = useMemo(() => {
    const query = searchTerm.trim().toLowerCase()

    if (!query) {
      return faqData
    }

    return faqData.filter(
      (faq) =>
        faq.question.toLowerCase().includes(query) ||
        faq.answer.toLowerCase().includes(query),
    )
  }, [searchTerm])

  const toggleFaq = (id) => {
    setOpenFaq((current) => (current === id ? null : id))
  }

  const handleSupportSubmit = (event) => {
    event.preventDefault()

    if (!supportMessage.trim()) {
      return
    }

    const supportRequest = {
      category: supportCategory,
      message: supportMessage.trim(),
      createdAt: new Date().toISOString(),
      status: 'submitted',
    }

    try {
      const existingRequests = JSON.parse(
        localStorage.getItem('unitrade-support-requests') || '[]',
      )

      localStorage.setItem(
        'unitrade-support-requests',
        JSON.stringify([...existingRequests, supportRequest]),
      )
    } catch {
      // Continue showing confirmation even if localStorage is unavailable.
    }

    setSupportMessage('')
    setSubmitted(true)
  }

  return (
    <div className="help-support-page">
      <header className="help-support-header">
        <div className="help-support-header-inner">
          <button
            type="button"
            className="help-support-back-button"
            onClick={() => navigate('/settings')}
            aria-label="Back to settings"
          >
            <ArrowLeft size={20} />
          </button>

          <button
            type="button"
            className="help-support-logo"
            onClick={() => navigate('/')}
            aria-label="Go to UniTrade home"
          >
            <span className="help-support-logo-icon">
              <ShoppingBag size={22} strokeWidth={2.2} />
            </span>

            <span className="help-support-logo-text">
              UniTrade
            </span>
          </button>
        </div>
      </header>

      <main className="help-support-main">
       <section className="help-support-contact-card">
  <div className="help-support-contact-header">
    <div className="help-support-contact-icon">
      <MessageCircle size={22} />
    </div>

    <div>
      <h2>Contact Support</h2>
      <p>
        Need more help? Reach the UniTrade support team directly.
      </p>
    </div>
  </div>

  <div className="help-support-contact-buttons">
    <a
      href="https://wa.me/2348000000000?text=Hello%20UniTrade%20Support%2C%20I%20need%20help%20with%20my%20account."
      target="_blank"
      rel="noreferrer"
      className="help-support-contact-button help-support-whatsapp"
    >
      <span className="help-support-contact-button-icon">
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 11.5a8.4 8.4 0 0 1-8.5 8.5 8.4 8.4 0 0 1-4.1-1.1L3 20l1.1-5.1A8.4 8.4 0 0 1 3 10.8 8.5 8.5 0 1 1 21 11.5Z" />
          <path d="M8.5 8.5c.2-.4.4-.4.7-.4h.5c.2 0 .4.1.5.4l.7 1.6c.1.2.1.4-.1.6l-.5.6c-.1.1-.1.3 0 .5.4.7 1 1.3 1.7 1.7.2.1.4.1.5 0l.6-.5c.2-.2.4-.2.6-.1l1.6.7c.3.1.4.3.4.5v.5c0 .3 0 .5-.4.7-.4.2-1.1.3-1.5.1-1-.4-2-1-2.8-1.8-.8-.8-1.4-1.8-1.8-2.8-.2-.4-.1-1.1.1-1.5Z" />
        </svg>
      </span>

      <span>
        <strong>Chat on WhatsApp</strong>
        <small>Talk to UniTrade support directly</small>
      </span>

      <ChevronRight size={18} />
    </a>

    <a
      href="mailto:support@unitrade.com?subject=UniTrade%20Support%20Request"
      className="help-support-contact-button help-support-email"
    >
      <span className="help-support-contact-button-icon">
        <Mail size={22} />
      </span>

      <span>
        <strong>Email Support</strong>
        <small>Send us a detailed support request</small>
      </span>

      <ChevronRight size={18} />
    </a>
  </div>

  <div className="help-support-divider">
    <span>or send a support request</span>
  </div>

  {submitted ? (
    <div className="help-support-success">
      <div className="help-support-success-icon">
        <Send size={20} />
      </div>

      <div>
        <h3>Support request submitted</h3>

        <p>
          Your message has been saved. A support representative can
          review it when the backend support system is connected.
        </p>
      </div>

      <button
        type="button"
        onClick={() => setSubmitted(false)}
      >
        Send another request
      </button>
    </div>
  ) : (
    <form
      className="help-support-form"
      onSubmit={handleSupportSubmit}
    >
      <div className="help-support-form-group">
        <label htmlFor="support-category">
          What do you need help with?
        </label>

        <select
          id="support-category"
          value={supportCategory}
          onChange={(event) =>
            setSupportCategory(event.target.value)
          }
        >
          <option value="General">General question</option>
          <option value="Account">Account & verification</option>
          <option value="Listing">Listing problem</option>
          <option value="Transaction">Trade or transaction</option>
          <option value="Safety">Safety or suspicious activity</option>
          <option value="Technical">Technical problem</option>
        </select>
      </div>

      <div className="help-support-form-group">
        <label htmlFor="support-message">
          Message
        </label>

        <textarea
          id="support-message"
          value={supportMessage}
          onChange={(event) =>
            setSupportMessage(event.target.value)
          }
          placeholder="Describe the issue you're experiencing..."
          maxLength={1000}
          rows={6}
        />

        <span className="help-support-character-count">
          {supportMessage.length}/1000
        </span>
      </div>

      <button
        type="submit"
        className="help-support-submit"
        disabled={!supportMessage.trim()}
      >
        <Send size={17} />
        Send to Support
      </button>
    </form>
  )}
</section>

        <section className="help-support-search-card">
          <div className="help-support-search-heading">
            <h2>How can we help?</h2>
            <p>
              Search our frequently asked questions.
            </p>
          </div>

          <div className="help-support-search">
            <Search size={19} />

            <input
              type="search"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search questions..."
              aria-label="Search frequently asked questions"
            />

            {searchTerm && (
              <button
                type="button"
                className="help-support-search-clear"
                onClick={() => setSearchTerm('')}
              >
                Clear
              </button>
            )}
          </div>
        </section>

        <section className="help-support-section">
          <div className="help-support-section-heading">
            <div>
              <h2>Frequently Asked Questions</h2>
              <p>
                Quick answers to common UniTrade questions.
              </p>
            </div>

            <span className="help-support-faq-count">
              {filteredFaqs.length} questions
            </span>
          </div>

          <div className="help-support-faq-list">
            {filteredFaqs.length === 0 ? (
              <div className="help-support-no-results">
                <div className="help-support-no-results-icon">
                  <Search size={24} />
                </div>

                <h3>No matching questions</h3>

                <p>
                  Try searching for something else or contact support below.
                </p>

                <button
                  type="button"
                  onClick={() => setSearchTerm('')}
                >
                  Show all questions
                </button>
              </div>
            ) : (
              filteredFaqs.map((faq) => {
                const isOpen = openFaq === faq.id

                return (
                  <div
                    className={`help-support-faq ${
                      isOpen ? 'help-support-faq-open' : ''
                    }`}
                    key={faq.id}
                  >
                    <button
                      type="button"
                      className="help-support-faq-question"
                      onClick={() => toggleFaq(faq.id)}
                      aria-expanded={isOpen}
                    >
                      <span>{faq.question}</span>

                      <ChevronDown
                        size={19}
                        className={
                          isOpen
                            ? 'help-support-chevron-open'
                            : ''
                        }
                      />
                    </button>

                    {isOpen && (
                      <div className="help-support-faq-answer">
                        <p>{faq.answer}</p>
                      </div>
                    )}
                  </div>
                )
              })
            )}
          </div>
        </section>

        <section className="help-support-quick-section">
          <div className="help-support-section-heading">
            <div>
              <h2>Quick Help</h2>
              <p>Go directly to a useful part of your account.</p>
            </div>
          </div>

          <div className="help-support-quick-grid">
            <button
              type="button"
              className="help-support-quick-card"
              onClick={() => navigate('/notifications')}
            >
              <span className="help-support-quick-icon">
                <Bell size={20} />
              </span>

              <span>
                <strong>Notifications</strong>
                <small>View your recent activity</small>
              </span>

              <ChevronRight size={18} />
            </button>

            <button
              type="button"
              className="help-support-quick-card"
              onClick={() => navigate('/settings')}
            >
              <span className="help-support-quick-icon">
                <Settings size={20} />
              </span>

              <span>
                <strong>Settings</strong>
                <small>Manage your preferences</small>
              </span>

              <ChevronRight size={18} />
            </button>

            <button
              type="button"
              className="help-support-quick-card"
              onClick={() => navigate('/account-details')}
            >
              <span className="help-support-quick-icon">
                <ShieldCheck size={20} />
              </span>

              <span>
                <strong>Account & Security</strong>
                <small>Check your verification and account</small>
              </span>

              <ChevronRight size={18} />
            </button>

            <button
              type="button"
              className="help-support-quick-card"
              onClick={() => navigate('/marketplace')}
            >
              <span className="help-support-quick-icon">
                <ShoppingBag size={20} />
              </span>

              <span>
                <strong>Marketplace</strong>
                <small>Browse campus listings</small>
              </span>

              <ChevronRight size={18} />
            </button>
          </div>
        </section>

        <section className="help-support-contact-card">
          <div className="help-support-contact-header">
            <div className="help-support-contact-icon">
              <MessageCircle size={22} />
            </div>

            <div>
              <h2>Contact Support</h2>
              <p>
                Couldn't find what you were looking for? Send us a message.
              </p>
            </div>
          </div>

          {submitted ? (
            <div className="help-support-success">
              <div className="help-support-success-icon">
                <Send size={20} />
              </div>

              <div>
                <h3>Support request submitted</h3>

                <p>
                  Your message has been saved. A support representative can
                  review it when the backend support system is connected.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setSubmitted(false)}
              >
                Send another request
              </button>
            </div>
          ) : (
            <form
              className="help-support-form"
              onSubmit={handleSupportSubmit}
            >
              <div className="help-support-form-group">
                <label htmlFor="support-category">
                  What do you need help with?
                </label>

                <select
                  id="support-category"
                  value={supportCategory}
                  onChange={(event) =>
                    setSupportCategory(event.target.value)
                  }
                >
                  <option value="General">General question</option>
                  <option value="Account">Account & verification</option>
                  <option value="Listing">Listing problem</option>
                  <option value="Transaction">Trade or transaction</option>
                  <option value="Safety">Safety or suspicious activity</option>
                  <option value="Technical">Technical problem</option>
                </select>
              </div>

              <div className="help-support-form-group">
                <label htmlFor="support-message">
                  Message
                </label>

                <textarea
                  id="support-message"
                  value={supportMessage}
                  onChange={(event) =>
                    setSupportMessage(event.target.value)
                  }
                  placeholder="Describe the issue you're experiencing..."
                  maxLength={1000}
                  rows={6}
                />

                <span className="help-support-character-count">
                  {supportMessage.length}/1000
                </span>
              </div>

              <button
                type="submit"
                className="help-support-submit"
                disabled={!supportMessage.trim()}
              >
                <Send size={17} />
                Send to Support
              </button>
            </form>
          )}
        </section>

        <section className="help-support-footer">
          <Mail size={17} />

          <span>
            Support email will be connected when the UniTrade backend and
            support system are integrated.
          </span>
        </section>
      </main>
    </div>
  )
}

export default HelpSupport