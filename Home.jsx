import {
  ArrowRight,
  Bot,
  CheckCircle2,
  ChevronRight,
  Heart,
  HelpCircle,
  Menu,
  Plus,
  Search,
  ShoppingBag,
  Sparkles,
  Star,
  Store,
  UserRound,
  X,
} from 'lucide-react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Home.css'

const featuredListings = [
  {
    id: 'headphones',
    title: 'Wireless Noise-Cancelling Headphones',
    price: '₦28,000',
    category: 'Electronics',
    location: 'Main Campus',
    seller: 'Daniel Okafor',
    rating: 4.9,
    image:
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=85',
  },
  {
    id: 'backpack',
    title: 'Minimalist Laptop Backpack',
    price: '₦18,500',
    category: 'Fashion',
    location: 'Hostel Area',
    seller: 'Mary James',
    rating: 4.8,
    image:
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=900&q=85',
  },
  {
    id: 'biochem',
    title: 'Medical Biochemistry Textbook',
    price: '₦7,500',
    category: 'Books',
    location: 'Faculty Village',
    seller: 'Samuel Peter',
    rating: 4.7,
    image:
      'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=900&q=85',
  },
  {
    id: 'sneakers',
    title: 'Classic White Campus Sneakers',
    price: '₦22,000',
    category: 'Fashion',
    location: 'Main Campus',
    seller: 'Ruth David',
    rating: 4.9,
    image:
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=85',
  },
]

const categories = [
  {
    name: 'Electronics',
    description: 'Phones, laptops, accessories',
    icon: '01',
  },
  {
    name: 'Fashion',
    description: 'Clothes, shoes and bags',
    icon: '02',
  },
  {
    name: 'Books',
    description: 'Textbooks and study materials',
    icon: '03',
  },
  {
    name: 'Services',
    description: 'Student services around campus',
    icon: '04',
  },
]

