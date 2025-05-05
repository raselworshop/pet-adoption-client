import React, { useState, useEffect } from "react";
import { FaFacebook, FaGithub, FaLinkedin, FaMapMarkerAlt, FaGlobe, FaPhone, FaUser, FaInfoCircle } from "react-icons/fa";
import { MdEmail, MdCake } from "react-icons/md";
import toast from "react-hot-toast";
import useAuth from "../../../Hooks/useAuth";
import { updateProfile } from "firebase/auth";
import useAxiosPrivate from "../../../Hooks/useAxiosPrivate";

const Profile = () => {
  const [editMode, setEditMode] = useState(false);
  const { user } = useAuth();
  const axiosPrivate = useAxiosPrivate()
  const [loading, setLoading] = useState(false);

  const [userData, setUserData] = useState({
    name: user?.displayName || "John Doe",
    username: "johndoe123",
    email: user?.email || "john.doe@example.com",
    role: "Verified Adopter",
    photo: user?.photoURL || "https://i.pravatar.cc/150?img=12",
    location: "Dhaka, Bangladesh",
    website: "https://johndoe.com",
    dob: "1990-01-01",
    phone: "+880123456789",
    gender: "male",
    bio: "Animal lover. Volunteer. Pet rescuer.",
    facebook: "https://facebook.com/johndoe",
    linkedin: "https://linkedin.com/in/johndoe",
    github: "https://github.com/johndoe",
  });

  // Load data from localStorage and MongoDB on mount
  useEffect(() => {
    // Load from localStorage
    const localData = localStorage.getItem("userProfile");
    if (localData) {
      const parsedData = JSON.parse(localData);
      setUserData((prev) => ({
        ...prev,
        location: parsedData.location || prev.location,
        website: parsedData.website || prev.website,
        dob: parsedData.dob || prev.dob,
        phone: parsedData.phone || prev.phone,
        gender: parsedData.gender || prev.gender,
        bio: parsedData.bio || prev.bio,
        facebook: parsedData.facebook || prev.facebook,
        linkedin: parsedData.linkedin || prev.linkedin,
        github: parsedData.github || prev.github,
      }));
    }

    // Fetch username and role from MongoDB
    const fetchUserData = async () => {
      try {
        const response = await axiosPrivate.get(`/api/user/${user?.email}`);
        if (response.ok) {
          setUserData((prev) => ({
            ...prev,
            username: response.data.userName || prev.username,
            role: response.data.role || prev.role,
          }));
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        toast.error("Failed to load user data");
      }
    };

    if (user?.email) {
      fetchUserData();
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size should be less than 5MB");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || "image_me");
      formData.append("cloud_name", import.meta.env.VITE_CLOUD_NAME);

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Failed to upload image to Cloudinary");
      }

      const data = await response.json();
      const imageUrl = data.secure_url;

      setUserData((prev) => ({ ...prev, photo: imageUrl }));
      toast.success("Image uploaded successfully!");
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error("Failed to upload image: " + error.message);
    }
  };

  const handleEditToggle = async () => {
    if (editMode) {
      // Save to localStorage
      const localStorageData = {
        location: userData.location,
        website: userData.website,
        dob: userData.dob,
        phone: userData.phone,
        gender: userData.gender,
        bio: userData.bio,
        facebook: userData.facebook,
        linkedin: userData.linkedin,
        github: userData.github,
      };
      localStorage.setItem("userProfile", JSON.stringify(localStorageData));

      // Update Firebase
      if (user) {
        try {
          await updateProfile(user, {
            displayName: userData.name,
            photoURL: userData.photo,
          });

          // Save to MongoDB (only specific fields)
          const response = await axiosPrivate.post("/api/update-profile", {
              name: userData.name,
              email: userData.email,
              photo: userData.photo,
              userName: userData.username, 
          });

          if (!response.ok) {
            throw new Error("Failed to update profile in MongoDB");
          }

          toast.success("Profile updated successfully ✅");
        } catch (error) {
          console.error("Error updating profile:", error);
          toast.error("Profile update failed ❌");
        }
      }
    }

    setEditMode(!editMode);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 dark:from-gray-800 dark:to-gray-900 py-10 px-4 flex items-center justify-center">
      <div className="bg-white dark:bg-gray-800 shadow-2xl rounded-2xl p-8 w-full max-w-4xl grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Column: Image and Basic Info */}
        <div className="flex flex-col items-center space-y-4">
          <div className="relative">
            <img
              className="w-32 h-32 rounded-full object-cover shadow-lg border-4 border-sky-500"
              src={userData.photo}
              alt="Profile"
            />
            {editMode && (
              <label className="mt-4 block">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Upload new photo</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="mt-2 block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:text-gray-400"
                />
              </label>
            )}
          </div>
          <div className="text-center">
            {editMode ? (
              <input
                name="name"
                value={userData.name}
                onChange={handleChange}
                className="text-xl font-semibold text-center bg-transparent dark:text-gray-100 border-b border-sky-500"
              />
            ) : (
              <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">{userData.name}</h2>
            )}
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Role: {userData.role}</p>
          </div>
          {/* Social Icons */}
          <div className="flex justify-center space-x-4 mt-4">
            <a
              href={userData.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 text-xl hover:scale-110 transition-transform"
            >
              <FaFacebook />
            </a>
            <a
              href={userData.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 text-xl hover:scale-110 transition-transform"
            >
              <FaLinkedin />
            </a>
            <a
              href={userData.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-800 dark:text-white text-xl hover:scale-110 transition-transform"
            >
              <FaGithub />
            </a>
          </div>
        </div>

        {/* Right Column: Detailed Info */}
        <div className="md:col-span-2 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Username */}
            <div className="flex items-center space-x-2">
              <FaUser className="text-sky-500" />
              {editMode ? (
                <input
                  name="username"
                  value={userData.username}
                  onChange={handleChange}
                  className="text-sm bg-transparent dark:text-gray-300 border-b border-sky-500 w-full"
                />
              ) : (
                <span className="text-sm text-gray-700 dark:text-gray-300">{userData.username}</span>
              )}
            </div>
            {/* Email */}
            <div className="flex items-center space-x-2">
              <MdEmail className="text-sky-500" />
              <span className="text-sm text-gray-500 dark:text-gray-400">{userData.email}</span>
            </div>
            {/* Location */}
            <div className="flex items-center space-x-2">
              <FaMapMarkerAlt className="text-sky-500" />
              {editMode ? (
                <input
                  name="location"
                  value={userData.location}
                  onChange={handleChange}
                  className="text-sm bg-transparent dark:text-gray-300 border-b border-sky-500 w-full"
                />
              ) : (
                <span className="text-sm text-gray-700 dark:text-gray-300">{userData.location}</span>
              )}
            </div>
            {/* Website */}
            <div className="flex items-center space-x-2">
              <FaGlobe className="text-sky-500" />
              {editMode ? (
                <input
                  name="website"
                  value={userData.website}
                  onChange={handleChange}
                  className="text-sm bg-transparent dark:text-gray-300 border-b border-sky-500 w-full"
                />
              ) : (
                <a href={userData.website} target="_blank" rel="noopener noreferrer" className="text-sm text-sky-500 hover:underline">
                  {userData.website}
                </a>
              )}
            </div>
            {/* DOB */}
            <div className="flex items-center space-x-2">
              <MdCake className="text-sky-500" />
              {editMode ? (
                <input
                  type="date"
                  name="dob"
                  value={userData.dob}
                  onChange={handleChange}
                  className="text-sm bg-transparent dark:text-gray-300 border-b border-sky-500 w-full"
                />
              ) : (
                <span className="text-sm text-gray-700 dark:text-gray-300">{userData.dob}</span>
              )}
            </div>
            {/* Phone */}
            <div className="flex items-center space-x-2">
              <FaPhone className="text-sky-500" />
              {editMode ? (
                <input
                  name="phone"
                  value={userData.phone}
                  onChange={handleChange}
                  className="text-sm bg-transparent dark:text-gray-300 border-b border-sky-500 w-full"
                />
              ) : (
                <span className="text-sm text-gray-700 dark:text-gray-300">{userData.phone}</span>
              )}
            </div>
            {/* Gender */}
            <div className="flex items-center space-x-2">
              <FaUser className="text-sky-500" />
              {editMode ? (
                <select
                  name="gender"
                  value={userData.gender}
                  onChange={handleChange}
                  className="text-sm bg-transparent dark:text-gray-300 border-b border-sky-500 w-full"
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              ) : (
                <span className="text-sm text-gray-700 dark:text-gray-300">{userData.gender}</span>
              )}
            </div>
          </div>
          {/* Bio */}
          <div className="flex items-start space-x-2">
            <FaInfoCircle className="text-sky-500 mt-1" />
            {editMode ? (
              <textarea
                name="bio"
                value={userData.bio}
                onChange={handleChange}
                className="mt-2 w-full text-sm bg-transparent dark:text-gray-300 border-b border-sky-500 resize-none"
                rows={3}
                placeholder="Short bio..."
              />
            ) : (
              <p className="text-sm text-gray-700 dark:text-gray-300">{userData.bio}</p>
            )}
          </div>
          {/* Edit Button */}
          <div className="flex justify-center mt-6">
            <button
              onClick={handleEditToggle}
              className="px-6 py-2 bg-sky-600 hover:bg-sky-700 text-white rounded-lg transition duration-200 shadow-md"
            >
              {editMode ? "Save Changes" : "Edit Profile"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

// ```javascript




// // Admin-only: Update user role
// app.post('/api/admin/update-role', verifyToken, verifyAdmin, async (req, res) => {
//   const { email, role } = req.body;
//   if (!email || !role) {
//     return res.status(400).send({ message: 'Email and role are required' });
//   }
//   if (!['user', 'admin', 'verified adopter'].includes(role)) {
//     return res.status(400).send({ message: 'Invalid role' });
//   }
//   try {
//     const result = await usersCollection.updateOne(
//       { email },
//       { $set: { role } }
//     );
//     if (result.matchedCount === 0) {
//       return res.status(404).send({ message: 'User not found' });
//     }
//     res.send({ message: 'Role updated successfully' });
//   } catch (error) {
//     console.error('Error updating role:', error);
//     res.status(500).send({ message: 'Failed to update role' });
//   }
// });
// ```