import { useInView } from "react-intersection-observer";
import useAxiosPrivate from "../../Hooks/useAxiosPrivate";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useState, useMemo, useEffect } from "react";
import CampaignCard from "./CampaignCard";
import ButtonLoading from "@/components/components/ui/ButtonLoading";

const DonationCampaign = () => {
  const privateAxios = useAxiosPrivate();
  
  const fetchCamp = async ({ pageParam = 1 }) => {
    const response = await privateAxios.get(`/donation-campaigns?page=${pageParam}&limit=6`);
    return response.data;
  };

  const { ref, inView } = useInView();

  const {
    data = {},
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["campaigns"],
    queryFn: fetchCamp,
    getNextPageParam: (lastPage, pages) => {
      return lastPage.hasMore ? pages.length + 1 : undefined;
    },
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  const [sortType, setSortType] = useState("default");

  // Sorting Logic based on campaigns fetched from the API
  const sortedCampaigns = useMemo(() => {
    if (!data.pages) return [];
    
    let allCampaigns = data.pages.flatMap((page) => page.result);

    if (sortType === "maxDonation") {
      allCampaigns.sort((a, b) => b.maxDonation - a.maxDonation);
    } else if (sortType === "donated") {
      allCampaigns.sort((a, b) => b.donatedAmount - a.donatedAmount);
    }

    return allCampaigns;
  }, [data, sortType]);

  if (isLoading) return <ButtonLoading />;

  return (
    <div className="container mx-auto py-4">
      <h1 className="text-3xl font-bold mb-4">Donation Campaigns</h1>

      {/* Sorting Dropdown */}
      <div className="flex justify-end mb-4">
        <select
          onChange={(e) => setSortType(e.target.value)}
          className="p-2 border rounded-md bg-gray-100 dark:bg-gray-700 dark:text-white"
        >
          <option value="default">Sort By</option>
          <option value="maxDonation">Max Donation</option>
          <option value="donated">Donated Amount</option>
        </select>
      </div>

      {/* Campaign Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {sortedCampaigns.map((campaign, index) => (
          <CampaignCard key={campaign._id || index} campaign={campaign} />
        ))}
      </div>

      {/* Loading more campaigns */}
      <div ref={ref} className="text-center mt-4">
        {isFetchingNextPage && <p>Loading more campaigns...</p>}
      </div>
    </div>
  );
};

export default DonationCampaign;
