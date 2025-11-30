import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import Home from './pages/Home';
import Store from './pages/Store';
import Services from './pages/Services';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Checkout from './pages/Checkout';
import CartDrawer from './components/CartDrawer';

import AdminLayout from './layouts/AdminLayout';
import Dashboard from './pages/admin/Dashboard';
import Products from './pages/admin/Products';
import Categories from './pages/admin/Categories';
import Orders from './pages/admin/Orders';

import SupplierLayout from './layouts/SupplierLayout';
import Inventory from './pages/supplier/Inventory';

const App = () => {
    return (
        <AuthProvider>
            <CartProvider>
                <Router>
                    <CartDrawer />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/store" element={<Store />} />
                        <Route path="/services" element={<Services />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/signup" element={<Signup />} />
                        <Route path="/checkout" element={<Checkout />} />

                        {/* Admin Routes */}
                        <Route path="/admin" element={<AdminLayout />}>
                            <Route index element={<Dashboard />} />
                            <Route path="products" element={<Products />} />
                            <Route path="categories" element={<Categories />} />
                            <Route path="orders" element={<Orders />} />
                        </Route>

                        {/* Supplier Routes */}
                        <Route path="/supplier" element={<SupplierLayout />}>
                            <Route index element={<Inventory />} />
                        </Route>
                    </Routes>
                </Router>
            </CartProvider>
        </AuthProvider>
    );
};

export default App;
