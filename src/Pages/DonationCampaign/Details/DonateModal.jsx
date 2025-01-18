import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/components/ui/button';
import useAxiosPrivate from '../../../Hooks/useAxiosPrivate';
import ButtonLoading from '@/components/components/ui/ButtonLoading';
import useAuth from '../../../Hooks/useAuth';
import toast from 'react-hot-toast';

// Stripe Promise
const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GATEWAY);
console.log('stripe promise key:', import.meta.env.VITE_PAYMENT_GATEWAY)

const DonateForm = ({ onClose, campaignId }) => {
    const { register, handleSubmit, formState: { errors }, setValue } = useForm();
    const [amount, setAmount] = useState('');
    const [loading, setLoading] = useState(false);
    const stripe = useStripe();
    const elements = useElements();
    const { user } = useAuth()
    const axiosPrivate = useAxiosPrivate()

    const onSubmit = async (data) => {
        setLoading(true)
        const { amount, donorName, donorEmail } = data;

        if (!stripe || !elements) {
            console.error("Stripe.js has not loaded yet.");
            return;
        }

        const cardElement = elements.getElement(CardElement);
        if (cardElement === null) {
            return
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: "card",
            card: cardElement
        })

        if (error) {
            console.log('payment error', error)
        } else {
            console.log('payment method', paymentMethod)
        }

        const payInfo = {
            campaignId, amount, donorName, donorEmail, userEmail: user?.email
        }
        console.table(payInfo)

        try {
            const { data } = await axiosPrivate.post('/create-payment-intent', payInfo)
            console.log("client secret: ", data)

            // confirm payment 
            const { paymentIntent, error } = await stripe.confirmCardPayment(data.clientSecret, {
                payment_method: {
                    card: cardElement,
                    billing_details: {
                        email: user?.email || donorEmail,
                        name: user?.displayName || donorName
                    }
                }
            })
            if (error) {
                console.log("from payment intent", error)
                toast.error(error.message)
            }
            console.log("payment intent success", paymentIntent)
            if (paymentIntent.status === "succeeded") {
                const updateData = {
                    ...payInfo,
                    transactionId: paymentIntent.id
                }
                try {
                    const res = await axiosPrivate.post('/update-donation', updateData)
                    console.log('backend updated res: ', res.data)
                    toast.success(`your donation has been successfull! 
                        TSX: ${paymentIntent.id}
                        `)
                } catch (error) {
                    console.error("Error updating transaction in backend:", updateError);
                    toast.error("Failed to update donation record.");
                }
            }
            setLoading(false)
        } catch (error) {
            setLoading(false)
            console.error('Payment Intent creation failed:', error)
        }

    };

    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center">
            <div className="dark:bg-white/60 bg-white p-6 rounded shadow-lg w-96">
                <h2 className="text-lg font-bold mb-4">Enter Donation Amount</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-4">
                        <label htmlFor="amount" className="block text-sm font-semibold mb-2">Amount</label>
                        <input
                            type="number"
                            id="amount"
                            placeholder="Enter amount"
                            value={amount}
                            {...register('amount', { required: 'Amount is required', min: { value: 1, message: 'Amount must be at least $1' }, validate: value => value > 0 || 'Amount must be a positive number' })}
                            onChange={(e) => {
                                setAmount(e.target.value);
                                setValue('amount', e.target.value);
                            }}
                            className="border rounded w-full p-2 dark:bg-white/5"
                        />
                        {errors.amount && <p className="text-red-500 text-sm">{errors.amount.message}</p>}
                    </div>

                    <div className="mb-4">
                        <label htmlFor="donorName" className="block text-sm font-semibold mb-2">Your Name</label>
                        <input
                            type="text"
                            id="donorName"
                            placeholder="Enter your name"
                            {...register('donorName', { required: 'Name is required' })}
                            className="border rounded w-full p-2 dark:bg-white/5"
                        />
                        {errors.donorName && <p className="text-red-500 text-sm">{errors.donorName.message}</p>}
                    </div>

                    <div className="mb-4">
                        <label htmlFor="donorEmail" className="block text-sm font-semibold mb-2">Your Email</label>
                        <input
                            type="email"
                            id="donorEmail"
                            placeholder="Enter your email"
                            {...register('donorEmail', { required: 'Email is required' })}
                            className="border rounded w-full p-2 dark:bg-white/5"
                        />
                        {errors.donorEmail && <p className="text-red-500 text-sm">{errors.donorEmail.message}</p>}
                    </div>

                    <div className="mb-4">
                        <CardElement className="border rounded p-2" />
                    </div>

                    {loading ? <ButtonLoading /> : <Button
                        type="submit"
                        className=" px-4 py-2 rounded w-full"
                        disabled={!stripe || !amount || parseFloat(amount) <= 0}
                    >
                        Donate
                    </Button>}
                </form>

                {loading && <Button
                    className="text-red-500 mt-4"
                    onClick={onClose}
                >
                    Close
                </Button>}
            </div>
        </div>
    );
};

const DonateModal = (props) => (
    <Elements stripe={stripePromise}>
        <DonateForm {...props} />
    </Elements>
);

export default DonateModal;
