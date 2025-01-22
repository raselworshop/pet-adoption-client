import { useQuery } from '@tanstack/react-query';
import useAxiosPrivate from './useAxiosPrivate';
import { useParams } from 'react-router-dom';

const useEditDonation = () => {
    const axiosPrivate = useAxiosPrivate();
    const { id } = useParams();

    // console.log('id from useEditDonation: ', id)
    // Fetch pet data with React Query
    const { data: updateCamp = [], refetch, isError, isLoading, isFetching, error } = useQuery({
        queryKey: ['updatePet', id],
        queryFn: async () => {
            const res = await axiosPrivate.get(`/donation-campaigns/${id}`);
            return res.data;
        },
        enabled: !!id, //run the query when `id` is available
    });

    // Handle errors
    if (isError) {
        // console.error('Error fetching pet data:', error);
    }

    return { updateCamp, refetch, isFetching, isLoading };
};

export default useEditDonation;
