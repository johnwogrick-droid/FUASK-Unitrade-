import { useEffect, useMemo, useState } from 'react'
import {
  BadgeCheck,
  Bookmark,
  ChevronRight,
  Edit3,
  Home,
  MessageCircle,
  Package,
  Settings,
  ShieldCheck,
  ShoppingBag,
  Star,
  Store,
  UserRound,
  WalletCards,
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const MY_LISTINGS = [
  {
    id: 'headphones',
    title: 'Wireless Noise-Cancelling Headphones',
    price: 28000,
    condition: 'Like new',
    category: 'Electronics',
    location: 'Main Campus',
    image:
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=700&q=80',
  },
  {
    id: 'backpack',
    title: 'Minimalist Laptop Backpack',
    price: 18500,
    condition: 'Good',
    category: 'Fashion',
    location: 'Hostel Area',
    image:
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=700&q=80',
  },
]

const SAVABLE_LISTINGS = [
  {
    id: 'sneakers',
    title: 'Classic White Campus Sneakers',
    price: 22000,
    condition: 'Like new',
    category: 'Fashion',
    location: 'Main Campus',
    image:
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=700&q=80',
  },
  {
    id: 'powerbank',
    title: '20,000mAh Power Bank',
    price: 15000,
    condition: 'Like new',
    category: 'Electronics',
    location: 'Main Campus',
    image:
      'https://images.unsplash.com/photo-1609592424813-4b2c3b7b8b7a?auto=format&fit=crop&w=700&q=80',
  },
]

const TRADE_HISTORY = [
  {
    id: 1,
    title: 'Wireless Noise-Cancelling Headphones',
    amount: 28000,
    date: 'Aug 28, 2026',
    status: 'Completed',
    type: 'Sold',
  },
  {
    id: 2,
    title: 'Medical Biochemistry Textbook',
    amount: 7500,
    date: 'Aug 21, 2026',
    status: 'Completed',
    type: 'Bought',
  },
]

const DEFAULT_PROFILE = {
  firstName: 'John',
  lastName: 'Doe',
  username: 'johndoe',
  bio: 'Student and active member of the UniTrade community.',
  phone: '',
  email: 'john.doe@student.fuask.edu.ng',
}

function formatPrice(value) {
  return `₦${value.toLocaleString('en-NG')}`
}

function Profile() {
  const navigate = useNavigate()

  const [activeTab, setActiveTab] = useState('listings')
  const [mode, setMode] = useState('seller')
  const [savedItems, setSavedItems] = useState([])
  const [profile, setProfile] = useState(DEFAULT_PROFILE)

  useEffect(() => {
    const storedMode = localStorage.getItem('unitrade-mode')

    if (storedMode === 'buyer' || storedMode === 'seller') {
      setMode(storedMode)
    }

    try {
      const storedSaved = JSON.parse(
        localStorage.getItem('unitrade-saved') || '[]',
      )

      if (Array.isArray(storedSaved)) {
        setSavedItems(storedSaved)
      }
    } catch {
      setSavedItems([])
    }

    try {
      const storedProfile = localStorage.getItem('unitrade-profile')

      if (storedProfile) {
        setProfile({
          ...DEFAULT_PROFILE,
          ...JSON.parse(storedProfile),
        })
      }
    } catch {
      setProfile(DEFAULT_PROFILE)
    }
  }, [])

  const fullName =
    `${profile.firstName} ${profile.lastName}`.trim() || 'John Doe'

  const initials =
    `${profile.firstName?.charAt(0) || 'J'}${
      profile.lastName?.charAt(0) || 'D'
    }`.toUpperCase()

  const savedListings = useMemo(() => {
    return SAVABLE_LISTINGS.filter((item) =>
      savedItems.includes(item.id),
    )
  }, [savedItems])

  function changeMode(nextMode) {
    setMode(nextMode)
    localStorage.setItem('unitrade-mode', nextMode)
  }

  function toggleSaved(id) {
    let current = []

    try {
      current = JSON.parse(
        localStorage.getItem('unitrade-saved') || '[]',
      )
    } catch {
      current = []
    }

    if (!Array.isArray(current)) {
      current = []
    }

    const updated = current.includes(id)
      ? current.filter((item) => item !== id)
      : [...current, id]

    localStorage.setItem(
      'unitrade-saved',
      JSON.stringify(updated),
    )

    setSavedItems(updated)
  }

  return (
    <div className="profile-page">
      {/* HEADER */}
      <header className="profile-header">
        <div className="profile-header-inner">
          <button
            type="button"
            className="unitrade-profile-logo"
            onClick={() => navigate('/')}
            aria-label="Go to UniTrade home"
          >
            <span className="unitrade-profile-logo-icon">
              <ShoppingBag size={22} strokeWidth={2.2} />
            </span>

            <span className="unitrade-profile-logo-text">
              UniTrade
            </span>
          </button>

          <div className="profile-header-actions">
            <button
              type="button"
              className="profile-header-icon"
              onClick={() => navigate('/marketplace')}
              aria-label="Marketplace"
              title="Marketplace"
            >
              <Store size={19} />
            </button>

            <button
              type="button"
              className="profile-header-icon"
              onClick={() => navigate('/settings')}
              aria-label="Settings"
              title="Settings"
            >
              <Settings size={19} />
            </button>
          </div>
        </div>
      </header>

      <main className="profile-main">
        {/* PROFILE HERO */}
        <section className="profile-hero">
          <div className="profile-cover" />

          <div className="profile-hero-content">
            <div className="profile-avatar-large">
              {initials}
            </div>

            <div className="profile-identity">
              <div className="profile-name-row">
                <h1>{fullName}</h1>
                <BadgeCheck size={21} />
              </div>

              <p className="profile-role">
                Verified student · FUASK
              </p>

              <p className="profile-member">
                UniTrade member since 2026
              </p>
            </div>

            <div className="profile-hero-buttons">
              <button
                type="button"
                className="profile-edit-button"
                onClick={() => navigate('/edit-profile')}
              >
                <Edit3 size={17} />
                Edit Profile
              </button>

              <button
                type="button"
                className="profile-account-button"
                onClick={() => navigate('/account-details')}
              >
                <UserRound size={17} />
                Account Details
              </button>
            </div>
          </div>
        </section>

        {/* MODE SWITCH */}
        <section className="profile-mode-section">
          <div>
            <span className="profile-section-label">
              Marketplace mode
            </span>

            <p>
              Switch between buying and selling activities.
            </p>
          </div>

          <div className="mode-toggle">
            <button
              type="button"
              className={mode === 'buyer' ? 'active' : ''}
              onClick={() => changeMode('buyer')}
            >
              <WalletCards size={16} />
              Buying
            </button>

            <button
              type="button"
              className={mode === 'seller' ? 'active' : ''}
              onClick={() => changeMode('seller')}
            >
              <Store size={16} />
              Selling
            </button>
          </div>
        </section>

        {/* TRUST */}
        <section className="profile-trust-card">
          <div className="trust-card-icon">
            <ShieldCheck size={24} />
          </div>

          <div className="trust-card-content">
            <div className="trust-card-title">
              <h2>Trusted student</h2>
              <BadgeCheck size={18} />
            </div>

            <p>
              Your student identity has been verified. Keep building
              trust by completing safe and successful trades.
            </p>
          </div>

          <div className="trust-score">
            <strong>4.9</strong>

            <div>
              <Star size={14} fill="currentColor" />
              <span>Trust rating</span>
            </div>
          </div>
        </section>

        {/* STATS */}
        <section className="profile-stats">
          <div className="profile-stat-card">
            <Package size={20} />
            <strong>18</strong>
            <span>Completed trades</span>
          </div>

          <div className="profile-stat-card">
            <Star size={20} />
            <strong>4.9</strong>
            <span>Average rating</span>
          </div>

          <div className="profile-stat-card">
            <Store size={20} />
            <strong>2</strong>
            <span>Active listings</span>
          </div>

          <div className="profile-stat-card">
            <MessageCircle size={20} />
            <strong>100%</strong>
            <span>Response rate</span>
          </div>
        </section>

        {/* TABS */}
        <section className="profile-content">
          <div className="profile-tabs">
            <button
              type="button"
              className={activeTab === 'listings' ? 'active' : ''}
              onClick={() => setActiveTab('listings')}
            >
              My Listings
            </button>

            <button
              type="button"
              className={activeTab === 'saved' ? 'active' : ''}
              onClick={() => setActiveTab('saved')}
            >
              Saved

              {savedListings.length > 0 && (
                <span>{savedListings.length}</span>
              )}
            </button>

            <button
              type="button"
              className={activeTab === 'trades' ? 'active' : ''}
              onClick={() => setActiveTab('trades')}
            >
              Trades
            </button>
          </div>

          {/* MY LISTINGS */}
          {activeTab === 'listings' && (
            <div className="profile-tab-content">
              <div className="profile-content-heading">
                <div>
                  <h2>My Listings</h2>
                  <p>
                    Items you are currently offering.
                  </p>
                </div>

                <button
                  type="button"
                  className="profile-create-listing"
                  onClick={() => navigate('/create-listing')}
                >
                  + Create Listing
                </button>
              </div>

              <div className="profile-listing-grid">
                {MY_LISTINGS.map((item) => (
                  <article
                    className="profile-listing-card"
                    key={item.id}
                    onClick={() =>
                      navigate(`/listing/${item.id}`)
                    }
                  >
                    <div className="profile-listing-image-wrap">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="profile-listing-image"
                      />

                      <button
                        type="button"
                        className={`profile-save-button ${
                          savedItems.includes(item.id)
                            ? 'saved'
                            : ''
                        }`}
                        onClick={(event) => {
                          event.stopPropagation()
                          toggleSaved(item.id)
                        }}
                        aria-label="Save listing"
                      >
                        <Bookmark
                          size={17}
                          fill={
                            savedItems.includes(item.id)
                              ? 'currentColor'
                              : 'none'
                          }
                        />
                      </button>
                    </div>

                    <div className="profile-listing-body">
                      <span className="profile-listing-category">
                        {item.category}
                      </span>

                      <h3>{item.title}</h3>

                      <strong>
                        {formatPrice(item.price)}
                      </strong>

                      <div className="profile-listing-meta">
                        <span>{item.condition}</span>
                        <span>{item.location}</span>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          )}

          {/* SAVED */}
          {activeTab === 'saved' && (
            <div className="profile-tab-content">
              <div className="profile-content-heading">
                <div>
                  <h2>Saved Items</h2>
                  <p>
                    Items you've bookmarked on UniTrade.
                  </p>
                </div>
              </div>

              {savedListings.length === 0 ? (
                <div className="profile-empty-state">
                  <div className="profile-empty-icon">
                    <Bookmark size={25} />
                  </div>

                  <h3>No saved items yet</h3>

                  <p>
                    Save products from the marketplace and they
                    will appear here.
                  </p>

                  <button
                    type="button"
                    className="profile-empty-button"
                    onClick={() => navigate('/marketplace')}
                  >
                    Browse Marketplace
                  </button>
                </div>
              ) : (
                <div className="profile-listing-grid">
                  {savedListings.map((item) => (
                    <article
                      className="profile-listing-card"
                      key={item.id}
                      onClick={() =>
                        navigate(`/listing/${item.id}`)
                      }
                    >
                      <div className="profile-listing-image-wrap">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="profile-listing-image"
                        />

                        <button
                          type="button"
                          className="profile-save-button saved"
                          onClick={(event) => {
                            event.stopPropagation()
                            toggleSaved(item.id)
                          }}
                          aria-label="Remove saved listing"
                        >
                          <Bookmark
                            size={17}
                            fill="currentColor"
                          />
                        </button>
                      </div>

                      <div className="profile-listing-body">
                        <span className="profile-listing-category">
                          {item.category}
                        </span>

                        <h3>{item.title}</h3>

                        <strong>
                          {formatPrice(item.price)}
                        </strong>

                        <div className="profile-listing-meta">
                          <span>{item.condition}</span>
                          <span>{item.location}</span>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TRADES */}
          {activeTab === 'trades' && (
            <div className="profile-tab-content">
              <div className="profile-content-heading">
                <div>
                  <h2>Trade History</h2>
                  <p>
                    Your completed UniTrade transactions.
                  </p>
                </div>
              </div>

              <div className="trade-history-list">
                {TRADE_HISTORY.map((trade) => (
                  <div
                    className="trade-history-card"
                    key={trade.id}
                  >
                    <div className="trade-history-icon">
                      <Package size={20} />
                    </div>

                    <div className="trade-history-main">
                      <h3>{trade.title}</h3>

                      <div className="trade-history-meta">
                        <span>{trade.type}</span>
                        <span>{trade.date}</span>
                      </div>
                    </div>

                    <div className="trade-history-right">
                      <strong>
                        {formatPrice(trade.amount)}
                      </strong>

                      <span>
                        <BadgeCheck size={14} />
                        {trade.status}
                      </span>
                    </div>

                    <button
                      type="button"
                      className="trade-history-arrow"
                      onClick={() =>
                        navigate('/trade-complete')
                      }
                      aria-label="View trade"
                    >
                      <ChevronRight size={19} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>

        {/* QUICK LINKS */}
        <section className="profile-quick-links">
          <button
            type="button"
            onClick={() => navigate('/messages')}
          >
            <div>
              <MessageCircle size={18} />
              <span>Messages</span>
            </div>

            <ChevronRight size={18} />
          </button>

          <button
            type="button"
            onClick={() => navigate('/settings')}
          >
            <div>
              <Settings size={18} />
              <span>Settings</span>
            </div>

            <ChevronRight size={18} />
          </button>

          <button
            type="button"
            onClick={() => navigate('/help-support')}
          >
            <div>
              <ShieldCheck size={18} />
              <span>Help & Support</span>
            </div>

            <ChevronRight size={18} />
          </button>
        </section>
      </main>

      {/* MOBILE NAV */}
      <nav className="profile-mobile-nav">
        <button
          type="button"
          onClick={() => navigate('/dashboard')}
        >
          <Home size={19} />
          <span>Home</span>
        </button>

        <button
          type="button"
          onClick={() => navigate('/marketplace')}
        >
          <Store size={19} />
          <span>Browse</span>
        </button>

        <button
          type="button"
          onClick={() => navigate('/messages')}
        >
          <MessageCircle size={19} />
          <span>Messages</span>
        </button>

        <button
          type="button"
          className="active"
          onClick={() => navigate('/profile')}
        >
          <UserRound size={19} />
          <span>Profile</span>
        </button>
      </nav>
    </div>
  )
}

export default Profile