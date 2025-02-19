import React from "react";
import { Helmet } from "react-helmet";
import { Card, CardContent } from "../../../components/components/ui/card";
import { Button } from "../../../components/components/ui/button";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "../../../components/components/ui/table";
import useAuth from "../../../Hooks/useAuth";
import Barchart from "./adminCharts/Barchart";
import MyDonationsChart from "./Usercharts/MyDonationsChart";

const UserHome = () => {
  const { user } = useAuth();
  const donationHistory = [
    { id: 1, date: "2024-02-15", amount: "$50", transactionId: "TXN123456" },
    { id: 2, date: "2024-02-10", amount: "$30", transactionId: "TXN654321" },
  ];
console.log(user)
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
              <img
                src={user?.photoURL || "https://via.placeholder.com/100"}
                alt="Profile"
                className="w-20 h-20 rounded-full border"
              />
              <div>
                <h3 className="text-xl font-semibold">{user?.displayName || "User"}</h3>
                <p className="text-gray-500">{user?.email || "No Email"}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="p-4">
          <CardContent>
            <h3 className="text-lg font-semibold mb-2">Settings</h3>
            <Button className="w-full">Update Profile</Button>
          </CardContent>
        </Card>
      </div>
      <div className="mt-6 flex flex-col md:flex-row items-center">
        <Barchart/>
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
