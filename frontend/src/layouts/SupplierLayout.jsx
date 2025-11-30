import React from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LayoutDashboard, LogOut, Package } from 'lucide-react';

const SupplierLayout = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    // Redirect if not logged in or not a supplier
    React.useEffect(() => {
        if (!user) {
            navigate('/login');
        } else if (!user.is_supplier) {
            navigate('/');
        }
    }, [user, navigate]);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    if (!user || !user.is_supplier) return null;

    const isActive = (path) => location.pathname === path;

    return (
        <div className="min-h-screen bg-slate-50 flex">
            {/* Sidebar */}
            <aside className="w-64 bg-slate-900 text-white fixed h-full z-10">
                <div className="p-6 border-b border-slate-800">
                    <h1 className="text-xl font-bold">Supplier Portal</h1>
                    <p className="text-slate-400 text-sm mt-1">Welcome, {user.first_name || user.username}</p>
                </div>

                <nav className="p-4 space-y-2">
                    <Link
                        to="/supplier"
                        className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${isActive('/supplier') ? 'bg-blue-600 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                            }`}
                    >
                        <Package className="w-5 h-5" />
                        Inventory
                    </Link>
                </nav>

                <div className="absolute bottom-0 w-full p-4 border-t border-slate-800">
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-400 hover:bg-slate-800 hover:text-white w-full transition-colors"
                    >
                        <LogOut className="w-5 h-5" />
                        Logout
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="ml-64 flex-1">
                <Outlet />
            </main>
        </div>
    );
};

export default SupplierLayout;
