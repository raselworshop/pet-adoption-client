import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useAxiosPrivate from '../../../Hooks/useAxiosPrivate';
import { useQuery } from '@tanstack/react-query';
import ButtonLoading from '@/components/components/ui/ButtonLoading';
import CampaignCard from '../CampaignCard';
import DonateModal from './DonateModal';
import { Button } from '@/components/components/ui/button';
import { Separator } from '../../../components/components/ui/separator';

const DonationDetailsPage = () => {
  const { id } = useParams();
  const privateAxios = useAxiosPrivate();
  const [showModal, setShowModal] = useState(false);

  const fetchCampDetails = async (id) => {
    const response = await privateAxios.get(`/donation-campaigns/${id}`);
    return response.data;
  };

  const fetchRecomCamp = async () => {
    const response = await privateAxios.get(`/donation-campaigns/random?limit=3`);
    return response.data;
  };

  const { data: campDetails = {}, isLoading: detailsLoading } = useQuery({
    queryKey: ['campDetails', id],
    queryFn: () => fetchCampDetails(id),
  });

  const { data: RecomendedCamp = {}, isLoading: recomLoading } = useQuery({
    queryKey: ['recomendedCamp'],
    queryFn: fetchRecomCamp,
  });

  if (detailsLoading || recomLoading) return <ButtonLoading />;

  const donationProgress = Math.min((campDetails.donatedAmount / campDetails.maxDonation) * 100, 100);
  const isFullyFunded = campDetails.donatedAmount >= campDetails.maxDonation;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">{campDetails.petName}</h1>
      <Separator className="my-4" />
      <div className="w-full flex flex-col items-center md:flex-row-reverse gap-8">
        {/* Campaign Image */}
        <div className="flex-1 md:max-w-lg">
          <img
            src={campDetails.petImage}
            alt={campDetails.petName}
            className="w-full md:h-72 lg:h-96 object-cover rounded-md shadow-md"
          />
        </div>

        {/* Campaign Details */}
        <div className="flex-1">
          <div className="space-y-4">
            <p className="text-lg font-semibold">Amount Donated: ${campDetails.donatedAmount}</p>
            <p className="text-lg font-semibold">Max Donation: ${campDetails.maxDonation}</p>
            <p className="text-sm text-gray-600">Description: {campDetails.detailsUrl}</p>

            <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
              <div
                className="bg-green-500 h-2 rounded-full transition-all"
                style={{ width: `${donationProgress}%` }}
              ></div>
            </div>

            {/* Donation Button */}
            <Button
              disabled={campDetails.isPaused || isFullyFunded}
              className={`px-4 py-2 rounded mt-4 w-full text-white ${
                campDetails.isPaused
                  ? 'bg-gray-400 cursor-not-allowed'
                  : isFullyFunded
                  ? 'bg-green-600 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700 transition-all'
              }`}
              onClick={() => setShowModal(true)}
            >
              {campDetails.isPaused
                ? 'Campaign Paused'
                : isFullyFunded
                ? 'Fully Funded'
                : 'Donate Now'}
            </Button>
          </div>
        </div>
      </div>

      {/* Donate Modal */}
      {showModal && (
        <DonateModal
          campaignId={id}
          category={campDetails.category}
          onClose={() => setShowModal(false)}
        />
      )}

      <Separator className="my-4" />
      {/* Recommended Donations */}
      <h2 className="text-xl font-bold mb-4">Recommended Donations</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
        {RecomendedCamp?.map((campaign) => (
          <CampaignCard key={campaign._id} campaign={campaign} />
        ))}
      </div>
      <Separator className="my-4" />
    </div>
  );
};

export default DonationDetailsPage;
