import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import AuthPage from './pages/AuthPage';
import ProductListPage from './pages/ProductListPage';
import Navbar from './components/Navbar';
import { useAuthStore } from './store/auth.store';

function App() {
  const { isAuthenticated } = useAuthStore();
  return (
    <>
      <BrowserRouter>
        {/* <AuthEventBridge /> */}
        {isAuthenticated && <Navbar />}
        <Routes>
          {/* Public routes */}
          <Route path="/auth" element={<AuthPage />} />

          {/* Protected routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/products" element={<ProductListPage />} />
            {/* 
              <Route path="/products/create"        element={<ProductCreatePage />} />
              <Route path="/products/:id"           element={<ProductDetailPage />} /> */}
          </Route>

          {/* Default redirect */}
          <Route path="*" element={<Navigate to="/products" replace />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
