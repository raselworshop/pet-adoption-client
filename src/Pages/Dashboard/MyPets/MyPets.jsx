import React, { useEffect, useMemo, useState } from 'react';
import { useReactTable, getCoreRowModel, getSortedRowModel, getPaginationRowModel, flexRender } from '@tanstack/react-table';
import Modal from 'react-modal';
import useAuth from '../../../Hooks/useAuth';
import useAxiosPrivate from '../../../Hooks/useAxiosPrivate';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/components/ui/button';
import toast from 'react-hot-toast';
import { Helmet } from 'react-helmet';

const MyPets = () => {
    const { user } = useAuth()
    const axiosPrivate = useAxiosPrivate()
    const [pets, setPets] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [petToDelete, setPetToDelete] = useState(null);
    const navigate = useNavigate()

    useEffect(() => {
        const fetchPets = async () => {
            const response = await axiosPrivate.get(`/my-pets/${user?.email}`);
            console.log('Fetched Pets:', response.data);
            const petSerialNo = response.data.map((pet, idx) => ({
                ...pet,
                serialNumber: idx + 1
            }))
            setPets(petSerialNo)
        };

        fetchPets();
    }, [user?.email]);

    const columns = useMemo(
        () => [
            {
                accessorKey: 'serialNumber',
                header: 'Serial Number',
            },
            {
                accessorKey: 'petName',
                header: 'Pet Name',
            },
            {
                accessorKey: 'petCategory',
                header: 'Pet Category',
            },
            {
                accessorKey: 'petImage',
                header: 'Pet Image',
                cell: ({ getValue }) => <img src={getValue()} alt="Pet" className="w-16 h-16" />,
            },
            {
                accessorKey: 'isAdopted',
                header: 'Adoption Status',
                cell: ({ getValue }) => (getValue() ? 'Adopted' : 'Not Adopted'),
            },
            {
                header: 'Actions',
                cell: ({ row }) => (
                    <>
                        <div className='flex flex-col gap-2'>
                            <Button className="p-0 text-yellow-300 bg-orange-600" onClick={() => handleUpdate(row.original._id)}>Update</Button>
                            <Button className="p-0 text-red-300 bg-red-600" onClick={() => openModal(row.original)}>Delete</Button>
                            <Button className="p-0 text-green-300 bg-green-600" onClick={() => handleAdopt(row.original._id)}>Adopt</Button>
                        </div>
                    </>
                ),
            },
        ],
        []
    );

    const table = useReactTable({
        data: pets,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        initialState: { pagination: { pageSize: 10 } }
    });

    const handleUpdate = (id) => {
        // Redirect to the update page
        if (!id) {
            console.error('No ID found for this pet.');
            return;
        }
        console.log('ID found for this pet.', id);
        navigate(`/dashboard/update-pet/${id}`);
    };

    const openModal = (pet) => {
        setPetToDelete(pet);
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
        setPetToDelete(null);
    };

    const handleDelete = async () => {
        const {data} = await axiosPrivate.delete(`/my-pets/${petToDelete._id}`);
        console.log(data, petToDelete._id)
        setPets(pets.filter(pet => pet._id !== petToDelete._id));
        closeModal();
        if(data.status === 200 || data.data.deletedCount>0){
            toast.success("pet deleted successfull")
        }else{
            toast.error(data.message || "Something is wrong")
        }
    };

    const handleAdopt = async (id) => {
        const {data} = await axiosPrivate.patch(`/my-pets/status/${id}`, { isAdopted: true });
        console.log(data)
        setPets(pets.map(pet => (pet._id === id ? { ...pet, isAdopted: true } : pet)));
        if(data.modifiedCount>0){
            toast.success("Pet adoption status updated successfull")
        }else{
            toast.error("Pet status updateing failed")
        }
    };

    return (
        <div className="container mx-auto p-4">
            <Helmet><title>PA || MY PETS</title></Helmet>
            <h1 className="text-2xl font-bold mb-4">My Pets</h1>
            <table className="min-w-full">
                <thead>
                    {table.getHeaderGroups().map(headerGroup => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map(header => (
                                <th
                                    key={header.id}
                                    className="px-4 py-2 border"
                                    onClick={header.column.getToggleSortingHandler()}
                                >
                                    {flexRender(header.column.columnDef.header, header.getContext())}
                                    {header.column.getIsSorted() ? (header.column.getIsSorted() ? ' 🔽' : ' 🔼') : ''}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody>
                    {table.getRowModel().rows.map(row => (
                        <tr key={row.id}>
                            {row.getVisibleCells().map(cell => (
                                <td key={cell.id} className="px-4 py-2 border">
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
            {pets.length > 10 && <div className="flex justify-between mt-4">
                <button onClick={table.previousPage} disabled={!table.getCanPreviousPage()}>
                    Previous
                </button>
                <span>
                    Page{' '}
                    <strong>
                        {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
                    </strong>{' '}
                </span>
                <button onClick={table.nextPage} disabled={!table.getCanNextPage()}>
                    Next
                </button>
            </div>}
            <Modal isOpen={modalIsOpen} onRequestClose={closeModal}>
                <div className={'max-w-80 mx-auto flex flex-col items-center gap-5'}>
                    <h2>Are you sure you want to delete this pet?</h2>
                    <div className="flex space-x-4">
                        <Button className="text-red-300 bg-red-600" onClick={handleDelete}>Yes</Button>
                        <Button onClick={closeModal}>No</Button>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default MyPets;
