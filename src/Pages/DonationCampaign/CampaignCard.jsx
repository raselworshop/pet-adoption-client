import { Button } from "@/components/components/ui/button";
import React from "react";
import { useNavigate } from "react-router-dom";

const CampaignCard = ({ campaign }) => {
  const {_id, petName, petImage, maxDonationAmount, donatedAmount } = campaign;
  const navigate = useNavigate()

  const handleDetails=(id)=>{
    console.log(id)
    navigate(`/campDetails/${id}`)
}

  return (
    <div className="border rounded-lg shadow-md p-4">
      <img
        src={petImage}
        alt={petName}
        className="w-full h-40 object-cover rounded-md mb-4"
      />
      <h2 className="text-xl font-bold mb-2">{petName}</h2>
      <p>Max Donation: ${maxDonationAmount}</p>
      <p>Donated: ${donatedAmount}</p>
      <Button onClick={()=>handleDetails(_id)} className=" px-4 py-2 rounded mt-4">
        View Details
      </Button>
    </div>
  );
};

export default CampaignCard;
