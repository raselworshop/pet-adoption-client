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
    const { id } = useParams()
    const privateAxios = useAxiosPrivate()
    const [showModal, setShowModal] = useState(false)

    console.log('ID from URL:', id);

    const fetchCampDetails = async (id) => {
        console.log(`/donation-campaigns/${id}`);
        const response = await privateAxios.get(`/donation-campaigns/${id}`)
        console.log(response.data)
        return response.data;
    }
    const fetchRecomCamp = async () => {
        const response = await privateAxios.get(`/donation-campaigns/random?limit=3`)
        console.log(response.data)
        return response.data;
    }

    const { data: campDetails = {}, isLoading: detailsLoading } = useQuery({
        queryKey: ['campDetails', id],
        queryFn: () => fetchCampDetails(id),
    })

    const { data: RecomendedCamp = {}, isLoading: recomLoading } = useQuery({
        queryKey: ['recomendedCamp'],
        queryFn: fetchRecomCamp
    })

    console.log(campDetails)
    if (detailsLoading || recomLoading) return <ButtonLoading />

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">{campDetails.petName}</h1>
            <Separator className="my-4" />
            <div className='w-full flex flex-col items-center md:flex-row-reverse gap-4'>
                <div className='flex-1'>
                    <img
                        src={campDetails.petImage}
                        alt={campDetails.petName}
                        className="w-full md:h-72 lg:h-96 object-cover rounded-md mb-4"
                    />
                </div>
                <div className='flex-1'>
                    <p className="mb-2">Amount Donated: ${campDetails.donatedAmount}</p>
                    <p className="mb-2">Maximum Donation: ${campDetails.maxDonationAmount}</p>
                    <p className="mb-2">Description: {campDetails.detailsUrl}</p>
                    <Button
                    disabled={campDetails.isPaused}
                        className="px-4 py-2 rounded mt-4"
                        onClick={() => setShowModal(true)}
                    >
                         {campDetails.isPaused ? 'Campaign Paused' : 'Donate Now'}
                    </Button>
                </div>
            </div>

            {showModal && (
                <DonateModal
                    campaignId={id}
                    onClose={() => setShowModal(false)}
                />
            )}

            <Separator className="my-4" />
            {/* Recommended Donations */}
            <h2 className="text-xl font-bold">Recommended Donations</h2>
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