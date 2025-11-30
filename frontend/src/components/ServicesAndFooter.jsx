import React from 'react';
import { Printer, Shirt, Coffee, ArrowRight, Star, Package, Users, Clock, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const ServiceCard = ({ title, subtext, description, features, icon: Icon, image }) => (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden group hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
        <div className="h-48 relative overflow-hidden">
            <img src={image} alt={title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute -bottom-6 right-6 w-12 h-12 bg-white rounded-xl shadow-lg flex items-center justify-center text-blue-600 z-10 group-hover:scale-110 transition-transform">
                <Icon className="w-6 h-6" />
            </div>
        </div>
        <div className="p-6 pt-8">
            <div className="mb-4">
                <h3 className="text-xl font-bold text-slate-900">{title}</h3>
                <p className="text-blue-600 font-medium text-sm">{subtext}</p>
            </div>
            <p className="text-slate-600 text-sm mb-6 leading-relaxed">{description}</p>
            <ul className="space-y-2 mb-6">
                {features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-slate-500">
                        <div className="w-1.5 h-1.5 bg-blue-400 rounded-full" />
                        {feature}
                    </li>
                ))}
            </ul>
            <button className="text-slate-900 font-bold text-sm flex items-center gap-2 hover:gap-3 transition-all group-hover:text-blue-600">
                Learn More <ArrowRight className="w-4 h-4" />
            </button>
        </div>
    </div>
);

export const ServicesSection = () => {
    return (
        <section className="py-16 bg-slate-50">
            <div className="container mx-auto px-4">
                <div className="text-center max-w-2xl mx-auto mb-12">
                    <h2 className="text-3xl font-bold text-slate-900 mb-4">Campus Services</h2>
                    <p className="text-slate-600">Instant access to essential campus facilities, right from your device.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <ServiceCard
                        title="Print & Photocopy"
                        subtext="Starting ₹2/page"
                        description="Upload PDFs, get instant printing with campus delivery. Supports color, B&W, and spiral binding."
                        features={['Same-day delivery', 'Spiral & Hard binding', 'Thesis printing']}
                        icon={Printer}
                        image="https://images.unsplash.com/photo-1562564055-71e051d33c19?q=80&w=2070&auto=format&fit=crop"
                    />
                    <ServiceCard
                        title="Laundry Services"
                        subtext="Book slots instantly"
                        description="Schedule your laundry drop-off and pickup. Real-time tracking of washing machine availability."
                        features={['Slot booking', 'Ironing service', 'Express delivery']}
                        icon={Shirt}
                        image="https://images.unsplash.com/photo-1521656693074-0ef32e80a5d5?q=80&w=2070&auto=format&fit=crop"
                    />
                    <ServiceCard
                        title="Food Ordering"
                        subtext="Canteen & Night Mess"
                        description="Skip the queue. Order food from campus canteens and night mess directly to your hostel room."
                        features={['Room delivery', 'Live order tracking', 'Cashless payment']}
                        icon={Coffee}
                        image="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=1981&auto=format&fit=crop"
                    />
                </div>
            </div>
        </section>
    );
};

export const Footer = () => {
    return (
        <footer className="bg-slate-900 text-slate-400">
            {/* Stats Bar */}
            <div className="border-b border-slate-800 bg-slate-950">
                <div className="container mx-auto px-4 py-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                        <div className="flex items-center justify-center gap-3">
                            <Users className="w-5 h-5 text-blue-500" />
                            <span className="font-semibold text-slate-200">50K+ Happy Students</span>
                        </div>
                        <div className="flex items-center justify-center gap-3">
                            <Package className="w-5 h-5 text-blue-500" />
                            <span className="font-semibold text-slate-200">7K+ Products</span>
                        </div>
                        <div className="flex items-center justify-center gap-3">
                            <Star className="w-5 h-5 text-yellow-500" />
                            <span className="font-semibold text-slate-200">4.8 Average Rating</span>
                        </div>
                        <div className="flex items-center justify-center gap-3">
                            <Clock className="w-5 h-5 text-blue-500" />
                            <span className="font-semibold text-slate-200">24H Delivery Time</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Footer */}
            <div className="container mx-auto px-4 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
                    {/* Brand Column */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="flex items-center gap-2">
                            <div className="bg-white text-slate-900 font-bold p-1.5 rounded-lg text-sm">CE</div>
                            <span className="font-bold text-xl text-white tracking-tight">Campus Essentials</span>
                        </div>
                        <p className="text-slate-400 leading-relaxed max-w-sm">
                            Your one-stop solution for all campus needs. We ensure quality products and services delivered right to your doorstep.
                        </p>
                        <div className="flex gap-4">
                            <a href="#" className="p-2 bg-slate-800 hover:bg-blue-600 text-white rounded-lg transition-colors"><Facebook className="w-4 h-4" /></a>
                            <a href="#" className="p-2 bg-slate-800 hover:bg-blue-600 text-white rounded-lg transition-colors"><Twitter className="w-4 h-4" /></a>
                            <a href="#" className="p-2 bg-slate-800 hover:bg-blue-600 text-white rounded-lg transition-colors"><Instagram className="w-4 h-4" /></a>
                            <a href="#" className="p-2 bg-slate-800 hover:bg-blue-600 text-white rounded-lg transition-colors"><Linkedin className="w-4 h-4" /></a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-6">
                        <h3 className="text-white font-bold text-lg">Quick Links</h3>
                        <ul className="space-y-3">
                            <li><a href="#" className="hover:text-blue-400 transition-colors">Books & Study</a></li>
                            <li><a href="#" className="hover:text-blue-400 transition-colors">Electronics</a></li>
                            <li><a href="#" className="hover:text-blue-400 transition-colors">Hostel Needs</a></li>
                            <li><a href="#" className="hover:text-blue-400 transition-colors">Food & Snacks</a></li>
                            <li><a href="#" className="hover:text-blue-400 transition-colors">Project Kits</a></li>
                        </ul>
                    </div>

                    {/* Services */}
                    <div className="space-y-6">
                        <h3 className="text-white font-bold text-lg">Services</h3>
                        <ul className="space-y-3">
                            <li><a href="#" className="hover:text-blue-400 transition-colors">Print & Photocopy</a></li>
                            <li><a href="#" className="hover:text-blue-400 transition-colors">Laundry Booking</a></li>
                            <li><a href="#" className="hover:text-blue-400 transition-colors">Food Ordering</a></li>
                            <li><a href="#" className="hover:text-blue-400 transition-colors">Room Cleaning</a></li>
                            <li><a href="#" className="hover:text-blue-400 transition-colors">Tech Support</a></li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div className="space-y-6">
                        <h3 className="text-white font-bold text-lg">Stay Updated</h3>
                        <p className="text-sm">Subscribe to get special offers and campus news.</p>
                        <div className="space-y-3">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="w-full bg-slate-800 border-slate-700 text-white rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                            />
                            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition-colors">
                                Subscribe
                            </button>
                        </div>
                    </div>
                </div>

                <div className="border-t border-slate-800 mt-16 pt-8 text-center text-sm">
                    <p>&copy; 2025 Campus Essentials. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};
