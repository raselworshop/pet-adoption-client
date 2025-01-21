import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { Helmet } from 'react-helmet';
import useAuth from '../../../Hooks/useAuth';
import useAxiosPrivate from '../../../Hooks/useAxiosPrivate';
import { Button } from '@/components/components/ui/button';
import Swal from 'sweetalert2';

const AdoptionRequTable = () => {
  const { user } = useAuth();
  const privateAxios = useAxiosPrivate();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdoptionRequests = async () => {
      try {
        if (!user?.email) {
          toast.error('Please log in to view adoption requests.');
          return;
        }
        const email = user?.email;
        const response = await privateAxios.get(`/adoptRequests/byOwnerMail/${email}`);
        setRequests(response.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error('Error fetching adoption requests:', error);
        toast.error(error.response.data.message);
      }
    };
    if(user){
        fetchAdoptionRequests();
    }
  }, [user, privateAxios]);

  const handleStatusChange = async (requestId, newStatus) => {
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, change it!"
      }).then(async(result) => {
        if (result.isConfirmed) {
            try {
                const response = await privateAxios.patch(`/adopted/status/${requestId}`, {
                  status: newStatus,
                });
                toast.success(response.data.message);
                setRequests(requests.map((request) =>
                  request._id === requestId ? { ...request, status: newStatus } : request
                ));
          
              } catch (error) {
                console.error('Error updating adoption status:', error);
                toast.error('Failed to update adoption status.');
              }
          Swal.fire({
            title: "Updated!",
            text: "The status has been updated.",
            icon: "success"
          });
        }
      });
    
  };

  if (loading) {
    return <div>Loading adoption requests...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <Helmet>
        <title>PA || Adoption Requests</title>
      </Helmet>
      <div className="space-y-4">
        <h1 className="text-2xl font-bold">Adoption Requests</h1>
        {requests.length === 0 ? (
          <p>No adoption requests found for your posted pets.</p>
        ) : (
          requests.map((request) => (
            <div key={request._id} className="border p-4 rounded">
              <h3 className="font-semibold text-xl">{request.petName}</h3>
              <p>Adopter: {request.adopterName}</p>
              <p>Email: {request.adopterMail}</p>
              <p>Phone: {request.adopterPhone}</p>
              <p>Address: {request.adopterAddress}</p>
              <p>Status: {request.status}</p>
              <div className="flex gap-4 mt-2">
                <Button
                  onClick={() => handleStatusChange(request._id, 'Accepted')}
                  disabled={request.status !== 'Pending'}
                >
                  Accept
                </Button>
                <Button
                  onClick={() => handleStatusChange(request._id, 'Rejected')}
                  disabled={request.status !== 'Pending'}
                  variant="outline"
                >
                  Reject
                </Button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AdoptionRequTable;
