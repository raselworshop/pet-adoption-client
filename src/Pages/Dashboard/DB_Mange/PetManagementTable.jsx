import React, { useEffect, useState } from 'react';
import useAuth from '../../../Hooks/useAuth';
import toast from 'react-hot-toast';
import useAxiosPrivate from '../../../Hooks/useAxiosPrivate';
import { Helmet } from 'react-helmet';
import { Button } from '@/components/components/ui/button';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const PetManagementTable = () => {
  const [pets, setPets] = useState([]);
  const { user } = useAuth();
  const axiosPrivate = useAxiosPrivate()
  const navigate = useNavigate()

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const response = await axiosPrivate.get('/pets');
        setPets(response.data);
      } catch (error) {
        toast.error('Failed to fetch pets.');
      }
    };
    fetchPets();
  }, []);

  const handleUpdatePet = (id) => {
    if (!id) {
      Swal.fire('Error', 'Your provided id not found', 'error');
      return;
    }
    navigate(`/dashboard/update-pet/${id}`);
  };

  const handleDeletePet = async (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        const { data } = await axiosPrivate.delete(`/my-pets/${id}`);
        setPets(pets.filter(pet => pet._id !== id));

        if (data.status === 200 || data.data.deletedCount > 0) {
          toast.success('Pet deleted successfully');
        } else {
          toast.error(data.message || 'Something went wrong');
        }
      }
    });
  };

  const handleChangeStatus = async (petId, isAdopted) => {
    try {
      const response = await axiosPrivate.patch(`/pets/status/${petId}`,
        { isAdopted }, {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      toast.success(response.data.message);
      setPets(pets.map(pet => pet._id === petId ? { ...pet, isAdopted } : pet));
    }
    catch (error) {
      toast.error('Failed to update pet status.');
    }
  };

  return (
    <div className='w-full mx-auto p-4 bg-white text-black dark:bg-gray-900 dark:text-white shadow-lg rounded-lg'>
      <Helmet><title>PA || PET MANAGE</title></Helmet>
      <h2 className='text-2xl font-bold mb-4 text-center'>Pet Management</h2>
      <table className='w-full border-collapse rounded-lg shadow-md'>
        <thead>
          <tr className='bg-gray-200 dark:bg-gray-700 dark:text-gray-200 text-gray-700'>
            <th className='p-3 border'>Name</th>
            <th className='p-3 border'>Category</th>
            <th className='p-3 border'>Status</th>
            <th className='p-3 border'>Actions</th>
          </tr>
        </thead>
        <tbody>
          {pets.map(pet => (
            <tr key={pet._id} className='text-center'>
              <td className='p-3 border'>{pet.petName}</td>
              <td className='p-3 border'>{pet.petCategory}</td>
              <td className='p-3 border font-semibold'>{pet.isAdopted ? 'Adopted' : 'Not Adopted'}</td>
              <td className='p-3 border'>
                <Button className='mx-2 bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600' onClick={() => handleUpdatePet(pet._id)}>Update</Button>
                <Button className='mx-2 bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600' onClick={() => handleDeletePet(pet._id)}>Delete</Button>
                <Button className='mx-2 bg-green-500 text-white px-3 py-1 rounded-lg hover:bg-green-600' onClick={() => handleChangeStatus(pet._id, !pet.isAdopted)}>
                  Mark as {pet.isAdopted ? 'Not Adopted' : 'Adopted'}
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PetManagementTable;
