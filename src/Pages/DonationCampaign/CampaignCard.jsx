import React from "react";
import { Button } from "../../components/components/ui/button";
import { useNavigate } from "react-router-dom";

const CampaignCard = ({ campaign }) => {
  console.log(campaign);
  const { _id, petName, petImage, maxDonation, donatedAmount } = campaign;
  const navigate = useNavigate();

  const handleDetails = (id) => {
    navigate(`/campDetails/${id}`);
  };

  // donation progress
  const donationProgress = Math.min((donatedAmount / maxDonation) * 100, 100);
  const isFullyFunded = donatedAmount >= maxDonation;

  return (
    <div className="border rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 p-4 flex flex-col min-h-[350px]">
      {/* Pet Image */}
      <div className="relative">
        <img
          src={petImage}
          alt={petName}
          className="w-full h-40 object-cover rounded-md mb-4"
        />
        {isFullyFunded && (
          <span className="absolute top-2 left-2 bg-green-600 text-white text-xs px-3 py-1 rounded-full">
            Fully Funded
          </span>
        )}
      </div>

      {/* Pet Name */}
      <h2 className="text-xl font-bold mb-2">{petName}</h2>

      {/* Progress Bar + Button Wrapper */}
      <div className="mt-auto">
        {/* Donation Progress */}
        <div className="mb-3">
          <p className="text-sm dark:text-white text-gray-600">
            Donated: ${donatedAmount} / ${maxDonation}
          </p>
          <div className="w-full h-2 dark:bg-gray-800 bg-gray-300 rounded-full overflow-hidden mt-1">
            <div
              className="h-full bg-green-500 transition-all duration-500"
              style={{ width: `${donationProgress}%` }}
            ></div>
          </div>
        </div>

        {/* View Details Button */}
        <Button
          onClick={() => handleDetails(_id)}
          disabled={isFullyFunded}
          className={`w-full px-4 py-2 rounded text-white ${
            isFullyFunded
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700 transition-all"
          }`}
        >
          {isFullyFunded ? "Campaign Completed" : "View Details"}
        </Button>
      </div>
    </div>
  );
};

export default CampaignCard;
