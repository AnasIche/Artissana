import { useState, useEffect } from "react";
import {
  Home,
  BarChart,
  FileText,
  Users,
  Box,
  Settings,
  CheckCircle,
  XCircle,
  Bell,
  UserCircle,
  LogOut
} from "lucide-react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement
} from "chart.js";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Costemers from "./Costemers";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

const Sidebar = ({ activeSection, setActiveSection, setIsAuthenticated, setUserRole }) => {
  const navigate = useNavigate();

  const menuItems = [
    { name: "Home", icon: <Home size={20} /> },
    { name: "Analytics", icon: <BarChart size={20} /> },
    { name: "Reports", icon: <FileText size={20} /> },
    { name: "Customers", icon: <Users size={20} /> },
    { name: "Products", icon: <Box size={20} /> },
    { name: "Settings", icon: <Settings size={20} /> },
    { name: "Deconection", icon: <LogOut size={20} /> },
  ];

  const handleClick = (itemName) => {
    if (itemName === "Deconection") {
      handleLogout();
    } else {
      setActiveSection(itemName);
      if (itemName === "Home") {
        navigate("/");
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    if (setIsAuthenticated) setIsAuthenticated(false);
    if (setUserRole) setUserRole(null);
    navigate("/"); // Redirect to login page
  };

  return (
    <div className="w-64 h-screen bg-white p-5 shadow-lg">
      <h1 className="text-2xl font-bold mb-5">AdminPanel</h1>
      <ul>
        {menuItems.map((item, i) => (
          <li
            key={i}
            onClick={() => handleClick(item.name)}
            className={`p-3 flex items-center space-x-2 cursor-pointer hover:bg-blue-500 hover:text-white rounded-md ${activeSection === item.name ? "bg-blue-500 text-white" : ""}`}
          >
            {item.icon} <span>{item.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

const Header = () => (
  <div className="flex justify-between items-center p-4 bg-white shadow-md sticky top-0 z-10">
    <h1 className="text-2xl font-bold">Dashboard</h1>
    <div className="flex items-center space-x-4">
      <Bell size={24} className="cursor-pointer text-gray-600 hover:text-gray-900" />
      <UserCircle size={30} className="cursor-pointer text-gray-600 hover:text-gray-900" />
    </div>
  </div>
);

const Chart = () => {
  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [
      {
        label: "Sales",
        data: [1000, 2000, 1500, 3000, 2500, 4000, 3500, 5000, 4500, 6000, 5500, 7000],
        borderColor: "#3b82f6",
        backgroundColor: "rgba(59, 130, 246, 0.5)"
      }
    ]
  };
  return <Line data={data} />;
};

const ProductsTable = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/products");
      setProducts(response.data);
    } catch (error) {
      console.error("Error loading products", error);
    }
  };

  const handleConfirm = async (id) => {
  try {
    await axios.put(`http://localhost:8000/api/produits/${id}/confirmer`);
    fetchProducts(); // Recharge la liste des produits
  } catch (error) {
    console.error("Erreur lors de la confirmation du produit", error);
  }
};


  const handleCancel = async (id) => {
    try {
      await axios.post(`/api/products/${id}/cancel`);
      fetchProducts(); // Reload the list after canceling the product
    } catch (error) {
      console.error("Error canceling product", error);
    }
  };

  return (
    <div className="bg-white p-5 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Pending Products</h2>
      <table className="w-full border-collapse table-auto">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-3 text-left">Image</th>
            <th className="p-3 text-left">Title</th>
            <th className="p-3 text-left">Description</th>
            <th className="p-3 text-left">Price</th>
            <th className="p-3 text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          {products
            .filter((product) => product.statut === "en_attente")
            .map((product) => (
              <tr
                key={product.id}
                className="border-b hover:bg-gray-50 transition-all"
              >
                <td className="p-3">
                  <img
                    src={`http://localhost:8000${product.image_path}`}
                    className="w-20 h-20 object-cover rounded"
                  />
                </td>
                <td className="p-3 font-semibold">{product.nom}</td>
                <td className="p-3">{product.description}</td>
                <td className="p-3 text-blue-600 font-bold">{product.prix} DH</td>
                <td className="p-3 flex space-x-4">
                  <button
                    onClick={() => handleConfirm(product.id)}
                    className="text-green-500 hover:text-green-700 text-lg"
                  >
                    <CheckCircle size={24} />
                  </button>
                  <button
                    onClick={() => handleCancel(product.id)}
                    className="text-red-500 hover:text-red-700 text-lg"
                  >
                    <XCircle size={24} />
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

const DashboardContent = () => (
  <div className="p-4">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="bg-white p-5 rounded-lg shadow-md">Total Products: 25,154</div>
      <div className="bg-white p-5 rounded-lg shadow-md">Total Orders: $16,000</div>
      <div className="bg-white p-5 rounded-lg shadow-md">Total Customers: 15,400</div>
      <div className="bg-white p-5 rounded-lg shadow-md">Sales: 12,340</div>
    </div>
    <div className="mt-5 bg-white p-5 rounded-lg shadow-md">
      <h2 className="text-lg font-bold">Sales Overview</h2>
      <Chart />
    </div>
    <div className="mt-5">
      <ProductsTable />
    </div>
  </div>
);

export default function Dashboard() {
  const [activeSection, setActiveSection] = useState("Dashboard");
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [userRole, setUserRole] = useState(localStorage.getItem("role"));

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
      <Sidebar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        setIsAuthenticated={setIsAuthenticated}
        setUserRole={setUserRole}
      />
      <div className="flex-1">
        <Header />
        {activeSection === "Dashboard" ? (
          <DashboardContent />
        ) : activeSection === "Customers" ? (
          <div className="p-4">
            <Costemers />
          </div>
        ) : activeSection === "Products" ? (
          <div className="p-4">
            <ProductsTable />
          </div>
        ) : (
          <h1 className="text-2xl font-bold p-6">{activeSection}</h1>
        )}
      </div>
    </div>
  );
}

