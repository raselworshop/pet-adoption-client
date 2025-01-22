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
        const response = await axiosPrivate.get('/pets',);
        setPets(response.data);
      } catch (error) {
        // console.error('Error fetching pets:', error);
        toast.error('Failed to fetch pets.');
      }
    };

    fetchPets();
  }, []);

  const handleUpdatePet = (id) => {
    // Redirect to the update page
    if (!id) {
      // console.error('No ID found for this pet.');
      Swal.error(`Your provided id not found`)
      return;
    }
    // console.log('ID found for this pet.', id);
    navigate(`/dashboard/update-pet/${id}`);
  };

  const handleDeletePet = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then(async(result) => {
      if (result.isConfirmed) {
        const { data } = await axiosPrivate.delete(`/my-pets/${id}`);
        // console.log(data, id)
        setPets(pets.filter(pet => pet._id !== id));

        if (data.status === 200 || data.data.deletedCount > 0) {
          toast.success("pet deleted successfull")
        } else {
          toast.error(data.message || "Something is wrong")
        }
      }
    });

  };

  const handleChangeStatus = async (petId, isAdopted) => {
    try {
      const response = await axiosPrivate.patch(`/pets/status/${petId}`,
        { isAdopted }, {
        headers: { Authorization: `Bearer ${user.token}`, },
      });
      toast.success(response.data.message);
      setPets(pets.map(pet => pet._id === petId ? { ...pet, isAdopted } : pet));
    }
    catch (error) {
      // console.error('Error updating pet status:', error);
      toast.error('Failed to update pet status.');
    }
  };

  return (
    <div className='w-full mx-auto'>
      <Helmet><title>PA || PET MANAGE</title></Helmet>
      <h2>Pet Management</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {pets.map(pet => (
            <tr key={pet._id}>
              <td>{pet.petName}</td>
              <td>{pet.petCategory}</td>
              <td>{pet.isAdopted ? 'Adopted' : 'Not Adopted'}</td>
              <td>
                <Button className="m-2" onClick={() => handleUpdatePet(pet._id, { petName: 'New Name' })}>Update</Button>
                <Button className="m-2" onClick={() => handleDeletePet(pet._id)}>Delete</Button>
                <Button className="m-2" onClick={() => handleChangeStatus(pet._id, !pet.isAdopted)}>
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
