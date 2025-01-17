import React, { useState } from 'react';
import { useForm } from 'react-hook-form'; // Import react-hook-form
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const DonateModal = ({ onClose, campaignId }) => {
    const { register, handleSubmit, formState: { errors }, setValue } = useForm();
    const [amount, setAmount] = useState('');
    const stripe = useStripe();
    const elements = useElements();

    // Handle form submission
    const onSubmit = async (data) => {
        // Send donation data and handle Stripe payment
        const { amount, donorName, donorEmail } = data;

        // You should handle the payment submission here and also integrate the donation with the campaign

        console.log('Form Submitted:', data);
    };

    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center">
            <div className="bg-white p-6 rounded shadow-lg w-96">
                <h2 className="text-lg font-bold mb-4">Enter Donation Amount</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    {/* Donation Amount */}
                    <div className="mb-4">
                        <label htmlFor="amount" className="block text-sm font-semibold mb-2">Amount</label>
                        <input
                            type="number"
                            id="amount"
                            placeholder="Enter amount"
                            value={amount}
                            {...register('amount', { required: 'Amount is required', min: { value: 1, message: 'Amount must be at least $1' } })}
                            onChange={(e) => {
                                setAmount(e.target.value);
                                setValue('amount', e.target.value);  // Update react-hook-form value
                            }}
                            className="border rounded w-full p-2"
                        />
                        {errors.amount && <p className="text-red-500 text-sm">{errors.amount.message}</p>}
                    </div>

                    {/* Donor Name */}
                    <div className="mb-4">
                        <label htmlFor="donorName" className="block text-sm font-semibold mb-2">Your Name</label>
                        <input
                            type="text"
                            id="donorName"
                            placeholder="Enter your name"
                            {...register('donorName', { required: 'Name is required' })}
                            className="border rounded w-full p-2"
                        />
                        {errors.donorName && <p className="text-red-500 text-sm">{errors.donorName.message}</p>}
                    </div>

                    {/* Donor Email */}
                    <div className="mb-4">
                        <label htmlFor="donorEmail" className="block text-sm font-semibold mb-2">Your Email</label>
                        <input
                            type="email"
                            id="donorEmail"
                            placeholder="Enter your email"
                            {...register('donorEmail', { required: 'Email is required' })}
                            className="border rounded w-full p-2"
                        />
                        {errors.donorEmail && <p className="text-red-500 text-sm">{errors.donorEmail.message}</p>}
                    </div>

                    {/* CardElement for Stripe */}
                    <div className="mb-4">
                        <CardElement className="border rounded p-2" />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="bg-primary text-white px-4 py-2 rounded w-full"
                        disabled={!stripe || !amount}
                    >
                        Donate
                    </button>
                </form>

                <button
                    className="text-red-500 mt-4"
                    onClick={onClose}
                >
                    Close
                </button>
            </div>
        </div>
    );
};

export default DonateModal;
