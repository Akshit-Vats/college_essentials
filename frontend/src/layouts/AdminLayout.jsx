import React from 'react';
import { Navigate, Link, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LayoutDashboard, Package, FolderTree, ShoppingBag, LogOut } from 'lucide-react';

const AdminLayout = () => {
    const { user, loading, logout } = useAuth();
    const location = useLocation();

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    }

    if (!user || !user.is_staff) {
        return <Navigate to="/" replace />;
    }

    const navItems = [
        { icon: LayoutDashboard, label: 'Dashboard', path: '/admin' },
        { icon: Package, label: 'Products', path: '/admin/products' },
        { icon: FolderTree, label: 'Categories', path: '/admin/categories' },
        { icon: ShoppingBag, label: 'Orders', path: '/admin/orders' },
    ];

    return (
        <div className="min-h-screen bg-slate-50 flex">
            {/* Sidebar */}
            <div className="w-64 bg-slate-900 text-white flex flex-col">
                <div className="p-6 border-b border-slate-800">
                    <div className="flex items-center gap-2">
                        <div className="bg-white text-slate-900 font-bold p-1.5 rounded-lg text-sm">CE</div>
                        <span className="font-bold text-xl tracking-tight">Admin Panel</span>
                    </div>
                </div>

                <nav className="flex-1 p-4 space-y-1">
                    {navItems.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${location.pathname === item.path
                                    ? 'bg-blue-600 text-white'
                                    : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                                }`}
                        >
                            <item.icon className="w-5 h-5" />
                            <span className="font-medium">{item.label}</span>
                        </Link>
                    ))}
                </nav>

                <div className="p-4 border-t border-slate-800">
                    <div className="flex items-center gap-3 px-4 py-3 mb-2">
                        <div className="w-8 h-8 bg-slate-700 rounded-full flex items-center justify-center font-bold">
                            {user.username[0].toUpperCase()}
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate">{user.first_name || user.username}</p>
                            <p className="text-xs text-slate-500 truncate">Administrator</p>
                        </div>
                    </div>
                    <button
                        onClick={logout}
                        className="w-full flex items-center gap-3 px-4 py-2 text-slate-400 hover:text-red-400 transition-colors"
                    >
                        <LogOut className="w-5 h-5" />
                        <span className="font-medium">Logout</span>
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 overflow-auto">
                <Outlet />
            </div>
        </div>
    );
};

export default AdminLayout;
