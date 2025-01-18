import { useQuery } from '@tanstack/react-query';
import useAxiosPrivate from './useAxiosPrivate';
import { useParams } from 'react-router-dom';

const usePetUpdate = () => {
    const axiosPrivate = useAxiosPrivate()
    const { id } = useParams()
    console.log(id)
    const { data: updatePet=[], refetch, isError, isLoading, error, } = useQuery({
        queryKey: ['updatePet', id],
        queryFn: async () => {
            const res = await axiosPrivate.get(`/pets/${id}`)
            return res.data
        },
        enabled: !!id,
    })
    return {updatePet, refetch, error, isLoading, isError}
};

export default usePetUpdate;