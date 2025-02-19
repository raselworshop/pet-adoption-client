import React from "react";
import { motion } from "framer-motion";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";
import icon from "../../../assets/pet-adoption.webp";

const Footer = () => {
  return (
    <motion.footer 
      className="bg-gray-900 text-white min-w-full py-12 flex flex-col items-center"
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="container mx-auto px-6 flex flex-col items-center text-center space-y-6">
        
        {/* Logo & About Section */}
        <motion.div 
          className="flex flex-col items-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <img className="w-20 mb-3" src={icon} alt="Pet Adoption Logo" />
          <h2 className="text-2xl font-bold">Pet Adoption</h2>
          <p className="text-sm text-gray-400 mt-1">Connecting pets with loving homes</p>
        </motion.div>

        {/* Quick Links Section */}
        <motion.div 
          className="flex flex-wrap justify-center space-x-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <a href="/about" className="hover:text-sky-400 transition duration-300">About Us</a>
          <a href="/contact" className="hover:text-sky-400 transition duration-300">Contact</a>
          <a href="/privacy" className="hover:text-sky-400 transition duration-300">Privacy Policy</a>
        </motion.div>

        {/* Social Media Section */}
        <motion.div 
          className="flex space-x-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          <a href="#" className="text-2xl hover:text-sky-400 transition duration-300"><FaFacebookF /></a>
          <a href="#" className="text-2xl hover:text-sky-400 transition duration-300"><FaTwitter /></a>
          <a href="#" className="text-2xl hover:text-sky-400 transition duration-300"><FaInstagram /></a>
        </motion.div>
      </div>

      {/* Copyright Section */}
      <motion.div 
        className="text-center text-gray-500 text-sm mt-8 w-full border-t border-gray-700 pt-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
      >
        &copy; {new Date().getFullYear()} Pet Adoption. All rights reserved.
      </motion.div>
    </motion.footer>
  );
};

export default Footer;
