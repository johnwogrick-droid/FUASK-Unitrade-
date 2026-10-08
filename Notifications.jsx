import { useEffect, useMemo, useState } from 'react'
import {
  ArrowLeft,
  Bell,
  Check,
  CheckCheck,
  MessageCircle,
  ShieldCheck,
  Trash2,
  UserRound,
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const defaultNotifications = [
  {
    id: 1,
    type: 'welcome',
    title: 'Welcome to UniTrade',
    message:
      'Your campus marketplace is ready. Start by browsing items or creating your first listing.',
    time: 'Today',
    unread: true,
    action: '/marketplace',
    actionText: 'Browse marketplace',
  },
  {
    id: 2,
    type: 'security',
    title: 'Student account verified',
    message:
      'Your student identity has been successfully verified. Your account now has a verified badge.',
    time: 'Yesterday',
    unread: true,
    action: '/profile',
    actionText: 'View profile',
  },
  {
    id: 3,
    type: 'message',
    title: 'New message from Daniel',
    message:
      'Daniel sent you a message about the Wireless Noise-Cancelling Headphones.',
    time: '2 days ago',
    unread: true,
    action: '/chat/headphones',
    actionText: 'View message',
  },
  {
    id: 4,
    type: 'profile',
    title: 'Complete your profile',
    message:
      'Add your phone number and a short bio to make your UniTrade profile more trustworthy.',
    time: '3 days ago',
    unread: false,
    action: '/edit-profile',
    actionText: 'Edit profile',
  },
]

function getIcon(type) {
  if (type === 'message') return <MessageCircle size={20} />
  if (type === 'security') return <ShieldCheck size={20} />
  if (type === 'profile') return <UserRound size={20} />

  return <Bell size={20} />
}

function Notifications() {
  const navigate = useNavigate()

  const [notifications, setNotifications] = useState(() => {
    try {
      const saved = localStorage.getItem('unitrade-notifications')

      if (saved) {
        return JSON.parse(saved)
      }
    } catch {
      // Use the default notifications if localStorage is unavailable.
    }

    return defaultNotifications
  })

  const [showClearConfirm, setShowClearConfirm] = useState(false)

  useEffect(() => {
    try {
      localStorage.setItem(
        'unitrade-notifications',
        JSON.stringify(notifications),
      )
    } catch {
      // Ignore localStorage errors.
    }
  }, [notifications])

  const unreadCount = useMemo(
    () => notifications.filter((notification) => notification.unread).length,
    [notifications],
  )

  const markAsRead = (id) => {
    setNotifications((current) =>
      current.map((notification) =>
        notification.id === id
          ? { ...notification, unread: false }
          : notification,
      ),
    )
  }

  const markAllAsRead = () => {
    setNotifications((current) =>
      current.map((notification) => ({
        ...notification,
        unread: false,
      })),
    )
  }

  const clearNotifications = () => {
    setNotifications([])
    setShowClearConfirm(false)
  }

  const handleNotificationClick = (notification) => {
    markAsRead(notification.id)

    if (notification.action) {
      navigate(notification.action)
    }
  }

  return (
    <div className="notifications-page">
      <header className="notifications-header">
        <div className="notifications-header-inner">
          <button
            type="button"
            className="notifications-back-button"
            onClick={() => navigate('/marketplace')}
            aria-label="Back to marketplace"
          >
            <ArrowLeft size={20} />
          </button>

          <button
            type="button"
            className="notifications-logo"
            onClick={() => navigate('/')}
            aria-label="Go to UniTrade home"
          >
            <span className="notifications-logo-icon">
              <span className="notifications-logo-bag">
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M6 8h12l1 12H5L6 8Z" />
                  <path d="M9 8a3 3 0 0 1 6 0" />
                </svg>
              </span>
            </span>

            <span className="notifications-logo-text">UniTrade</span>
          </button>

          <div className="notifications-header-spacer" />
        </div>
      </header>

      <main className="notifications-main">
        <section className="notifications-title-section">
          <div>
            <div className="notifications-heading-row">
              <div className="notifications-heading-icon">
                <Bell size={24} />
              </div>

              <div>
                <h1>Notifications</h1>
                <p>
                  Stay updated on your account, messages and marketplace
                  activity.
                </p>
              </div>
            </div>
          </div>

          {notifications.length > 0 && (
            <div className="notifications-actions">
              {unreadCount > 0 && (
                <button
                  type="button"
                  className="notifications-mark-read"
                  onClick={markAllAsRead}
                >
                  <CheckCheck size={17} />
                  Mark all as read
                </button>
              )}

              <button
                type="button"
                className="notifications-clear-button"
                onClick={() => setShowClearConfirm(true)}
              >
                <Trash2 size={17} />
                Clear history
              </button>
            </div>
          )}
        </section>

        <section className="notifications-content">
          {notifications.length === 0 ? (
            <div className="notifications-empty">
              <div className="notifications-empty-icon">
                <Bell size={30} />
              </div>

              <h2>No notifications</h2>

              <p>
                You’re all caught up. New activity from your account and
                marketplace will appear here.
              </p>

              <button
                type="button"
                className="notifications-primary-button"
                onClick={() => navigate('/marketplace')}
              >
                Browse marketplace
              </button>
            </div>
          ) : (
            <>
              <div className="notifications-summary">
                <span>Recent activity</span>

                <span className="notifications-count">
                  {unreadCount > 0
                    ? `${unreadCount} unread`
                    : 'All notifications read'}
                </span>
              </div>

              <div className="notifications-list">
                {notifications.map((notification) => (
                  <article
                    key={notification.id}
                    className={`notification-card ${
                      notification.unread ? 'notification-unread' : ''
                    }`}
                    onClick={() => handleNotificationClick(notification)}
                  >
                    <div
                      className={`notification-icon notification-icon-${notification.type}`}
                    >
                      {getIcon(notification.type)}
                    </div>

                    <div className="notification-body">
                      <div className="notification-top-row">
                        <h2>{notification.title}</h2>

                        {notification.unread && (
                          <span
                            className="notification-unread-dot"
                            aria-label="Unread notification"
                          />
                        )}
                      </div>

                      <p>{notification.message}</p>

                      <div className="notification-bottom-row">
                        <span>{notification.time}</span>

                        <button
                          type="button"
                          className="notification-action"
                          onClick={(event) => {
                            event.stopPropagation()
                            handleNotificationClick(notification)
                          }}
                        >
                          {notification.actionText}
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </>
          )}
        </section>
      </main>

      {showClearConfirm && (
        <div
          className="notifications-modal-overlay"
          onClick={() => setShowClearConfirm(false)}
        >
          <div
            className="notifications-modal"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="notifications-modal-icon">
              <Trash2 size={22} />
            </div>

            <h2>Clear notification history?</h2>

            <p>
              This will remove all notifications from this device. You can’t
              undo this action.
            </p>

            <div className="notifications-modal-actions">
              <button
                type="button"
                className="notifications-modal-cancel"
                onClick={() => setShowClearConfirm(false)}
              >
                Cancel
              </button>

              <button
                type="button"
                className="notifications-modal-delete"
                onClick={clearNotifications}
              >
                <Trash2 size={17} />
                Clear history
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Notifications