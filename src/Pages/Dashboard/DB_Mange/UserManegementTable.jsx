import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import useAuth from '../../../Hooks/useAuth';
import useAxiosPrivate from '../../../Hooks/useAxiosPrivate';
import { Button } from '@/components/components/ui/button';
import { Helmet } from 'react-helmet';

const UserManagementTable = () => {
  const [users, setUsers] = useState([]);
  const { user:admin } = useAuth();
  const axiosPrivate = useAxiosPrivate()

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axiosPrivate.get('/users');
        console.log(response.data)
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
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
      console.error('Error promoting user to admin:', error);
      toast.error('Failed to promote user to admin.');
    }
  };

  const handleBanUser = async (id) => {
    try {
      const response = await axiosPrivate.patch(`/users/ban/${id}`);
      toast.success(response.data.message);
      setUsers(users.map(user => user._id === id ? { ...user, banned: true } : user));
    } catch (error) {
      console.error('Error banning user:', error);
      toast.error('Failed to ban user.');
    }
  };

  return (
    <div className='w-full'>
      <h2>User Management</h2>
      <Helmet><title>PA || USER MANAGE</title></Helmet>
      <table className='w-full mx-auto'>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Profile Picture</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td><img src={user.photo} alt="Profile" width="50" height="50" /></td>
              <td>{user.role}</td>
              <td>
                {user.role === 'admin' ? (
                  <span className="mx-2">Already an Admin</span>
                ) : (
                  <Button className="mx-2" onClick={() => handleMakeAdmin(user._id)}>Make Admin</Button>
                )}

                {!user.banned && (
                  <Button onClick={() => handleBanUser(user._id)}>Ban User</Button>
                )}
                {user.banned && <span>Banned</span>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserManagementTable;
