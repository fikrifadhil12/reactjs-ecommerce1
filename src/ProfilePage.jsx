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
  FiPlus,
  FiPackage,
  FiDollarSign,
  FiTruck,
  FiShield,
  FiGrid,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const ProfilePage = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("profile");
  const [isEditing, setIsEditing] = useState(false);
  const [isSeller, setIsSeller] = useState(false); // State untuk status penjual
  const [showBecomeSellerModal, setShowBecomeSellerModal] = useState(false);
  const [userData, setUserData] = useState({
    name: "Alex Johnson",
    email: "alex.johnson@example.com",
    phone: "+1 (555) 123-4567",
    joinDate: "March 2021",
    rewardPoints: 2450,
    storeName: "",
    storeDescription: "",
    productsCount: 0,
    storeRating: 0,
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

  const handleBecomeSeller = () => {
    setIsSeller(true);
    setUserData({
      ...userData,
      storeName: "Alex's Fashion Store",
      storeDescription: "High quality fashion items for everyone",
      productsCount: 24,
      storeRating: 4.8,
    });
    setShowBecomeSellerModal(false);

    // 👉 Redirect langsung ke halaman utama web penjual
    const redirectURL = `https://penjual-fikrifadhil12s-projects.vercel.app?name=${encodeURIComponent(
      userData.name
    )}&email=${encodeURIComponent(userData.email)}`;

    window.open(redirectURL, "_blank");
  };

  const handleLogout = () => {
    const isConfirmed = window.confirm("Are you sure you want to logout?");
    if (isConfirmed) {
      localStorage.removeItem("token");
      localStorage.removeItem("isAuthenticated");
      setIsAuthenticated(false);
      navigate("/login");
    }
  };

  const menuItems = [
    { id: "profile", icon: <FiUser />, label: "Profile" },
    ...(isSeller
      ? [
          { id: "store", icon: <FiPackage />, label: "My Store" },
          { id: "sales", icon: <FiDollarSign />, label: "Sales" },
          { id: "products", icon: <FiGrid />, label: "Products" },
          { id: "orders", icon: <FiShoppingBag />, label: "Customer Orders" },
        ]
      : [{ id: "orders", icon: <FiShoppingBag />, label: "Order History" }]),
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
                    <div className="flex flex-col sm:flex-row gap-3">
                      {!isSeller && (
                        <button
                          onClick={() => setShowBecomeSellerModal(true)}
                          className="px-4 py-2 bg-gradient-to-r from-green-500 to-teal-600 text-white rounded-md flex items-center space-x-2 hover:shadow-md transition-shadow"
                        >
                          <FiPlus size={16} />
                          <span>Become a Seller</span>
                        </button>
                      )}
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
                </div>

                {/* Seller Info Section */}
                {isSeller && (
                  <div className="p-6 border-b bg-gradient-to-r from-purple-50 to-indigo-50">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div>
                        <h2 className="text-lg font-bold text-gray-800 mb-2">
                          My Store
                        </h2>
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-indigo-600 flex items-center justify-center text-white text-lg font-bold">
                            {userData.storeName.charAt(0)}
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-800">
                              {userData.storeName}
                            </h3>
                            <p className="text-sm text-gray-600">
                              {userData.storeDescription}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                        <div className="bg-white p-3 rounded-lg shadow-sm text-center">
                          <p className="text-sm text-gray-500">Products</p>
                          <p className="font-bold text-purple-600">
                            {userData.productsCount}
                          </p>
                        </div>
                        <div className="bg-white p-3 rounded-lg shadow-sm text-center">
                          <p className="text-sm text-gray-500">Rating</p>
                          <p className="font-bold text-yellow-500 flex items-center justify-center">
                            <FiStar className="mr-1" />
                            {userData.storeRating}
                          </p>
                        </div>
                        <div className="bg-white p-3 rounded-lg shadow-sm text-center">
                          <p className="text-sm text-gray-500">Status</p>
                          <p className="font-bold text-green-500">Active</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

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

            {/* Store Tab Content */}
            {activeTab === "store" && isSeller && (
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-gray-800">My Store</h2>
                  <button className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 flex items-center space-x-2">
                    <FiEdit size={16} />
                    <span>Edit Store</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="bg-gradient-to-r from-purple-50 to-indigo-50 p-6 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center text-purple-600 shadow-sm">
                        <FiPackage size={24} />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800">
                          Products
                        </h3>
                        <p className="text-2xl font-bold text-purple-600">
                          {userData.productsCount}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-yellow-50 to-amber-50 p-6 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center text-yellow-600 shadow-sm">
                        <FiStar size={24} />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800">
                          Store Rating
                        </h3>
                        <p className="text-2xl font-bold text-yellow-600 flex items-center">
                          {userData.storeRating}
                          <FiStar className="ml-1 fill-current" />
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-green-50 to-teal-50 p-6 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center text-green-600 shadow-sm">
                        <FiDollarSign size={24} />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800">
                          Monthly Revenue
                        </h3>
                        <p className="text-2xl font-bold text-green-600">
                          $3,245.00
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    Store Information
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-1">
                        Store Name
                      </label>
                      <p className="text-gray-800 font-medium">
                        {userData.storeName}
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-1">
                        Description
                      </label>
                      <p className="text-gray-800">
                        {userData.storeDescription}
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-1">
                        Store Policies
                      </label>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
                        <div className="flex items-start space-x-3">
                          <FiTruck className="text-purple-600 mt-1" />
                          <div>
                            <h4 className="font-medium text-gray-800">
                              Shipping
                            </h4>
                            <p className="text-sm text-gray-600">
                              Free shipping on orders over $50
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-3">
                          <FiShield className="text-purple-600 mt-1" />
                          <div>
                            <h4 className="font-medium text-gray-800">
                              Returns
                            </h4>
                            <p className="text-sm text-gray-600">
                              30-day return policy
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Other Tabs Content */}
            {activeTab !== "profile" && activeTab !== "store" && (
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

      {/* Become Seller Modal */}
      {showBecomeSellerModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              Become a Seller
            </h3>
            <p className="text-gray-600 mb-6">
              Start your own shop and reach millions of customers. You'll be
              able to list products, manage orders, and grow your business.
            </p>
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Store Name
                </label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
                  placeholder="Enter your store name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Store Description
                </label>
                <textarea
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
                  rows="3"
                  placeholder="Tell us about your store"
                ></textarea>
              </div>
            </div>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowBecomeSellerModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleBecomeSeller}
                className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
              >
                Create Store
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
