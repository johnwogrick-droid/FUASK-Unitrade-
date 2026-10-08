import { useEffect, useMemo, useRef, useState } from 'react'
import {
  ArrowLeft,
  BadgeCheck,
  Check,
  CheckCheck,
  Image,
  Info,
  MapPin,
  MoreVertical,
  Paperclip,
  Phone,
  Send,
  ShieldCheck,
  Smile,
  Star,
  X,
} from 'lucide-react'
import { Link, useNavigate, useParams } from 'react-router-dom'

const listings = {
  headphones: {
    id: 'headphones',
    title: 'Wireless Noise-Cancelling Headphones',
    price: 28000,
    condition: 'Like new',
    location: 'Main Campus',
    seller: 'Daniel Okafor',
    initials: 'DO',
    rating: 4.9,
    trades: 18,
    verified: true,
    image:
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=500&q=80',
  },

  backpack: {
    id: 'backpack',
    title: 'Minimalist Laptop Backpack',
    price: 18500,
    condition: 'Good',
    location: 'Hostel Area',
    seller: 'Mary James',
    initials: 'MJ',
    rating: 4.8,
    trades: 12,
    verified: true,
    image:
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=500&q=80',
  },

  biochem: {
    id: 'biochem',
    title: 'Medical Biochemistry Textbook',
    price: 7500,
    condition: 'Good',
    location: 'Faculty Village',
    seller: 'Samuel Peter',
    initials: 'SP',
    rating: 4.7,
    trades: 9,
    verified: true,
    image:
      'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=500&q=80',
  },

  sneakers: {
    id: 'sneakers',
    title: 'Classic White Campus Sneakers',
    price: 22000,
    condition: 'Like new',
    location: 'Main Campus',
    seller: 'Ruth David',
    initials: 'RD',
    rating: 4.9,
    trades: 21,
    verified: true,
    image:
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=500&q=80',
  },

  calculator: {
    id: 'calculator',
    title: 'Scientific Calculator',
    price: 9500,
    condition: 'Good',
    location: 'Science Faculty',
    seller: 'David Musa',
    initials: 'DM',
    rating: 4.6,
    trades: 7,
    verified: true,
    image:
      'https://images.unsplash.com/photo-1587145820266-a5951ee6f620?auto=format&fit=crop&w=500&q=80',
  },

  hoodie: {
    id: 'hoodie',
    title: 'University Pullover Hoodie',
    price: 14000,
    condition: 'Good',
    location: 'Student Centre',
    seller: 'Grace Ibrahim',
    initials: 'GI',
    rating: 4.8,
    trades: 15,
    verified: true,
    image:
      'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=500&q=80',
  },
}

const defaultMessages = [
  {
    id: 1,
    sender: 'seller',
    text: 'Hi! Yes, the headphones are still available.',
    time: '10:18 AM',
    read: true,
  },
  {
    id: 2,
    sender: 'buyer',
    text: 'Great. Is everything working properly?',
    time: '10:20 AM',
    read: true,
  },
  {
    id: 3,
    sender: 'seller',
    text: 'Yes, everything works perfectly. I barely used them.',
    time: '10:21 AM',
    read: true,
  },
  {
    id: 4,
    sender: 'buyer',
    text: 'Okay. Would you be available around the Main Campus later today?',
    time: '10:23 AM',
    read: true,
  },
  {
    id: 5,
    sender: 'seller',
    text: 'Yes, I should be around the student centre after 3 PM.',
    time: '10:25 AM',
    read: true,
  },
]

const formatPrice = (price) =>
  `₦${new Intl.NumberFormat('en-NG').format(price)}`

