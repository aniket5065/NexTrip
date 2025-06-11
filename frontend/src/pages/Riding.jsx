import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useContext } from 'react'
import { SocketContext } from '../context/SocketContext'
import { useNavigate } from 'react-router-dom'
import LiveTracking from '../components/LiveTracking'
import axios from 'axios'

const Riding = () => {
    const location = useLocation()
    const { ride } = location.state || {}
    const { socket } = useContext(SocketContext)
    const navigate = useNavigate()
    const [showFeedbackForm, setShowFeedbackForm] = useState(false)
    const [feedback, setFeedback] = useState('')
    const [rating, setRating] = useState(0)

    socket.on("ride-ended", () => {
        navigate('/home')
    })

    const handlePayment = async () => {
        try {
            if (!window.Razorpay) {
                alert('Razorpay SDK not loaded. Please check your internet connection.');
                return;
            }

            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/payments/create-order`, {
                amount: ride?.fare
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });

            const { id: order_id, amount, currency } = response.data;

            const options = {
                key: import.meta.env.VITE_RAZORPAY_KEY_ID,
                amount,
                currency,
                name: 'NexTrip',
                description: 'Ride Payment',
                order_id,
                handler: async (response) => {
                    console.log('Payment Success:', response);
                    alert('Payment Successful!');
                    setShowFeedbackForm(true); // Show feedback form after payment
                },
                prefill: {
                    name: ride?.user?.fullname?.firstname,
                    email: ride?.user?.email,
                },
                theme: {
                    color: '#3399cc'
                }
            };

            const razorpay = new window.Razorpay(options);
            razorpay.open();
        } catch (err) {
            console.error('Payment Error:', err);
            alert('Payment Failed!');
        }
    };

    const submitFeedback = async () => {
        try {
            await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/feedback`, {
                rideId: ride._id,
                feedback,
                rating
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            alert('Feedback submitted successfully!');
            navigate('/home');
        } catch (err) {
            console.error('Feedback Error:', err);
            alert('Failed to submit feedback!');
        }
    };

    return (
        <div className='h-screen'>
            <Link to='/home' className='fixed right-2 top-2 h-10 w-10 bg-white flex items-center justify-center rounded-full'>
                <i className="text-lg font-medium ri-home-5-line"></i>
            </Link>
            <div className='h-1/2'>
                <LiveTracking />
            </div>
            <div className='h-1/2 p-4'>
                {!showFeedbackForm ? (
                    <>
                        <div className='flex items-center justify-between'>
                            <img className='h-12' src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjh4mBSyhx84yY3fSUSCZaKolesHOd3GUHfgzuXsO2ftgeIIez6QW4gu1x_UY6CPNccJD2pj3XEFND9Nc3-K6epdPMjm11Mughs60ALI1rVJb40v5RnK5auxjMxIlUiaLqGg3_SkW-5_EAJcI2_1eW8vLCT3lLEhss5apWno8QXG2g_g1QHk6A8s33eD9c/s1024/ChatGPT%20Image%20May%2024,%202025,%2004_52_30%20PM.png" alt="" />
                            <div className='text-right'>
                                <h2 className='text-lg font-medium capitalize'>{ride?.captain.fullname.firstname}</h2>
                                <h4 className='text-xl font-semibold -mt-1 -mb-1'>{ride?.captain.vehicle.plate}</h4>
                                <p className='text-sm text-gray-600'>Maruti Suzuki Alto</p>
                            </div>
                        </div>
                        <button
                            onClick={handlePayment}
                            className='w-full mt-5 bg-green-600 text-white font-semibold p-2 rounded-lg'
                        >
                            Make a Payment
                        </button>
                    </>
                ) : (
                    <div>
                        <h3 className='text-2xl font-semibold mb-5'>Rate Your Ride</h3>
                        <textarea
                            className='w-full p-3 border rounded-lg'
                            placeholder='Write your feedback here...'
                            value={feedback}
                            onChange={(e) => setFeedback(e.target.value)}
                        ></textarea>
                        <div className='mt-3'>
                            <label className='block mb-2'>Rate the Captain:</label>
                            <input
                                type='number'
                                className='w-full p-2 border rounded-lg'
                                placeholder='Rating (1-5)'
                                value={rating}
                                onChange={(e) => setRating(e.target.value)}
                                min='1'
                                max='5'
                            />
                        </div>
                        <button
                            onClick={submitFeedback}
                            className='w-full mt-5 bg-blue-600 text-white font-semibold p-2 rounded-lg'
                        >
                            Submit Feedback
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Riding;