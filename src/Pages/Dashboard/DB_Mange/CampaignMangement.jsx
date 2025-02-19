import React, { useEffect, useMemo, useState } from 'react';
import { Helmet } from 'react-helmet';
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';
import { flexRender, getCoreRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table';
import toast from 'react-hot-toast';
import useAxiosPrivate from '../../../Hooks/useAxiosPrivate';

const CampaignManagement = () => {
    const axiosPrivate = useAxiosPrivate();
    const [loading, setLoading] = useState(true);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [campaigns, setCampaigns] = useState([]);
    const [donors, setDonors] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCampaigns = async () => {
            setLoading(true);
            try {
                const { data } = await axiosPrivate.get('/admin/donation-campaigns');
                const campaignsData = data.map(campaign => ({
                    ...campaign,
                    isPaused: campaign.isPaused ?? false
                }));
                console.log(campaignsData)
                setCampaigns(campaignsData);
            } catch (error) {
                // console.error("Error fetching campaign data", error);
            }
            setLoading(false);
        };
        fetchCampaigns();
    }, [axiosPrivate]);

    const handlePause = async (campaignId, isPaused) => {
        try {
            const res = await axiosPrivate.patch(`/admin/donation-campaigns/${campaignId}/pause`, { isPaused });
            setCampaigns(campaigns.map(campaign =>
                campaign._id === campaignId ? { ...campaign, isPaused } : campaign
            ));
            if (res.data.modifiedCount > 0) {
                toast.success(`You have successfully updated to ${isPaused ? 'Paused' : 'Unpaused'}`);
            }
        } catch (error) {
            // console.log("Error updating pause status", error);
        }
    };

    const handleEdit = (id) => {
        navigate(`/dashboard/editDonation/${id}`);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this campaign?')) {
            try {
                const res = await axiosPrivate.delete(`/admin/donation-campaigns/${id}`);
                if (res.status === 204) {
                    setCampaigns(campaigns.filter(campaign => campaign._id !== id));
                    toast.success('Campaign deleted successfully');
                }
            } catch (error) {
                // console.log("Error deleting campaign", error);
            }
        }
    };

    const handleViewDonors = (donors) => {
        setDonors(donors);
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
        setDonors([]);
    };

    const columns = useMemo(() => [
        {
            accessorKey: 'petName',
            header: 'Title'
        },
        {
            accessorKey: 'shortDescription',
            header: 'Description'
        },
        {
            accessorKey: 'maxDonation',
            header: 'Max Donation Amount'
        },
        {
            accessorKey: 'donatedAmount',
            header: 'Donation Progress',
            cell: ({ row }) => {
                const maxDonationAmount = row.original.maxDonation;
                const donatedAmount = row.original.donatedAmount;
                return (
                    <div className="w-full bg-gray-500 rounded-full h-4">
                        <div
                            className="bg-green-600 h-4 rounded-full"
                            style={{
                                width: donatedAmount > 0 ? `${Math.min((donatedAmount / maxDonationAmount) * 100, 100)}%` : '0%'
                            }}
                        ></div>
                    </div>
                );
            }
        },
        {
            accessorKey: 'isPaused',
            header: 'Status',
            cell: ({ value }) => (value ? 'Paused' : 'Active')
        },
        {
            header: 'Actions',
            cell: ({ row }) => (
                <div className="flex space-x-2">
                    <button
                        className="mr-2 bg-blue-500 text-white px-2 py-1 rounded"
                        onClick={() => handlePause(row.original._id, !row.original.isPaused)}
                    >
                        {row.original.isPaused ? 'Unpause' : 'Pause'}
                    </button>
                    <button
                        className="mr-2 bg-yellow-500 text-white px-2 py-1 rounded"
                        onClick={() => handleEdit(row.original._id)}
                    > Edit
                    </button>
                    <button
                        className="mr-2 bg-red-500 text-white px-2 py-1 rounded"
                        onClick={() => handleDelete(row.original._id)}
                    > Delete
                    </button>
                    <button
                        className="bg-green-500 text-white px-2 py-1 rounded"
                        onClick={() => handleViewDonors(row.original.donors)}
                    > View Donors
                    </button>
                </div>
            )
        }
    ], [campaigns]);

    const table = useReactTable({
        data: campaigns,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        initialState: { pagination: { pageSize: 10 } }
    });

    return (
        <div className="container mx-auto p-4">
            <Helmet><title>Admin || Donation Campaigns</title></Helmet>
            <h1 className="text-2xl font-bold mb-4">Donation Campaigns</h1>
            <table className="min-w-full">
                <thead>
                    {table.getHeaderGroups().map(headerGroup => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map(header => (
                                <th key={header.id} className="px-4 py-2 border" onClick={header.column.getToggleSortingHandler()}>
                                    {flexRender(header.column.columnDef.header, header.getContext())}
                                    {header.column.getIsSorted() ? (header.column.getIsSorted() === 'desc' ? ' 🔽' : ' 🔼') : ''}
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
            {campaigns.length > 10 && (
                <div className="flex justify-between mt-4">
                    <button
                        onClick={table.previousPage}
                        disabled={!table.getCanPreviousPage()}
                        className="bg-gray-500 text-white px-4 py-2 rounded"
                    >
                        Previous
                    </button>
                    <span>
                        Page{' '}
                        <strong>
                            {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
                        </strong>{' '}
                    </span>
                    <button
                        onClick={table.nextPage}
                        disabled={!table.getCanNextPage()}
                        className="bg-gray-500 text-white px-4 py-2 rounded"
                    >
                        Next
                    </button>
                </div>
            )}
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                className={'dark:bg-gray-900 bg-white p-12'}
            >
                <div className='flex justify-between'>
                    <h2 className='text-2xl my-2'>Donors</h2>
                    <button
                        className="my-2 bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded"
                        onClick={closeModal}
                    >
                        Close
                    </button>
                </div>
                <table className="min-w-full">
                    <thead>
                        <tr>
                            <th className="px-4 py-2 border">Name</th>
                            <th className="px-4 py-2 border">Email</th>
                            <th className="px-4 py-2 border">Amount</th>
                            <th className="px-4 py-2 border">Transaction ID</th>
                            <th className="px-4 py-2 border">Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {donors ? (
                            donors.map((donor, index) => (
                                <tr key={index}>
                                    <td className="px-4 py-2 border">{donor.name}</td>
                                    <td className="px-4 py-2 border">{donor.email}</td>
                                    <td className="px-4 py-2 border">${donor.amount}</td>
                                    <td className="px-4 py-2 border">{donor.transactionId ? donor.transactionId : 'N/A'}</td>
                                    <td className="px-4 py-2 border">{donor.date ? new Date(donor.date).toLocaleString() : "Date Not Found"}</td>
                                </tr>
                            ))
                        ) : (<tr>
                            <td colSpan="5" className="text-center py-4">
                                You don't have any donor for this campaign!
                            </td>
                        </tr>
                        )}
                    </tbody>
                </table>
            </Modal>
        </div>
    );
};

export default CampaignManagement;