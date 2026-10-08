import { useEffect, useState } from 'react'
import {
  ArrowLeft,
  Check,
  ChevronRight,
  CircleCheck,
  Heart,
  Home,
  PackageCheck,
  ShieldCheck,
  ShoppingBag,
  Star,
  UserRound,
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import './TradeComplete.css'

const trade = {
  item: 'Wireless Noise-Cancelling Headphones',
  price: '₦28,000',
  seller: 'Daniel Okafor',
  sellerInitials: 'DO',
}

function TradeComplete() {
  const navigate = useNavigate()
  const [rating, setRating] = useState(null)

  useEffect(() => {
    try {
      const ratings = JSON.parse(
        localStorage.getItem('unitrade-ratings') || '[]',
      )

      if (Array.isArray(ratings) && ratings.length > 0) {
        const latestRating = ratings[ratings.length - 1]

        if (typeof latestRating.rating === 'number') {
          setRating(latestRating.rating)
        }
      }
    } catch {
      setRating(null)
    }
  }, [])

  const goToMarketplace = () => {
    navigate('/marketplace')
  }

  const goToProfile = () => {
    navigate('/profile')
  }

  return (
    <main className="trade-complete-page">
      <header className="trade-complete-header">
        <button
          type="button"
          className="trade-complete-back-button"
          onClick={() => navigate(-1)}
          aria-label="Go back"
        >
          <ArrowLeft size={20} />
        </button>

        {/* UniTrade Logo */}
        <button
          type="button"
          className="trade-complete-brand"
          onClick={() => navigate('/')}
          aria-label="Go to UniTrade home"
        >
          <span className="trade-complete-brand-icon">
            <ShoppingBag size={19} strokeWidth={2.2} />
          </span>

          <span className="trade-complete-brand-text">
            UniTrade
          </span>
        </button>

        <div className="trade-complete-header-space" />
      </header>

      <div className="trade-complete-content">
        {/* Success Hero */}
        <section className="trade-complete-hero">
          <div className="trade-complete-success-icon">
            <CircleCheck size={52} strokeWidth={1.8} />
          </div>

          <span className="trade-complete-eyebrow">
            Trade completed
          </span>

          <h1>Nice one!</h1>

          <p>
            Your trade has been completed successfully. Thanks for
            helping make UniTrade a trusted campus marketplace.
          </p>
        </section>

        {/* Transaction Summary */}
        <section className="trade-complete-trade-card">
          <div className="trade-complete-card-heading">
            <span>Transaction summary</span>

            <div className="trade-complete-status">
              <Check size={13} />
              Completed
            </div>
          </div>

          <div className="trade-complete-item">
            <div className="trade-complete-item-icon">
              <PackageCheck size={23} strokeWidth={1.9} />
            </div>

            <div className="trade-complete-item-info">
              <strong>{trade.item}</strong>
              <span>{trade.price}</span>
            </div>
          </div>

          <div className="trade-complete-divider" />

          <div className="trade-complete-person">
            <div className="trade-complete-avatar">
              {trade.sellerInitials}
            </div>

            <div className="trade-complete-person-info">
              <small>Seller</small>
              <strong>{trade.seller}</strong>
            </div>

            <ShieldCheck
              className="trade-complete-verified-icon"
              size={19}
              strokeWidth={2}
            />
          </div>
        </section>

        {/* Trust Contribution */}
        <section className="trade-complete-trust-card">
          <div className="trade-complete-trust-icon">
            <ShieldCheck size={23} strokeWidth={2} />
          </div>

          <div>
            <span className="trade-complete-trust-label">
              Trust contribution
            </span>

            <h2>You helped build campus trust.</h2>

            <p>
              Your completed trade and rating contribute to a safer
              and more reliable UniTrade community.
            </p>
          </div>
        </section>

        {/* Rating */}
        <section className="trade-complete-rating-card">
          <div className="trade-complete-rating-heading">
            <div className="trade-complete-rating-information">
              <span>Your rating</span>

              <strong>
                {rating !== null
                  ? `${rating}.0 / 5`
                  : 'Submitted'}
              </strong>
            </div>

            <div
              className="trade-complete-stars"
              aria-label={
                rating !== null
                  ? `You rated this trade ${rating} out of 5`
                  : 'Rating submitted'
              }
            >
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  size={18}
                  fill={
                    rating !== null && star <= rating
                      ? 'currentColor'
                      : 'none'
                  }
                  strokeWidth={1.8}
                />
              ))}
            </div>
          </div>

          <div className="trade-complete-rating-note">
            <Check size={15} />
            Your feedback has been recorded.
          </div>
        </section>

        {/* What's Next */}
        <section className="trade-complete-next-card">
          <div className="trade-complete-next-icon">
            <Heart size={21} strokeWidth={2} />
          </div>

          <div>
            <h2>What's next?</h2>

            <p>
              Keep exploring campus listings, save items you like,
              or check your profile to see your growing trade history.
            </p>
          </div>
        </section>

        {/* Actions */}
        <div className="trade-complete-actions">
          <button
            type="button"
            className="trade-complete-primary-button"
            onClick={goToMarketplace}
          >
            <Home size={18} />
            Back to Marketplace
          </button>

          <button
            type="button"
            className="trade-complete-secondary-button"
            onClick={goToProfile}
          >
            <UserRound size={18} />
            View My Profile
            <ChevronRight size={17} />
          </button>
        </div>
      </div>
    </main>
  )
}

export default TradeComplete