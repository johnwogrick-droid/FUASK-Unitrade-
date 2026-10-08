import { useMemo, useState } from 'react'
import {
  ArrowLeft,
  Check,
  ChevronRight,
  ImagePlus,
  Info,
  Lightbulb,
  LoaderCircle,
  MapPin,
  Pencil,
  Plus,
  Sparkles,
  Trash2,
  X,
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const categories = [
  'Electronics',
  'Fashion',
  'Books',
  'Food',
  'Beauty',
  'Services',
]

const conditions = [
  'Brand new',
  'Like new',
  'Good',
  'Fair',
]

const aiSuggestions = {
  title: 'Almost New Wireless Headphones',
  description:
    'Premium wireless headphones in excellent condition. Used only a few times and carefully maintained. Perfect for lectures, studying, commuting around campus, and enjoying music without distractions.',
  price: 25000,
}

const formatPrice = (price) =>
  price
    ? `₦${new Intl.NumberFormat('en-NG').format(Number(price))}`
    : '₦0'

function CreateListing() {
  const navigate = useNavigate()

  const [images, setImages] = useState([])
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('')
  const [condition, setCondition] = useState('')
  const [price, setPrice] = useState('')
  const [location, setLocation] = useState('')

  const [aiLoading, setAiLoading] = useState(false)
  const [aiUsed, setAiUsed] = useState(false)

  const [showPreview, setShowPreview] = useState(false)
  const [published, setPublished] = useState(false)

  const [errors, setErrors] = useState({})

  const canImprove =
    description.trim().length > 4 ||
    title.trim().length > 4

  const previewImage = useMemo(
    () =>
      images.length > 0
        ? images[0].preview
        : 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=80',
    [images]
  )

  const handleImageChange = (event) => {
    const files = Array.from(event.target.files || [])

    const remainingSlots = 5 - images.length

    const selectedFiles = files.slice(0, remainingSlots)

    const newImages = selectedFiles.map((file) => ({
      id: `${file.name}-${file.lastModified}-${Math.random()}`,
      file,
      preview: URL.createObjectURL(file),
    }))

    setImages((current) => [...current, ...newImages])

    event.target.value = ''
  }

  const removeImage = (id) => {
    setImages((current) => {
      const imageToRemove = current.find(
        (image) => image.id === id
      )

      if (imageToRemove) {
        URL.revokeObjectURL(imageToRemove.preview)
      }

      return current.filter((image) => image.id !== id)
    })
  }

  const validate = () => {
    const newErrors = {}

    if (!title.trim()) {
      newErrors.title = 'Add a title for your item.'
    }

    if (!description.trim()) {
      newErrors.description =
        'Tell buyers a little about the item.'
    }

    if (!category) {
      newErrors.category = 'Choose a category.'
    }

    if (!condition) {
      newErrors.condition = 'Choose the item condition.'
    }

    if (!price || Number(price) <= 0) {
      newErrors.price = 'Enter a valid price.'
    }

    if (!location.trim()) {
      newErrors.location =
        'Enter where buyers can meet you.'
    }

    setErrors(newErrors)

    return Object.keys(newErrors).length === 0
  }

  const improveWithAI = () => {
    if (!canImprove) {
      setErrors({
        description:
          'Describe the item first so UniTrade AI has something to work with.',
      })

      return
    }

    setAiLoading(true)

    setTimeout(() => {
      setTitle(aiSuggestions.title)
      setDescription(aiSuggestions.description)

      if (!price) {
        setPrice(String(aiSuggestions.price))
      }

      setAiUsed(true)
      setAiLoading(false)

      setErrors({})
    }, 1400)
  }

  const handlePreview = () => {
    if (validate()) {
      setShowPreview(true)
    }
  }

  const publishListing = () => {
    const newListing = {
      id: `listing-${Date.now()}`,
      title,
      description,
      category,
      condition,
      price: Number(price),
      location,
      images: images.map((image) => image.preview),
      aiAssisted: aiUsed,
      createdAt: new Date().toISOString(),
    }

    const existingListings = JSON.parse(
      localStorage.getItem('unitrade-user-listings') || '[]'
    )

    localStorage.setItem(
      'unitrade-user-listings',
      JSON.stringify([
        newListing,
        ...existingListings,
      ])
    )

    setShowPreview(false)
    setPublished(true)
  }

  const resetForm = () => {
    images.forEach((image) => {
      URL.revokeObjectURL(image.preview)
    })

    setImages([])
    setTitle('')
    setDescription('')
    setCategory('')
    setCondition('')
    setPrice('')
    setLocation('')
    setAiUsed(false)
    setErrors({})
    setPublished(false)
  }

  if (published) {
    return (
      <div className="listing-success-page">
        <div className="listing-success-card">
          <div className="listing-success-icon">
            <Check size={30} />
          </div>

          <p className="listing-success-eyebrow">
            LISTING PUBLISHED
          </p>

          <h1>Your item is now on UniTrade.</h1>

          <p>
            Students on your campus can now discover your
            listing and contact you directly.
          </p>

          <div className="published-preview">
            <div className="published-preview-image">
              <img src={previewImage} alt={title} />
            </div>

            <div>
              <strong>{title}</strong>
              <span>{formatPrice(price)}</span>
            </div>
          </div>

          <div className="success-actions">
            <button
              className="success-primary"
              onClick={() => navigate('/marketplace')}
            >
              Go to Marketplace
            </button>

            <button
              className="success-secondary"
              onClick={resetForm}
            >
              Create another listing
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="create-listing-page">
      <header className="create-listing-header">
        <div className="create-listing-header-inner">
          <button
            className="create-back-button"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft size={19} />
          </button>

          <div>
            <span>SELL ON UNITRADE</span>
            <h1>Create Listing</h1>
          </div>

          <button
            className="header-preview-button"
            onClick={handlePreview}
          >
            Preview
          </button>
        </div>
      </header>

      <main className="create-listing-main">
        <div className="create-listing-intro">
          <div>
            <p className="create-eyebrow">NEW LISTING</p>
            <h2>What are you selling?</h2>
            <p>
              Add a few details and we'll help you create a
              better listing.
            </p>
          </div>

          <div className="create-progress">
            <span className="progress-active" />
            <span />
            <span />
          </div>
        </div>

        <div className="create-listing-layout">
          <section className="create-form">
            {/* PHOTOS */}
            <div className="form-card">
              <div className="form-section-heading">
                <div>
                  <h3>Photos</h3>
                  <p>
                    Add clear photos so buyers know what they're
                    getting.
                  </p>
                </div>

                <span>{images.length}/5</span>
              </div>

              <div className="photo-grid">
                {images.map((image, index) => (
                  <div className="photo-item" key={image.id}>
                    <img
                      src={image.preview}
                      alt={`Upload ${index + 1}`}
                    />

                    {index === 0 && (
                      <span className="cover-label">
                        Cover
                      </span>
                    )}

                    <button
                      className="remove-photo"
                      onClick={() => removeImage(image.id)}
                      aria-label="Remove photo"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}

                {images.length < 5 && (
                  <label className="photo-upload">
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleImageChange}
                    />

                    <ImagePlus size={23} />

                    <span>Add photos</span>

                    <small>
                      {5 - images.length} remaining
                    </small>
                  </label>
                )}
              </div>
            </div>

            {/* BASIC INFORMATION */}
            <div className="form-card">
              <div className="form-section-heading">
                <div>
                  <h3>Item information</h3>
                  <p>
                    Start with your own description. AI can
                    improve it later.
                  </p>
                </div>
              </div>

              <div className="form-field">
                <div className="field-label-row">
                  <label htmlFor="title">
                    Title
                  </label>

                  <span>{title.length}/100</span>
                </div>

                <input
                  id="title"
                  type="text"
                  maxLength={100}
                  value={title}
                  onChange={(event) =>
                    setTitle(event.target.value)
                  }
                  placeholder="e.g. Blue Nike Sneakers - Size 42"
                  className={
                    errors.title ? 'input-error' : ''
                  }
                />

                {errors.title && (
                  <small className="field-error">
                    {errors.title}
                  </small>
                )}
              </div>

              <div className="form-field">
                <div className="field-label-row">
                  <label htmlFor="description">
                    Description
                  </label>

                  <span>{description.length}/1000</span>
                </div>

                <textarea
                  id="description"
                  maxLength={1000}
                  rows={6}
                  value={description}
                  onChange={(event) =>
                    setDescription(event.target.value)
                  }
                  placeholder="Tell buyers about the item, its condition, size, colour, how long you've used it, and anything they should know."
                  className={
                    errors.description ? 'input-error' : ''
                  }
                />

                {errors.description && (
                  <small className="field-error">
                    {errors.description}
                  </small>
                )}

                <button
                  className="ai-improve-button"
                  onClick={improveWithAI}
                  disabled={aiLoading}
                >
                  {aiLoading ? (
                    <>
                      <LoaderCircle
                        size={17}
                        className="spin"
                      />
                      Improving...
                    </>
                  ) : (
                    <>
                      <Sparkles size={17} />
                      Improve with AI
                    </>
                  )}
                </button>

                {aiUsed && (
                  <div className="ai-used-message">
                    <Sparkles size={14} />
                    AI helped improve this listing. You can
                    edit everything before publishing.
                  </div>
                )}
              </div>

              <div className="two-column-fields">
                <div className="form-field">
                  <label htmlFor="category">
                    Category
                  </label>

                  <select
                    id="category"
                    value={category}
                    onChange={(event) =>
                      setCategory(event.target.value)
                    }
                    className={
                      errors.category ? 'input-error' : ''
                    }
                  >
                    <option value="">
                      Select category
                    </option>

                    {categories.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>

                  {errors.category && (
                    <small className="field-error">
                      {errors.category}
                    </small>
                  )}
                </div>

                <div className="form-field">
                  <label htmlFor="condition">
                    Condition
                  </label>

                  <select
                    id="condition"
                    value={condition}
                    onChange={(event) =>
                      setCondition(event.target.value)
                    }
                    className={
                      errors.condition ? 'input-error' : ''
                    }
                  >
                    <option value="">
                      Select condition
                    </option>

                    {conditions.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>

                  {errors.condition && (
                    <small className="field-error">
                      {errors.condition}
                    </small>
                  )}
                </div>
              </div>

              <div className="two-column-fields">
                <div className="form-field">
                  <label htmlFor="price">
                    Price
                  </label>

                  <div className="price-input">
                    <span>₦</span>

                    <input
                      id="price"
                      type="number"
                      min="0"
                      value={price}
                      onChange={(event) =>
                        setPrice(event.target.value)
                      }
                      placeholder="0"
                      className={
                        errors.price ? 'input-error' : ''
                      }
                    />
                  </div>

                  {errors.price && (
                    <small className="field-error">
                      {errors.price}
                    </small>
                  )}
                </div>

                <div className="form-field">
                  <label htmlFor="location">
                    Pickup / meeting location
                  </label>

                  <div className="location-input">
                    <MapPin size={17} />

                    <input
                      id="location"
                      type="text"
                      value={location}
                      onChange={(event) =>
                        setLocation(event.target.value)
                      }
                      placeholder="e.g. Main Campus"
                      className={
                        errors.location ? 'input-error' : ''
                      }
                    />
                  </div>

                  {errors.location && (
                    <small className="field-error">
                      {errors.location}
                    </small>
                  )}
                </div>
              </div>
            </div>

            {/* AI ASSISTANT */}
            <div className="ai-listing-card">
              <div className="ai-listing-icon">
                <Sparkles size={23} />
              </div>

              <div className="ai-listing-content">
                <span>UNITRADE AI ASSISTANT</span>

                <h3>Need help writing your listing?</h3>

                <p>
                  Give us a rough description and AI can help
                  turn it into a clearer title and description,
                  plus suggest a reasonable starting price.
                </p>

                <button
                  onClick={improveWithAI}
                  disabled={aiLoading}
                >
                  {aiLoading
                    ? 'Working...'
                    : 'Improve my listing'}
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>

            {/* TIPS */}
            <div className="listing-tips">
              <div className="tips-icon">
                <Lightbulb size={19} />
              </div>

              <div>
                <h3>Listing tips</h3>

                <ul>
                  <li>
                    Use natural light when taking product
                    photos.
                  </li>
                  <li>
                    Be honest about scratches, defects or
                    missing accessories.
                  </li>
                  <li>
                    Mention important details such as size,
                    model and colour.
                  </li>
                  <li>
                    Choose a safe campus meeting location.
                  </li>
                </ul>
              </div>
            </div>

            <button
              className="review-listing-button"
              onClick={handlePreview}
            >
              Review listing
              <ChevronRight size={18} />
            </button>
          </section>

          {/* DESKTOP SIDE PREVIEW */}
          <aside className="listing-live-preview">
            <div className="live-preview-heading">
              <div>
                <span>LIVE PREVIEW</span>
                <h3>How buyers will see it</h3>
              </div>

              <Pencil size={17} />
            </div>

            <div className="live-product-card">
              <div className="live-product-image">
                <img
                  src={previewImage}
                  alt="Listing preview"
                />

                {images.length === 0 && (
                  <div className="preview-placeholder">
                    <ImagePlus size={24} />
                    <span>Your photo</span>
                  </div>
                )}
              </div>

              <div className="live-product-body">
                <span>
                  {category || 'CATEGORY'}
                </span>

                <h4>
                  {title || 'Your item title'}
                </h4>

                <strong>
                  {price
                    ? formatPrice(price)
                    : '₦0'}
                </strong>

                <div className="live-location">
                  <MapPin size={13} />
                  {location || 'Pickup location'}
                </div>
              </div>
            </div>

            <div className="preview-trust">
              <Check size={15} />
              <span>
                Verified student marketplace
              </span>
            </div>

            <div className="preview-info">
              <Info size={15} />

              <p>
                Your listing will be reviewed by you before
                anything is published.
              </p>
            </div>
          </aside>
        </div>
      </main>

      {showPreview && (
        <div
          className="create-modal-overlay"
          onClick={() => setShowPreview(false)}
        >
          <div
            className="listing-review-modal"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              className="review-close"
              onClick={() => setShowPreview(false)}
            >
              <X size={19} />
            </button>

            <div className="review-heading">
              <span>FINAL REVIEW</span>
              <h2>Ready to publish?</h2>
              <p>
                Check your listing before making it visible to
                other students.
              </p>
            </div>

            <div className="review-product">
              <div className="review-image">
                <img
                  src={previewImage}
                  alt={title}
                />
              </div>

              <div className="review-product-info">
                <span>
                  {category || 'Uncategorized'}
                </span>

                <h3>{title}</h3>

                <strong>
                  {formatPrice(price)}
                </strong>

                <small>
                  {condition || 'Condition not selected'}
                </small>
              </div>
            </div>

            <div className="review-summary">
              <div>
                <span>Description</span>
                <p>
                  {description ||
                    'No description added yet.'}
                </p>
              </div>

              <div>
                <span>Meeting location</span>
                <p>
                  {location ||
                    'No location added yet.'}
                </p>
              </div>
            </div>

            <div className="review-ai-note">
              <Sparkles size={16} />

              <span>
                {aiUsed
                  ? 'AI assistance was used. You can still edit your listing before publishing.'
                  : 'You can still edit your listing before publishing.'}
              </span>
            </div>

            <div className="review-actions">
              <button
                className="review-edit-button"
                onClick={() => setShowPreview(false)}
              >
                <Pencil size={16} />
                Edit listing
              </button>

              <button
                className="review-publish-button"
                onClick={publishListing}
              >
                <Plus size={17} />
                Publish listing
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default CreateListing