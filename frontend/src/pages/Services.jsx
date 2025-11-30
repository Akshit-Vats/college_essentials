import React, { useState, useRef } from 'react';
import Navbar from '../components/Navbar';
import { Footer } from '../components/ServicesAndFooter';
import { Printer, Shirt, Coffee, Upload, Calendar, Clock, MapPin, FileText, X, CheckCircle2, ChevronRight, Phone } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

// Import Canteen Images
import canteenA from '../assets/canteen_a.png';
import canteenB from '../assets/canteen_b.png';
import canteenC from '../assets/canteen_c.png';
import canteenD from '../assets/canteen_d.png';

const Services = () => {
    const [activeTab, setActiveTab] = useState('print');
    const { addToCart } = useCart();
    const navigate = useNavigate();

    // Print Service State
    const [dragActive, setDragActive] = useState(false);
    const [file, setFile] = useState(null);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [isUploading, setIsUploading] = useState(false);
    const [copies, setCopies] = useState(1);
    const [colorMode, setColorMode] = useState('Black & White');
    const fileInputRef = useRef(null);

    // Laundry Service State
    const getNext7Days = () => {
        const days = [];
        for (let i = 0; i < 7; i++) {
            const d = new Date();
            d.setDate(d.getDate() + i);
            days.push(d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }));
        }
        return days;
    };

    const next7Days = getNext7Days();
    const [laundryDate, setLaundryDate] = useState(next7Days[0]);
    const [laundryTime, setLaundryTime] = useState('09:00 AM - 10:00 AM');
    const [bookingStatus, setBookingStatus] = useState('idle'); // idle, booked

    // Food Service State
    const [selectedCanteen, setSelectedCanteen] = useState(null);

    const canteens = [
        {
            id: 1,
            name: 'Central Block Canteen',
            location: 'Block A, Ground Floor',
            image: canteenA,
            status: 'Open',
            contact: '+91 98765 43210',
            menu: [
                { name: 'Veg Thali', price: 80 },
                { name: 'Chicken Biryani', price: 120 },
                { name: 'Fried Rice', price: 60 },
                { name: 'Masala Dosa', price: 50 },
                { name: 'Filter Coffee', price: 15 }
            ]
        },
        {
            id: 2,
            name: 'Library Cafe',
            location: 'Library Building, 1st Floor',
            image: canteenB,
            status: 'Open',
            contact: '+91 91234 56789',
            menu: [
                { name: 'Cappuccino', price: 40 },
                { name: 'Sandwich', price: 35 },
                { name: 'Muffin', price: 25 },
                { name: 'Cold Coffee', price: 50 },
                { name: 'Cookies', price: 10 }
            ]
        },
        {
            id: 3,
            name: 'Sports Complex Food Court',
            location: 'Sports Complex',
            image: canteenC,
            status: 'Open',
            contact: '+91 99887 76655',
            menu: [
                { name: 'Protein Shake', price: 60 },
                { name: 'Fruit Salad', price: 40 },
                { name: 'Boiled Eggs (2)', price: 20 },
                { name: 'Chicken Salad', price: 90 },
                { name: 'Juice', price: 30 }
            ]
        },
        {
            id: 4,
            name: 'Garden Bistro',
            location: 'Near Botanical Garden',
            image: canteenD,
            status: 'Open',
            contact: '+91 95544 33221',
            menu: [
                { name: 'Pasta Alfredo', price: 110 },
                { name: 'Pizza Slice', price: 70 },
                { name: 'Burger', price: 65 },
                { name: 'French Fries', price: 40 },
                { name: 'Iced Tea', price: 35 }
            ]
        }
    ];

    // Drag & Drop Handlers
    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFile(e.dataTransfer.files[0]);
        }
    };

    const handleChange = (e) => {
        e.preventDefault();
        if (e.target.files && e.target.files[0]) {
            handleFile(e.target.files[0]);
        }
    };

    const handleFile = (selectedFile) => {
        setFile(selectedFile);
        simulateUpload();
    };

    const simulateUpload = () => {
        setIsUploading(true);
        setUploadProgress(0);
        const interval = setInterval(() => {
            setUploadProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setIsUploading(false);
                    return 100;
                }
                return prev + 10;
            });
        }, 200);
    };

    const removeFile = () => {
        setFile(null);
        setUploadProgress(0);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const handleSubmitPrintJob = () => {
        if (!file) return;

        const pricePerPage = colorMode === 'Black & White' ? 2 : 10;

        // Add a generic print job item to cart
        addToCart({
            id: 'print-job-' + Date.now(),
            name: `Print Job: ${file.name} (${colorMode})`,
            price: pricePerPage,
            image_url: 'https://images.unsplash.com/photo-1562564055-71e051d33c19?auto=format&fit=crop&q=80&w=200',
            quantity: parseInt(copies)
        });

        // Redirect to checkout
        navigate('/checkout');
    };

    const handleBookSlot = () => {
        setBookingStatus('booked');
        setTimeout(() => setBookingStatus('idle'), 3000); // Reset after 3 seconds
    };

    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
            <Navbar />

            <div className="container mx-auto px-4 py-12">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-12">
                        <h1 className="text-3xl font-bold text-slate-900 mb-4">Campus Services</h1>
                        <p className="text-slate-600">Book facilities and services instantly from your device.</p>
                    </div>

                    {/* Tabs */}
                    <div className="flex justify-center gap-4 mb-8">
                        <button
                            onClick={() => setActiveTab('print')}
                            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${activeTab === 'print' ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' : 'bg-white text-slate-600 hover:bg-slate-100'}`}
                        >
                            <Printer className="w-5 h-5" /> Print & Photocopy
                        </button>
                        <button
                            onClick={() => setActiveTab('laundry')}
                            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${activeTab === 'laundry' ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' : 'bg-white text-slate-600 hover:bg-slate-100'}`}
                        >
                            <Shirt className="w-5 h-5" /> Laundry
                        </button>
                        <button
                            onClick={() => setActiveTab('food')}
                            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${activeTab === 'food' ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' : 'bg-white text-slate-600 hover:bg-slate-100'}`}
                        >
                            <Coffee className="w-5 h-5" /> Food Ordering
                        </button>
                    </div>

                    {/* Content Area */}
                    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 min-h-[400px]">
                        {activeTab === 'print' && (
                            <div className="max-w-lg mx-auto space-y-6">
                                {!file ? (
                                    <div
                                        className={`border-2 border-dashed rounded-xl p-12 text-center transition-all cursor-pointer ${dragActive ? 'border-blue-500 bg-blue-50 scale-105' : 'border-slate-200 hover:border-blue-400 hover:bg-slate-50'}`}
                                        onDragEnter={handleDrag}
                                        onDragLeave={handleDrag}
                                        onDragOver={handleDrag}
                                        onDrop={handleDrop}
                                        onClick={() => fileInputRef.current.click()}
                                    >
                                        <input
                                            ref={fileInputRef}
                                            type="file"
                                            className="hidden"
                                            onChange={handleChange}
                                            accept=".pdf,.doc,.docx,.jpg,.png"
                                        />
                                        <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 pointer-events-none">
                                            <Upload className="w-8 h-8" />
                                        </div>
                                        <h3 className="text-lg font-bold text-slate-900 mb-2 pointer-events-none">Upload Document</h3>
                                        <p className="text-slate-500 text-sm pointer-events-none">Drag & drop PDF, DOCX files here or click to browse</p>
                                    </div>
                                ) : (
                                    <div className="border border-slate-200 rounded-xl p-6 bg-slate-50">
                                        <div className="flex items-center justify-between mb-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center">
                                                    <FileText className="w-5 h-5" />
                                                </div>
                                                <div>
                                                    <p className="font-semibold text-slate-900 line-clamp-1">{file.name}</p>
                                                    <p className="text-xs text-slate-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                                                </div>
                                            </div>
                                            <button onClick={removeFile} className="text-slate-400 hover:text-red-500 transition-colors">
                                                <X className="w-5 h-5" />
                                            </button>
                                        </div>

                                        {/* Progress Bar */}
                                        <div className="space-y-1">
                                            <div className="flex justify-between text-xs font-medium">
                                                <span className={uploadProgress === 100 ? 'text-green-600' : 'text-blue-600'}>
                                                    {uploadProgress === 100 ? 'Upload Complete' : 'Uploading...'}
                                                </span>
                                                <span className="text-slate-500">{uploadProgress}%</span>
                                            </div>
                                            <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                                                <div
                                                    className={`h-full transition-all duration-300 ${uploadProgress === 100 ? 'bg-green-500' : 'bg-blue-500'}`}
                                                    style={{ width: `${uploadProgress}%` }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )}

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-slate-700">Copies</label>
                                        <input
                                            type="number"
                                            value={copies}
                                            onChange={(e) => setCopies(e.target.value)}
                                            min="1"
                                            className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 outline-none"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-slate-700">Color Mode</label>
                                        <select
                                            value={colorMode}
                                            onChange={(e) => setColorMode(e.target.value)}
                                            className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 outline-none"
                                        >
                                            <option>Black & White</option>
                                            <option>Color</option>
                                        </select>
                                    </div>
                                </div>

                                <button
                                    onClick={handleSubmitPrintJob}
                                    disabled={!file || uploadProgress < 100}
                                    className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3.5 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                >
                                    {uploadProgress === 100 ? (
                                        <>Submit Print Job <CheckCircle2 className="w-5 h-5" /></>
                                    ) : (
                                        'Upload File to Continue'
                                    )}
                                </button>
                            </div>
                        )}

                        {activeTab === 'laundry' && (
                            <div className="max-w-lg mx-auto space-y-6">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-slate-700">Date</label>
                                        <div className="relative">
                                            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                            <select
                                                value={laundryDate}
                                                onChange={(e) => setLaundryDate(e.target.value)}
                                                className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-10 pr-4 py-2.5 focus:ring-2 focus:ring-blue-500 outline-none"
                                            >
                                                {next7Days.map((day) => (
                                                    <option key={day} value={day}>{day}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-slate-700">Time Slot</label>
                                        <div className="relative">
                                            <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                            <select
                                                value={laundryTime}
                                                onChange={(e) => setLaundryTime(e.target.value)}
                                                className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-10 pr-4 py-2.5 focus:ring-2 focus:ring-blue-500 outline-none"
                                            >
                                                <option>09:00 AM - 10:00 AM</option>
                                                <option>10:00 AM - 11:00 AM</option>
                                                <option>11:00 AM - 12:00 PM</option>
                                                <option>12:00 PM - 01:00 PM</option>
                                                <option>01:00 PM - 02:00 PM</option>
                                                <option>02:00 PM - 03:00 PM</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <button
                                    onClick={handleBookSlot}
                                    disabled={bookingStatus === 'booked'}
                                    className={`w-full font-bold py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 ${bookingStatus === 'booked'
                                            ? 'bg-green-600 text-white'
                                            : 'bg-slate-900 hover:bg-slate-800 text-white'
                                        }`}
                                >
                                    {bookingStatus === 'booked' ? (
                                        <>Slot Booked Successfully <CheckCircle2 className="w-5 h-5" /></>
                                    ) : (
                                        'Book Slot'
                                    )}
                                </button>
                            </div>
                        )}

                        {activeTab === 'food' && (
                            <>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {canteens.map((canteen) => (
                                        <div key={canteen.id} className="border border-slate-200 rounded-xl p-4 hover:shadow-md transition-all cursor-pointer bg-white">
                                            <div className="h-48 bg-slate-100 rounded-lg mb-4 overflow-hidden">
                                                <img src={canteen.image} alt={canteen.name} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                                            </div>
                                            <div className="flex justify-between items-start mb-2">
                                                <div>
                                                    <h3 className="font-bold text-slate-900 text-lg">{canteen.name}</h3>
                                                    <div className="flex flex-col gap-1 mt-1">
                                                        <div className="flex items-center gap-1 text-slate-500 text-sm">
                                                            <MapPin className="w-4 h-4" /> {canteen.location}
                                                        </div>
                                                        <div className="flex items-center gap-1 text-slate-500 text-sm">
                                                            <Phone className="w-4 h-4" /> {canteen.contact}
                                                        </div>
                                                    </div>
                                                </div>
                                                <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded-md">{canteen.status}</span>
                                            </div>
                                            <button
                                                onClick={() => setSelectedCanteen(canteen)}
                                                className="w-full mt-4 py-2.5 bg-blue-50 text-blue-600 font-bold rounded-lg hover:bg-blue-100 transition-colors text-sm flex items-center justify-center gap-1"
                                            >
                                                View Menu <ChevronRight className="w-4 h-4" />
                                            </button>
                                        </div>
                                    ))}
                                </div>

                                {/* Menu Modal */}
                                {selectedCanteen && (
                                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setSelectedCanteen(null)}>
                                        <div className="bg-white rounded-2xl w-full max-w-md overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-200" onClick={e => e.stopPropagation()}>
                                            <div className="relative h-40">
                                                <img src={selectedCanteen.image} alt={selectedCanteen.name} className="w-full h-full object-cover" />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6">
                                                    <div>
                                                        <h2 className="text-white text-2xl font-bold">{selectedCanteen.name}</h2>
                                                        <p className="text-white/80 text-sm flex items-center gap-1"><Phone className="w-3 h-3" /> {selectedCanteen.contact}</p>
                                                    </div>
                                                </div>
                                                <button
                                                    onClick={() => setSelectedCanteen(null)}
                                                    className="absolute top-4 right-4 bg-white/20 hover:bg-white/40 text-white p-2 rounded-full backdrop-blur-sm transition-colors"
                                                >
                                                    <X className="w-5 h-5" />
                                                </button>
                                            </div>
                                            <div className="p-6 max-h-[60vh] overflow-y-auto">
                                                <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4">Menu Items</h3>
                                                <div className="space-y-4">
                                                    {selectedCanteen.menu.map((item, index) => (
                                                        <div key={index} className="flex justify-between items-center border-b border-slate-100 pb-3 last:border-0 last:pb-0">
                                                            <span className="font-medium text-slate-900">{item.name}</span>
                                                            <span className="font-bold text-blue-600">₹{item.price}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                            <div className="p-4 bg-slate-50 border-t border-slate-100">
                                                <button
                                                    onClick={() => setSelectedCanteen(null)}
                                                    className="w-full py-3 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-colors"
                                                >
                                                    Close Menu
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default Services;
