import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet";
import useAuth from "../../../Hooks/useAuth";
import useAxiosPrivate from "../../../Hooks/useAxiosPrivate";
import { Button } from "../../../components/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../../components/components/ui/table";
import { Badge } from "../../../components/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "../../../components/components/ui/dialog";
import { Skeleton } from "../../../components/components/ui/skeleton";

const AdoptionRequTable = () => {
  const { user } = useAuth();
  const privateAxios = useAxiosPrivate();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [statusLoading, setStatusLoading] = useState(false);

  useEffect(() => {
    const fetchAdoptionRequests = async () => {
      if (!user?.email) return toast.error("Please log in to view adoption requests.");
      try {
        const response = await privateAxios.get(`/adoptRequests/byOwnerMail/${user.email}`);
        setRequests(response.data);
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to fetch adoption requests.");
      } finally {
        setLoading(false);
      }
    };
    if (user) fetchAdoptionRequests();
  }, [user, privateAxios]);

  const handleStatusChange = async (requestId, newStatus) => {
    setStatusLoading(true);
    try {
      const response = await privateAxios.patch(`/adopted/status/${requestId}`, { status: newStatus });
      toast.success(response.data.message);
      setRequests((prev) =>
        prev.map((req) => (req._id === requestId ? { ...req, status: newStatus } : req))
      );
    } catch (error) {
      toast.error("Failed to update adoption status.");
    } finally {
      setModalOpen(false);
      setStatusLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <Helmet>
        <title>PA || Adoption Requests</title>
      </Helmet>

      <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">Adoption Requests</h1>

      {loading ? (
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} className="h-12 w-full rounded-md" />
          ))}
        </div>
      ) : requests.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-400 text-center">No adoption requests found for your posted pets.</p>
      ) : (
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Pet Name</TableHead>
                <TableHead>Adopter</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Address</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {requests.map((request) => (
                <TableRow key={request._id}>
                  <TableCell>{request.petName}</TableCell>
                  <TableCell>{request.adopterName}</TableCell>
                  <TableCell>{request.adopterMail}</TableCell>
                  <TableCell>{request.adopterPhone}</TableCell>
                  <TableCell>{request.adopterAddress}</TableCell>
                  <TableCell>
                    <Badge
                      className={`px-2 py-1 ${
                        request.status === "Accepted"
                          ? "bg-green-500 text-white"
                          : request.status === "Rejected"
                          ? "bg-red-500 text-white"
                          : "bg-yellow-500 text-black"
                      }`}
                    >
                      {request.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        disabled={request.status !== "Pending"}
                        onClick={() => {
                          setSelectedRequest({ id: request._id, status: "Accepted" });
                          setModalOpen(true);
                        }}
                      >
                        Accept
                      </Button>
                      <Button
                        variant="destructive"
                        disabled={request.status !== "Pending"}
                        onClick={() => {
                          setSelectedRequest({ id: request._id, status: "Rejected" });
                          setModalOpen(true);
                        }}
                      >
                        Reject
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {/* Modal for Status Change Confirmation */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Status Change</DialogTitle>
          </DialogHeader>
          <p>Are you sure you want to {selectedRequest?.status.toLowerCase()} this request?</p>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setModalOpen(false)}
              disabled={statusLoading}
            >
              Cancel
            </Button>
            <Button
              onClick={() => handleStatusChange(selectedRequest.id, selectedRequest.status)}
              disabled={statusLoading}
            >
              {statusLoading ? "Updating..." : "Confirm"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdoptionRequTable;
