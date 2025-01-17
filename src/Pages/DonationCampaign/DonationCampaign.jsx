import { useInView } from "react-intersection-observer";
import useAxiosPrivate from "../../Hooks/useAxiosPrivate";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import CampaignCard from "./CampaignCard";
import ButtonLoading from "@/components/components/ui/ButtonLoading";

const DonationCampaign = () => {
    const privateAxios = useAxiosPrivate()

    const fetchCamp = async ({ pageParam = 1 }) => {
        const response = await privateAxios.get(`/donation-campaigns?page=${pageParam}&limit=6`)
        console.log(response.data)
        return response.data;
    }
    const { ref, inView } = useInView()
    const {
        data = {},
        isLoading,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage
    } = useInfiniteQuery({
        queryKey: ['campaigns'],
        queryFn: fetchCamp,
        getNextPageParam: (lastPage, pages) => {
           return lastPage.hasMore ? pages.length + 1 : undefined;
        }
    })
    useEffect(() => {
        if (inView && hasNextPage) {
            fetchNextPage()
        }
    }, [inView, hasNextPage, fetchNextPage])

    console.log('all donations', data)
    if(isLoading) return <ButtonLoading/>

    return (
        <div className="container mx-auto py-4">
            <h1 className="text-3xl font-bold mb-4">Donation Campaigns</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                {data?.pages?.map((page) =>
                    page.result.map((campaign) => (
                        <CampaignCard key={campaign._id} campaign={campaign} />
                    ))
                )}
            </div>
            <div ref={ref} className="text-center mt-4">
                {isFetchingNextPage && <p>Loading more campaigns...</p>}
            </div>
        </div>
    );
};

export default DonationCampaign;