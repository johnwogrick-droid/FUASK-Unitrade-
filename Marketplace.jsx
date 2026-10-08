import {
  Bell,
  Bot,
  Bookmark,
  ChevronDown,
  ChevronRight,
  Grid2X2,
  List,
  Menu,
  Plus,
  Search,
  ShoppingBag,
  SlidersHorizontal,
  Star,
  Store,
  UserRound,
  X,
} from 'lucide-react'
import { useMemo, useState } from 'react'
import {
  Link,
  useSearchParams,
} from 'react-router-dom'
import './Marketplace.css'

const listings = [
  {
    id: 'headphones',
    title: 'Wireless Noise-Cancelling Headphones',
    price: 28000,
    category: 'Electronics',
    condition: 'Like new',
    location: 'Main Campus',
    seller: 'Daniel Okafor',
    rating: 4.9,
    trades: 18,
    image:
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=85',
  },
  {
    id: 'backpack',
    title: 'Minimalist Laptop Backpack',
    price: 18500,
    category: 'Fashion',
    condition: 'Good',
    location: 'Hostel Area',
    seller: 'Mary James',
    rating: 4.8,
    trades: 12,
    image:
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=900&q=85',
  },
  {
    id: 'biochem',
    title: 'Medical Biochemistry Textbook',
    price: 7500,
    category: 'Books',
    condition: 'Good',
    location: 'Faculty Village',
    seller: 'Samuel Peter',
    rating: 4.7,
    trades: 9,
    image:
      'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=900&q=85',
  },
  {
    id: 'sneakers',
    title: 'Classic White Campus Sneakers',
    price: 22000,
    category: 'Fashion',
    condition: 'Like new',
    location: 'Main Campus',
    seller: 'Ruth David',
    rating: 4.9,
    trades: 21,
    image:
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=85',
  },
  {
    id: 'phone',
    title: 'Samsung Galaxy A54',
    price: 185000,
    category: 'Electronics',
    condition: 'Good',
    location: 'North Campus',
    seller: 'David Paul',
    rating: 4.8,
    trades: 15,
    image:
      'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=900&q=85',
  },
  {
    id: 'hoodie',
    title: 'Oversized Campus Hoodie',
    price: 14500,
    category: 'Fashion',
    condition: 'Like new',
    location: 'Main Campus',
    seller: 'Grace Michael',
    rating: 4.9,
    trades: 7,
    image:
      'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=900&q=85',
  },
  {
    id: 'textbook',
    title: 'Anatomy Study Guide',
    price: 9500,
    category: 'Books',
    condition: 'Good',
    location: 'Faculty Village',
    seller: 'Peter James',
    rating: 4.6,
    trades: 6,
    image:
      'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=900&q=85',
  },
  {
    id: 'watch',
    title: 'Classic Minimal Wristwatch',
    price: 12000,
    category: 'Fashion',
    condition: 'Like new',
    location: 'Hostel Area',
    seller: 'Rita John',
    rating: 4.8,
    trades: 11,
    image:
      'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=900&q=85',
  },
]

const categories = [
  'All',
  'Electronics',
  'Fashion',
  'Books',
  'Food',
  'Beauty',
  'Services',
]

const conditions = [
  'All conditions',
  'Brand new',
  'Like new',
  'Good',
  'Fair',
]

