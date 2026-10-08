import { useState } from 'react'
import {
  ArrowLeft,
  Bookmark,
  ChevronLeft,
  ChevronRight,
  Heart,
  MapPin,
  MessageCircle,
  Package,
  ShieldCheck,
  ShoppingBag,
  Star,
  UserRound,
} from 'lucide-react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import './ListingDetails.css'

const listings = {
  headphones: {
    id: 'headphones',
    title: 'Wireless Noise-Cancelling Headphones',
    price: '₦28,000',
    category: 'Electronics',
    condition: 'Like new',
    location: 'Main Campus',
    seller: 'Daniel Okafor',
    sellerInitials: 'DO',
    rating: 4.9,
    trades: 18,
    verified: true,
    description:
      'Wireless noise-cancelling headphones in excellent condition. Used carefully and fully functional. Great for studying, lectures, music and travelling around campus.',
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1545127398-14699f92334b?auto=format&fit=crop&w=1200&q=85',
    ],
  },

  backpack: {
    id: 'backpack',
    title: 'Minimalist Laptop Backpack',
    price: '₦18,500',
    category: 'Fashion',
    condition: 'Good',
    location: 'Hostel Area',
    seller: 'Mary James',
    sellerInitials: 'MJ',
    rating: 4.8,
    trades: 12,
    verified: true,
    description:
      'Clean and durable laptop backpack suitable for students. It has enough space for a laptop, books, charger and everyday essentials.',
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1581605405669-fcdf81165afa?auto=format&fit=crop&w=1200&q=85',
    ],
  },

  biochem: {
    id: 'biochem',
    title: 'Medical Biochemistry Textbook',
    price: '₦7,500',
    category: 'Books',
    condition: 'Good',
    location: 'Faculty Village',
    seller: 'Samuel Peter',
    sellerInitials: 'SP',
    rating: 4.7,
    trades: 9,
    verified: true,
    description:
      'Medical Biochemistry textbook in good condition. Pages are clean and intact. Useful for students taking biochemistry and related courses.',
    images: [
      'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=1200&q=85',
    ],
  },

  sneakers: {
    id: 'sneakers',
    title: 'Classic White Campus Sneakers',
    price: '₦22,000',
    category: 'Fashion',
    condition: 'Like new',
    location: 'Main Campus',
    seller: 'Ruth David',
    sellerInitials: 'RD',
    rating: 4.9,
    trades: 21,
    verified: true,
    description:
      'Classic white sneakers in very good condition. Comfortable for everyday campus movement, lectures and casual outings.',
    images: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?auto=format&fit=crop&w=1200&q=85',
    ],
  },
}

