import React, { useState, useEffect } from 'react';
import { Package, Clock, CheckCircle, XCircle } from 'lucide-react';
import api from '@/lib/api';

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await api.get('/store/admin/orders');
                setOrders(response.data);
            } catch (error) {
                console.error('Error fetching orders:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    const getStatusColor = (status) => {
        switch (status) {
            case 'COMPLETED': return 'bg-green-100 text-green-700';
            case 'CANCELLED': return 'bg-red-100 text-red-700';
            default: return 'bg-yellow-100 text-yellow-700';
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'COMPLETED': return CheckCircle;
            case 'CANCELLED': return XCircle;
            default: return Clock;
        }
    };

    if (loading) {
        return <div className="p-8">Loading orders...</div>;
    }

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold text-slate-900 mb-8">Orders</h1>

            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                <table className="w-full text-left text-sm">
                    <thead className="bg-slate-50 border-b border-slate-200">
                        <tr>
                            <th className="px-6 py-4 font-semibold text-slate-700">Order ID</th>
                            <th className="px-6 py-4 font-semibold text-slate-700">Date</th>
                            <th className="px-6 py-4 font-semibold text-slate-700">Total</th>
                            <th className="px-6 py-4 font-semibold text-slate-700">Status</th>
                            <th className="px-6 py-4 font-semibold text-slate-700">Shipping Address</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {orders.map((order) => {
                            const StatusIcon = getStatusIcon(order.status);
                            return (
                                <tr key={order.id} className="hover:bg-slate-50">
                                    <td className="px-6 py-4 font-medium text-slate-900">#{order.id}</td>
                                    <td className="px-6 py-4 text-slate-600">
                                        {new Date(order.created_at).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4 font-medium text-slate-900">₹{order.total_amount}</td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                                            <StatusIcon className="w-3 h-3" />
                                            {order.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-slate-600 max-w-xs truncate" title={order.shipping_address}>
                                        {order.shipping_address}
                                    </td>
                                </tr>
                            );
                        })}
                        {orders.length === 0 && (
                            <tr>
                                <td colSpan="5" className="px-6 py-12 text-center text-slate-500">
                                    <Package className="w-12 h-12 mx-auto mb-3 text-slate-300" />
                                    No orders found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Orders;
