import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosPrivate from './useAxiosPrivate';
import useAuth from './useAuth';

const useAdoptedPet = () => {
    const axiosPrivate = useAxiosPrivate()
    const { user } = useAuth()
    const { data: adopted=[], refetch, isError, isLoading, error, } = useQuery({
        queryKey: ['adopted', user?.email],
        queryFn: async () => {
            const res = await axiosPrivate.get(`/adopted?email=${user?.email}`)
            return res.data
        }
    })
    return {adopted, refetch, error, isLoading, isError}
};

export default useAdoptedPet;