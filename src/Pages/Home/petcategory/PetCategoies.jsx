import React, { memo } from "react";
import { Card, CardHeader, CardContent, CardTitle } from "../../../components/components/ui/card";
import { Button } from "../../../components/components/ui/button";
import { useNavigate } from "react-router-dom";

// import catImage from "../../../assets/Categories/cat.jpg";
// import dogImage from "../../../assets/Categories/dog.jpg";
import rabbitImage from "../../../assets/Categories/rabbit.jpg";
// import birdImage from "../../../assets/Categories/FavIcon.png";

const petCategories = [
  { name: "Cat", imageUrl: "https://res.cloudinary.com/dgajyj2he/image/upload/v1746093601/cat_dqhnwz.jpg" },
  { name: "Dog", imageUrl: "https://res.cloudinary.com/dgajyj2he/image/upload/v1735575105/samples/animals/three-dogs.jpg" },
  { name: "Rabbit", imageUrl: rabbitImage },
  { name: "Bird", imageUrl: "https://res.cloudinary.com/dgajyj2he/image/upload/v1746093592/FavIcon_rwsaqy.png" },
];

const PetsCategory =memo(() => {
  const navigate = useNavigate();

  // need to implement the preloading of images in a more efficient way.
  // useEffect(() => {
  //   const links = petCategories.slice(0, 2).map((category) => {
  //     const link = document.createElement("link");
  //     link.rel = "preload";
  //     link.href = category.imageUrl;
  //     link.as = "image";
  //     document.head.appendChild(link);
  //     return link;
  //   });
  
  //   return () => {
  //     links.forEach((link) => document.head.removeChild(link));
  //   };
  // }, []);

  const handleCategoryClick = (category) => {
    // navigate(`/petListing`);
    navigate(`/petListing?category=${encodeURIComponent(category)}`);
  };

  return (
    <div className="">
      <h2 className="text-4xl font-bold text-center mb-8 text-gray-800 dark:text-white">Explore Pet Categories</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {petCategories.map((category) => (
          <Card
            key={category.name}
            className="rounded-xl overflow-hidden shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-2xl bg-white"
          >
            <CardHeader className="relative h-60 overflow-hidden">
              <img
                src={category.imageUrl}
                alt={category.name}
                className="w-full h-full object-cover rounded-t-xl"
                loading="lazy"
              />
            </CardHeader>
            <CardContent className="text-center py-4">
              <CardTitle className="text-2xl font-semibold text-gray-700">{category.name}s</CardTitle>
              <Button
                onClick={() => handleCategoryClick(category.name)}
                className="mt-4 px-6 py-2 rounded-full bg-blue-500 text-white font-semibold text-lg shadow-md hover:bg-blue-600 transition-all duration-300"
              >
                Explore {category.name}s
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
});

export default PetsCategory;
