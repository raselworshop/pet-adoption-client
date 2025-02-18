import React, { useEffect, useState } from 'react';
import useAxiosPrivate from '../../../Hooks/useAxiosPrivate';
import useAuth from '../../../Hooks/useAuth';
import toast from 'react-hot-toast';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../../components/components/ui/table";
import { Button } from "../../../components/components/ui/button";
import { Badge } from "../../../components/components/ui/badge";
import { Skeleton } from "../../../components/components/ui/skeleton";
import Swal from 'sweetalert2';

const RequestedAdoptionTable = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const axiosPrivate = useAxiosPrivate();
  const { user } = useAuth();
  const userEmail = user?.email;

  useEffect(() => {
    if (!userEmail) return;

    const fetchRequests = async () => {
      try {
        const response = await axiosPrivate.get(`/adopted/requests/${userEmail}`);
        setRequests(response.data);
      } catch (err) {
        setError(err.response?.data?.message || 'An error occurred.');
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, [userEmail]);

  const handleCancelRequest = async (requestId) => {
    const confirmResult = await Swal.fire({
      title: "Are you sure?",
      text: "Do you really want to cancel this adoption request?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, cancel it!",
      cancelButtonText: "No, keep it",
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
    });

    if (!confirmResult.isConfirmed) return;

    try {
      const response = await axiosPrivate.patch(`/cancel/status/${requestId}`, {
        status: 'Cancelled',
      });
      toast.success(response.data.message || 'Request cancelled successfully!');
      setRequests((prev) => prev.filter((req) => req._id !== requestId));
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to cancel request.');
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center space-y-3">
        <Skeleton className="h-6 w-48" />
        <Skeleton className="h-6 w-64" />
        <Skeleton className="h-6 w-80" />
      </div>
    );
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Adoption Requests</h2>
      {requests.length === 0 ? (
        <p className="text-gray-500">No requests found for this pet.</p>
      ) : (
        <Table className="border border-gray-200 rounded-lg shadow-md">
          <TableHeader>
            <TableRow className="bg-gray-100">
              <TableHead>Adopter Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {requests.map((request) => (
              <TableRow key={request._id} className="hover:bg-gray-50">
                <TableCell>{request.adopterName || 'N/A'}</TableCell>
                <TableCell>{request.adopterMail}</TableCell>
                <TableCell>
                  <Badge className={`text-white px-2 py-1 rounded ${request.status === 'Pending' ? 'bg-yellow-500' : request.status === 'Accepted' ? 'bg-green-500' : 'bg-red-500'}`}>
                    {request.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  {request.status === 'Pending' ? (
                    <Button onClick={() => handleCancelRequest(request._id)} variant="destructive">
                      Cancel
                    </Button>
                  ) : (
                    <span className="text-gray-400">N/A</span>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default RequestedAdoptionTable;