function Marketplace() {
  const [searchParams, setSearchParams] = useSearchParams()

  const initialSearch = searchParams.get('search') || ''
  const initialCategory = searchParams.get('category') || 'All'

  const [search, setSearch] = useState(initialSearch)
  const [category, setCategory] = useState(
    categories.includes(initialCategory)
      ? initialCategory
      : 'All',
  )
  const [condition, setCondition] = useState('All conditions')
  const [sort, setSort] = useState('Newest')
  const [view, setView] = useState('grid')
  const [menuOpen, setMenuOpen] = useState(false)
  const [showFilters, setShowFilters] = useState(false)
  const [savedItems, setSavedItems] = useState([])

  const filteredListings = useMemo(() => {
    let result = listings.filter((listing) => {
      const searchValue = search.toLowerCase().trim()

      const matchesSearch =
        !searchValue ||
        listing.title.toLowerCase().includes(searchValue) ||
        listing.category.toLowerCase().includes(searchValue) ||
        listing.seller.toLowerCase().includes(searchValue) ||
        listing.location.toLowerCase().includes(searchValue)

      const matchesCategory =
        category === 'All' ||
        listing.category === category

      const matchesCondition =
        condition === 'All conditions' ||
        listing.condition === condition

      return (
        matchesSearch &&
        matchesCategory &&
        matchesCondition
      )
    })

    if (sort === 'Price: Low to High') {
      result = [...result].sort(
        (a, b) => a.price - b.price,
      )
    }

    if (sort === 'Price: High to Low') {
      result = [...result].sort(
        (a, b) => b.price - a.price,
      )
    }

    if (sort === 'Rating') {
      result = [...result].sort(
        (a, b) => b.rating - a.rating,
      )
    }

    return result
  }, [search, category, condition, sort])

  const updateSearchParams = (
    nextSearch = search,
    nextCategory = category,
  ) => {
    const params = {}

    if (nextSearch.trim()) {
      params.search = nextSearch.trim()
    }

    if (nextCategory !== 'All') {
      params.category = nextCategory
    }

    setSearchParams(params)
  }

  const handleSearch = (event) => {
    event.preventDefault()
    updateSearchParams()
  }

  const handleCategory = (nextCategory) => {
    setCategory(nextCategory)
    updateSearchParams(search, nextCategory)
  }

  const toggleSaved = (event, id) => {
    event.preventDefault()
    event.stopPropagation()

    setSavedItems((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id],
    )
  }

  return (
    <main className="marketplace-page">
      {/* ================= HEADER ================= */}
      <header className="marketplace-header">
        <div className="marketplace-header-inner">
          <button
            type="button"
            className="marketplace-mobile-menu"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={21} />
          </button>

          <Link
            to="/"
            className="marketplace-brand"
          >
            <span className="marketplace-brand-icon">
              <ShoppingBag size={20} strokeWidth={2.2} />
            </span>

            <span className="marketplace-brand-text">
              UniTrade
            </span>
          </Link>

          <form
            className="marketplace-header-search"
            onSubmit={handleSearch}
          >
            <Search size={18} />

            <input
              type="text"
              placeholder="Search items, categories or sellers..."
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
            />

            <button type="submit">
              Search
            </button>
          </form>

          <div className="marketplace-header-actions">
            <Link
              to="/notifications"
              className="marketplace-header-icon"
              aria-label="Notifications"
            >
              <Bell size={20} />
              <span />
            </Link>

            <Link
              to="/profile"
              className="marketplace-header-profile"
            >
              <span>JD</span>
              <strong>Profile</strong>
            </Link>
          </div>
        </div>
      </header>

      {/* ================= MOBILE DRAWER ================= */}
      {menuOpen && (
        <div
          className="marketplace-drawer-overlay"
          onClick={() => setMenuOpen(false)}
        >
          <aside
            className="marketplace-drawer"
            onClick={(event) =>
              event.stopPropagation()
            }
          >
            <div className="marketplace-drawer-header">
              <Link
                to="/"
                className="marketplace-brand"
                onClick={() => setMenuOpen(false)}
              >
                <span className="marketplace-brand-icon">
                  <ShoppingBag size={20} />
                </span>

                <span className="marketplace-brand-text">
                  UniTrade
                </span>
              </Link>

              <button
                type="button"
                className="marketplace-drawer-close"
                onClick={() => setMenuOpen(false)}
              >
                <X size={20} />
              </button>
            </div>

            <nav className="marketplace-drawer-nav">
              <Link
                to="/dashboard"
                onClick={() => setMenuOpen(false)}
              >
                <Store size={19} />
                Dashboard
              </Link>

              <Link
                to="/marketplace"
                onClick={() => setMenuOpen(false)}
              >
                <ShoppingBag size={19} />
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
            </nav>
          </aside>
        </div>
      )}

      {/* ================= PAGE ================= */}
      <div className="marketplace-container">
        {/* TOP */}
        <section className="marketplace-intro">
          <div>
            <span className="marketplace-eyebrow">
              Campus marketplace
            </span>

            <h1>Find something useful.</h1>

            <p>
              Browse items listed by students around your
              campus.
            </p>
          </div>

          <Link
            to="/create-listing"
            className="marketplace-sell-button"
          >
            <Plus size={17} />
            Sell an Item
          </Link>
        </section>

        {/* CATEGORY BAR */}
        <section className="marketplace-category-bar">
          <div className="marketplace-category-scroll">
            {categories.map((item) => (
              <button
                key={item}
                type="button"
                className={
                  category === item ? 'active' : ''
                }
                onClick={() => handleCategory(item)}
              >
                {item}
              </button>
            ))}
          </div>
        </section>

        {/* FILTER / RESULTS BAR */}
        <section className="marketplace-controls">
          <div className="marketplace-result-count">
            <strong>
              {filteredListings.length}
            </strong>{' '}
            {filteredListings.length === 1
              ? 'item'
              : 'items'}{' '}
            found
          </div>

          <div className="marketplace-controls-right">
            <button
              type="button"
              className={`marketplace-filter-button ${
                showFilters ? 'active' : ''
              }`}
              onClick={() =>
                setShowFilters((current) => !current)
              }
            >
              <SlidersHorizontal size={16} />
              Filters
            </button>

            <div className="marketplace-sort">
              <span>Sort:</span>

              <select
                value={sort}
                onChange={(event) =>
                  setSort(event.target.value)
                }
              >
                <option>Newest</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Rating</option>
              </select>

              <ChevronDown size={15} />
            </div>

            <div className="marketplace-view-toggle">
              <button
                type="button"
                className={view === 'grid' ? 'active' : ''}
                onClick={() => setView('grid')}
                aria-label="Grid view"
              >
                <Grid2X2 size={17} />
              </button>

              <button
                type="button"
                className={view === 'list' ? 'active' : ''}
                onClick={() => setView('list')}
                aria-label="List view"
              >
                <List size={18} />
              </button>
            </div>
          </div>
        </section>

        {/* FILTERS */}
        {showFilters && (
          <section className="marketplace-filters">
            <div className="marketplace-filter-field">
              <label htmlFor="marketplace-condition">
                Condition
              </label>

              <select
                id="marketplace-condition"
                value={condition}
                onChange={(event) =>
                  setCondition(event.target.value)
                }
              >
                {conditions.map((item) => (
                  <option key={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>

            <div className="marketplace-filter-field">
              <label htmlFor="marketplace-search-filter">
                Search
              </label>

              <div className="marketplace-filter-search">
                <Search size={15} />

                <input
                  id="marketplace-search-filter"
                  value={search}
                  onChange={(event) =>
                    setSearch(event.target.value)
                  }
                  placeholder="Search listings..."
                />
              </div>
            </div>

            <button
              type="button"
              className="marketplace-clear-filters"
              onClick={() => {
                setSearch('')
                setCategory('All')
                setCondition('All conditions')
                setSort('Newest')
                setSearchParams({})
              }}
            >
              Clear filters
            </button>
          </section>
        )}

        {/* RESULTS */}
        {filteredListings.length > 0 ? (
          <section
            className={`marketplace-results ${
              view === 'list'
                ? 'marketplace-list-view'
                : ''
            }`}
          >
            {filteredListings.map((listing) => {
              const saved = savedItems.includes(
                listing.id,
              )

              return (
                <Link
                  key={listing.id}
                  to={`/listing/${listing.id}`}
                  className="marketplace-product-card"
                >
                  <div className="marketplace-product-image">
                    <img
                      src={listing.image}
                      alt={listing.title}
                      loading="lazy"
                    />

                    <button
                      type="button"
                      className={`marketplace-save-button ${
                        saved ? 'saved' : ''
                      }`}
                      onClick={(event) =>
                        toggleSaved(event, listing.id)
                      }
                      aria-label={
                        saved
                          ? 'Remove from saved'
                          : 'Save item'
                      }
                    >
                      <Bookmark
                        size={16}
                        fill={
                          saved
                            ? 'currentColor'
                            : 'none'
                        }
                      />
                    </button>

                    <span className="marketplace-condition-badge">
                      {listing.condition}
                    </span>
                  </div>

                  <div className="marketplace-product-body">
                    <span className="marketplace-product-category">
                      {listing.category}
                    </span>

                    <h2>{listing.title}</h2>

                    <strong className="marketplace-product-price">
                      ₦{listing.price.toLocaleString()}
                    </strong>

                    <div className="marketplace-product-meta">
                      <span>
                        {listing.location}
                      </span>

                      <span>
                        <Star
                          size={12}
                          fill="currentColor"
                        />
                        {listing.rating}
                      </span>
                    </div>

                    <div className="marketplace-seller">
                      <span>
                        {listing.seller
                          .split(' ')
                          .map((name) => name[0])
                          .join('')}
                      </span>

                      <div>
                        <small>Seller</small>
                        <b>{listing.seller}</b>
                      </div>

                      <ChevronRight size={15} />
                    </div>
                  </div>
                </Link>
              )
            })}
          </section>
        ) : (
          <section className="marketplace-empty">
            <div className="marketplace-empty-icon">
              <Search size={25} />
            </div>

            <h2>No items found</h2>

            <p>
              Try another search term or remove some filters.
            </p>

            <button
              type="button"
              onClick={() => {
                setSearch('')
                setCategory('All')
                setCondition('All conditions')
                setSearchParams({})
              }}
            >
              Clear search
            </button>
          </section>
        )}
      </div>

      {/* ================= MOBILE NAV ================= */}
      <nav className="marketplace-mobile-nav">
        <Link to="/dashboard">
          <Store size={19} />
          <span>Home</span>
        </Link>

        <Link
          to="/marketplace"
          className="active"
        >
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

        <Link to="/profile">
          <UserRound size={19} />
          <span>Profile</span>
        </Link>
      </nav>
    </main>
  )
}

export default Marketplace