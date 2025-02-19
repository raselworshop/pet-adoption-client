import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import useAuth from '../../../Hooks/useAuth';
import useAxiosPrivate from '../../../Hooks/useAxiosPrivate';
import { Button } from '../../../components/components/ui/button';
import { Helmet } from 'react-helmet';

const UserManagementTable = () => {
  const [users, setUsers] = useState([]);
  const { user: admin } = useAuth();
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axiosPrivate.get('/users');
        setUsers(response.data);
      } catch (error) {
        toast.error('Failed to fetch users.');
      }
    };

    if (admin) {
      fetchUsers();
    }
  }, [admin]);

  const handleMakeAdmin = async (id) => {
    try {
      const response = await axiosPrivate.patch(`/users/make-admin/${id}`);
      toast.success(response.data.message);
      setUsers(users.map(user => user._id === id ? { ...user, role: 'admin' } : user));
    } catch (error) {
      toast.error('Failed to promote user to admin.');
    }
  };

  const handleBanUser = async (id) => {
    try {
      const response = await axiosPrivate.patch(`/users/ban/${id}`);
      toast.success(response.data.message);
      setUsers(users.map(user => user._id === id ? { ...user, banned: true } : user));
    } catch (error) {
      toast.error('Failed to ban user.');
    }
  };

  return (
    <div className="p-6 bg-white dark:bg-gray-900 shadow-md rounded-lg">
      <Helmet>
        <title>PA || USER MANAGEMENT</title>
      </Helmet>

      <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
        User Management
      </h2>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse border border-gray-300 dark:border-gray-700">
          <thead className="bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-200">
            <tr>
              <th className="p-3 border border-gray-300 dark:border-gray-700">Name</th>
              <th className="p-3 border border-gray-300 dark:border-gray-700">Email</th>
              <th className="p-3 border border-gray-300 dark:border-gray-700">Profile Picture</th>
              <th className="p-3 border border-gray-300 dark:border-gray-700">Role</th>
              <th className="p-3 border border-gray-300 dark:border-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user) => (
                <tr
                  key={user._id}
                  className="hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                >
                  <td className="p-3 border border-gray-300 dark:border-gray-700">
                    {user.name}
                  </td>
                  <td className="p-3 border border-gray-300 dark:border-gray-700">
                    {user.email}
                  </td>
                  <td className="p-3 border border-gray-300 dark:border-gray-700">
                    <img
                      src={user.photo}
                      alt="Profile"
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  </td>
                  <td className="p-3 border border-gray-300 dark:border-gray-700">
                    <span
                      className={`px-3 py-1 text-sm rounded-full ${
                        user.role === 'admin'
                          ? 'bg-green-500 text-white'
                          : 'bg-gray-400 text-white'
                      }`}
                    >
                      {user.role}
                    </span>
                  </td>
                  <td className="p-3 border border-gray-300 dark:border-gray-700 flex gap-2">
                    {user.role !== 'admin' && (
                      <Button
                        className="bg-blue-500 hover:bg-blue-600 text-white"
                        onClick={() => handleMakeAdmin(user._id)}
                      >
                        Make Admin
                      </Button>
                    )}

                    {!user.banned ? (
                      <Button
                        className="bg-red-500 hover:bg-red-600 text-white"
                        onClick={() => handleBanUser(user._id)}
                      >
                        Ban User
                      </Button>
                    ) : (
                      <span className="text-red-500 font-semibold">Banned</span>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="5"
                  className="p-4 text-center text-gray-500 dark:text-gray-400"
                >
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagementTable;
