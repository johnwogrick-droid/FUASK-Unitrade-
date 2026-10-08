import { useState } from 'react'
import {
  ArrowLeft,
  Bot,
  ChevronRight,
  CircleHelp,
  Lightbulb,
  MessageCircle,
  Package,
  Search,
  Send,
  ShoppingBag,
  Sparkles,
  Tag,
  UserRound,
} from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import './UniTradeAI.css'

const quickPrompts = [
  {
    icon: Search,
    title: 'Find an item',
    prompt: 'Help me find something on campus',
  },
  {
    icon: Tag,
    title: 'Price an item',
    prompt: 'Help me choose a price for my item',
  },
  {
    icon: Sparkles,
    title: 'Improve my listing',
    prompt: 'Help me write a better product listing',
  },
  {
    icon: CircleHelp,
    title: 'How UniTrade works',
    prompt: 'Explain how UniTrade works',
  },
]

const getInitialMessages = () => [
  {
    id: crypto.randomUUID(),
    sender: 'ai',
    text: "Hi! I'm UniTrade AI. I can help you find items, improve your listings, suggest prices, or answer questions about the marketplace.",
  },
]

function getAIResponse(message) {
  const lowerMessage = message.toLowerCase()

  if (
    lowerMessage.includes('price') ||
    lowerMessage.includes('how much') ||
    lowerMessage.includes('sell')
  ) {
    return "I can help you estimate a suitable starting price. Tell me what you're selling, its condition, brand or model, and any important details."
  }

  if (
    lowerMessage.includes('listing') ||
    lowerMessage.includes('description') ||
    lowerMessage.includes('title')
  ) {
    return 'Absolutely. Give me the basic details of your item. For example: "blue Nike sneakers, size 42, almost new, small scratch on the side." I can turn that into a clearer title and description.'
  }

  if (
    lowerMessage.includes('find') ||
    lowerMessage.includes('looking for') ||
    lowerMessage.includes('search')
  ) {
    return 'Tell me what you are looking for and I can help you narrow down the category, condition and useful search terms. You can also browse the Marketplace directly.'
  }

  if (
    lowerMessage.includes('how') &&
    lowerMessage.includes('unitrade')
  ) {
    return 'UniTrade is a campus marketplace where verified students can buy and sell within their campus. You can browse listings, contact sellers directly, create listings, complete trades and build trust through ratings.'
  }

  return "I can help with marketplace questions, listing creation, pricing ideas and finding items. Tell me what you need help with."
}

