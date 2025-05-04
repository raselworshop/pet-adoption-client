import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useForm } from "react-hook-form";
import { Button } from "@/components/components/ui/button";
import useAxiosPrivate from "../../../Hooks/useAxiosPrivate";
import ButtonLoading from "@/components/components/ui/ButtonLoading";
import useAuth from "../../../Hooks/useAuth";
import toast from "react-hot-toast";

// Stripe Promise
const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GATEWAY);

const SuccessModal = ({ onClose, onDonateAgain }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
    <div className="bg-white dark:bg-gray-900 p-6 rounded shadow-md w-96 text-center">
      <h2 className="text-2xl font-bold text-green-600 mb-4">
        🎉Donate successfull
      </h2>
      <p className="mb-6 text-gray-700 dark:text-gray-200">
        Thank you for your generous donation! Your support means a lot to us.
      </p>

      <div className="flex justify-center gap-4">
        <Button onClick={onDonateAgain}>DONATE AGAIN</Button>
        <Button
          onClick={onClose}
          className="bg-gray-300 text-black hover:bg-gray-400"
        >
          GO BACK
        </Button>
      </div>
    </div>
  </div>
);

const DonateForm = ({ onClose, campaignId, category }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const { user } = useAuth();
  const axiosPrivate = useAxiosPrivate();
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    const { amount, donorName, donorEmail } = data;

    if (!stripe || !elements) {
      toast.error("Stripe.js has not loaded yet.");
      return;
    }

    const cardElement = elements.getElement(CardElement);
    if (!cardElement) {
      toast.error("Card element not found!");
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (error) {
      toast.error(`Payment error: ${error.message}`);
      setLoading(false);
      return;
    } else {
      toast.success("Payment method created successfully.");
    }

    const payInfo = {
      campaignId,
      amount,
      donorName,
      donorEmail,
      userEmail: user?.email,
    };

    try {
      const { data } = await axiosPrivate.post(
        "/create-payment-intent",
        payInfo
      );
      const { paymentIntent, error: confirmError } =
        await stripe.confirmCardPayment(data.clientSecret, {
          payment_method: {
            card: cardElement,
            billing_details: {
              email: user?.email || donorEmail,
              name: user?.displayName || donorName,
            },
          },
        });

      if (confirmError) {
        toast.error(`Payment confirmation failed: ${confirmError.message}`);
        setLoading(false);
        return;
      }

      if (paymentIntent.status === "succeeded") {
        const updateData = {
          ...payInfo,
          transactionId: paymentIntent.id,
          petCategory: category,
        };

        try {
          const res = await axiosPrivate.post("/update-donation", updateData);
          toast.success(
            `Your donation was successful! TXN ID: ${paymentIntent.id}`
          );
          setShowSuccessModal(true);
          setLoading(false);
        } catch (updateError) {
          toast.error(
            `Failed to update donation record: ${updateError.message}`
          );
          setLoading(false);
        }
      }
    } catch (error) {
      toast.error("Error creating payment intent.");
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-gray-800 bg-opacity-5 flex justify-center items-center">
      <div className="dark:bg-white dark:text-black bg-white p-6 rounded shadow-lg w-96">
        <h2 className="text-lg font-bold my-4">Enter Donation Details</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label
              htmlFor="amount"
              className="block text-sm font-semibold mb-2"
            >
              Amount
            </label>
            <input
              type="number"
              id="amount"
              placeholder="Enter amount"
              value={amount}
              {...register("amount", {
                required: "Amount is required",
                min: { value: 1, message: "Amount must be at least $1" },
                validate: (value) =>
                  value > 0 || "Amount must be a positive number",
              })}
              onChange={(e) => {
                setAmount(e.target.value);
                setValue("amount", e.target.value);
              }}
              className="border rounded w-full p-2 dark:bg-white/5"
            />
            {errors.amount && (
              <p className="text-red-500 text-sm">{errors.amount.message}</p>
            )}
          </div>

          <div className="mb-4">
            <label
              htmlFor="donorName"
              className="block text-sm font-semibold mb-2"
            >
              Your Name
            </label>
            <input
              type="text"
              id="donorName"
              disabled
              defaultValue={user.displayName || "Anonymous"}
              placeholder="Enter your name"
              {...register("donorName", { required: "Name is required" })}
              className="border rounded w-full p-2 dark:bg-white/5"
            />
            {errors.donorName && (
              <p className="text-red-500 text-sm">{errors.donorName.message}</p>
            )}
          </div>

          <div className="mb-4">
            <label
              htmlFor="donorEmail"
              className="block text-sm font-semibold mb-2"
            >
              Your Email
            </label>
            <input
              type="email"
              id="donorEmail"
              disabled
              defaultValue={user.email || "anonymous@mail.com"}
              placeholder="Enter your email"
              {...register("donorEmail", { required: "Email is required" })}
              className="border rounded w-full p-2 dark:bg-white/5"
            />
            {errors.donorEmail && (
              <p className="text-red-500 text-sm">
                {errors.donorEmail.message}
              </p>
            )}
          </div>

          <div className="mb-4">
            <CardElement className="border rounded p-2" />
          </div>

          {loading ? (
            <ButtonLoading />
          ) : (
            <Button
              type="submit"
              className="px-4 rounded w-full"
              disabled={!stripe || !amount || parseFloat(amount) <= 0}
            >
              Donate
            </Button>
          )}
        </form>

        <div className="flex items-center w-full"><Button className="text-red-500" onClick={onClose}>
          Close
        </Button></div>
      </div>
      {showSuccessModal && (
        <SuccessModal
          onClose={onClose}
          onDonateAgain={() => {
            setShowSuccessModal(false);
            setAmount("");
            setValue("amount", "");
          }}
        />
      )}
    </div>
  );
};

const DonateModal = (props) => (
  <Elements stripe={stripePromise}>
    <DonateForm {...props} />
  </Elements>
);

export default DonateModal;
