import React, { useState, useEffect } from 'react';
import { Save, RefreshCw } from 'lucide-react';
import api from '@/lib/api';

const Inventory = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(null);

    const fetchProducts = async () => {
        try {
            const response = await api.get('/store/supplier/products');
            setProducts(response.data);
        } catch (error) {
            console.error('Error fetching products:', error);
            alert('Failed to load products. Ensure you are assigned as a supplier.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleStockChange = (id, newStock) => {
        setProducts(products.map(p =>
            p.id === id ? { ...p, stock: parseInt(newStock) || 0 } : p
        ));
    };

    const handleUpdateStock = async (product) => {
        setUpdating(product.id);
        try {
            await api.patch(`/store/supplier/products/${product.id}/stock`, {
                stock: product.stock
            });
            // Show success indicator briefly?
        } catch (error) {
            console.error('Error updating stock:', error);
            alert('Failed to update stock');
            fetchProducts(); // Revert on error
        } finally {
            setUpdating(null);
        }
    };

    if (loading) return <div className="p-8">Loading inventory...</div>;

    return (
        <div className="p-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-2xl font-bold text-slate-900">Inventory Management</h1>
                <button
                    onClick={fetchProducts}
                    className="flex items-center gap-2 text-slate-600 hover:text-blue-600 transition-colors"
                >
                    <RefreshCw className="w-4 h-4" />
                    Refresh
                </button>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                <table className="w-full text-left text-sm">
                    <thead className="bg-slate-50 border-b border-slate-200">
                        <tr>
                            <th className="px-6 py-4 font-semibold text-slate-700">Product Name</th>
                            <th className="px-6 py-4 font-semibold text-slate-700">Price</th>
                            <th className="px-6 py-4 font-semibold text-slate-700 w-48">Current Stock</th>
                            <th className="px-6 py-4 font-semibold text-slate-700 w-32">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {products.map((product) => (
                            <tr key={product.id} className="hover:bg-slate-50">
                                <td className="px-6 py-4 font-medium text-slate-900">{product.name}</td>
                                <td className="px-6 py-4 text-slate-600">₹{product.price}</td>
                                <td className="px-6 py-4">
                                    <input
                                        type="number"
                                        min="0"
                                        value={product.stock}
                                        onChange={(e) => handleStockChange(product.id, e.target.value)}
                                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                                    />
                                </td>
                                <td className="px-6 py-4">
                                    <button
                                        onClick={() => handleUpdateStock(product)}
                                        disabled={updating === product.id}
                                        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors disabled:opacity-50"
                                    >
                                        <Save className="w-4 h-4" />
                                        {updating === product.id ? 'Saving...' : 'Save'}
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {products.length === 0 && (
                            <tr>
                                <td colSpan="4" className="px-6 py-12 text-center text-slate-500">
                                    No products found in your assigned category.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Inventory;
