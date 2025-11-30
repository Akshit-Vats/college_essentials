import React, { useState, useEffect } from 'react';
import { Star, Heart, Plus, ArrowRight, CheckCircle2 } from 'lucide-react';
import api from '@/lib/api';

import { useCart } from '../context/CartContext';

const ProductCard = ({ product }) => {
    const { addToCart } = useCart();
    const { name, price, image_url } = product;

    return (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden group hover:shadow-md transition-all">
            <div className="relative aspect-[4/3] bg-slate-100 overflow-hidden">
                <img src={image_url} alt={name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <button className="absolute top-3 right-3 p-2 bg-white/90 rounded-full text-slate-400 hover:text-red-500 transition-colors shadow-sm">
                    <Heart className="w-4 h-4" />
                </button>
            </div>
            <div className="p-4">
                <div className="flex items-center gap-1 mb-2">
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    <span className="text-sm font-medium text-slate-700">4.8</span>
                </div>
                <h3 className="font-semibold text-slate-900 mb-2 line-clamp-1">{name}</h3>
                <div className="flex items-center justify-between">
                    <div className="flex items-baseline gap-2">
                        <span className="text-lg font-bold text-slate-900">₹{price}</span>
                    </div>
                    <button
                        onClick={() => addToCart(product)}
                        className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors shadow-blue-200"
                    >
                        <Plus className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </div>
    );
};

const BundleCard = () => {
    const { addToCart } = useCart();

    const handleAddBundle = () => {
        addToCart({
            id: 'starter-bundle-1',
            name: '1st Year Starter Pack',
            price: 2499,
            image_url: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=2022&auto=format&fit=crop',
            quantity: 1
        });
    };

    return (
        <div className="col-span-1 md:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col md:flex-row">
            <div className="md:w-2/5 relative bg-slate-100">
                <img
                    src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=2022&auto=format&fit=crop"
                    alt="Student Bundle"
                    className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                    Recommended
                </div>
            </div>
            <div className="p-8 md:w-3/5 flex flex-col justify-center relative">
                <div className="absolute top-6 right-6 bg-red-50 text-red-600 text-xs font-bold px-3 py-1 rounded-full border border-red-100">
                    Save ₹1500
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-2">1st Year Starter Pack</h3>
                <p className="text-slate-500 mb-6">Everything a freshman needs to kickstart their academic journey with confidence.</p>

                <ul className="space-y-3 mb-8">
                    {['Premium Notebook Set (x5)', 'Scientific Calculator', 'Parker Pen Kit', 'Insulated Water Bottle'].map((item, i) => (
                        <li key={i} className="flex items-center gap-3 text-slate-700 text-sm font-medium">
                            <CheckCircle2 className="w-5 h-5 text-blue-500" />
                            {item}
                        </li>
                    ))}
                </ul>

                <div className="flex items-center justify-between mt-auto">
                    <div>
                        <p className="text-sm text-slate-400">Bundle Price</p>
                        <p className="text-3xl font-bold text-slate-900">₹2,499</p>
                    </div>
                    <button
                        onClick={handleAddBundle}
                        className="px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-xl flex items-center gap-2 transition-colors"
                    >
                        Add Bundle <ArrowRight className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
    );
};

const FeaturedSection = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await api.get('/store/products');
                // Take only first 2 products for the trending section
                setProducts(response.data.slice(0, 2));
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);

    return (
        <section className="py-16 bg-white">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Featured Products Column */}
                    <div className="lg:col-span-1 space-y-6">
                        <div className="flex items-center justify-between">
                            <h2 className="text-2xl font-bold text-slate-900">Trending Now</h2>
                            <div className="flex gap-2">
                                <button className="p-2 rounded-full border border-slate-200 hover:bg-slate-50 text-slate-600">
                                    <ArrowRight className="w-4 h-4 rotate-180" />
                                </button>
                                <button className="p-2 rounded-full border border-slate-200 hover:bg-slate-50 text-slate-600">
                                    <ArrowRight className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                        <div className="grid gap-6">
                            {products.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                            {products.length === 0 && (
                                <div className="h-64 bg-slate-100 rounded-xl animate-pulse flex items-center justify-center text-slate-400">
                                    Loading Products...
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Smart Bundles Column (Wider) */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <h2 className="text-2xl font-bold text-slate-900">Smart Bundles & Kits</h2>
                                <p className="text-slate-500 text-sm">Curated bundles designed for each year and major.</p>
                            </div>
                            <a href="#" className="text-blue-600 font-medium text-sm hover:underline">View All Bundles</a>
                        </div>
                        <div className="h-full">
                            <BundleCard />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FeaturedSection;
