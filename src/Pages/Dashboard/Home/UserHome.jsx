import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { Card, CardContent } from "../../../components/components/ui/card";
import { Button } from "../../../components/components/ui/button";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "../../../components/components/ui/table";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from "../../../components/components/ui/dialog";
import { Input } from "../../../components/components/ui/input";
import useAuth from "../../../Hooks/useAuth";
import Barchart from "./adminCharts/Barchart";
import MyDonationsChart from "./Usercharts/MyDonationsChart";
import { updateProfile } from "firebase/auth";
import toast from "react-hot-toast";

const UserHome = () => {
  const { user } = useAuth();
  const [name, setName] = useState(user?.displayName || "");
  const [email, setEmail] = useState(user?.email || "");
  const [photo, setPhoto] = useState(user?.photoURL || "");
  const [loading, setLoading] = useState(false)

  const handleUpdate =async () => {
    console.log("Updated Info:", { name, email, photo });
    if(!user) return;
    try {
        setLoading(true)
        await updateProfile(user,{displayName:name, photoURL: photo})
        toast.success("Profile Updated Successfully ✅")
        setLoading(false)
    } catch (error) {
        console.error("Error updating profile:", error);
      toast.error("Profile Update Failed ❌");
      setLoading(false);
    }
  };

  const donationHistory = [
    { id: 1, date: "2024-02-15", amount: "$50", transactionId: "TXN123456" },
    { id: 2, date: "2024-02-10", amount: "$30", transactionId: "TXN654321" },
  ];

  return (
    <div className="container mx-auto p-6">
      <Helmet>
        <title>PA || User Home</title>
      </Helmet>

      <h2 className="text-3xl font-semibold mb-4">Welcome, {user ? user.displayName : "User"} Back!</h2>

      <div className="grid md:grid-cols-2 gap-4">
        <Card className="p-4">
          <CardContent>
            <div className="flex items-center gap-4">
              <img src={photo || "https://via.placeholder.com/100"} alt="Profile" className="w-20 h-20 rounded-full border" />
              <div>
                <h3 className="text-xl font-semibold">{name}</h3>
                <p className="text-gray-500">{email}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="p-4">
          <CardContent>
            <h3 className="text-lg font-semibold mb-2">Settings</h3>

            {/* ✅ Modal Trigger Button */}
            <Dialog>
              <DialogTrigger asChild>
                <Button className="w-full">Update Profile</Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>Update Profile</DialogTitle>
                </DialogHeader>

                {/* ✅ Profile Update Form */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium">Name</label>
                    <Input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium">Email</label>
                    <Input type="email" value={email} disabled />
                  </div>
                  <div>
                    <label className="block text-sm font-medium">Profile Photo URL</label>
                    <Input type="text" value={photo} onChange={(e) => setPhoto(e.target.value)} />
                  </div>
                </div>

                {/* ✅ Save Button */}
                <Button className="w-full" onClick={handleUpdate}>
                  Save Changes
                </Button>
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>
      </div>

      <div className="mt-6 flex flex-col md:flex-row items-center justify-between">
        <Barchart />
        <MyDonationsChart />
      </div>

      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-4">Donation History</h3>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Transaction ID</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {donationHistory.map((donation) => (
              <TableRow key={donation.id}>
                <TableCell>{donation.date}</TableCell>
                <TableCell>{donation.amount}</TableCell>
                <TableCell>{donation.transactionId}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default UserHome;
