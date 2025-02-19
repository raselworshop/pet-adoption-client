import React, { useMemo } from 'react';
import { Helmet } from 'react-helmet';
import useAuth from '../../../Hooks/useAuth';
import useAxiosPrivate from '../../../Hooks/useAxiosPrivate';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { flexRender, getCoreRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table';
import toast from 'react-hot-toast';
import { Button } from '@/components/components/ui/button';

const MyDonationTable = () => {
    const { user } = useAuth()
    const axiosPrivate = useAxiosPrivate()
    const queryClient = useQueryClient()

    const fetchUserDonation = async (email) => {
        const { data } = await axiosPrivate.get(`/my-donation-campaigns/${email}`)
        // console.log(data)
        return data
    }


    const { data, isLoading, error } = useQuery({
        queryKey: ['userDonations', user?.email],
        queryFn: () => fetchUserDonation(user?.email),
        enabled: !!user?.email
    })

    const refundMutation = useMutation({
        mutationFn: async ({ id, email }) => {
            const { data } = await axiosPrivate.post('/donors/refund', { id, email });
            // console.log(data)
            if (data.amount) {
                toast.success(data.message)
            }
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['userDonations', user?.email]);
        },
    });

    const columns = useMemo(() => [
        {
            accessorKey: 'petImage',
            header: 'Pet Image',
            cell: ({ row }) => (
                <img src={row.original.petImage} alt={row.original.petName} className="w-16 h-16 object-cover" />
            )
        },
        {
            accessorKey: 'petName',
            header: 'Pet Name'
        },
        {
            accessorKey: 'donatedAmount',
            header: 'Donated Amount',
            cell: ({ row }) => {
                const amount = row.getValue('donatedAmount');
                return `$${amount}`;
            },
        },
        {
            header: "Action",
            cell: ({ row }) => (
                <button
                    className="bg-red-500 text-white px-4 py-2 rounded"
                    onClick={() => refundMutation.mutate({ id: row.original._id, email: user?.email })}
                    disabled={refundMutation.isLoading}
                >
                    {refundMutation.isLoading ? 'Processing...' : 'Ask for Refund'}
                </button>
            ),
        }
    ], [refundMutation, user?.email])

    const table = useReactTable({
        data: data || [],
        columns,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        initialState: { pagination: { pageSize: 10 } }
    })

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error loading donations: {error.message}</p>;

    return (
        <div className='container mx-auto p-4'>
            <Helmet><title>PA || MY DONATIONS</title></Helmet>
            <h2 className="text-2xl mb-2">My Donations</h2>
            {data?.length === 0 ? (
                <p>No donations found.</p>
            ) : (
                <>
                    <table className="min-w-full">
                        <thead>
                            {table.getHeaderGroups().map(headerGroup => (
                                <tr key={headerGroup.id}>
                                    {headerGroup.headers.map(header => (
                                        <th key={header.id}
                                            className="px-4 py-2 border"
                                            onClick={header.column.getToggleSortingHandler()} >
                                            {flexRender(header.column.columnDef.header, header.getContext())}
                                            {header.column.getIsSorted() ?
                                                (header.column.getIsSorted() === 'desc' ? ' 🔽' : ' 🔼') : ''}
                                        </th>
                                    ))}
                                </tr>
                            ))}
                        </thead>
                        <tbody>
                            {table.getRowModel().rows.map(row => (
                                <tr key={row.id}>
                                    {row.getVisibleCells().map(cell => (
                                        <td key={cell.id}
                                            className="px-4 py-2 border">
                                            {
                                                flexRender(cell.column.columnDef.cell, cell.getContext())
                                            }
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {data.length > 10 && <div className="flex justify-between mt-4">
                        <Button
                            onClick={table.previousPage}
                            disabled={!table.getCanPreviousPage()}
                        > Previous
                        </Button>
                        <span> Page{' '}
                            <strong>
                                {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
                            </strong>{' '}
                        </span>
                        <Button onClick={table.nextPage} disabled={!table.getCanNextPage()}
                        > Next
                        </Button>
                    </div>}
                </>
            )}
        </div>
    );
};

export default MyDonationTable;