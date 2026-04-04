import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import PageFallback from './components/PageFallback';
import { useAuthStore } from './store/auth.store';

// Lazy load all page components
const AuthPage = lazy(() => import('./pages/AuthPage'));
const ProductListPage = lazy(() => import('./pages/ProductListPage'));
const CreateProductPage = lazy(() => import('./pages/CreateProductPage'));
const ProductDetailPage = lazy(() => import('./pages/ProductDetailPage'));
const CheckoutPage = lazy(() => import('./pages/CheckoutPage'));

function App() {
  const { isAuthenticated } = useAuthStore();
  return (
    <>
      <BrowserRouter>
        {/* <AuthEventBridge /> */}
        {isAuthenticated && <Navbar />}
        <Suspense fallback={<PageFallback />}>
          <Routes>
            {/* Public routes */}
            <Route path="/auth" element={<AuthPage />} />

            {/* Protected routes */}
            <Route element={<ProtectedRoute />}>
              <Route path="/products" element={<ProductListPage />} />
              <Route path="/products/create" element={<CreateProductPage />} />
              <Route path="/products/:id" element={<ProductDetailPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
            </Route>

            {/* Default redirect */}
            <Route path="*" element={<Navigate to="/products" replace />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </>
  );
}

export default App;
