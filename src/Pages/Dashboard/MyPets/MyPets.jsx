import React, { useEffect, useMemo, useState } from 'react';
import { useReactTable, getCoreRowModel, getSortedRowModel, getPaginationRowModel, flexRender } from '@tanstack/react-table';
import Modal from 'react-modal';
import useAuth from '../../../Hooks/useAuth';
import useAxiosPrivate from '../../../Hooks/useAxiosPrivate';

const MyPets = () => {
    const { user } = useAuth()
    const axiosPrivate = useAxiosPrivate()
    const [pets, setPets] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [petToDelete, setPetToDelete] = useState(null);

    useEffect(() => {
        const fetchPets = async () => {
            const response = await axiosPrivate.get(`/my-pets/${user?.email}`);
            console.log(response.data)
            setPets(response.data)
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
                        <button onClick={() => handleUpdate(row.original._id)}>Update</button>
                        <button onClick={() => openModal(row.original)}>Delete</button>
                        <button onClick={() => handleAdopt(row.original._id)}>Adopt</button>
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
        window.location.href = `/dashboard/update-pet/${id}`;
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
        await axiosPrivate.delete(`/api/delete-pet/${petToDelete._id}`);
        setPets(pets.filter(pet => pet._id !== petToDelete._id));
        closeModal();
    };

    const handleAdopt = async (id) => {
        await axiosPrivate.patch(`/api/adopt-pet/${id}`, { isAdopted: true });
        setPets(pets.map(pet => (pet._id === id ? { ...pet, isAdopted: true } : pet)));
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">My Pets</h1>
            <table className="min-w-full bg-white">
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
                                    {header.column.getIsSorted() ? (header.column.getIsSortedDesc() ? ' 🔽' : ' 🔼') : ''}
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
                <h2>Are you sure you want to delete this pet?</h2>
                <div className="flex justify-end space-x-4">
                    <button onClick={handleDelete}>Yes</button>
                    <button onClick={closeModal}>No</button>
                </div>
            </Modal>
        </div>
    );
};

export default MyPets;
