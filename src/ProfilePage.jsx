import React, { useState } from "react";
import {
  FiUser,
  FiMail,
  FiPhone,
  FiMapPin,
  FiEdit,
  FiSave,
  FiLock,
  FiShoppingBag,
  FiHeart,
  FiBell,
  FiSettings,
  FiLogOut,
  FiCreditCard,
  FiCalendar,
  FiStar,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const ProfilePage = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("profile");
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    name: "Alex Johnson",
    email: "alex.johnson@example.com",
    phone: "+1 (555) 123-4567",
    joinDate: "March 2021",
    rewardPoints: 2450,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    setIsEditing(false);
    // Here you would typically send the updated data to your backend
  };

  const handleLogout = () => {
    const isConfirmed = window.confirm("Are you sure you want to logout?");
    if (isConfirmed) {
      localStorage.removeItem("token");
      localStorage.removeItem("isAuthenticated");
      setIsAuthenticated(false); // ✅ ini akan memicu redirect ke login
      navigate("/login");
    }
  };
  const menuItems = [
    { id: "profile", icon: <FiUser />, label: "Profile" },
    { id: "orders", icon: <FiShoppingBag />, label: "Order History" },
    { id: "addresses", icon: <FiMapPin />, label: "Saved Addresses" },
    { id: "payments", icon: <FiCreditCard />, label: "Payment Methods" },
    { id: "wishlist", icon: <FiHeart />, label: "Wishlist" },
    { id: "notifications", icon: <FiBell />, label: "Notifications" },
    { id: "settings", icon: <FiSettings />, label: "Settings" },
    {
      id: "logout",
      icon: <FiLogOut />,
      label: "Log out",
      action: handleLogout,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar Menu */}
          <div className="w-full md:w-64 bg-white rounded-lg shadow-sm">
            <div className="p-4 border-b">
              <h2 className="text-lg font-semibold text-gray-800">
                My Account
              </h2>
            </div>
            <nav>
              <ul className="divide-y divide-gray-100">
                {menuItems.map((item) => (
                  <li key={item.id}>
                    <button
                      onClick={() =>
                        item.action ? item.action() : setActiveTab(item.id)
                      }
                      className={`w-full text-left px-4 py-3 flex items-center space-x-3 ${
                        activeTab === item.id
                          ? "text-purple-600 bg-purple-50"
                          : "text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      <span className="text-lg">{item.icon}</span>
                      <span>{item.label}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1 bg-white rounded-lg shadow-sm overflow-hidden">
            {activeTab === "profile" && (
              <div>
                {/* Profile Header */}
                <div className="p-6 border-b">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-500 to-indigo-600 flex items-center justify-center text-white text-2xl font-bold">
                        {userData.name.charAt(0)}
                      </div>
                      <div>
                        <h1 className="text-xl font-bold text-gray-800">
                          {userData.name}
                        </h1>
                        <p className="text-gray-600">{userData.email}</p>
                        <p className="text-gray-600">{userData.phone}</p>
                      </div>
                    </div>
                    <button
                      onClick={
                        isEditing ? handleSave : () => setIsEditing(true)
                      }
                      className={`px-4 py-2 rounded-md flex items-center space-x-2 ${
                        isEditing
                          ? "bg-green-500 text-white"
                          : "bg-purple-600 text-white"
                      }`}
                    >
                      {isEditing ? (
                        <>
                          <FiSave size={16} />
                          <span>Save Changes</span>
                        </>
                      ) : (
                        <>
                          <FiEdit size={16} />
                          <span>Edit Profile</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Member Info */}
                <div className="p-6 border-b">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">
                        Member Since
                      </h3>
                      <p className="text-gray-800 flex items-center">
                        <FiCalendar className="mr-2" />
                        {userData.joinDate}
                      </p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">
                        Reward Points
                      </h3>
                      <p className="text-gray-800 flex items-center">
                        <FiStar className="mr-2 text-yellow-500" />
                        {userData.rewardPoints.toLocaleString()} ( $
                        {(userData.rewardPoints / 100).toFixed(2)} value)
                      </p>
                    </div>
                  </div>
                </div>

                {/* Account Details */}
                <div className="p-6">
                  <h2 className="text-lg font-semibold text-gray-800 mb-4">
                    Account Details
                  </h2>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <tbody className="bg-white divide-y divide-gray-200">
                        <tr>
                          <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-500">
                            Full Name
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-800 font-medium">
                            {isEditing ? (
                              <input
                                type="text"
                                name="name"
                                value={userData.name}
                                onChange={handleInputChange}
                                className="w-full p-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
                              />
                            ) : (
                              userData.name
                            )}
                          </td>
                        </tr>
                        <tr>
                          <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-500">
                            Email
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-800 font-medium">
                            {isEditing ? (
                              <input
                                type="email"
                                name="email"
                                value={userData.email}
                                onChange={handleInputChange}
                                className="w-full p-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
                              />
                            ) : (
                              userData.email
                            )}
                          </td>
                        </tr>
                        <tr>
                          <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-500">
                            Phone
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-800 font-medium">
                            {isEditing ? (
                              <input
                                type="tel"
                                name="phone"
                                value={userData.phone}
                                onChange={handleInputChange}
                                className="w-full p-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
                              />
                            ) : (
                              userData.phone
                            )}
                          </td>
                        </tr>
                        <tr>
                          <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-500">
                            Password
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-800 font-medium">
                            <span className="text-xl tracking-widest">
                              •••••••
                            </span>
                            <button
                              onClick={() => navigate("/change-password")}
                              className="ml-4 text-sm text-purple-600 hover:text-purple-800 hover:underline"
                            >
                              Change password
                            </button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* Other Tabs Content */}
            {activeTab !== "profile" && (
              <div className="p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4">
                  {menuItems.find((item) => item.id === activeTab)?.label}
                </h2>
                <div className="bg-gray-50 rounded-lg p-8 text-center">
                  <p className="text-gray-500">
                    {`This is the ${
                      menuItems.find((item) => item.id === activeTab)?.label
                    } section. Content will be displayed here.`}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
