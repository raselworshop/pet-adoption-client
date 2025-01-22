import React from 'react';
import { Card, CardHeader, CardContent, CardTitle } from '../../../components/components/ui/card'; // Adjusted import
import { Button } from '../../../components/components/ui/button';

import catImage from '../../../assets/Categories/cat.jpg';
import dogImage from '../../../assets/Categories/dog.jpg';
import rabbitImage from '../../../assets/Categories/rabbit.jpg';
import birdImage from '../../../assets/Categories/FavIcon.png';
import { useNavigate } from 'react-router-dom';

const petCategories = [
  { name: 'cat', imageUrl: catImage },
  { name: 'Dog', imageUrl: dogImage },
  { name: 'Rabbit', imageUrl: rabbitImage },
  { name: 'Bird', imageUrl: birdImage }, 
];


const PetsCategory = () => {
  const navigate = useNavigate()

  const handleCategoryClick=(category)=>{
    navigate(`/petListing`)
  }

  return (
    <div className="grid md:grid-cols-2 gap-4">
      {petCategories.map((category) => (
        <Card key={category.name} className="shadow-lg">
          <CardHeader className="h-96">
            <img src={category.imageUrl} alt={category.name} className="w-full h-full object-cover" />
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <CardTitle className="text-xl font-bold">{category.name}s</CardTitle>
            <Button
            onClick={()=> handleCategoryClick(category.name)}
            className="mt-2">
              Explore {category.name}s
              </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default PetsCategory;
