import React from "react";
import { motion } from "framer-motion";

const AboutUs = () => {
  return (
    <div className="dark:bg-gray-900 dark:text-white">
      {/* Hero Section */}
      <div className="relative w-full h-[60vh] flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: "url('https://i.ibb.co/SytQ6Dg/hummingbird-6094424-1280.jpg')" }}>
        <motion.h1
          className="text-4xl md:text-5xl font-bold text-white bg-black bg-opacity-50 px-6 py-3 rounded-lg shadow-lg"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          About Us
        </motion.h1>
      </div>

      {/* Content Section */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Mission */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl font-bold mb-4 text-sky-500">Our Mission</h2>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            We are dedicated to helping abandoned and homeless pets find their forever homes. Our mission is to ensure that every pet gets the love, care, and shelter they deserve.
          </p>
        </motion.div>

        {/* Vision */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl font-bold mb-4 text-sky-500">Our Vision</h2>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            We envision a world where no pet suffers from neglect or abandonment. Through adoption, awareness, and support, we aim to build a compassionate society for animals.
          </p>
        </motion.div>

        {/* Why Choose Us */}
        <motion.div
          className="mb-2"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl font-bold mb-4 text-sky-500">Why Choose Us?</h2>
          <ul className="list-disc ml-6 text-lg text-gray-700 dark:text-gray-300 space-y-2">
            <li>✅ **Ethical and transparent adoption process**</li>
            <li>✅ **Support from expert veterinarians**</li>
            <li>✅ **Wide variety of pets ready for adoption**</li>
            <li>✅ **Community-driven approach**</li>
          </ul>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutUs;
