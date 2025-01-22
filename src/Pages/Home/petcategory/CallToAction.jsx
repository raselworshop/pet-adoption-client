import React from 'react';
import { Button } from '../../../components/components/ui/button';
import useAxiosPublic from '../../../Hooks/useAxiosPublic';
import { useNavigate } from 'react-router-dom';

const CallToAction = () => {
  const axiosPublic = useAxiosPublic()
  const navigate = useNavigate()

  const handleNavigate =()=>{
    navigate('/petListing')
  }

  return (
    <div className="bg-blue-500 text-white text-center p-8">
      <h2 className="text-3xl font-bold mb-4">Adopt a Pet, Give Them a Better Life</h2>
      <p className="text-xl mb-6">Join us in making a difference by giving a loving home to pets in need.</p>
      <Button onClick={handleNavigate} className="bg-white text-blue-500 font-semibold">Adopt Now</Button>
    </div>
  );
};

export default CallToAction;