function ListingDetails() {
  const { id } = useParams()
  const navigate = useNavigate()

  const listing = listings[id] || listings.headphones

  const [activeImage, setActiveImage] = useState(0)
  const [saved, setSaved] = useState(false)

  const nextImage = () => {
    setActiveImage((current) =>
      current === listing.images.length - 1 ? 0 : current + 1,
    )
  }

  const previousImage = () => {
    setActiveImage((current) =>
      current === 0 ? listing.images.length - 1 : current - 1,
    )
  }

  const handleSave = () => {
    setSaved((current) => !current)
  }

  const handleMessageSeller = () => {
    navigate(`/chat/${listing.id}`)
  }

  return (
    <main className="listing-details-page">
      {/* HEADER */}
      <header className="listing-details-header">
        <div className="listing-details-header-inner">
          <button
            type="button"
            className="listing-details-back"
            onClick={() => navigate(-1)}
            aria-label="Go back"
          >
            <ArrowLeft size={20} />
            <span>Back</span>
          </button>

          {/* CORRECT UNITRADE LOGO */}
          <Link
            to="/"
            className="listing-details-brand"
            aria-label="Go to UniTrade home"
          >
            <span className="listing-details-brand-icon">
              <ShoppingBag size={20} strokeWidth={2.2} />
            </span>

            <span className="listing-details-brand-text">
              UniTrade
            </span>
          </Link>

          <div className="listing-details-header-actions">
            <button
              type="button"
              className={`listing-details-save-button ${
                saved ? 'is-saved' : ''
              }`}
              onClick={handleSave}
              aria-label={saved ? 'Remove from saved' : 'Save listing'}
            >
              <Bookmark
                size={19}
                fill={saved ? 'currentColor' : 'none'}
              />
            </button>

            <Link
              to="/profile"
              className="listing-details-profile-button"
              aria-label="Open profile"
            >
              <UserRound size={19} />
            </Link>
          </div>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <div className="listing-details-container">
        <div className="listing-details-grid">
          {/* LEFT - IMAGE GALLERY */}
          <section className="listing-details-gallery">
            <div className="listing-details-main-image">
              <img
                src={listing.images[activeImage]}
                alt={listing.title}
              />

              <button
                type="button"
                className="listing-details-image-arrow listing-details-image-arrow-left"
                onClick={previousImage}
                aria-label="Previous image"
              >
                <ChevronLeft size={22} />
              </button>

              <button
                type="button"
                className="listing-details-image-arrow listing-details-image-arrow-right"
                onClick={nextImage}
                aria-label="Next image"
              >
                <ChevronRight size={22} />
              </button>

              <div className="listing-details-image-count">
                {activeImage + 1} / {listing.images.length}
              </div>
            </div>

            <div className="listing-details-thumbnails">
              {listing.images.map((image, index) => (
                <button
                  type="button"
                  key={image}
                  className={`listing-details-thumbnail ${
                    activeImage === index ? 'active' : ''
                  }`}
                  onClick={() => setActiveImage(index)}
                  aria-label={`View image ${index + 1}`}
                >
                  <img src={image} alt="" />
                </button>
              ))}
            </div>
          </section>

          {/* RIGHT - DETAILS */}
          <section className="listing-details-info">
            <div className="listing-details-topline">
              <span className="listing-details-category">
                {listing.category}
              </span>

              <span className="listing-details-condition">
                {listing.condition}
              </span>
            </div>

            <h1>{listing.title}</h1>

            <div className="listing-details-price">
              {listing.price}
            </div>

            <div className="listing-details-location">
              <MapPin size={17} />
              <span>{listing.location}</span>
            </div>

            <div className="listing-details-divider" />

            {/* SELLER */}
            <div className="listing-details-seller">
              <div className="listing-details-seller-avatar">
                {listing.sellerInitials}
              </div>

              <div className="listing-details-seller-info">
                <div className="listing-details-seller-name">
                  <strong>{listing.seller}</strong>

                  {listing.verified && (
                    <ShieldCheck
                      size={17}
                      className="listing-details-verified"
                    />
                  )}
                </div>

                <div className="listing-details-seller-meta">
                  <span>
                    <Star size={14} fill="currentColor" />
                    {listing.rating}
                  </span>

                  <span>{listing.trades} completed trades</span>
                </div>
              </div>

              <Link
                to="/profile"
                className="listing-details-view-profile"
              >
                View profile
              </Link>
            </div>

            <div className="listing-details-divider" />

            {/* DESCRIPTION */}
            <div className="listing-details-description">
              <h2>Description</h2>

              <p>{listing.description}</p>
            </div>

            {/* ITEM DETAILS */}
            <div className="listing-details-information">
              <h2>Item details</h2>

              <div className="listing-details-information-grid">
                <div>
                  <span>Category</span>
                  <strong>{listing.category}</strong>
                </div>

                <div>
                  <span>Condition</span>
                  <strong>{listing.condition}</strong>
                </div>

                <div>
                  <span>Location</span>
                  <strong>{listing.location}</strong>
                </div>

                <div>
                  <span>Seller status</span>
                  <strong>Verified student</strong>
                </div>
              </div>
            </div>

            {/* ACTIONS */}
            <div className="listing-details-actions">
              <button
                type="button"
                className="listing-details-message-button"
                onClick={handleMessageSeller}
              >
                <MessageCircle size={19} />
                Message Seller
              </button>

              <button
                type="button"
                className={`listing-details-save-large ${
                  saved ? 'is-saved' : ''
                }`}
                onClick={handleSave}
              >
                <Heart
                  size={19}
                  fill={saved ? 'currentColor' : 'none'}
                />

                {saved ? 'Saved' : 'Save'}
              </button>
            </div>

            {/* SAFETY CARD */}
            <div className="listing-details-safety">
              <div className="listing-details-safety-icon">
                <ShieldCheck size={20} />
              </div>

              <div>
                <strong>Trade safely on campus</strong>

                <p>
                  Meet in a public campus location, inspect the item
                  before completing the trade, and keep communication
                  within UniTrade.
                </p>
              </div>
            </div>
          </section>
        </div>

        {/* BOTTOM TRUST SECTION */}
        <section className="listing-details-trust">
          <div className="listing-details-trust-icon">
            <Package size={22} />
          </div>

          <div>
            <strong>UniTrade trusted marketplace</strong>

            <p>
              Student verification, trade history and ratings help
              make buying and selling within your campus safer.
            </p>
          </div>
        </section>
      </div>
    </main>
  )
}

export default ListingDetails