function UniTradeAI() {
  const navigate = useNavigate()

  const [messages, setMessages] = useState(getInitialMessages)
  const [input, setInput] = useState('')

  const sendMessage = (messageText) => {
    const trimmedMessage = messageText.trim()

    if (!trimmedMessage) {
      return
    }

    const userMessage = {
      id: crypto.randomUUID(),
      sender: 'user',
      text: trimmedMessage,
    }

    const aiMessage = {
      id: crypto.randomUUID(),
      sender: 'ai',
      text: getAIResponse(trimmedMessage),
    }

    setMessages((currentMessages) => [
      ...currentMessages,
      userMessage,
      aiMessage,
    ])

    setInput('')
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    sendMessage(input)
  }

  return (
    <main className="unitrade-ai-page">
      {/* Header */}
      <header className="unitrade-ai-header">
        <button
          type="button"
          className="unitrade-ai-back-button"
          onClick={() => navigate(-1)}
          aria-label="Go back"
        >
          <ArrowLeft size={20} strokeWidth={2} />
        </button>

        <Link
          to="/onboarding"
          className="unitrade-ai-brand"
          aria-label="Go to UniTrade onboarding"
        >
          <span className="unitrade-ai-logo">
            <ShoppingBag size={19} strokeWidth={2.2} />
          </span>

          <span className="unitrade-ai-brand-text">
            <strong>UniTrade</strong>
            <small>AI Assistant</small>
          </span>
        </Link>

        <Link
          to="/profile"
          className="unitrade-ai-profile"
          aria-label="Open profile"
        >
          <UserRound size={18} strokeWidth={2} />
        </Link>
      </header>

      <div className="unitrade-ai-layout">
        {/* Sidebar */}
        <aside className="unitrade-ai-sidebar">
          <div className="unitrade-ai-sidebar-intro">
            <span className="unitrade-ai-sidebar-icon">
              <Bot size={22} strokeWidth={2} />
            </span>

            <div>
              <strong>UniTrade AI</strong>
              <span>Your marketplace assistant</span>
            </div>
          </div>

          <div className="unitrade-ai-sidebar-links">
            <Link to="/marketplace">
              <Search size={17} strokeWidth={2} />
              <span>Browse Marketplace</span>
            </Link>

            <Link to="/create-listing">
              <Package size={17} strokeWidth={2} />
              <span>Create a Listing</span>
            </Link>

            <Link to="/help-support">
              <CircleHelp size={17} strokeWidth={2} />
              <span>Help &amp; Support</span>
            </Link>
          </div>

          <div className="unitrade-ai-sidebar-note">
            <Lightbulb size={17} strokeWidth={2} />

            <p>
              AI can assist with listings and marketplace questions.
              Buyer-seller conversations remain between the buyer and seller.
            </p>
          </div>
        </aside>

        {/* Main content */}
        <section className="unitrade-ai-main">
          <div className="unitrade-ai-welcome">
            <span className="unitrade-ai-welcome-icon">
              <Sparkles size={24} strokeWidth={2} />
            </span>

            <div>
              <span className="unitrade-ai-welcome-label">
                UniTrade AI
              </span>

              <h1>How can I help?</h1>

              <p>
                Ask me about buying, selling, listings, pricing or using
                UniTrade.
              </p>
            </div>
          </div>

          {/* Quick prompts */}
          <div className="unitrade-ai-quick-prompts">
            {quickPrompts.map((item) => {
              const Icon = item.icon

              return (
                <button
                  key={item.title}
                  type="button"
                  className="unitrade-ai-prompt-card"
                  onClick={() => sendMessage(item.prompt)}
                >
                  <span className="unitrade-ai-prompt-icon">
                    <Icon size={18} strokeWidth={2} />
                  </span>

                  <span className="unitrade-ai-prompt-content">
                    <strong>{item.title}</strong>
                    <small>{item.prompt}</small>
                  </span>

                  <ChevronRight
                    className="unitrade-ai-prompt-arrow"
                    size={17}
                    strokeWidth={2}
                  />
                </button>
              )
            })}
          </div>

          {/* Chat */}
          <div className="unitrade-ai-chat">
            <div className="unitrade-ai-chat-header">
              <div className="unitrade-ai-chat-title">
                <span className="unitrade-ai-online-dot" />
                <strong>AI Assistant</strong>
              </div>

              <span className="unitrade-ai-online-text">Online</span>
            </div>

            <div
              className="unitrade-ai-messages"
              aria-live="polite"
            >
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`unitrade-ai-message-row ${
                    message.sender === 'user'
                      ? 'unitrade-ai-user-row'
                      : ''
                  }`}
                >
                  {message.sender === 'ai' && (
                    <span className="unitrade-ai-message-avatar">
                      <Bot size={16} strokeWidth={2} />
                    </span>
                  )}

                  <div
                    className={`unitrade-ai-message ${
                      message.sender === 'user'
                        ? 'unitrade-ai-user-message'
                        : 'unitrade-ai-bot-message'
                    }`}
                  >
                    {message.text}
                  </div>
                </div>
              ))}
            </div>

            <form
              className="unitrade-ai-composer"
              onSubmit={handleSubmit}
            >
              <input
                type="text"
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder="Ask UniTrade AI..."
                aria-label="Ask UniTrade AI"
                autoComplete="off"
              />

              <button
                type="submit"
                disabled={!input.trim()}
                aria-label="Send message"
              >
                <Send size={18} strokeWidth={2} />
              </button>
            </form>

            <p className="unitrade-ai-disclaimer">
              UniTrade AI is an assistant. Verify important information
              before making a purchase or trade.
            </p>
          </div>

          {/* Support */}
          <div className="unitrade-ai-support">
            <div className="unitrade-ai-support-left">
              <span className="unitrade-ai-support-icon">
                <MessageCircle size={17} strokeWidth={2} />
              </span>

              <span>Need human support instead?</span>
            </div>

            <Link to="/help-support">
              Contact Support
              <ChevronRight size={14} strokeWidth={2} />
            </Link>
          </div>
        </section>
      </div>

      {/* Mobile bottom navigation */}
      <nav className="unitrade-ai-mobile-nav">
        <Link to="/dashboard">
          <ShoppingBag size={19} strokeWidth={2} />
          <span>Home</span>
        </Link>

        <Link to="/marketplace">
          <Search size={19} strokeWidth={2} />
          <span>Search</span>
        </Link>

        <Link
          to="/ai"
          className="unitrade-ai-mobile-active"
          aria-current="page"
        >
          <Bot size={19} strokeWidth={2} />
          <span>AI</span>
        </Link>

        <Link to="/create-listing">
          <Package size={19} strokeWidth={2} />
          <span>Sell</span>
        </Link>

        <Link to="/profile">
          <UserRound size={19} strokeWidth={2} />
          <span>Profile</span>
        </Link>
      </nav>
    </main>
  )
}

export default UniTradeAI