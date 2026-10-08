import { useState } from 'react'
import {
  ArrowLeft,
  Check,
  ChevronRight,
  CircleCheck,
  MessageSquare,
  PackageCheck,
  ShieldCheck,
  Star,
  ThumbsUp,
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import './TradeRating.css'

const seller = {
  name: 'Daniel Okafor',
  initials: 'DO',
  rating: 4.9,
  trades: 18,
}

const listing = {
  title: 'Wireless Noise-Cancelling Headphones',
  price: '₦28,000',
}

const ratingLabels = {
  1: 'Very poor',
  2: 'Poor',
  3: 'Okay',
  4: 'Good',
  5: 'Excellent',
}

function TradeRating() {
  const navigate = useNavigate()

  const [rating, setRating] = useState(0)
  const [hoveredRating, setHoveredRating] = useState(0)
  const [review, setReview] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const displayedRating = hoveredRating || rating

  const handleSubmit = (event) => {
    event.preventDefault()

    if (!rating) return

    const tradeRating = {
      id: Date.now(),
      seller: seller.name,
      listing: listing.title,
      price: listing.price,
      rating,
      review: review.trim(),
      createdAt: new Date().toISOString(),
    }

    const existingRatings = JSON.parse(
      localStorage.getItem('unitrade-ratings') || '[]',
    )

    localStorage.setItem(
      'unitrade-ratings',
      JSON.stringify([...existingRatings, tradeRating]),
    )

    setSubmitted(true)
  }

  if (submitted) {
    return (
      <main className="trade-rating-page">
        <div className="trade-rating-success-shell">
          <div className="trade-rating-success-icon">
            <CircleCheck size={42} strokeWidth={2} />
          </div>

          <span className="trade-rating-success-label">
            Trade completed
          </span>

          <h1>Thanks for your feedback!</h1>

          <p>
            Your rating helps build trust within the UniTrade community
            and helps other students make better decisions.
          </p>

          <div className="trade-rating-success-card">
            <div className="trade-rating-success-card-icon">
              <Star size={20} fill="currentColor" />
            </div>

            <div>
              <strong>{rating}.0 out of 5</strong>
              <span>
                {review.trim()
                  ? 'Your review was saved.'
                  : 'Your rating was saved.'}
              </span>
            </div>
          </div>

          <div className="trade-rating-success-actions">
            <button
              type="button"
              className="trade-rating-primary-button"
              onClick={() => navigate('/trade-complete')}
            >
              Continue
              <ChevronRight size={18} />
            </button>

            <button
              type="button"
              className="trade-rating-secondary-button"
              onClick={() => navigate('/marketplace')}
            >
              Back to Marketplace
            </button>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="trade-rating-page">
      <header className="trade-rating-header">
        <button
          type="button"
          className="trade-rating-back-button"
          onClick={() => navigate(-1)}
          aria-label="Go back"
        >
          <ArrowLeft size={20} />
        </button>

        <div className="trade-rating-header-title">
          <span>Trade & Rating</span>
          <small>Build trust on campus</small>
        </div>

        <div className="trade-rating-header-badge">
          <ShieldCheck size={18} />
        </div>
      </header>

      <div className="trade-rating-content">
        <section className="trade-rating-intro">
          <div className="trade-rating-intro-icon">
            <PackageCheck size={28} />
          </div>

          <div>
            <span className="trade-rating-eyebrow">
              Trade completed
            </span>

            <h1>How was your experience?</h1>

            <p>
              Rate your experience with the seller. Your feedback helps
              keep UniTrade trustworthy for students.
            </p>
          </div>
        </section>

        <section className="trade-rating-trade-card">
          <div className="trade-rating-trade-top">
            <div className="trade-rating-product-icon">
              <PackageCheck size={22} />
            </div>

            <div className="trade-rating-trade-info">
              <span>Purchased item</span>
              <strong>{listing.title}</strong>
              <small>{listing.price}</small>
            </div>

            <div className="trade-rating-complete-mark">
              <Check size={17} />
            </div>
          </div>
        </section>

        <section className="trade-rating-seller-card">
          <div className="trade-rating-seller-avatar">
            {seller.initials}
          </div>

          <div className="trade-rating-seller-info">
            <span>Seller</span>

            <strong>{seller.name}</strong>

            <div className="trade-rating-seller-meta">
              <span>
                <Star size={13} fill="currentColor" />
                {seller.rating}
              </span>

              <span>{seller.trades} completed trades</span>

              <span className="trade-rating-verified">
                <ShieldCheck size={13} />
                Verified
              </span>
            </div>
          </div>
        </section>

        <form
          className="trade-rating-form"
          onSubmit={handleSubmit}
        >
          <section className="trade-rating-section">
            <div className="trade-rating-section-heading">
              <h2>Rate the seller</h2>
              <span>Required</span>
            </div>

            <div className="trade-rating-stars">
              {[1, 2, 3, 4, 5].map((starNumber) => (
                <button
                  key={starNumber}
                  type="button"
                  className={`trade-rating-star ${
                    starNumber <= displayedRating
                      ? 'trade-rating-star-active'
                      : ''
                  }`}
                  onClick={() => setRating(starNumber)}
                  onMouseEnter={() =>
                    setHoveredRating(starNumber)
                  }
                  onMouseLeave={() => setHoveredRating(0)}
                  aria-label={`Rate ${starNumber} out of 5`}
                >
                  <Star
                    size={32}
                    fill={
                      starNumber <= displayedRating
                        ? 'currentColor'
                        : 'none'
                    }
                    strokeWidth={1.8}
                  />
                </button>
              ))}
            </div>

            <div className="trade-rating-selected">
              {rating ? (
                <>
                  <ThumbsUp size={16} />
                  <span>{ratingLabels[rating]}</span>
                </>
              ) : (
                <span>Select a rating</span>
              )}
            </div>
          </section>

          <section className="trade-rating-section">
            <div className="trade-rating-section-heading">
              <h2>Write a review</h2>
              <span>Optional</span>
            </div>

            <div className="trade-rating-textarea-wrap">
              <MessageSquare size={18} />

              <textarea
                value={review}
                onChange={(event) => setReview(event.target.value)}
                maxLength={500}
                placeholder="How was the seller? Was the item as described?"
              />
            </div>

            <div className="trade-rating-character-count">
              {review.length}/500
            </div>
          </section>

          <section className="trade-rating-guidelines">
            <ShieldCheck size={19} />

            <div>
              <strong>Keep reviews helpful</strong>

              <p>
                Be honest and respectful. Focus on the transaction,
                communication and whether the item matched its listing.
              </p>
            </div>
          </section>

          <button
            type="submit"
            className="trade-rating-submit-button"
            disabled={!rating}
          >
            Submit Rating
            <ChevronRight size={19} />
          </button>
        </form>
      </div>
    </main>
  )
}

export default TradeRating