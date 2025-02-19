import React from "react";
import { motion } from "framer-motion";
import img1 from "../../../assets/welcome/close-up-beautiful-cat-with-little-girl.jpg";
import img2 from "../../../assets/Carousel/womenwithdog.jpg";
import img3 from "../../../assets/welcome/closeup-shot-ginger-cat-itching-itself-with-blurred-backgroun.jpg";
import img4 from "../../../assets/welcome/portrait-adorable-child-with-their-dog-field.jpg";
import img5 from "../../../assets/welcome/view-beautiful-persian-domestic-cat.jpg";
import img6 from "../../../assets/welcome/view-cats-dogs-being-friends.jpg";
import img7 from "../../../assets/welcome/view-cats-dogs-showing-friendship.jpg";

const WelComePage = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Welcome Section */}
      <section className="bg-yellow-100 py-16 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          {/* Left Inspirational Text */}
          <motion.div
            className="text-gray-700 text-lg font-medium text-left"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p>🐾 "Every pet deserves a home filled with love and care!"</p>
            <p className="mt-4">
              🐶 "Adopting a pet means gaining a lifelong friend!"
            </p>
          </motion.div>

          {/* Center Image */}
          <motion.img
            src={img1}
            alt="Happy Pets"
            className="w-full max-w-xl mx-auto rounded-lg shadow-lg"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
          />

          {/* Right Inspirational Text */}
          <motion.div
            className="text-gray-700 text-lg font-medium text-right"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p>🐱 "Give love, get love—adopt a pet today!"</p>
            <p className="mt-4">
              🐾 "A small act of kindness can change a pet’s world!"
            </p>
          </motion.div>
        </div>
      </section>

      {/* Why Adopt Section */}
      <motion.section
        className="py-16 bg-white grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { staggerChildren: 0.3 },
          },
        }}
      >
        {[
          {
            img: img2,
            title: "Save Lives",
            text: "Every adoption saves a life and gives a pet a loving home.",
          },
          {
            img: img3,
            title: "Unconditional Love",
            text: "Adopted pets bring joy and loyalty to their families.",
          },
          {
            img: img4,
            title: "Make a Difference",
            text: "Help reduce the number of pets in shelters.",
          },
        ].map((item, index) => (
          <motion.div
            key={index}
            className="text-center p-4 bg-gray-100 rounded-lg shadow-md"
            variants={{
              hidden: { opacity: 0, y: 50 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <img
              src={item.img}
              alt={item.title}
              className="mx-auto rounded-lg shadow-md"
            />
            <h3 className="text-xl font-semibold mt-4">{item.title}</h3>
            <p className="text-gray-600 mt-2">{item.text}</p>
          </motion.div>
        ))}
      </motion.section>

      {/* Success Stories Section */}
      <section className="bg-blue-50 py-16 text-center">
        <h2 className="text-3xl font-bold text-gray-800">
          Heartwarming Success Stories
        </h2>
        <p className="text-gray-600 mt-4">
          Hear from families who found their perfect pet match.
        </p>
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-8 max-w-6xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.3 },
            },
          }}
        >
          {[
            {
              img: img5,
              title: "Buddy's Journey",
              text: "Buddy found his forever home and now enjoys long hikes.",
            },
            {
              img: img6,
              title: "Luna's New Life",
              text: "Luna was adopted by a loving couple who adore her.",
            },
            {
              img: img7,
              title: "Max's Big Adventure",
              text: "Max is now the star of his household and loves being pampered.",
            },
          ].map((story, index) => (
            <motion.div
              key={index}
              className="bg-white p-4 rounded-lg shadow-md"
              variants={{
                hidden: { opacity: 0, y: 50 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <figure className="w-full aspect-[16/9] overflow-hidden rounded-lg">
                <img
                  src={story.img}
                  alt={story.title}
                  className="w-full h-full object-cover"
                />
              </figure>

              <h3 className="text-lg font-semibold mt-4">{story.title}</h3>
              <p className="text-gray-600 mt-2">{story.text}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>
    </div>
  );
};

export default WelComePage;