function BuyerChat() {
  const { id } = useParams()
  const navigate = useNavigate()
  const messagesEndRef = useRef(null)

  const listing = listings[id] || listings.headphones

  const storageKey = `unitrade-chat-${listing.id}`

  const [messages, setMessages] = useState(() => {
    try {
      const stored = localStorage.getItem(storageKey)

      if (stored) {
        return JSON.parse(stored)
      }
    } catch {
      // Use default messages if local storage is unavailable.
    }

    return defaultMessages
  })

  const [message, setMessage] = useState('')
  const [showDetails, setShowDetails] = useState(false)
  const [showSafety, setShowSafety] = useState(false)
  const [showAttach, setShowAttach] = useState(false)
  const [tradeAgreed, setTradeAgreed] = useState(false)

  const quickMessages = useMemo(
    () => [
      'Is this still available?',
      'Can we meet on campus?',
      'Is the price negotiable?',
    ],
    []
  )

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(messages))
  }, [messages, storageKey])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: 'smooth',
    })
  }, [messages])

  const sendMessage = () => {
    const trimmed = message.trim()

    if (!trimmed) {
      return
    }

    const now = new Date()

    const newMessage = {
      id: Date.now(),
      sender: 'buyer',
      text: trimmed,
      time: now.toLocaleTimeString([], {
        hour: 'numeric',
        minute: '2-digit',
      }),
      read: false,
    }

    setMessages((current) => [...current, newMessage])
    setMessage('')

    // Frontend simulation only.
    // The real backend will deliver seller responses later.
    setTimeout(() => {
      const sellerReply = {
        id: Date.now() + 1,
        sender: 'seller',
        text: 'Thanks for your message. I will get back to you shortly.',
        time: new Date().toLocaleTimeString([], {
          hour: 'numeric',
          minute: '2-digit',
        }),
        read: true,
      }

      setMessages((current) => [...current, sellerReply])
    }, 1200)
  }

  const sendQuickMessage = (text) => {
    setMessage(text)
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault()
      sendMessage()
    }
  }

  const handleMarkTradeAgreed = () => {
    setTradeAgreed(true)

    setTimeout(() => {
      navigate(`/trade-rating?listing=${listing.id}`)
    }, 700)
  }

  return (
    <div className="chat-page">
      <header className="chat-header">
        <div className="chat-header-inner">
          <button
            className="chat-back-button"
            onClick={() => navigate(-1)}
            aria-label="Go back"
          >
            <ArrowLeft size={20} />
          </button>

          <div className="chat-seller-avatar">
            {listing.initials}
          </div>

          <div className="chat-seller-heading">
            <div className="chat-seller-name">
              {listing.seller}

              {listing.verified && (
                <BadgeCheck size={16} />
              )}
            </div>

            <div className="chat-online-status">
              <span />
              Online
            </div>
          </div>

          <div className="chat-header-actions">
            <button
              className="chat-header-icon"
              aria-label="Call seller"
            >
              <Phone size={18} />
            </button>

            <button
              className="chat-header-icon"
              onClick={() => setShowDetails(true)}
              aria-label="Conversation details"
            >
              <Info size={19} />
            </button>

            <button
              className="chat-header-icon desktop-chat-action"
              aria-label="More options"
            >
              <MoreVertical size={19} />
            </button>
          </div>
        </div>
      </header>

      <main className="chat-layout">
        <section className="chat-main">
          <div className="chat-listing-card">
            <img
              src={listing.image}
              alt={listing.title}
            />

            <div className="chat-listing-info">
              <span>ABOUT THIS LISTING</span>

              <h2>{listing.title}</h2>

              <div className="chat-listing-meta">
                <strong>{formatPrice(listing.price)}</strong>

                <span>•</span>

                <span>{listing.condition}</span>
              </div>
            </div>

            <Link
              to={`/listing/${listing.id}`}
              className="chat-view-listing"
            >
              View
            </Link>
          </div>

          <button
            className="chat-safety-banner"
            onClick={() => setShowSafety(true)}
          >
            <ShieldCheck size={18} />

            <span>
              <strong>Stay safe on UniTrade</strong>
              <small>
                Keep conversations and trade arrangements
                within UniTrade.
              </small>
            </span>

            <Info size={16} />
          </button>

          <div className="chat-messages">
            <div className="chat-date-divider">
              <span>Today</span>
            </div>

            {messages.map((item) => (
              <div
                key={item.id}
                className={`message-row ${
                  item.sender === 'buyer'
                    ? 'buyer-message-row'
                    : 'seller-message-row'
                }`}
              >
                <div
                  className={`message-bubble ${
                    item.sender === 'buyer'
                      ? 'buyer-message'
                      : 'seller-message'
                  }`}
                >
                  <p>{item.text}</p>

                  <div className="message-meta">
                    <span>{item.time}</span>

                    {item.sender === 'buyer' &&
                      (item.read ? (
                        <CheckCheck size={14} />
                      ) : (
                        <Check size={14} />
                      ))}
                  </div>
                </div>
              </div>
            ))}

            <div ref={messagesEndRef} />
          </div>

          {quickMessages.length > 0 && messages.length <= 8 && (
            <div className="quick-messages">
              <span>Quick reply</span>

              <div>
                {quickMessages.map((text) => (
                  <button
                    key={text}
                    onClick={() => sendQuickMessage(text)}
                  >
                    {text}
                  </button>
                ))}
              </div>
            </div>
          )}

          {tradeAgreed && (
            <div className="trade-agreed-banner">
              <CheckCheck size={18} />

              <span>
                Trade marked as agreed. Taking you to
                rating...
              </span>
            </div>
          )}

          <div className="chat-composer-wrapper">
            {showAttach && (
              <div className="attachment-menu">
                <button
                  onClick={() => setShowAttach(false)}
                >
                  <Image size={18} />
                  Photo
                </button>

                <button
                  onClick={() => setShowAttach(false)}
                >
                  <Paperclip size={18} />
                  File
                </button>
              </div>
            )}

            <div className="chat-composer">
              <button
                className="composer-icon"
                onClick={() =>
                  setShowAttach((current) => !current)
                }
                aria-label="Attach"
              >
                <Paperclip size={19} />
              </button>

              <textarea
                value={message}
                onChange={(event) =>
                  setMessage(event.target.value)
                }
                onKeyDown={handleKeyDown}
                placeholder="Write a message..."
                rows={1}
              />

              <button
                className="composer-icon"
                aria-label="Emoji"
              >
                <Smile size={19} />
              </button>

              <button
                className="send-message-button"
                onClick={sendMessage}
                disabled={!message.trim()}
                aria-label="Send message"
              >
                <Send size={18} />
              </button>
            </div>
          </div>
        </section>

        <aside className="chat-details-panel">
          <div className="chat-details-heading">
            <span>SELLER</span>

            <h2>{listing.seller}</h2>
          </div>

          <div className="chat-large-avatar">
            {listing.initials}
          </div>

          <div className="chat-verification">
            <BadgeCheck size={16} />
            Verified student
          </div>

          <div className="chat-rating">
            <Star size={15} fill="currentColor" />
            <strong>{listing.rating}</strong>
            <span>seller rating</span>
          </div>

          <div className="chat-seller-stats">
            <div>
              <strong>{listing.trades}</strong>
              <span>Trades</span>
            </div>

            <div>
              <strong>98%</strong>
              <span>Response</span>
            </div>
          </div>

          <div className="chat-divider" />

          <div className="chat-detail-item">
            <MapPin size={18} />
            <div>
              <span>Meeting area</span>
              <strong>{listing.location}</strong>
            </div>
          </div>

          <div className="chat-detail-item">
            <ShieldCheck size={18} />
            <div>
              <span>Account status</span>
              <strong>Verified</strong>
            </div>
          </div>

          <button
            className="chat-trade-button"
            onClick={handleMarkTradeAgreed}
            disabled={tradeAgreed}
          >
            <CheckCheck size={18} />

            {tradeAgreed
              ? 'Trade agreed'
              : 'Mark trade as agreed'}
          </button>

          <Link
            to={`/listing/${listing.id}`}
            className="chat-back-listing"
          >
            View listing
          </Link>
        </aside>
      </main>

      {showDetails && (
        <div
          className="chat-modal-overlay"
          onClick={() => setShowDetails(false)}
        >
          <div
            className="chat-details-modal"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              className="chat-modal-close"
              onClick={() => setShowDetails(false)}
            >
              <X size={20} />
            </button>

            <div className="chat-large-avatar">
              {listing.initials}
            </div>

            <h2>{listing.seller}</h2>

            <p>Verified UniTrade student</p>

            <div className="chat-modal-stats">
              <div>
                <Star size={16} fill="currentColor" />
                <strong>{listing.rating}</strong>
                <span>Rating</span>
              </div>

              <div>
                <strong>{listing.trades}</strong>
                <span>Trades</span>
              </div>
            </div>

            <div className="chat-modal-actions">
              <Link
                to={`/listing/${listing.id}`}
                onClick={() => setShowDetails(false)}
              >
                View listing
              </Link>

              <Link
                to="/profile"
                onClick={() => setShowDetails(false)}
              >
                View profile
              </Link>
            </div>
          </div>
        </div>
      )}

      {showSafety && (
        <div
          className="chat-modal-overlay"
          onClick={() => setShowSafety(false)}
        >
          <div
            className="chat-details-modal safety-chat-modal"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              className="chat-modal-close"
              onClick={() => setShowSafety(false)}
            >
              <X size={20} />
            </button>

            <div className="chat-safety-icon">
              <ShieldCheck size={26} />
            </div>

            <h2>Stay safe while trading</h2>

            <p>
              UniTrade is designed to make campus trading
              easier and safer, but always use your judgment.
            </p>

            <div className="chat-safety-points">
              <div>
                <strong>Meet in public</strong>
                <span>
                  Choose a familiar, well-populated campus
                  location.
                </span>
              </div>

              <div>
                <strong>Inspect before paying</strong>
                <span>
                  Check the item carefully before completing
                  the trade.
                </span>
              </div>

              <div>
                <strong>Protect your account</strong>
                <span>
                  Never share passwords or verification codes.
                </span>
              </div>

              <div>
                <strong>Report suspicious behaviour</strong>
                <span>
                  Contact UniTrade support if something feels
                  wrong.
                </span>
              </div>
            </div>

            <button
              className="chat-modal-done"
              onClick={() => setShowSafety(false)}
            >
              I understand
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default BuyerChat