import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const NewsletterAndDonation = () => {
    const [email, setEmail] = useState('')
    const navigate = useNavigate()

    const handleSubscribe=()=>{
        console.log(email)
        if(!email){
            toast.error("Enter a valid email please")
            return;
        }
        toast.success("🎉 Subscription Successful! Thanks")
        setEmail('')
    }
    const handlePassToDonationCamp=()=>{
        navigate('/donationCampaign')
    }
  return (
    <section className="py-16 bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        {/* Newsletter Section */}
        <motion.div
          className="bg-white dark:bg-white/55 shadow-lg p-8 rounded-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl font-bold mb-4">📩 Join Our Newsletter</h2>
          <p className="text-gray-600 dark:text-gray-200 mb-4">Stay updated on pet adoption, rescue stories, and events. and keep pets safe</p>
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="email"
              onChange={(e)=>setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full p-3 border border-gray-300 dark:border-gray-100 dark:text-black rounded-lg"
            />
            <button onClick={handleSubscribe} className="bg-sky-500 hover:bg-sky-600 text-white px-5 py-3 rounded-lg">
              Subscribe
            </button>
          </div>
        </motion.div>

        {/* Donation Section */}
        <motion.div
          className="bg-white dark:bg-white/55 shadow-lg p-8 rounded-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h2 className="text-3xl font-bold mb-4">❤️ Save a Life, Donate Today!</h2>
          <p className="text-gray-600 dark:text-gray-200 mb-4">Your support helps us provide food, shelter, and medical care to homeless pets.</p>
          <button onClick={handlePassToDonationCamp} className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-3 rounded-lg">
            Donate Now
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default NewsletterAndDonation;