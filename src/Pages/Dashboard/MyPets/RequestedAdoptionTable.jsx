import React, { useEffect, useState } from 'react';
import useAxiosPrivate from '../../../Hooks/useAxiosPrivate';
import toast from 'react-hot-toast';
import useAuth from '../../../Hooks/useAuth';

const RequestedAdoptionTable = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const axiosPrivate = useAxiosPrivate();
  const { user } = useAuth()
  const userEmail = user?.email

  useEffect(() => {
    if ( !userEmail) return;

    const fetchRequests = async () => {
      try {
        const response = await axiosPrivate.get(`/adopted/requests/${userEmail}`);
        setRequests(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching requests:', err);
        setError(err.response?.data?.message || 'An error occurred.');
        setLoading(false);
      }
    };

    fetchRequests();
  }, [userEmail]);

  const handleCancelRequest = async (requestId) => {
    try {
      const response = await axiosPrivate.patch(`/adopted/status/${requestId}`, {
        status: 'Cancelled',
      });
      toast.success(response.data.message || 'Request cancelled successfully!');
      setRequests((prev) => prev.filter((req) => req._id !== requestId));
    } catch (err) {
      console.error('Error cancelling request:', err);
      toast.error(err.response?.data?.message || 'Failed to cancel request.');
    }
  };

  if (loading) return <p>Loading adoption requests...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div>
      <h2>Adoption Requested list</h2>
      {requests.length === 0 ? (
        <p>No requests found for this pet by you.</p>
      ) : (
        <table border="1" cellPadding="8" cellSpacing="0">
          <thead>
            <tr>
              <th>Adopter Name</th>
              <th>Email</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((request) => (
              <tr key={request._id}>
                <td>{request.adopterName || 'N/A'}</td>
                <td>{request.adopterMail}</td>
                <td>{request.status}</td>
                <td>
                  {request.status === 'Pending' ? (
                    <button onClick={() => handleCancelRequest(request._id)}>
                      Cancel Request
                    </button>
                  ) : (
                    'N/A'
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default RequestedAdoptionTable;
