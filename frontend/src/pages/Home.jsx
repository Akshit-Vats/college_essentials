import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import CategoryGrid from '../components/CategoryGrid';
import FeaturedSection from '../components/FeaturedSection';
import { ServicesSection, Footer } from '../components/ServicesAndFooter';

const Home = () => {
    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
            <Navbar />
            <main>
                <Hero />
                <CategoryGrid />
                <FeaturedSection />
                <ServicesSection />
            </main>
            <Footer />
        </div>
    );
};

export default Home;
