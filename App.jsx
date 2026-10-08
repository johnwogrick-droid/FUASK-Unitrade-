import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

import Home from './pages/Home'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import Onboarding from './pages/Onboarding'
import Dashboard from './pages/Dashboard'
import Marketplace from './pages/Marketplace'
import CreateListing from './pages/CreateListing'
import ListingDetails from './pages/ListingDetails'
import BuyerChat from './pages/BuyerChat'
import Profile from './pages/Profile'
import EditProfile from './pages/EditProfile'
import AccountDetails from './pages/AccountDetails'
import Notifications from './pages/Notifications'
import Settings from './pages/Settings'
import HelpSupport from './pages/HelpSupport'
import TradeRating from './pages/TradeRating'
import TradeComplete from './pages/TradeComplete'
import UniTradeAI from './pages/UniTradeAI'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/onboarding" element={<Onboarding />} />

        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/marketplace" element={<Marketplace />} />

        <Route path="/create-listing" element={<CreateListing />} />
        <Route path="/listing/:id" element={<ListingDetails />} />

        <Route path="/chat/:id" element={<BuyerChat />} />

        <Route path="/profile" element={<Profile />} />
        <Route path="/edit-profile" element={<EditProfile />} />
        <Route path="/account-details" element={<AccountDetails />} />

        <Route path="/notifications" element={<Notifications />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/help-support" element={<HelpSupport />} />

        <Route
          path="/messages"
          element={<Navigate to="/marketplace" replace />}
        />

        <Route path="/ai" element={<UniTradeAI />} />

        <Route path="/trade-rating" element={<TradeRating />} />

        <Route path="/trade-complete" element={<TradeComplete />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App