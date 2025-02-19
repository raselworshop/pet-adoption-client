import React, { useEffect, useMemo, useState } from "react";
import { Helmet } from "react-helmet";
import Modal from "react-modal";
import useAuth from "../../../../Hooks/useAuth";
import useAxiosPrivate from "../../../../Hooks/useAxiosPrivate";
import { useNavigate } from "react-router-dom";
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import toast from "react-hot-toast";

const MyDonationCamp = () => {
  const { user } = useAuth();
  const axiosPrivate = useAxiosPrivate();
  const [loading, setLoading] = useState(true);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [campaigns, setCampaigns] = useState([]);
  const [donors, setDonors] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCamp = async () => {
      setLoading(true);
      try {
        const { data } = await axiosPrivate.get(
          `/my-donation-campaigns/${user?.email}`
        );
        console.log(data);
        const campaignsData = data.map((campaign) => ({
          ...campaign,
          isPaused: campaign.isPaused ?? false,
        }));
        setCampaigns(campaignsData);
      } catch (error) {
        console.error("Error frtching campaign data", error);
      }
    };
    fetchCamp();
  }, [user?.email, axiosPrivate]);

  const handlePause = async (campaignId, isPaused) => {
    try {
      const res = await axiosPrivate.patch(
        `/donation-campaign/pause/${campaignId}`,
        { isPaused }
      );
      // console.log(res.data)
      setCampaigns(
        campaigns.map((campaign) =>
          campaign._id === campaignId ? { ...campaign, isPaused } : campaign
        )
      );
      if (res.data.modifiedCount > 0) {
        toast.success(
          `You have successfully updated to ${isPaused ? "Paused" : "Unpaused"}`
        );
      }
    } catch (error) {
      // console.log("Error updating pause status", error)
    }
  };

  const handleEdit = (id) => {
    // console.log(id)
    navigate(`/dashboard/editDonation/${id}`);
  };

  const handleViewDonors = (donors) => {
    // console.log(donors)
    setDonors(donors);
    setModalIsOpen(true);
  };
  const closeModal = () => {
    setModalIsOpen(false);
    setDonors([]);
  };

  const columns = useMemo(
    () => [
      {
        accessorKey: "petName",
        header: "Pet Name",
      },
      {
        accessorKey: "maxDonation",
        header: "Max Donation Amount",
      },
      {
        accessorKey: "donatedAmount",
        header: "Donation Progress",
        cell: ({ row }) => {
          const maxDonationAmount = row.original.maxDonation;
          const donatedAmount = row.original.donatedAmount;
          return (
            <div className="w-full bg-gray-500 rounded-full h-4">
              <div
                className="bg-green-600 h-4 rounded-full"
                style={{
                  width:
                    donatedAmount > 0
                      ? `${Math.min(
                          (donatedAmount / maxDonationAmount) * 100,
                          100
                        )}%`
                      : "0%",
                }}
              ></div>
            </div>
          );
        },
      },
      {
        header: "Actions",
        cell: ({ row }) => (
          <div className="flex space-x-2">
            <button
              className="mr-2 bg-blue-500 text-white px-2 py-1 rounded"
              onClick={() =>
                handlePause(row.original._id, !row.original.isPaused)
              }
            >
              {row.original.isPaused ? "Unpause" : "Pause"}
            </button>
            <button
              className="mr-2 bg-yellow-500 text-white px-2 py-1 rounded"
              onClick={() => handleEdit(row.original._id)}
            >
              {" "}
              Edit
            </button>
            <button
              className="bg-green-500 text-white px-2 py-1 rounded"
              onClick={() => handleViewDonors(row.original.donors)}
            >
              {" "}
              View Donors
            </button>
          </div>
        ),
      },
    ],
    [campaigns]
  );

  const table = useReactTable({
    data: campaigns,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageSize: 10 } },
  });

  return (
    <div className="container mx-auto p-4">
      <Helmet>
        <title>PA || MY DONATION CAMPAIGNS</title>
      </Helmet>
      <h1 className="text-2xl font-bold mb-4 text-center">
        My Donation Campaigns
      </h1>
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-300 bg-white dark:bg-gray-800">
          <thead className="bg-gray-200 dark:bg-gray-700">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="px-4 py-2 border text-left cursor-pointer"
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                    {header.column.getIsSorted()
                      ? header.column.getIsSorted() === "desc"
                        ? " 🔽"
                        : " 🔼"
                      : ""}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                className="even:bg-gray-100 dark:even:bg-gray-700"
              >
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="px-4 py-2 border">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {campaigns.length > 10 && (
        <div className="flex justify-between mt-4 px-4">
          <button
            onClick={table.previousPage}
            disabled={!table.getCanPreviousPage()}
            className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-400"
          >
            Previous
          </button>
          <span className="text-lg font-medium">
            Page <strong>{table.getState().pagination.pageIndex + 1}</strong> of{" "}
            <strong>{table.getPageCount()}</strong>
          </span>
          <button
            onClick={table.nextPage}
            disabled={!table.getCanNextPage()}
            className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-400"
          >
            Next
          </button>
        </div>
      )}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className={
          "dark:bg-gray-900 bg-white p-6 rounded-lg shadow-lg w-full max-w-4xl mx-auto"
        }
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Donors</h2>
          <button
            className="bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded transition duration-300"
            onClick={closeModal}
          >
            Close
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300 shadow-md rounded-lg text-sm md:text-base">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="px-4 py-2 border">Name</th>
                <th className="px-4 py-2 border">Email</th>
                <th className="px-4 py-2 border">Amount</th>
                <th className="px-4 py-2 border">Transaction ID</th>
                <th className="px-4 py-2 border">Date</th>
              </tr>
            </thead>
            <tbody>
              {donors && donors.length > 0 ? (
                donors.map((donor, index) => (
                  <tr key={index} className="hover:bg-gray-50 transition">
                    <td className="px-4 py-2 border text-center">
                      {donor.name}
                    </td>
                    <td className="px-4 py-2 border text-center">
                      {donor.email}
                    </td>
                    <td className="px-4 py-2 border text-center text-green-600 font-semibold">
                      ${donor.amount}
                    </td>
                    <td className="px-4 py-2 border text-center">
                      {donor.transactionId}
                    </td>
                    <td className="px-4 py-2 border text-center">
                      {new Date(donor.date).toLocaleString()}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="5"
                    className="px-4 py-6 text-center text-gray-500"
                  >
                    You don't have any donors for this campaign!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Modal>
    </div>
  );
};

export default MyDonationCamp;
