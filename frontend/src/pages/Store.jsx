import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { Footer } from '../components/ServicesAndFooter';
import { Filter, Search, Star, Heart, Plus } from 'lucide-react';
import api from '@/lib/api';
import { useCart } from '../context/CartContext';

const Store = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [searchParams] = useSearchParams();
    const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'All');
    const [loading, setLoading] = useState(true);
    const { addToCart } = useCart();

    useEffect(() => {
        const categoryParam = searchParams.get('category');
        if (categoryParam) {
            setSelectedCategory(categoryParam);
        }
    }, [searchParams]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [productsRes, categoriesRes] = await Promise.all([
                    api.get('/store/products'),
                    api.get('/store/categories')
                ]);
                setProducts(productsRes.data);
                setCategories(categoriesRes.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const filteredProducts = selectedCategory === 'All'
        ? products
        : products.filter(p => p.category.name === selectedCategory);

    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
            <Navbar />

            <div className="container mx-auto px-4 py-8">
                <div className="flex flex-col md:flex-row gap-8">
                    {/* Sidebar Filters */}
                    <div className="w-full md:w-64 flex-shrink-0 space-y-6">
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                            <div className="flex items-center gap-2 mb-4 text-slate-900 font-bold">
                                <Filter className="w-5 h-5" /> Filters
                            </div>

                            <div className="space-y-2">
                                <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3">Categories</h3>
                                <button
                                    onClick={() => setSelectedCategory('All')}
                                    className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${selectedCategory === 'All' ? 'bg-blue-50 text-blue-600' : 'text-slate-600 hover:bg-slate-50'}`}
                                >
                                    All Products
                                </button>
                                {categories.map(cat => (
                                    <button
                                        key={cat.id}
                                        onClick={() => setSelectedCategory(cat.name)}
                                        className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${selectedCategory === cat.name ? 'bg-blue-50 text-blue-600' : 'text-slate-600 hover:bg-slate-50'}`}
                                    >
                                        {cat.name}
                                        <span className="float-right text-xs bg-slate-100 px-2 py-0.5 rounded-full text-slate-500">
                                            {cat.products_count}
                                        </span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="flex-1">
                        <div className="flex items-center justify-between mb-6">
                            <h1 className="text-2xl font-bold text-slate-900">
                                {selectedCategory === 'All' ? 'All Products' : selectedCategory}
                            </h1>
                            <span className="text-slate-500 text-sm">
                                Showing {filteredProducts.length} results
                            </span>
                        </div>

                        {loading ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {[...Array(6)].map((_, i) => (
                                    <div key={i} className="h-80 bg-white rounded-xl shadow-sm border border-slate-200 animate-pulse" />
                                ))}
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {filteredProducts.map((product) => (
                                    <div key={product.id} className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden group hover:shadow-md transition-all">
                                        <div className="relative aspect-[4/3] bg-slate-100 overflow-hidden">
                                            <img
                                                src={product.image_url}
                                                alt={product.name}
                                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                            />
                                            <button className="absolute top-3 right-3 p-2 bg-white/90 rounded-full text-slate-400 hover:text-red-500 transition-colors shadow-sm">
                                                <Heart className="w-4 h-4" />
                                            </button>
                                        </div>
                                        <div className="p-4">
                                            <div className="flex items-center gap-1 mb-2">
                                                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                                                <span className="text-sm font-medium text-slate-700">4.5</span>
                                            </div>
                                            <h3 className="font-semibold text-slate-900 mb-2 line-clamp-1">{product.name}</h3>
                                            <div className="flex items-center justify-between">
                                                <span className="text-lg font-bold text-slate-900">₹{product.price}</span>
                                                <button
                                                    onClick={() => addToCart(product)}
                                                    className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors shadow-blue-200"
                                                >
                                                    <Plus className="w-5 h-5" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default Store;
