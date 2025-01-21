import React, { useEffect, useMemo, useState } from 'react';
import { Helmet } from 'react-helmet';
import Modal from 'react-modal';
import useAuth from '../../../../Hooks/useAuth';
import useAxiosPrivate from '../../../../Hooks/useAxiosPrivate';
import { useNavigate } from 'react-router-dom';
import { flexRender, getCoreRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table';
import toast from 'react-hot-toast';

const MyDonationCamp = () => {
    const { user } = useAuth()
    const axiosPrivate = useAxiosPrivate()
    const [loading, setLoading] = useState(true)
    const [modalIsOpen, setModalIsOpen] = useState(false)
    const [campaigns, setCampaigns] = useState([])
    const [donors, setDonors] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        const fetchCamp = async () => {
            setLoading(true)
            try {
                const { data } = await axiosPrivate.get(`/my-donation-campaigns/${user?.email}`)
                console.log(data)
                const campaignsData = data.map(campaign => ({
                    ...campaign,
                    isPaused: campaign.isPaused ?? false
                }));
                setCampaigns(campaignsData)
            } catch (error) {
                console.error("Error frtching campaign data", error)
            }
        }
        fetchCamp();
    }, [user?.email, axiosPrivate])

    const handlePause = async (campaignId, isPaused) => {
        try {
            const res = await axiosPrivate.patch(`/donation-campaign/pause/${campaignId}`, { isPaused })
            console.log(res.data)
            setCampaigns(campaigns.map(campaign =>
                campaign._id === campaignId ? { ...campaign, isPaused } : campaign
            ))
            if (res.data.modifiedCount > 0) {
                toast.success(`You have successfully updated to ${isPaused ? 'Paused' : 'Unpaused'}`)
            }
        } catch (error) {
            console.log("Error updating pause status", error)
        }
    }

    const handleEdit = (id) => {
        console.log(id)
        navigate(`/dashboard/editDonation/${id}`)
    }

    const handleViewDonors = (donors) => {
        console.log(donors)
        setDonors(donors)
        setModalIsOpen(true)
    }
    const closeModal = () => {
        setModalIsOpen(false)
        setDonors([])
    }

    const columns = useMemo(() => [
        {
            accessorKey: 'petName',
            header: 'Pet Name'
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
                            className='bg-green-600 h-4 rounded-full'
                            style={{
                                width: donatedAmount > 0 ? `${Math.min((donatedAmount / maxDonationAmount) * 100, 100)}%` : '0%'
                            }}
                        ></div>
                    </div>
                )
            }
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
                        className="bg-green-500 text-white px-2 py-1 rounded"
                        onClick={() => handleViewDonors(row.original.donors)}
                    > View Donors
                    </button>
                </div>
            )
        }
    ],
        [campaigns]
    );

    const table = useReactTable({
        data: campaigns,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        initialState: { pagination: { pageSize: 10 } }
    })

    return (
        <div className="container mx-auto p-4">
            <Helmet><title>PA || MY DONATION CAMPAIGNS</title></Helmet>
            <h1 className="text-2xl font-bold mb-4">My Donation Campaigns</h1>
            <table className="min-w-full">
                <thead> {table.getHeaderGroups().map(headerGroup => (
                    <tr key={headerGroup.id}>
                        {headerGroup.headers.map(header => (
                            <th key={header.id} className="px-4 py-2 border"
                                onClick={header.column.getToggleSortingHandler()} >
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
            {campaigns.length > 10 && <div className="flex justify-between mt-4">
                <button
                    onClick={table.previousPage}
                    disabled={!table.getCanPreviousPage()}>
                    Previous
                </button>
                <span> Page{' '}
                    <strong>
                        {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
                    </strong>{' '}
                </span>
                <button
                    onClick={table.nextPage}
                    disabled={!table.getCanNextPage()}
                >
                    Next
                </button>
            </div>}
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                className={'dark:bg-gray-900 bg-white p-12'}
            >
                <div className='flex justify-between'>
                    <h2 className='text-2xl my-2'>Donors</h2>
                    <button
                        className="my-2 bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded"
                        onClick={closeModal}>
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
                        {donors ? <>
                            {donors?.map((donor, index) => (
                                <tr key={index}>
                                    <td className="px-4 py-2 border">{donor.name}</td>
                                    <td className="px-4 py-2 border">{donor.email}</td>
                                    <td className="px-4 py-2 border">${donor.amount}</td>
                                    <td className="px-4 py-2 border">{donor.transactionId}</td>
                                    <td className="px-4 py-2 border">{new Date(donor.date).toLocaleString()}</td>
                                </tr>
                            ))}
                        </> : <>
                            <div className='flex items-center justify-center'>
                                <h2 className="text-2xl text-center">You don't have any donor for this campaign!</h2>
                            </div>
                        </>}
                    </tbody>
                </table>

            </Modal>
        </div>
    );
};

export default MyDonationCamp;