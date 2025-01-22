import { useQuery } from '@tanstack/react-query';
import useAxiosPrivate from './useAxiosPrivate';
import { useParams } from 'react-router-dom';

const usePetUpdate = () => {
    const axiosPrivate = useAxiosPrivate();
    const { id } = useParams();

    // console.log('id from useupadtepet: ', id)
    // Fetch pet data with React Query
    const { data: updatePet = [], refetch, isError, isLoading, isFetching, error } = useQuery({
        queryKey: ['updatePet', id],
        queryFn: async () => {
            const res = await axiosPrivate.get(`/pets/${id}`);
            return res.data;
        },
        enabled: !!id, // Only run the query if `id` is available
    });

    // Handle errors
    if (isError) {
        // console.error('Error fetching pet data:', error);
    }

    return { updatePet, refetch, isFetching, isLoading };
};

export default usePetUpdate;
