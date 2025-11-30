import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Truck, ShieldCheck, Tag, Package } from 'lucide-react';

const Hero = () => {
    const navigate = useNavigate();

    return (
        <div className="relative bg-gradient-to-r from-white to-blue-50/50 overflow-hidden">
            <div className="container mx-auto px-4 py-16 md:py-24 flex flex-col md:flex-row items-center gap-12">
                {/* Left Content */}
                <div className="flex-1 space-y-8 z-10">
                    <div className="space-y-4">
                        <h1 className="text-5xl md:text-6xl font-bold text-slate-900 leading-[1.1] tracking-tight">
                            Everything You Need for <span className="text-blue-600">College Life</span>
                        </h1>
                        <p className="text-lg text-slate-600 max-w-xl leading-relaxed">
                            From textbooks to tech gadgets, hostel essentials to project kits - your one-stop campus store.
                        </p>
                    </div>

                    {/* Trust Badges */}
                    <div className="flex flex-wrap items-center gap-6 pt-4">
                        <div className="flex items-center gap-2 text-slate-700 font-medium">
                            <div className="p-2 bg-blue-100 text-blue-600 rounded-full">
                                <Truck className="w-5 h-5" />
                            </div>
                            Fast Delivery
                        </div>
                        <div className="flex items-center gap-2 text-slate-700 font-medium">
                            <div className="p-2 bg-blue-100 text-blue-600 rounded-full">
                                <ShieldCheck className="w-5 h-5" />
                            </div>
                            Student Verified
                        </div>
                        <div className="flex items-center gap-2 text-slate-700 font-medium">
                            <div className="p-2 bg-blue-100 text-blue-600 rounded-full">
                                <Tag className="w-5 h-5" />
                            </div>
                            Best Prices
                        </div>
                    </div>

                    <div className="flex gap-4 pt-4">
                        <button
                            onClick={() => navigate('/store')}
                            className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-lg shadow-blue-600/20 transition-all hover:-translate-y-1"
                        >
                            Shop Essentials
                        </button>
                        <button
                            onClick={() => navigate('/services')}
                            className="px-8 py-4 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold rounded-xl transition-all"
                        >
                            View Services
                        </button>
                    </div>
                </div>

                {/* Right Content (Image) */}
                <div className="flex-1 relative w-full max-w-xl">
                    <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-100 aspect-[4/3] group">
                        <img
                            src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=2070&auto=format&fit=crop"
                            alt="University Library"
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />

                        {/* Floating Card */}
                        <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-sm p-4 rounded-xl shadow-lg border border-white/20 flex items-center gap-4 transform transition-transform hover:-translate-y-1">
                            <div className="p-3 bg-orange-100 text-orange-600 rounded-lg">
                                <Package className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="font-bold text-slate-900">Same Day Delivery</h3>
                                <p className="text-sm text-slate-500">On campus delivery within 24 hours</p>
                            </div>
                        </div>
                    </div>

                    {/* Decorative Elements */}
                    <div className="absolute -top-12 -right-12 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl -z-10" />
                    <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-orange-400/10 rounded-full blur-3xl -z-10" />
                </div>
            </div>
        </div>
    );
};

export default Hero;
