import {
  ArrowRight,
  Bell,
  Bot,
  ChevronRight,
  Heart,
  HelpCircle,
  Home,
  Menu,
  MessageCircle,
  Package,
  Plus,
  Search,
  Settings,
  ShoppingBag,
  Sparkles,
  Store,
  UserRound,
  X,
} from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Dashboard.css'

const dashboardListings = [
  {
    id: 'headphones',
    title: 'Wireless Noise-Cancelling Headphones',
    price: '₦28,000',
    category: 'Electronics',
    location: 'Main Campus',
    image:
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=85',
  },
  {
    id: 'backpack',
    title: 'Minimalist Laptop Backpack',
    price: '₦18,500',
    category: 'Fashion',
    location: 'Hostel Area',
    image:
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=900&q=85',
  },
  {
    id: 'biochem',
    title: 'Medical Biochemistry Textbook',
    price: '₦7,500',
    category: 'Books',
    location: 'Faculty Village',
    image:
      'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=900&q=85',
  },
  {
    id: 'sneakers',
    title: 'Classic White Campus Sneakers',
    price: '₦22,000',
    category: 'Fashion',
    location: 'Main Campus',
    image:
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=85',
  },
]

function Dashboard() {
  const navigate = useNavigate()

  const [menuOpen, setMenuOpen] = useState(false)
  const [mode, setMode] = useState('buyer')
  const [search, setSearch] = useState('')

  const [profile, setProfile] = useState({
    fullName: 'John Doe',
    email: 'student@fuask.edu.ng',
    matricNumber: 'FUASK/20/12345',
  })

  useEffect(() => {
    try {
      const savedMode = localStorage.getItem('unitrade-mode')

      if (savedMode === 'seller' || savedMode === 'buyer') {
        setMode(savedMode)
      }

      const savedProfile = localStorage.getItem('unitrade-profile')

      if (savedProfile) {
        const parsedProfile = JSON.parse(savedProfile)

        setProfile((current) => ({
          ...current,
          ...parsedProfile,
        }))
      }
    } catch {
      // Keep default dashboard information.
    }
  }, [])

  const firstName =
    profile.fullName?.split(' ')[0] || 'John'

  const handleModeChange = (newMode) => {
    setMode(newMode)
    localStorage.setItem('unitrade-mode', newMode)
  }

  const handleSearch = (event) => {
    event.preventDefault()

    navigate(
      search.trim()
        ? `/marketplace?search=${encodeURIComponent(search.trim())}`
        : '/marketplace',
    )
  }

  const handleLogout = () => {
    localStorage.removeItem('unitrade-session')
    navigate('/login')
  }

  return (
    <main className="dashboard-page">
      {/* ================= HEADER ================= */}
      <header className="dashboard-header">
        <div className="dashboard-header-inner">
          <button
            type="button"
            className="dashboard-mobile-menu"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={21} />
          </button>

          <Link
            to="/"
            className="dashboard-brand"
            aria-label="Go to UniTrade home"
          >
            <span className="dashboard-brand-icon">
              <ShoppingBag size={20} strokeWidth={2.2} />
            </span>

            <span className="dashboard-brand-text">
              UniTrade
            </span>
          </Link>

          <div className="dashboard-header-search">
            <form onSubmit={handleSearch}>
              <Search size={18} />

              <input
                type="text"
                placeholder="Search campus items..."
                value={search}
                onChange={(event) => setSearch(event.target.value)}
              />
            </form>
          </div>

          <div className="dashboard-header-actions">
            <Link
              to="/notifications"
              className="dashboard-icon-button dashboard-notification-button"
              aria-label="Notifications"
            >
              <Bell size={20} />
              <span className="dashboard-notification-dot" />
            </Link>

            <Link
              to="/profile"
              className="dashboard-profile-button"
            >
              <span className="dashboard-profile-avatar">
                {profile.fullName
                  ?.split(' ')
                  .map((name) => name[0])
                  .slice(0, 2)
                  .join('')
                  .toUpperCase() || 'JD'}
              </span>

              <span className="dashboard-profile-name">
                {firstName}
              </span>
            </Link>
          </div>
        </div>
      </header>

      {/* ================= MOBILE DRAWER ================= */}
      {menuOpen && (
        <div
          className="dashboard-drawer-overlay"
          onClick={() => setMenuOpen(false)}
        >
          <aside
            className="dashboard-drawer"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="dashboard-drawer-header">
              <Link
                to="/"
                className="dashboard-brand"
                onClick={() => setMenuOpen(false)}
              >
                <span className="dashboard-brand-icon">
                  <ShoppingBag size={20} />
                </span>

                <span className="dashboard-brand-text">
                  UniTrade
                </span>
              </Link>

              <button
                type="button"
                className="dashboard-drawer-close"
                onClick={() => setMenuOpen(false)}
              >
                <X size={20} />
              </button>
            </div>

            <div className="dashboard-drawer-user">
              <div className="dashboard-drawer-avatar">
                {profile.fullName
                  ?.split(' ')
                  .map((name) => name[0])
                  .slice(0, 2)
                  .join('')
                  .toUpperCase() || 'JD'}
              </div>

              <div>
                <strong>{profile.fullName}</strong>
                <span>Verified student</span>
              </div>
            </div>

            <nav className="dashboard-drawer-nav">
              <Link
                to="/dashboard"
                onClick={() => setMenuOpen(false)}
              >
                <Home size={19} />
                Home
              </Link>

              <Link
                to="/marketplace"
                onClick={() => setMenuOpen(false)}
              >
                <Store size={19} />
                Marketplace
              </Link>

              <Link
                to="/create-listing"
                onClick={() => setMenuOpen(false)}
              >
                <Plus size={19} />
                Sell an Item
              </Link>

              <Link
                to="/ai"
                onClick={() => setMenuOpen(false)}
              >
                <Bot size={19} />
                UniTrade AI
              </Link>

              <Link
                to="/profile"
                onClick={() => setMenuOpen(false)}
              >
                <UserRound size={19} />
                Profile
              </Link>

              <Link
                to="/notifications"
                onClick={() => setMenuOpen(false)}
              >
                <Bell size={19} />
                Notifications
              </Link>

              <Link
                to="/settings"
                onClick={() => setMenuOpen(false)}
              >
                <Settings size={19} />
                Settings
              </Link>

              <Link
                to="/help-support"
                onClick={() => setMenuOpen(false)}
              >
                <HelpCircle size={19} />
                Help & Support
              </Link>
            </nav>

            <button
              type="button"
              className="dashboard-drawer-logout"
              onClick={handleLogout}
            >
              Sign out
            </button>
          </aside>
        </div>
      )}

      {/* ================= MAIN ================= */}
      <div className="dashboard-main">
        {/* HERO */}
        <section className="dashboard-hero">
          <div className="dashboard-hero-content">
            <div className="dashboard-hero-copy">
              <span className="dashboard-eyebrow">
                <Sparkles size={14} />
                Campus marketplace
              </span>

              <h1>
                Good morning, {firstName}.
              </h1>

              <p>
                Discover useful items from students around your
                campus or list something you no longer need.
              </p>

              <div className="dashboard-hero-actions">
                <button
                  type="button"
                  className="dashboard-primary-button"
                  onClick={() => navigate('/marketplace')}
                >
                  Browse Items
                  <ArrowRight size={17} />
                </button>

                <button
                  type="button"
                  className="dashboard-secondary-button"
                  onClick={() => navigate('/create-listing')}
                >
                  <Plus size={17} />
                  Sell an Item
                </button>
              </div>
            </div>

            <div className="dashboard-hero-card">
              <div className="dashboard-hero-card-top">
                <div className="dashboard-hero-card-icon">
                  <ShieldIcon />
                </div>

                <span>Trusted campus trading</span>
              </div>

              <h2>
                Buy and sell with more confidence.
              </h2>

              <p>
                Verified students, ratings and completed trades help
                create a safer marketplace.
              </p>

              <Link to="/help-support">
                Learn how it works
                <ChevronRight size={16} />
              </Link>
            </div>
          </div>
        </section>

        {/* MODE SWITCH */}
        <section className="dashboard-mode-section">
          <div>
            <span className="dashboard-section-label">
              Your marketplace mode
            </span>

            <p>
              Switch between buying and selling whenever you need.
            </p>
          </div>

          <div className="dashboard-mode-switch">
            <button
              type="button"
              className={mode === 'buyer' ? 'active' : ''}
              onClick={() => handleModeChange('buyer')}
            >
              <Store size={16} />
              Buyer
            </button>

            <button
              type="button"
              className={mode === 'seller' ? 'active' : ''}
              onClick={() => handleModeChange('seller')}
            >
              <Package size={16} />
              Seller
            </button>
          </div>
        </section>

        {/* QUICK ACTIONS */}
        <section className="dashboard-section">
          <div className="dashboard-section-heading">
            <div>
              <span className="dashboard-section-label">
                Quick actions
              </span>

              <h2>What would you like to do?</h2>
            </div>
          </div>

          <div className="dashboard-action-grid">
            <button
              type="button"
              className="dashboard-action-card dashboard-action-card-gold"
              onClick={() => navigate('/marketplace')}
            >
              <span className="dashboard-action-icon">
                <Search size={21} />
              </span>

              <span className="dashboard-action-content">
                <strong>Find something</strong>
                <small>
                  Browse items listed by students
                </small>
              </span>

              <ChevronRight size={18} />
            </button>

            <button
              type="button"
              className="dashboard-action-card"
              onClick={() => navigate('/create-listing')}
            >
              <span className="dashboard-action-icon">
                <Plus size={21} />
              </span>

              <span className="dashboard-action-content">
                <strong>Sell something</strong>
                <small>
                  Create a listing in a few steps
                </small>
              </span>

              <ChevronRight size={18} />
            </button>

            <button
              type="button"
              className="dashboard-action-card"
              onClick={() => navigate('/ai')}
            >
              <span className="dashboard-action-icon">
                <Bot size={21} />
              </span>

              <span className="dashboard-action-content">
                <strong>Ask UniTrade AI</strong>
                <small>
                  Get help finding or pricing an item
                </small>
              </span>

              <ChevronRight size={18} />
            </button>
          </div>
        </section>

        {/* LISTINGS */}
        <section className="dashboard-section">
          <div className="dashboard-section-heading">
            <div>
              <span className="dashboard-section-label">
                Fresh on campus
              </span>

              <h2>Recently listed</h2>
            </div>

            <Link to="/marketplace" className="dashboard-view-all">
              View all
              <ArrowRight size={16} />
            </Link>
          </div>

          <div className="dashboard-listing-grid">
            {dashboardListings.map((listing) => (
              <Link
                key={listing.id}
                to={`/listing/${listing.id}`}
                className="dashboard-listing-card"
              >
                <div className="dashboard-listing-image">
                  <img
                    src={listing.image}
                    alt={listing.title}
                    loading="lazy"
                  />

                  <button
                    type="button"
                    className="dashboard-listing-save"
                    onClick={(event) => {
                      event.preventDefault()
                      event.stopPropagation()
                    }}
                    aria-label={`Save ${listing.title}`}
                  >
                    <Heart size={16} />
                  </button>
                </div>

                <div className="dashboard-listing-body">
                  <span className="dashboard-listing-category">
                    {listing.category}
                  </span>

                  <h3>{listing.title}</h3>

                  <strong>{listing.price}</strong>

                  <span className="dashboard-listing-location">
                    {listing.location}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* AI PROMO */}
        <section className="dashboard-ai-card">
          <div className="dashboard-ai-icon">
            <Bot size={25} />
          </div>

          <div className="dashboard-ai-content">
            <span>UniTrade AI</span>

            <h2>
              Need help finding or listing something?
            </h2>

            <p>
              Ask our AI assistant about items, pricing or how
              UniTrade works.
            </p>
          </div>

          <button
            type="button"
            onClick={() => navigate('/ai')}
          >
            Open AI
            <ArrowRight size={17} />
          </button>
        </section>

        {/* SUPPORT */}
        <section className="dashboard-support">
          <div>
            <span className="dashboard-section-label">
              Need help?
            </span>

            <h2>We're here to help.</h2>

            <p>
              Find answers to common questions or contact UniTrade
              support.
            </p>
          </div>

          <div className="dashboard-support-actions">
            <Link to="/help-support">
              <HelpCircle size={17} />
              Help & Support
            </Link>

            <Link to="/notifications">
              <MessageCircle size={17} />
              Notifications
            </Link>
          </div>
        </section>
      </div>

      {/* ================= MOBILE NAV ================= */}
      <nav className="dashboard-mobile-nav">
        <Link to="/dashboard" className="active">
          <Home size={19} />
          <span>Home</span>
        </Link>

        <Link to="/marketplace">
          <Search size={19} />
          <span>Search</span>
        </Link>

        <Link to="/create-listing">
          <Plus size={20} />
          <span>Sell</span>
        </Link>

        <Link to="/ai">
          <Bot size={19} />
          <span>AI</span>
        </Link>

        <Link to="/profile">
          <UserRound size={19} />
          <span>Profile</span>
        </Link>
      </nav>
    </main>
  )
}

function ShieldIcon() {
  return (
    <svg
      width="21"
      height="21"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 3L20 6V11.5C20 16.5 16.8 20.1 12 21C7.2 20.1 4 16.5 4 11.5V6L12 3Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path
        d="M8.5 12L10.8 14.2L15.7 9.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default Dashboard