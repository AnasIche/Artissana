import React, { useState } from "react";
import {
  Home,
  Users,
  Package,
  FileText,
  Settings,
  Briefcase,
  LogOut,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    // setIsAuthenticated and setUserRole should be managed by context or higher component
    navigate("/"); // Redirect to login
  };

  const menuItems = [
    { name: "People", icon: <Users size={20} /> },
    { name: "Product", icon: <Package size={20} /> },
    { name: "Reports", icon: <FileText size={20} /> },
    { name: "Administration", icon: <Settings size={20} /> },
    { name: "Projects", icon: <Briefcase size={20} /> },
    { name: "Deconection", icon: <LogOut size={20} /> },
  ];

  const projects = [
    { id: 1, name: "Website Redesign", status: "In Progress" },
    { id: 2, name: "New Product Launch", status: "Completed" },
    { id: 3, name: "Marketing Campaign", status: "Pending" },
    { id: 4, name: "Mobile App Development", status: "In Progress" },
  ];

  return (
    <div className="flex bg-gray-100 min-h-screen text-gray-800">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md h-screen p-5">
        <h2 className="text-lg font-semibold mb-5">DashBorde</h2>
        <ul className="space-y-4">
          <li
            className="flex items-center gap-3 hover:text-blue-500 cursor-pointer"
            onClick={() => setActiveTab("")}
          >
            <Home size={20} /> <Link to="/">Homme</Link>
          </li>
          {menuItems.map((item) => (
            <li
              key={item.name}
              className={`flex items-center gap-3 cursor-pointer p-2 rounded ${
                activeTab === item.name ? "text-blue-500 font-bold" : "hover:text-blue-500"
              }`}
              onClick={() => {
                if (item.name === "Deconection") {
                  handleLogout();
                } else {
                  setActiveTab(item.name);
                }
              }}
            >
              {item.icon} {item.name}
            </li>
          ))}
        </ul>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        {activeTab ? (
          activeTab === "Projects" ? (
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h1 className="text-xl font-semibold">Projects</h1>
              <div className="grid grid-cols-2 gap-4 mt-4 text-sm">
                <p><span className="font-semibold">Project 1:</span> Website Redesign</p>
                <p><span className="font-semibold">Project 2:</span> New Product Launch</p>
                <p><span className="font-semibold">Project 3:</span> Marketing Campaign</p>
                <p><span className="font-semibold">Project 4:</span> Mobile App Development</p>
              </div>
            </div>
          ) : (
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h1 className="text-xl font-semibold">{activeTab}</h1>
            </div>
          )
        ) : (
          <div className="bg-white p-6 rounded-lg shadow-md">
            {/* Header */}
            <div className="flex justify-between items-center border-b pb-4">
              <h2 className="text-xl font-semibold">My details</h2>
              <img
                src="https://via.placeholder.com/60"
                alt="User"
                className="w-16 h-16 rounded-full border"
              />
            </div>
            {/* User Details */}
            <div className="grid grid-cols-2 gap-4 mt-4 text-sm">
              <p><span className="font-semibold">Name:</span> Dominique Charpentier</p>
              <p><span className="font-semibold">Title:</span> Jellaba</p>
              <p><span className="font-semibold">Practice:</span> Finance</p>
              <p><span className="font-semibold">City:</span> Marrakech</p>
              <p><span className="font-semibold">Contact:</span> Vendeur</p>
              <p><span className="font-semibold">Status History:</span> Activated (13/05/2009)</p>
            </div>

            {/* Projects Table under My Details */}
            <h3 className="text-lg font-semibold mt-6">Projects</h3>
            <table className="min-w-full mt-4 table-auto">
              <thead>
                <tr className="bg-gray-200">
                  <th className="px-4 py-2 text-left">Project Name</th>
                  <th className="px-4 py-2 text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                {projects.map((project) => (
                  <tr key={project.id} className="border-b">
                    <td className="px-4 py-2">{project.name}</td>
                    <td className="px-4 py-2">{project.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
