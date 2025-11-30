import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { Footer } from '../components/ServicesAndFooter';
import { useCart } from '../context/CartContext';
import { CheckCircle2, CreditCard, Banknote, Smartphone, ArrowRight, ArrowLeft, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';
import api from '@/lib/api';

const Checkout = () => {
    const { cartItems, cartTotal, clearCart } = useCart();
    const [step, setStep] = useState('SHIPPING'); // SHIPPING, PAYMENT, NETBANKING_AUTH, SUCCESS
    const [loading, setLoading] = useState(false);

    // State for Shipping Data
    const [shippingData, setShippingData] = useState({
        firstName: '', lastName: '', hostel: 'Block A (Boys)', room: '', phone: ''
    });

    // State for Payment
    const [paymentMethod, setPaymentMethod] = useState('UPI'); // UPI, NETBANKING, COD
    const [paymentDetails, setPaymentDetails] = useState({ upiId: '', bank: '', customerId: '', password: '' });

    const handleShippingSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        setShippingData({
            firstName: formData.get('firstName'),
            lastName: formData.get('lastName'),
            hostel: formData.get('hostel'),
            room: formData.get('room'),
            phone: formData.get('phone')
        });
        setStep('PAYMENT');
    };

    const handlePaymentSubmit = async (e) => {
        e.preventDefault();

        if (paymentMethod === 'NETBANKING' && step !== 'NETBANKING_AUTH') {
            setStep('NETBANKING_AUTH');
            return;
        }

        setLoading(true);

        // Simulate payment processing delay
        await new Promise(resolve => setTimeout(resolve, 1500));

        const shippingAddress = `${shippingData.hostel}, Room ${shippingData.room}, ${shippingData.firstName} ${shippingData.lastName}, Ph: ${shippingData.phone}`;

        try {
            const payload = {
                items: cartItems.map(item => ({
                    product_id: item.id,
                    quantity: item.quantity
                })),
                shipping_address: shippingAddress
            };
            console.log('Sending order payload:', payload);

            await api.post('/store/orders', payload);
            setStep('SUCCESS');
            clearCart();
        } catch (error) {
            console.error('Order failed:', error);
            const errorMessage = error.response?.data?.detail || error.message || 'Failed to place order';
            alert(`Order Failed: ${errorMessage}`);
        } finally {
            setLoading(false);
        }
    };

    if (step === 'SUCCESS') {
        return (
            <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
                <Navbar />
                <div className="container mx-auto px-4 py-16 flex justify-center">
                    <div className="bg-white p-12 rounded-2xl shadow-sm border border-slate-200 text-center max-w-lg">
                        <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                            <CheckCircle2 className="w-10 h-10" />
                        </div>
                        <h1 className="text-3xl font-bold text-slate-900 mb-4">Order Placed!</h1>
                        <p className="text-slate-600 mb-8">Thank you for your order. We'll deliver it to your hostel room within 24 hours.</p>
                        <Link to="/" className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-xl transition-colors">
                            Back to Home
                        </Link>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
            <Navbar />

            <div className="container mx-auto px-4 py-12">
                <h1 className="text-3xl font-bold text-slate-900 mb-8">Checkout</h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2">
                        {/* Steps Indicator */}
                        <div className="flex items-center gap-4 mb-8 text-sm font-medium">
                            <div className={`flex items-center gap-2 ${step === 'SHIPPING' ? 'text-blue-600' : 'text-green-600'}`}>
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step === 'SHIPPING' ? 'bg-blue-100' : 'bg-green-100'}`}>1</div>
                                Shipping
                            </div>
                            <div className="w-12 h-0.5 bg-slate-200"></div>
                            <div className={`flex items-center gap-2 ${['PAYMENT', 'NETBANKING_AUTH'].includes(step) ? 'text-blue-600' : 'text-slate-400'}`}>
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${['PAYMENT', 'NETBANKING_AUTH'].includes(step) ? 'bg-blue-100 text-blue-600' : 'bg-slate-100'}`}>2</div>
                                Payment
                            </div>
                        </div>

                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
                            {step === 'SHIPPING' ? (
                                <>
                                    <h2 className="text-xl font-bold text-slate-900 mb-6">Shipping Details</h2>
                                    <form id="shipping-form" onSubmit={handleShippingSubmit} className="space-y-6">
                                        <div className="grid grid-cols-2 gap-6">
                                            <div>
                                                <label className="block text-sm font-medium text-slate-700 mb-1">First Name</label>
                                                <input name="firstName" defaultValue={shippingData.firstName} type="text" className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 outline-none" required />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-slate-700 mb-1">Last Name</label>
                                                <input name="lastName" defaultValue={shippingData.lastName} type="text" className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 outline-none" required />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-1">Hostel / Block</label>
                                            <select name="hostel" defaultValue={shippingData.hostel} className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 outline-none">
                                                <option>Block A (Boys)</option>
                                                <option>Block B (Boys)</option>
                                                <option>Block C (Girls)</option>
                                                <option>Block D (Girls)</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-1">Room Number</label>
                                            <input name="room" defaultValue={shippingData.room} type="text" className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 outline-none" required />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-1">Phone Number</label>
                                            <input name="phone" defaultValue={shippingData.phone} type="tel" className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 outline-none" required />
                                        </div>
                                    </form>
                                </>
                            ) : step === 'NETBANKING_AUTH' ? (
                                <>
                                    <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                                        <Lock className="w-5 h-5 text-slate-500" />
                                        Login to {paymentDetails.bank}
                                    </h2>
                                    <form id="netbanking-auth-form" onSubmit={handlePaymentSubmit} className="space-y-6">
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-1">Customer ID / User ID</label>
                                            <input
                                                type="text"
                                                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 outline-none"
                                                required
                                                value={paymentDetails.customerId}
                                                onChange={(e) => setPaymentDetails({ ...paymentDetails, customerId: e.target.value })}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
                                            <input
                                                type="password"
                                                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 outline-none"
                                                required
                                                value={paymentDetails.password}
                                                onChange={(e) => setPaymentDetails({ ...paymentDetails, password: e.target.value })}
                                            />
                                        </div>
                                        <div className="bg-blue-50 text-blue-800 p-4 rounded-lg text-sm">
                                            <p>This is a secure mock transaction. No real money will be deducted.</p>
                                        </div>
                                    </form>
                                </>
                            ) : (
                                <>
                                    <h2 className="text-xl font-bold text-slate-900 mb-6">Payment Method</h2>
                                    <form id="payment-form" onSubmit={handlePaymentSubmit} className="space-y-6">
                                        {/* Payment Options */}
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                            <label className={`cursor-pointer border rounded-xl p-4 flex flex-col items-center gap-3 transition-all ${paymentMethod === 'UPI' ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-slate-200 hover:border-slate-300'}`}>
                                                <input type="radio" name="payment" value="UPI" checked={paymentMethod === 'UPI'} onChange={(e) => setPaymentMethod(e.target.value)} className="hidden" />
                                                <Smartphone className="w-8 h-8" />
                                                <span className="font-semibold">UPI</span>
                                            </label>
                                            <label className={`cursor-pointer border rounded-xl p-4 flex flex-col items-center gap-3 transition-all ${paymentMethod === 'NETBANKING' ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-slate-200 hover:border-slate-300'}`}>
                                                <input type="radio" name="payment" value="NETBANKING" checked={paymentMethod === 'NETBANKING'} onChange={(e) => setPaymentMethod(e.target.value)} className="hidden" />
                                                <CreditCard className="w-8 h-8" />
                                                <span className="font-semibold">Netbanking</span>
                                            </label>
                                            <label className={`cursor-pointer border rounded-xl p-4 flex flex-col items-center gap-3 transition-all ${paymentMethod === 'COD' ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-slate-200 hover:border-slate-300'}`}>
                                                <input type="radio" name="payment" value="COD" checked={paymentMethod === 'COD'} onChange={(e) => setPaymentMethod(e.target.value)} className="hidden" />
                                                <Banknote className="w-8 h-8" />
                                                <span className="font-semibold">Cash on Delivery</span>
                                            </label>
                                        </div>

                                        {/* Dynamic Fields */}
                                        <div className="pt-4 border-t border-slate-100">
                                            {paymentMethod === 'UPI' && (
                                                <div>
                                                    <label className="block text-sm font-medium text-slate-700 mb-1">UPI ID</label>
                                                    <input
                                                        type="text"
                                                        placeholder="username@upi"
                                                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 outline-none"
                                                        required
                                                        value={paymentDetails.upiId}
                                                        onChange={(e) => setPaymentDetails({ ...paymentDetails, upiId: e.target.value })}
                                                    />
                                                    <p className="text-xs text-slate-500 mt-2">Enter your VPA to receive a payment request.</p>
                                                </div>
                                            )}
                                            {paymentMethod === 'NETBANKING' && (
                                                <div>
                                                    <label className="block text-sm font-medium text-slate-700 mb-1">Select Bank</label>
                                                    <select
                                                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 outline-none"
                                                        required
                                                        value={paymentDetails.bank}
                                                        onChange={(e) => setPaymentDetails({ ...paymentDetails, bank: e.target.value })}
                                                    >
                                                        <option value="">Choose a bank...</option>
                                                        <option value="HDFC">HDFC Bank</option>
                                                        <option value="SBI">State Bank of India</option>
                                                        <option value="ICICI">ICICI Bank</option>
                                                        <option value="AXIS">Axis Bank</option>
                                                    </select>
                                                </div>
                                            )}
                                            {paymentMethod === 'COD' && (
                                                <div className="bg-yellow-50 text-yellow-800 p-4 rounded-lg text-sm">
                                                    You can pay via Cash or UPI when the order is delivered to your room.
                                                </div>
                                            )}
                                        </div>
                                    </form>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-1">
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 sticky top-24">
                            <h2 className="text-xl font-bold text-slate-900 mb-6">Order Summary</h2>
                            <div className="space-y-4 mb-6">
                                {cartItems.map(item => (
                                    <div key={item.id} className="flex justify-between text-sm">
                                        <span className="text-slate-600">{item.name} x {item.quantity}</span>
                                        <span className="font-medium text-slate-900">₹{item.price * item.quantity}</span>
                                    </div>
                                ))}
                            </div>
                            <div className="border-t border-slate-100 pt-4 flex justify-between items-center mb-6">
                                <span className="font-bold text-slate-900">Total</span>
                                <span className="text-2xl font-bold text-blue-600">₹{cartTotal}</span>
                            </div>

                            {step === 'SHIPPING' ? (
                                <button
                                    type="submit"
                                    form="shipping-form"
                                    className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-4 rounded-xl transition-colors flex items-center justify-center gap-2"
                                >
                                    Continue to Payment <ArrowRight className="w-5 h-5" />
                                </button>
                            ) : step === 'NETBANKING_AUTH' ? (
                                <div className="space-y-3">
                                    <button
                                        type="submit"
                                        form="netbanking-auth-form"
                                        disabled={loading}
                                        className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                    >
                                        {loading ? 'Processing...' : 'Secure Pay'}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setStep('PAYMENT')}
                                        disabled={loading}
                                        className="w-full bg-white border border-slate-200 text-slate-600 font-bold py-3 rounded-xl hover:bg-slate-50 transition-colors flex items-center justify-center gap-2"
                                    >
                                        <ArrowLeft className="w-4 h-4" /> Back to Method
                                    </button>
                                </div>
                            ) : (
                                <div className="space-y-3">
                                    <button
                                        type="submit"
                                        form="payment-form"
                                        disabled={loading}
                                        className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                    >
                                        {loading ? 'Processing...' : (paymentMethod === 'NETBANKING' ? 'Proceed to Login' : 'Pay & Place Order')}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setStep('SHIPPING')}
                                        disabled={loading}
                                        className="w-full bg-white border border-slate-200 text-slate-600 font-bold py-3 rounded-xl hover:bg-slate-50 transition-colors flex items-center justify-center gap-2"
                                    >
                                        <ArrowLeft className="w-4 h-4" /> Back to Shipping
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default Checkout;
