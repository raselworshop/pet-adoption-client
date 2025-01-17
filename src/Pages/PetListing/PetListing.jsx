import React, { useEffect, useState } from 'react';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';
import ButtonLoading from '../../components/components/ui/ButtonLoading';
import { useNavigate } from 'react-router-dom';

const PetListing = () => {
    const [search, setSearch] = useState('')
    const [category, setCategory] = useState('')
    const axiosPublic = useAxiosPublic()
    const navigate = useNavigate()

    const fetchPets = async ({ pageParam = 1, queryKey }) => {
        const [_key, { search, category }] = queryKey;
        const response = await axiosPublic.get('/pets', {
            params: { search, category, page: pageParam }
        })
        return response.data;
    }
    const {
        data,
        refetch,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage
    } = useInfiniteQuery({
        queryKey: ['pets', { search, category }],
        queryFn: fetchPets,
        getNextPageParam: (lastPage, pages) => {
            if (lastPage.length < 3) return undefined;
            return pages.length + 1;
        }
    })

    const { ref, inView } = useInView({
        threshold: 1.0,
        triggerOnce: false
    })

    useEffect(() => {
        if (inView && hasNextPage) {
            fetchNextPage()
        }
    }, [inView, hasNextPage, fetchNextPage])

    useEffect(()=>{
        refetch()
    }, [search, category, refetch])

    const navigateToDetails=(id)=>{
        console.log(id)
        navigate(`/petDetails/${id}`)
    }

    return (
        <div className="container mx-auto py-4">
            <div className="flex justify-between mb-4">
                <input type="text" placeholder="Search by name..."
                    className="border rounded p-2 dark:bg-gray-700 dark:text-gray-400"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)} />
                <select className="border rounded p-2 dark:bg-gray-700 dark:text-white"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)} >
                    <option value="">All Categories</option>
                    <option value="Dog">Dog</option>
                    <option value="Cat">Cat</option>
                    <option value="Rabbit">Rabbit</option>
                    <option value="Bird">Birds</option>
                </select>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                {data?.pages.map((page) => page.map((pet) => (
                    <div key={pet._id}
                        className="border relative rounded p-4 text-center h-96 overflow-hidden group">
                        <div className='w-full h-full'>
                            <img src={pet.petImage} alt={pet.name}
                                className="w-full h-full object-cover rounded mb-4" />
                        </div>
                        <div className='absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                            <h2 className="text-xl font-bold text-white">{pet.petName}</h2>
                            <p className="text-white">Age: {pet.petAge}</p>
                            <p className="text-white">Location: {pet.petLocation}</p>
                            <button 
                            onClick={()=>navigateToDetails(pet._id)}
                            className="bg-blue-500 text-white rounded p-2 mt-4">
                                View Details
                            </button>
                        </div>
                    </div>

                ))
                )}
            </div>
            <div ref={ref}>
                {isFetchingNextPage && <ButtonLoading />
                }
            </div>
        </div>
    );
};

export default PetListing;