function Home() {
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)
  const [search, setSearch] = useState('')

  const handleSearch = (event) => {
    event.preventDefault()

    const value = search.trim()

    if (value) {
      navigate(`/marketplace?search=${encodeURIComponent(value)}`)
    } else {
      navigate('/marketplace')
    }
  }

  return (
    <main className="home-page">
      {/* ================= HEADER ================= */}
      <header className="home-header">
        <div className="home-header-inner">
          <button
            type="button"
            className="home-mobile-menu"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={21} />
          </button>

          <Link
            to="/"
            className="home-brand"
            aria-label="Go to UniTrade home"
          >
            <span className="home-brand-icon">
              <ShoppingBag size={20} strokeWidth={2.2} />
            </span>

            <span className="home-brand-text">
              UniTrade
            </span>
          </Link>

          <nav className="home-desktop-nav">
            <a href="#categories">Categories</a>
            <a href="#featured">Explore</a>
            <a href="#how-it-works">How it works</a>
          </nav>

          <div className="home-header-actions">
            <Link
              to="/login"
              className="home-login-link"
            >
              Log in
            </Link>

            <Link
              to="/signup"
              className="home-signup-button"
            >
              Sign up
            </Link>
          </div>
        </div>
      </header>

      {/* ================= MOBILE DRAWER ================= */}
      {menuOpen && (
        <div
          className="home-drawer-overlay"
          onClick={() => setMenuOpen(false)}
        >
          <aside
            className="home-drawer"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="home-drawer-header">
              <Link
                to="/"
                className="home-brand"
                onClick={() => setMenuOpen(false)}
              >
                <span className="home-brand-icon">
                  <ShoppingBag size={20} />
                </span>

                <span className="home-brand-text">
                  UniTrade
                </span>
              </Link>

              <button
                type="button"
                className="home-drawer-close"
                onClick={() => setMenuOpen(false)}
              >
                <X size={20} />
              </button>
            </div>

            <nav className="home-drawer-nav">
              <a
                href="#categories"
                onClick={() => setMenuOpen(false)}
              >
                <Store size={19} />
                Categories
              </a>

              <a
                href="#featured"
                onClick={() => setMenuOpen(false)}
              >
                <ShoppingBag size={19} />
                Explore Marketplace
              </a>

              <a
                href="#how-it-works"
                onClick={() => setMenuOpen(false)}
              >
                <CheckCircle2 size={19} />
                How it works
              </a>

              <Link
                to="/ai"
                onClick={() => setMenuOpen(false)}
              >
                <Bot size={19} />
                UniTrade AI
              </Link>

              <Link
                to="/help-support"
                onClick={() => setMenuOpen(false)}
              >
                <HelpCircle size={19} />
                Help & Support
              </Link>
            </nav>

            <div className="home-drawer-actions">
              <Link
                to="/login"
                onClick={() => setMenuOpen(false)}
              >
                Log in
              </Link>

              <Link
                to="/signup"
                onClick={() => setMenuOpen(false)}
              >
                Create account
              </Link>
            </div>
          </aside>
        </div>
      )}

      {/* ================= HERO ================= */}
      <section className="home-hero">
        <div className="home-hero-inner">
          <div className="home-hero-copy">
            <span className="home-eyebrow">
              <Sparkles size={14} />
              Your campus marketplace
            </span>

            <h1>
              Buy and sell
              <br />
              <span>within your campus.</span>
            </h1>

            <p>
              Discover useful items from students around you,
              sell what you no longer need, and trade with people
              you can verify and trust.
            </p>

            <form
              className="home-hero-search"
              onSubmit={handleSearch}
            >
              <Search size={19} />

              <input
                type="text"
                placeholder="What are you looking for?"
                value={search}
                onChange={(event) =>
                  setSearch(event.target.value)
                }
              />

              <button type="submit">
                Search
              </button>
            </form>

            <div className="home-hero-actions">
              <button
                type="button"
                className="home-primary-button"
                onClick={() => navigate('/marketplace')}
              >
                Browse Marketplace
                <ArrowRight size={17} />
              </button>

              <button
                type="button"
                className="home-secondary-button"
                onClick={() => navigate('/create-listing')}
              >
                <Plus size={17} />
                Sell an Item
              </button>
            </div>

            <div className="home-trust-row">
              <span>
                <CheckCircle2 size={15} />
                Student-focused
              </span>

              <span>
                <CheckCircle2 size={15} />
                Verified accounts
              </span>

              <span>
                <CheckCircle2 size={15} />
                Ratings & trust
              </span>
            </div>
          </div>

          <div className="home-hero-visual">
            <div className="home-hero-visual-main">
              <img
                src={featuredListings[0].image}
                alt={featuredListings[0].title}
              />

              <div className="home-hero-product-card">
                <span>Featured listing</span>

                <strong>
                  {featuredListings[0].title}
                </strong>

                <div>
                  <b>{featuredListings[0].price}</b>

                  <small>
                    <Star
                      size={13}
                      fill="currentColor"
                    />
                    {featuredListings[0].rating}
                  </small>
                </div>
              </div>
            </div>

            <div className="home-floating-card home-floating-card-top">
              <span className="home-floating-icon">
                <ShieldCheckIcon />
              </span>

              <div>
                <strong>Verified students</strong>
                <small>Trade with more confidence</small>
              </div>
            </div>

            <div className="home-floating-card home-floating-card-bottom">
              <span className="home-floating-icon">
                <Bot size={18} />
              </span>

              <div>
                <strong>UniTrade AI</strong>
                <small>Smart help when you need it</small>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= TRUST STRIP ================= */}
      <section className="home-trust-strip">
        <div className="home-trust-strip-inner">
          <div>
            <strong>Student marketplace</strong>
            <span>Built around campus life</span>
          </div>

          <div>
            <strong>Verified identity</strong>
            <span>Know who you're trading with</span>
          </div>

          <div>
            <strong>Trade ratings</strong>
            <span>Build a trusted reputation</span>
          </div>

          <div>
            <strong>AI assistance</strong>
            <span>Get help when listing or browsing</span>
          </div>
        </div>
      </section>

      {/* ================= CATEGORIES ================= */}
      <section
        className="home-section"
        id="categories"
      >
        <div className="home-section-heading">
          <div>
            <span className="home-section-label">
              Explore
            </span>

            <h2>Shop by category</h2>

            <p>
              Find what you need without searching through
              everything.
            </p>
          </div>

          <Link to="/marketplace">
            View marketplace
            <ArrowRight size={16} />
          </Link>
        </div>

        <div className="home-category-grid">
          {categories.map((category) => (
            <Link
              key={category.name}
              to={`/marketplace?category=${encodeURIComponent(
                category.name,
              )}`}
              className="home-category-card"
            >
              <span className="home-category-number">
                {category.icon}
              </span>

              <div>
                <h3>{category.name}</h3>

                <p>{category.description}</p>
              </div>

              <ChevronRight size={18} />
            </Link>
          ))}
        </div>
      </section>

      {/* ================= FEATURED ================= */}
      <section
        className="home-section home-featured-section"
        id="featured"
      >
        <div className="home-section-heading">
          <div>
            <span className="home-section-label">
              Fresh listings
            </span>

            <h2>Recently listed on campus</h2>

            <p>
              A few things students are selling right now.
            </p>
          </div>

          <Link to="/marketplace">
            See all items
            <ArrowRight size={16} />
          </Link>
        </div>

        <div className="home-product-grid">
          {featuredListings.map((item) => (
            <Link
              key={item.id}
              to={`/listing/${item.id}`}
              className="home-product-card"
            >
              <div className="home-product-image">
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                />

                <button
                  type="button"
                  className="home-product-heart"
                  onClick={(event) => {
                    event.preventDefault()
                    event.stopPropagation()
                  }}
                  aria-label={`Save ${item.title}`}
                >
                  <Heart size={17} />
                </button>
              </div>

              <div className="home-product-body">
                <span>{item.category}</span>

                <h3>{item.title}</h3>

                <strong>{item.price}</strong>

                <div className="home-product-meta">
                  <small>{item.location}</small>

                  <small>
                    <Star
                      size={12}
                      fill="currentColor"
                    />
                    {item.rating}
                  </small>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ================= HOW IT WORKS ================= */}
      <section
        className="home-how-section"
        id="how-it-works"
      >
        <div className="home-section-heading home-how-heading">
          <div>
            <span className="home-section-label">
              Simple process
            </span>

            <h2>How UniTrade works</h2>

            <p>
              From finding an item to completing a trade, we keep
              things straightforward.
            </p>
          </div>
        </div>

        <div className="home-how-grid">
          <div className="home-how-card">
            <span>01</span>
            <Search size={22} />

            <h3>Discover</h3>

            <p>
              Search and browse listings from students around
              your campus.
            </p>
          </div>

          <div className="home-how-card">
            <span>02</span>
            <MessageIcon />

            <h3>Connect</h3>

            <p>
              Message the seller directly and agree on the trade
              details.
            </p>
          </div>

          <div className="home-how-card">
            <span>03</span>
            <CheckCircle2 size={22} />

            <h3>Trade</h3>

            <p>
              Meet safely, complete the transaction and rate the
              experience.
            </p>
          </div>
        </div>
      </section>

      {/* ================= AI ================= */}
      <section className="home-ai-section">
        <div className="home-ai-content">
          <span className="home-section-label">
            Meet your campus assistant
          </span>

          <h2>
            Need help finding or listing something?
          </h2>

          <p>
            UniTrade AI can help you explore items, think through
            pricing and improve your listing. Your actual buyer
            and seller conversations stay between you and the
            other person.
          </p>

          <Link to="/ai">
            Explore UniTrade AI
            <ArrowRight size={17} />
          </Link>
        </div>

        <div className="home-ai-visual">
          <div className="home-ai-message">
            <span>
              <Bot size={17} />
              UniTrade AI
            </span>

            <p>
              “I can help you improve your listing before you
              publish it.”
            </p>
          </div>

          <Sparkles
            className="home-ai-sparkle"
            size={28}
          />
        </div>
      </section>

      {/* ================= FINAL CTA ================= */}
      <section className="home-final-cta">
        <div>
          <span className="home-section-label">
            Ready to get started?
          </span>

          <h2>
            Your next campus trade starts here.
          </h2>

          <p>
            Join UniTrade and make buying and selling around
            campus easier.
          </p>
        </div>

        <div className="home-final-actions">
          <Link to="/signup">
            Create your account
            <ArrowRight size={17} />
          </Link>

          <Link to="/login">
            I already have an account
          </Link>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="home-footer">
        <div className="home-footer-inner">
          <Link
            to="/"
            className="home-brand"
          >
            <span className="home-brand-icon">
              <ShoppingBag size={19} />
            </span>

            <span className="home-brand-text">
              UniTrade
            </span>
          </Link>

          <div className="home-footer-links">
            <Link to="/marketplace">
              Marketplace
            </Link>

            <Link to="/ai">
              UniTrade AI
            </Link>

            <Link to="/help-support">
              Help & Support
            </Link>

            <Link to="/settings">
              Settings
            </Link>
          </div>

          <span className="home-footer-copy">
            Buy & sell within your campus.
          </span>
        </div>
      </footer>

      {/* ================= MOBILE NAV ================= */}
      <nav className="home-mobile-nav">
        <Link to="/" className="active">
          <ShoppingBag size={19} />
          <span>Home</span>
        </Link>

        <Link to="/marketplace">
          <Search size={19} />
          <span>Browse</span>
        </Link>

        <Link to="/create-listing">
          <Plus size={20} />
          <span>Sell</span>
        </Link>

        <Link to="/ai">
          <Bot size={19} />
          <span>AI</span>
        </Link>

        <Link to="/login">
          <UserRound size={19} />
          <span>Account</span>
        </Link>
      </nav>
    </main>
  )
}

function ShieldCheckIcon() {
  return (
    <svg
      width="19"
      height="19"
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

function MessageIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M20 11.5C20 15.64 16.42 19 12 19C10.92 19 9.9 18.8 8.98 18.43L5 20L6.13 16.65C5.42 15.43 5 14.02 5 12.5C5 8.36 8.58 5 13 5C17.42 5 20 7.36 20 11.5Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default Home