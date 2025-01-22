import React from "react";
import img1 from '../../../assets/welcome/close-up-beautiful-cat-with-little-girl.jpg'
import img2 from '../../../assets/Carousel/womenwithdog.jpg'
import img3 from '../../../assets/welcome/closeup-shot-ginger-cat-itching-itself-with-blurred-backgroun.jpg'
import img4 from '../../../assets/welcome/portrait-adorable-child-with-their-dog-field.jpg'
import img5 from '../../../assets/welcome/view-beautiful-persian-domestic-cat.jpg'
import img6 from '../../../assets/welcome/view-cats-dogs-being-friends.jpg'
import img7 from '../../../assets/welcome/view-cats-dogs-showing-friendship.jpg'
import img8 from '../../../assets/welcome/young-caucasian-blonde-woman-with-casual-clothes-is-contact-with-cat-while-sitting-couch-pet-concept.jpg'

const WelComePage = () => {
  return (
    <div className="bg-gray-50">
      {/* Welcome Section */}
      <section className="bg-yellow-100 py-16">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-gray-800">
            Welcome to Pet Haven!
          </h1>
          <p className="text-lg text-gray-600 mt-4">
            Your trusted platform for finding a loving home for every pet.
          </p>
          <img
            src={img1}
            alt="Happy Pets"
            className="mx-auto mt-8 rounded-lg shadow-lg"
          />
        </div>
      </section>

      {/* Why Adopt Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <img
              src={img2}
              alt="Save Lives"
              className="mx-auto rounded-lg shadow-md"
            />
            <h3 className="text-xl font-semibold mt-4">Save Lives</h3>
            <p className="text-gray-600 mt-2">
              Every adoption saves a life and gives a pet a loving home.
            </p>
          </div>
          <div className="text-center">
            <img
              src={img3}
              alt="Companionship"
              className="mx-auto rounded-lg shadow-md"
            />
            <h3 className="text-xl font-semibold mt-4">Unconditional Love</h3>
            <p className="text-gray-600 mt-2">
              Adopted pets bring joy and loyalty to their families.
            </p>
          </div>
          <div className="text-center">
            <img
              src={img4}
              alt="Make a Difference"
              className="mx-auto rounded-lg shadow-md"
            />
            <h3 className="text-xl font-semibold mt-4">Make a Difference</h3>
            <p className="text-gray-600 mt-2">
              Help reduce the number of pets in shelters.
            </p>
          </div>
        </div>
      </section>

      {/* Success Stories Section */}
      <section className="bg-blue-50 py-16">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-800">
            Heartwarming Success Stories
          </h2>
          <p className="text-gray-600 mt-4">
            Hear from families who found their perfect pet match.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
            <div className="bg-white p-4 rounded-lg shadow-md">
              <img
                src={img5}
                alt="Story 1"
                className="rounded-lg w-full"
              />
              <h3 className="text-lg font-semibold mt-4">Buddy's Journey</h3>
              <p className="text-gray-600 mt-2">
                Buddy found his forever home and now enjoys long hikes with his
                new family.
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md">
              <img
                src={img6}
                alt="Story 2"
                className="rounded-lg w-full"
              />
              <h3 className="text-lg font-semibold mt-4">Luna's New Life</h3>
              <p className="text-gray-600 mt-2">
                Luna was adopted by a loving couple who adore her playful
                antics.
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md">
              <img
                src={img7}
                alt="Story 3"
                className="rounded-lg w-full"
              />
              <h3 className="text-lg font-semibold mt-4">Max's Big Adventure</h3>
              <p className="text-gray-600 mt-2">
                Max is now the star of his household and loves being pampered.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default WelComePage;
