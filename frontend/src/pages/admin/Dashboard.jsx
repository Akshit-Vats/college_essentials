import React, { useState, useEffect } from 'react';
import { DollarSign, ShoppingBag, Package, TrendingUp } from 'lucide-react';
import api from '@/lib/api';

const StatCard = ({ title, value, icon: Icon, color }) => (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
        <div className="flex items-center justify-between mb-4">
            <div className={`p-3 rounded-lg ${color}`}>
                <Icon className="w-6 h-6 text-white" />
            </div>
            <span className="text-sm font-medium text-slate-500 bg-slate-50 px-2.5 py-0.5 rounded-full">
                +12% this week
            </span>
        </div>
        <h3 className="text-2xl font-bold text-slate-900 mb-1">{value}</h3>
        <p className="text-sm text-slate-500">{title}</p>
    </div>
);

const Dashboard = () => {
    const [stats, setStats] = useState({
        totalRevenue: 0,
        totalOrders: 0,
        totalProducts: 0,
        lowStock: 0
    });

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const [ordersRes, productsRes] = await Promise.all([
                    api.get('/store/admin/orders'),
                    api.get('/store/products')
                ]);

                const orders = ordersRes.data;
                const products = productsRes.data;

                const revenue = orders.reduce((sum, order) => sum + parseFloat(order.total_amount), 0);
                const lowStockCount = products.filter(p => p.stock < 10).length;

                setStats({
                    totalRevenue: revenue,
                    totalOrders: orders.length,
                    totalProducts: products.length,
                    lowStock: lowStockCount
                });
            } catch (error) {
                console.error('Error fetching admin stats:', error);
            }
        };

        fetchStats();
    }, []);

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold text-slate-900 mb-8">Dashboard Overview</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <StatCard
                    title="Total Revenue"
                    value={`₹${stats.totalRevenue.toLocaleString()}`}
                    icon={DollarSign}
                    color="bg-green-500"
                />
                <StatCard
                    title="Total Orders"
                    value={stats.totalOrders}
                    icon={ShoppingBag}
                    color="bg-blue-500"
                />
                <StatCard
                    title="Active Products"
                    value={stats.totalProducts}
                    icon={Package}
                    color="bg-purple-500"
                />
                <StatCard
                    title="Low Stock Items"
                    value={stats.lowStock}
                    icon={TrendingUp}
                    color="bg-orange-500"
                />
            </div>

            {/* Recent Activity Placeholder */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                <h2 className="text-lg font-bold text-slate-900 mb-4">Recent Activity</h2>
                <div className="text-slate-500 text-sm text-center py-8">
                    Chart visualization coming soon...
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
