import React from 'react';
import { Search, Bell, ShoppingCart, User, ChevronDown, BookOpen, PenTool, Laptop, Home, Coffee, Printer } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';

import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const Navbar = () => {
    const { user, logout } = useAuth();
    const { cartCount, setIsCartOpen } = useCart();

    return (
        <div className="sticky top-0 z-50 w-full bg-white shadow-sm">
            {/* Main Navbar */}
            <div className="border-b border-slate-100">
                <div className="container mx-auto px-4 h-16 flex items-center justify-between gap-8">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2 flex-shrink-0">
                        <div className="bg-slate-900 text-white font-bold p-1.5 rounded-lg text-sm">CE</div>
                        <span className="font-bold text-xl text-slate-900 tracking-tight">Campus Essentials</span>
                    </Link>

                    {/* Right Actions */}
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setIsCartOpen(true)}
                            className="p-2 hover:bg-slate-100 rounded-full text-slate-600 transition-colors relative"
                        >
                            <ShoppingCart className="w-5 h-5" />
                            {cartCount > 0 && (
                                <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full border-2 border-white">
                                    {cartCount}
                                </span>
                            )}
                        </button>

                        {user ? (
                            <div className="flex items-center gap-3 ml-2">
                                {user.is_staff && (
                                    <Link to="/admin" className="text-sm font-medium text-slate-700 hover:text-blue-600">
                                        Admin Panel
                                    </Link>
                                )}
                                {user.is_supplier && (
                                    <Link to="/supplier" className="text-sm font-medium text-slate-700 hover:text-blue-600">
                                        Supplier Portal
                                    </Link>
                                )}
                                <span className="text-sm font-medium text-slate-700 hidden md:block">Hi, {user.first_name || user.username}</span>
                                <button
                                    onClick={logout}
                                    className="p-1 hover:bg-slate-100 rounded-full transition-colors"
                                    title="Logout"
                                >
                                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">
                                        {user.username[0].toUpperCase()}
                                    </div>
                                </button>
                            </div>
                        ) : (
                            <Link to="/login" className="ml-2 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-sm font-bold rounded-lg transition-colors">
                                Login
                            </Link>
                        )}
                    </div>
                </div>
            </div>

            {/* Sub-Navbar (Categories) */}
            <div className="container mx-auto px-4">
                <div className="flex items-center gap-8 overflow-x-auto py-3 text-sm font-medium text-slate-600 scrollbar-hide">
                    <Link to="/store?category=Books%20%26%20Study" className="flex items-center gap-2 hover:text-blue-600 transition-colors whitespace-nowrap">
                        <BookOpen className="w-4 h-4" /> Books & Study
                    </Link>
                    <Link to="/store?category=Stationery" className="flex items-center gap-2 hover:text-blue-600 transition-colors whitespace-nowrap">
                        <PenTool className="w-4 h-4" /> Stationery
                    </Link>
                    <Link to="/store?category=Electronics" className="flex items-center gap-2 hover:text-blue-600 transition-colors whitespace-nowrap">
                        <Laptop className="w-4 h-4" /> Electronics
                    </Link>
                    <Link to="/store?category=Hostel%20Needs" className="flex items-center gap-2 hover:text-blue-600 transition-colors whitespace-nowrap">
                        <Home className="w-4 h-4" /> Hostel Needs
                    </Link>
                    <Link to="/store?category=Food%20%26%20Snacks" className="flex items-center gap-2 hover:text-blue-600 transition-colors whitespace-nowrap">
                        <Coffee className="w-4 h-4" /> Food & Snacks
                    </Link>
                    <Link to="/services" className="flex items-center gap-2 hover:text-blue-600 transition-colors whitespace-nowrap">
                        <Printer className="w-4 h-4" /> Services
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
