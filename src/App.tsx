import { Toaster } from '@/components/ui/toaster';
import { Toaster as Sonner } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from '@/contexts/AuthContext';
import { AuctionProvider } from '@/contexts/AuctionContext';
import { CartProvider } from '@/contexts/CartContext';
import { WishlistProvider } from '@/contexts/WishlistContext';

// Pages
import Index from './pages/Index';
import Register from './pages/Register';
import Login from './pages/Login';
import ResetPassword from './pages/ResetPassword';
import UserProfile from './pages/UserProfile';
import EditProfile from './pages/EditProfile';
import Wishlist from './pages/Wishlist';
import AboutUs from './pages/AboutUs';
import FAQ from './pages/FAQ';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import Cart from './pages/Cart';
import ProductCard from './pages/ProductCard';
import Payment from './pages/Payment';
import AuctionDetail from './pages/AuctionDetail';
import CreateAuction from './pages/CreateAuction';
import ExploreAuctions from './pages/ExploreAuctions';
import CheckoutPage from './pages/CheckoutPage';
import ConfirmPurchasePage from './pages/ConfirmationPurchasePage';
import OrderSuccessPage from './pages/OrderSuccessPage';
import PlaceBid from './pages/PlaceBid';
import MyPurchases from './pages/MyPurchases';
import VerifyEmail from './pages/VerifyEmail';
import EmailVerifiedSuccess from './pages/EmailVerifiedSuccess';
import PasswordChangedSuccess from './pages/PasswordChangedSuccess';
import ShipmentManagement from './pages/ShipmentManagement';
import AuctionWinnerCelebration from './pages/AuctionWinnerCelebration';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 5 * 60 * 1000,
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthProvider>
          <AuctionProvider>
            <CartProvider>
              <WishlistProvider>
                <TooltipProvider>
                  <Toaster />
                  <Sonner />
                  <Routes>
                    <Route path='/' element={<Index />} />
                    <Route path='/register' element={<Register />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/reset-password' element={<ResetPassword />} />
                    <Route path='/verify-email' element={<VerifyEmail />} />
                    <Route path='/email-verified-success' element={<EmailVerifiedSuccess />} />
                    <Route path='/password-changed-success' element={<PasswordChangedSuccess />} />
                    <Route path='/profile' element={<UserProfile />} />
                    <Route path='/profile/edit' element={<EditProfile />} />
                    <Route path='/wishlist' element={<Wishlist />} />
                    <Route path='/about' element={<AboutUs />} />
                    <Route path='/faq' element={<FAQ />} />
                    <Route path='/privacy' element={<Privacy />} />
                    <Route path='/terms' element={<Terms />} />
                    <Route path='/cart' element={<Cart />} />
                    <Route path='/product/:id' element={<ProductCard />} />
                    <Route path='/payment' element={<Payment />} />
                    <Route path='/auction/:id' element={<AuctionDetail />} />
                    <Route path='/auction/:id/bid' element={<PlaceBid />} />
                    <Route path='/auctions/explore' element={<ExploreAuctions />} />
                    <Route path='/auctions/create' element={<CreateAuction />} />
                    <Route path='/checkout/:id' element={<CheckoutPage />} />
                    <Route path='/confirm-purchase/:id' element={<ConfirmPurchasePage />} />
                    <Route path='/order-success' element={<OrderSuccessPage />} />
                    <Route path='/my-purchases' element={<MyPurchases />} />
                    <Route path='/shipment/:id' element={<ShipmentManagement />} />
                    <Route path='/auction-winner/:id' element={<AuctionWinnerCelebration />} />
                  </Routes>
                </TooltipProvider>
              </WishlistProvider>
            </CartProvider>
          </AuctionProvider>
        </AuthProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;