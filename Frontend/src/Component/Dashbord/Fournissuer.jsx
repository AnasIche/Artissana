"use client"
import { useState ,useEffect} from "react"
import {
  BarChart3,
  ShoppingBag,
  Package,
  Users,
  Settings,
  Bell,
  Search,
  Menu,
  X,
  ChevronDown,
  Plus,
  ArrowUpRight,
  ArrowDownRight,
  DollarSign,
  ShoppingCart,
  Star,
  Eye,
  MoreHorizontal,
  Calendar,
  Filter,
  LogOut,
} from "lucide-react";
import { useNavigate } from "react-router-dom";


const FournisseuDashborde= () => {
  const [sellerOrders, setSellerOrders] = useState([]);
  const [recentOrders, setRecentOrders] = useState([]);
  const [confirmedProducts, setConfirmedProducts] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("overview")
  const [showAddProductForm, setShowAddProductForm] = useState(false)
  const [showAlert, setShowAlert] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const navigate = useNavigate();
  
  // État pour le formulaire avec image
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    price: '',
    stock: '',
    description: '',
    image: null
  })
  const [imagePreview, setImagePreview] = useState(null)
  
  // État pour afficher le contenu des onglets
  const [tabContent, setTabContent] = useState({
    overview: true,
    orders: false,
    products: true,
    customers: false,
    settings: false
  })

  // Mock data inchangé
  const stats = [
    {
      title: "Total Revenue",
      value: "$12,426.90",
      change: "+12.5%",
      isPositive: true,
      icon: <DollarSign className="h-6 w-6 text-blue-500" />,
    },
    {
      title: "Total Orders",
      value: "356",
      change: "+8.2%",
      isPositive: true,
      icon: <ShoppingCart className="h-6 w-6 text-purple-500" />,
    },
    {
      title: "Total Products",
      value: "64",
      change: "+2.3%",
      isPositive: true,
      icon: <Package className="h-6 w-6 text-amber-500" />,
    },
    {
      title: "Customer Ratings",
      value: "4.8/5",
      change: "-0.2%",
      isPositive: false,
      icon: <Star className="h-6 w-6 text-green-500" />,
    },
  ]
  
 
  const [topProducts, setTopProducts] = useState([
    {
      id: 1,
      name: "Wireless Bluetooth Headphones",
      category: "Electronics",
      price: "$89.99",
      sold: 124,
      stock: 38,
      image: "/placeholder.svg?height=50&width=50",
    },
    {
      id: 2,
      name: "Premium Leather Wallet",
      category: "Accessories",
      price: "$49.99",
      sold: 98,
      stock: 52,
      image: "/placeholder.svg?height=50&width=50",
    },
  ])

  //function de log out 
  // const handleLogout = () => {
  //   localStorage.removeItem("token");
  //   localStorage.removeItem("role");
  //   setIsAuthenticated(false);
  //   setUserRole(null);
  //   navigate("/");
  // };






// Assuming you use React Router for navigation


// Define your logout logic
const handleLogout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("role");
  setIsAuthenticated(false);  // Make sure this state exists and is set in a parent component or context
  setUserRole(null);  // As above, ensure this exists
  navigate("/");  // Redirect to the login page
};
const handleDeleteProduct = async (productId) => {
  const confirmDelete = window.confirm("Êtes-vous sûr de vouloir supprimer ce produit ?");
  if (!confirmDelete) return;

  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`http://localhost:8000/api/fournisseur/produits/${productId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Erreur lors de la suppression du produit');
    }

    // Mettre à jour l'état local pour retirer le produit supprimé
    setConfirmedProducts(confirmedProducts.filter(product => product.id !== productId));

    alert("Le produit a été supprimé avec succès.");
  } catch (error) {
    console.error("Erreur lors de la suppression :", error);
    alert(error.message || "Impossible de supprimer le produit.");
  }
};




  const getStatusColor = (status) => {
    switch (status) {
      case "Delivered":
        return "bg-green-100 text-green-800"
      case "Processing":
        return "bg-blue-100 text-blue-800"
      case "Shipped":
        return "bg-purple-100 text-purple-800"
      case "Cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  // Gestion du formulaire
  const handleChange = (e) => {
    const { name, value } = e.target
    
    if (name === 'image') {
      const file = e.target.files[0]
      if (file) {
        const reader = new FileReader()
        reader.onload = (e) => {
          setImagePreview(e.target.result)
          setFormData(prev => ({ ...prev, image: file }))
        }
        reader.readAsDataURL(file)
      }
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }))
    }
  }




  // const handleSubmit = (e) => {
  //   e.preventDefault()
    
  //   const newProduct = {
  //     id: Date.now(),
  //     name: formData.title,
  //     category: formData.category,
  //     price: `$${parseFloat(formData.price).toFixed(2)}`,
  //     sold: 0,
  //     stock: parseInt(formData.stock),
  //     description: formData.description,
  //     image: imagePreview || "/placeholder.svg?height=50&width=50"
  //   }
    
  //   // Afficher l'alerte
  //   setShowAlert(true)
  //   setTimeout(() => {
  //     setShowAlert(false)
  //   }, 3000)
    
  //   // Réinitialiser le formulaire
  //   setFormData({
  //     title: '',
  //     category: '',
  //     price: '',
  //     stock: '',
  //     description: '',
  //     image: null
  //   })
  //   setImagePreview(null)
  //   setShowAddProductForm(false)
  // }
// ... existing code ...

const handleSubmit = async (e) => { 
  e.preventDefault(); 
 
  const formDataToSend = new FormData(); 
  formDataToSend.append("nom", formData.title); 
  formDataToSend.append("description", formData.description); 
  formDataToSend.append("prix", parseFloat(formData.price)); 
  formDataToSend.append("quantite_disponible", parseInt(formData.stock)); 
  formDataToSend.append("categorie", formData.category.toString()); 
  
  if (formData.image) {
    formDataToSend.append("image", formData.image);
  }
  
  try {
    const token = localStorage.getItem('token');
    
    const response = await fetch('http://localhost:8000/api/products', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
      },
      body: formDataToSend,
    });
    
    const data = await response.json();
    
    if (response.ok) {
      // Afficher l'alerte de succès
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 3000);
      
      // Réinitialiser le formulaire
      setFormData({
        title: '',
        category: '',
        price: '',
        stock: '',
        description: '',
        image: null
      });
      setImagePreview(null);
      setShowAddProductForm(false);
      
      // Rafraîchir la liste des produits si nécessaire
      // fetchProducts(); // Décommentez cette ligne si vous avez une fonction pour rafraîchir les produits
    } else {
      // Afficher les erreurs spécifiques
      let errorMessage = 'Erreur lors de l\'ajout du produit:\n';
      if (data.errors) {
        for (const [field, messages] of Object.entries(data.errors)) {
          errorMessage += `${field}: ${messages.join(', ')}\n`;
        }
      } else {
        errorMessage += data.message || 'Une erreur est survenue';
      }
      alert(errorMessage);
    }
  } catch (error) {
    console.error('Erreur de connexion au serveur:', error);
    alert('Erreur de connexion au serveur. Veuillez réessayer plus tard.');
  }
};

// ... existing code ...


const fetchSellerOrders = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch('http://127.0.0.1:8000/api/vendeurs-commandes', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Erreur lors de la récupération des données');
    }

    const data = await response.json();
    setSellerOrders(data);
  } catch (error) {
    console.error('Erreur lors de la récupération des commandes du vendeur :', error);
    alert("Impossible de charger les données des clients.");
  }
};



const fetchRecentOrders = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch('http://127.0.0.1:8000/api/vendeurs-commandes', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Erreur lors de la récupération des données');
    }

    const data = await response.json();
    setRecentOrders(data);
  } catch (error) {
    console.error('Erreur lors de la récupération des commandes :', error);
    alert("Impossible de charger les commandes.");
  }
};
useEffect(() => {
  if (activeTab === "orders") {
    fetchRecentOrders();
  }
}, [activeTab]);







const fetchConfirmedProducts = async () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found');
      return;


      
    }

    const response = await fetch('http://localhost:8000/api/fournisseur/produits-confirmes', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('API Response:', data); // Ajoutez ce log pour voir la réponse
    
    // Vérifiez si data est un tableau directement ou si c'est data.produits
    if (Array.isArray(data)) {
      setConfirmedProducts(data);
    } else if (Array.isArray(data.produits)) {
      setConfirmedProducts(data.produits);
    } else {
      console.error('Unexpected data format:', data);
      setConfirmedProducts([]);
    }
  } catch (error) {
    console.error('Error fetching confirmed products:', error);
    // Affichez un message d'erreur à l'utilisateur si nécessaire
  }
};

useEffect(() => {
  if (activeTab === "products") {
    fetchConfirmedProducts();
  }
}, [activeTab]);



const handleUpdateOrderStatus = async (orderId, newStatus) => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`http://localhost:8000/api/commandes/${orderId}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({ statut: newStatus }), // Assurez-vous que c'est "statut", pas "status"
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: "Erreur inconnue" }));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    setRecentOrders(prev =>
      prev.map(order => (order.id === orderId ? { ...order, statut: newStatus } : order))
    );

    alert(result.message || 'Statut mis à jour avec succès.');
  } catch (error) {
    console.error('Erreur lors de la mise à jour du statut :', error);
    alert(`Erreur : ${error.message}`);
  }
};





  // Gestion des onglets
const handleTabChange = (tab) => {
  setActiveTab(tab);
  setTabContent({
    overview: tab === "overview",
    orders: tab === "orders",
    products: tab === "products",
    customers: tab === "customers",
    settings: tab === "settings"
  });

  // Charger les données uniquement si l'onglet "customers" est sélectionné
  if (tab === "customers") {
    fetchSellerOrders();
  }
};

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Alert */}
      {showAlert && (
        <div className="fixed top-4 right-4 z-50">
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
            <strong className="font-bold">Succès !</strong>
            <span className="block sm:inline"> Le produit a été ajouté avec succès.</span>
          </div>
        </div>
      )}

      {/* Sidebar - Mobile */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setSidebarOpen(false)}></div>
          <div className="relative flex flex-col flex-1 w-full max-w-xs pt-5 pb-4 bg-white">
            <div className="flex items-center justify-between px-4">
              <div className="flex items-center">
                <img className="h-8 w-auto" src="/placeholder.svg?height=32&width=32" alt="Logo" />
                <span className="ml-2 text-xl font-semibold text-gray-800">Fournisseur Panel</span>
              </div>
              <button
                className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                onClick={() => setSidebarOpen(false)}
              >
                <X className="h-6 w-6 text-gray-600" />
              </button>
            </div>
            <div className="mt-5 flex-1 h-0 overflow-y-auto">
              <nav className="px-2 space-y-1">
                <button
                  onClick={() => handleTabChange("overview")}
                  className={`group flex items-center px-2 py-2 text-base font-medium rounded-md w-full ${
                    activeTab === "overview"
                      ? "bg-gray-100 text-gray-900"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  <BarChart3
                    className={`mr-4 h-6 w-6 ${
                      activeTab === "overview" ? "text-gray-500" : "text-gray-400 group-hover:text-gray-500"
                    }`}
                  />
                  Overview
                </button>
                <button
                  onClick={() => handleTabChange("orders")}
                  className={`group flex items-center px-2 py-2 text-base font-medium rounded-md w-full ${
                    activeTab === "orders"
                      ? "bg-gray-100 text-gray-900"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  <ShoppingBag
                    className={`mr-4 h-6 w-6 ${
                      activeTab === "orders" ? "text-gray-500" : "text-gray-400 group-hover:text-gray-500"
                    }`}
                  />
                  Orders
                </button>
                <button
                  onClick={() => handleTabChange("products")}
                  className={`group flex items-center px-2 py-2 text-base font-medium rounded-md w-full ${
                    activeTab === "products"
                      ? "bg-gray-100 text-gray-900"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  <Package
                    className={`mr-4 h-6 w-6 ${
                      activeTab === "products" ? "text-gray-500" : "text-gray-400 group-hover:text-gray-500"
                    }`}
                  />
                  Products
                </button>
                <button
                  onClick={() => handleTabChange("customers")}
                  className={`group flex items-center px-2 py-2 text-base font-medium rounded-md w-full ${
                    activeTab === "customers"
                      ? "bg-gray-100 text-gray-900"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  <Users
                    className={`mr-4 h-6 w-6 ${
                      activeTab === "customers" ? "text-gray-500" : "text-gray-400 group-hover:text-gray-500"
                    }`}
                  />
                  Customers
                </button>
                <button
                  onClick={() => handleTabChange("settings")}
                  className={`group flex items-center px-2 py-2 text-base font-medium rounded-md w-full ${
                    activeTab === "settings"
                      ? "bg-gray-100 text-gray-900"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  <Settings
                    className={`mr-4 h-6 w-6 ${
                      activeTab === "settings" ? "text-gray-500" : "text-gray-400 group-hover:text-gray-500"
                    }`}
                  />
                  Settings
                </button>







                <button
                  onClick={handleLogout}
                  className={`group flex items-center px-2 py-2 text-base font-medium rounded-md w-full ${
                    activeTab === "settings"
                      ? "bg-gray-100 text-gray-900"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                 <LogOut className="h-6 w-6" />
                    Deconection
                </button>








             
              </nav>
            </div>
            <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
              <div className="flex-shrink-0 group block">
                <div className="flex items-center">
                  <div>
                    <img
                      className="inline-block h-10 w-10 rounded-full"
                      src="/placeholder.svg?height=40&width=40"
                      alt="Profile"
                    />
                  </div>
                  <div className="ml-3">
                    <p className="text-base font-medium text-gray-700">Sarah Johnson</p>
                    <p className="text-sm font-medium text-gray-500">View Profile</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Sidebar - Desktop */}
      <div className="hidden lg:flex lg:flex-shrink-0">
        <div className="flex flex-col w-64">
          <div className="flex flex-col flex-grow pt-5 pb-4 overflow-y-auto bg-white border-r border-gray-200">
            <div className="flex items-center flex-shrink-0 px-4">
              <img className="h-8 w-auto" src="/placeholder.svg?height=32&width=32" alt="Logo" />
              <span className="ml-2 text-xl font-semibold text-gray-800">VendorHub</span>
            </div>
            <div className="mt-5 flex-grow flex flex-col">
              <nav className="flex-1 px-2 space-y-1">
                <button
                  onClick={() => handleTabChange("overview")}
                  className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md w-full ${
                    activeTab === "overview"
                      ? "bg-gray-100 text-gray-900"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  <BarChart3
                    className={`mr-3 h-6 w-6 ${
                      activeTab === "overview" ? "text-gray-500" : "text-gray-400 group-hover:text-gray-500"
                    }`}
                  />
                  Overview
                </button>
                <button
                  onClick={() => handleTabChange("orders")}
                  className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md w-full ${
                    activeTab === "orders"
                      ? "bg-gray-100 text-gray-900"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  <ShoppingBag
                    className={`mr-3 h-6 w-6 ${
                      activeTab === "orders" ? "text-gray-500" : "text-gray-400 group-hover:text-gray-500"
                    }`}
                  />
                  Orders
                </button>
                <button
                  onClick={() => handleTabChange("products")}
                  className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md w-full ${
                    activeTab === "products"
                      ? "bg-gray-100 text-gray-900"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  <Package
                    className={`mr-3 h-6 w-6 ${
                      activeTab === "products" ? "text-gray-500" : "text-gray-400 group-hover:text-gray-500"
                    }`}
                  />
                  Products
                </button>
                <button
                  onClick={() => handleTabChange("customers")}
                  className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md w-full ${
                    activeTab === "customers"
                      ? "bg-gray-100 text-gray-900"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  <Users
                    className={`mr-3 h-6 w-6 ${
                      activeTab === "customers" ? "text-gray-500" : "text-gray-400 group-hover:text-gray-500"
                    }`}
                  />
                  Customers
                </button>
               
                <button
                  onClick={handleLogout}
                  className={`group flex items-center px-2 py-2 text-base font-medium rounded-md w-full ${
                    activeTab === "settings"
                      ? "bg-gray-100 text-gray-900"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                 <LogOut className="h-6 w-6" />
                    Deconection
                </button>

              </nav>
            </div>
            <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
              <div className="flex-shrink-0 w-full group block">
                <div className="flex items-center">
                  <div>
                    <img
                      className="inline-block h-9 w-9 rounded-full"
                      src="/placeholder.svg?height=36&width=36"
                      alt="Profile"
                    />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-700">Sarah Johnson</p>
                    <p className="text-xs font-medium text-gray-500">View Profile</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Main content */}
      <div className="flex flex-col w-0 flex-1 overflow-hidden">
        {/* Top navigation */}
        <div className="relative z-10 flex-shrink-0 flex h-16 bg-white shadow">
          <button
            className="px-4 border-r border-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </button>
          <div className="flex-1 px-4 flex justify-between">
            <div className="flex-1 flex">
              <div className="w-full flex md:ml-0">
                <label htmlFor="search-field" className="sr-only">
                  Search
                </label>
                <div className="relative w-full text-gray-400 focus-within:text-gray-600">
                  <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none">
                    <Search className="h-5 w-5" />
                  </div>
                  <input
                    id="search-field"
                    className="block w-full h-full pl-8 pr-3 py-2 border-transparent text-gray-900 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-0 focus:border-transparent sm:text-sm"
                    placeholder="Search"
                    type="search"
                  />
                </div>
              </div>
            </div>
            <div className="ml-4 flex items-center md:ml-6">
              <button className="bg-white p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                <Bell className="h-6 w-6" />
              </button>
              {/* Profile dropdown */}
              <div className="ml-3 relative">
                <div className="flex items-center space-x-4">
                  <button className="max-w-xs bg-white flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    <img className="h-8 w-8 rounded-full" src="/placeholder.svg?height=32&width=32" alt="" />
                  </button>
                  
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Dashboard content */}
        <main className="flex-1 relative overflow-y-auto focus:outline-none">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
                  <p className="mt-1 text-sm text-gray-500">
                    Welcome back, Sarah! Here's what's happening with your store today.
                  </p>
                </div>
                <div className="mt-4 md:mt-0 flex space-x-3">
                  <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    <Calendar className="h-4 w-4 mr-2" />
                    Mar 1 - Mar 31, 2023
                    <ChevronDown className="h-4 w-4 ml-2" />
                  </button>
                  <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    <Filter className="h-4 w-4 mr-2" />
                    Filters
                  </button>
                </div>
              </div>
            </div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              {/* Contenu basé sur l'onglet actif */}
              {activeTab === "overview" && (
                <div>
                  {/* Stats */}
                  <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                    {stats.map((stat, index) => (
                      <div key={index} className="bg-white overflow-hidden shadow rounded-lg">
                        <div className="p-5">
                          <div className="flex items-center">
                            <div className="flex-shrink-0">{stat.icon}</div>
                            <div className="ml-5 w-0 flex-1">
                              <dl>
                                <dt className="text-sm font-medium text-gray-500 truncate">{stat.title}</dt>
                                <dd>
                                  <div className="text-lg font-medium text-gray-900">{stat.value}</div>
                                </dd>
                              </dl>
                            </div>
                          </div>
                        </div>
                        <div className="bg-gray-50 px-5 py-3">
                          <div className="text-sm">
                            <div className="flex items-center">
                              {stat.isPositive ? (
                                <ArrowUpRight className="h-4 w-4 text-green-500 mr-1" />
                              ) : (
                                <ArrowDownRight className="h-4 w-4 text-red-500 mr-1" />
                              )}
                              <span className={`font-medium ${stat.isPositive ? "text-green-600" : "text-red-600"}`}>
                                {stat.change}
                              </span>
                              <span className="text-gray-500 ml-1">from last month</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

             {activeTab === "orders" && (
  <div className="bg-white shadow rounded-lg mt-8">
    <div className="px-5 py-4 border-b border-gray-200 sm:px-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg leading-6 font-medium text-gray-900">Recent Orders</h3>
        <button className="text-sm font-medium text-indigo-600 hover:text-indigo-500">View all</button>
      </div>
    </div>
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Order ID
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Customer
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Date
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Status
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Amount
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {recentOrders.map((order) => (
            <tr key={order.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-indigo-600">
                {order.commande_id}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.vendeur_name}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.date_commande}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span
                  className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(order.status)}`}
                >
                  {order.statut}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.prix_total}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {/* Boutons pour confirmer ou annuler */}
                {order.status !== "Confirmed" && order.status !== "Cancelled" && (
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleUpdateOrderStatus(order.id, "Confirmed")}
                      className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
                    >
                      Confirm
                    </button>
                    <button
                      onClick={() => handleUpdateOrderStatus(order.id, "Cancelled")}
                      className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
)}
              {activeTab === "products" && (
                <div>
                  {/* Top Products */}
               <div className="mt-8 grid grid-cols-1 gap-5 lg:grid-cols-2">
  <div className="bg-white shadow rounded-lg">
    <div className="px-5 py-4 border-b border-gray-200 sm:px-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg leading-6 font-medium text-gray-900">Confirmed Products</h3>
        <button 
          onClick={fetchConfirmedProducts}
          className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
        >
          Refresh
        </button>
      </div>
    </div>
    {!showAddProductForm ? (
      <>
      <ul className="divide-y divide-gray-200">
  {confirmedProducts.length > 0 ? (
    confirmedProducts.map((product) => (
      <li key={product.id} className="px-5 py-4 sm:px-6">
        <div className="flex items-center">
          <div className="flex-shrink-0 h-12 w-12 rounded-md overflow-hidden">
            <img
              src={`http://localhost:8000${product.image_path}`}
              alt={product.nom}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="ml-4 flex-1">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-medium text-gray-900">{product.nom}</h4>
                <p className="text-sm text-gray-500">{product.categorie}</p>
              </div>
              <div className="ml-2 flex-shrink-0 flex">
                <p className="text-sm font-medium text-gray-900">Dh{product.prix}</p>
              </div>
            </div>
            <div className="mt-2 flex items-center justify-between">
              <div className="flex items-center text-sm text-gray-500">
                <span>In Stock: {product.quantite_disponible}</span>
              </div>
              <div className="flex space-x-2">
                <button className="text-gray-400 hover:text-gray-500">
                  <Eye className="h-5 w-5" />
                </button>
                {/* Bouton de suppression */}
                <button
                  onClick={() => handleDeleteProduct(product.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </li>
    ))
  ) : (
    <li className="px-5 py-4 sm:px-6 text-center text-gray-500">Aucun produit confirmé trouvé</li>
  )}
</ul>
        <div className="px-5 py-4 sm:px-6 border-t border-gray-200">
          <button 
            onClick={() => setShowAddProductForm(true)}
            className="w-full flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add New Product
          </button>
        </div>
      </>
                      ) : (
                        <div className="p-6">
                          <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-semibold text-gray-900">Add New Product</h3>
                            <button 
                              onClick={() => {
                                setShowAddProductForm(false)
                                setImagePreview(null)
                              }}
                              className="text-gray-400 hover:text-gray-500"
                            >
                              <X className="h-5 w-5" />
                            </button>
                          </div>
                          
                          <form onSubmit={handleSubmit} className="space-y-4">
                            {/* Champ d'upload d'image */}
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">Product Image</label>
                              <div className="flex items-center space-x-4">
                                <div className="h-16 w-16 rounded-md overflow-hidden bg-gray-100 flex items-center justify-center">
                                  {imagePreview ? (
                                    <img src={imagePreview} alt="Aperçu" className="h-full w-full object-cover" />
                                  ) : (
                                    <span className="text-gray-400">Aucune image</span>
                                  )}
                                </div>
                                <div className="flex-1">
                                  <input
                                    type="file"
                                    name="image"
                                    accept="image/*"
                                    onChange={handleChange}
                                    className="hidden"
                                    id="image-upload"
                                  />
                                  <label
                                    htmlFor="image-upload"
                                    className="cursor-pointer inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                                  >
                                    Choisir une image
                                  </label>
                                </div>
                              </div>
                            </div>

                            {/* Autres champs du formulaire */}
                            <div>
                              <label className="block text-sm font-medium text-gray-700">Product Title</label>
                              <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                required
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200"
                              />
                            </div>

                            <div>
                              <label className="block text-sm font-medium text-gray-700">Category</label>
                              <select 
                                    name="category" 
                                    value={formData.category} 
                                    onChange={handleChange}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                  >
                                    <option value="">Sélectionnez une catégorie</option>
                                    <option value="Home & garden">Home & garden</option>
                                    <option value="Kitchen">Kitchen</option>
                                    <option value="Men's textile">Men's textile</option>
                                    <option value="Women's textile">Women's textile</option>
                                    <option value="Tools & Home Improvement">Tools & Home Improvement</option>
                                    <option value="Cosmetics">Cosmetics</option>
                                    <option value="Bags & shoes">Bags & shoes</option>
                                    <option value="Jewelry & Watches">Jewelry & Watches</option>
                                    <option value="Accessories (Cars, phones)">Accessories (Cars, phones)</option>
                            </select>
                            </div>

                            <div>
                              <label className="block text-sm font-medium text-gray-700">Price</label>
                              <input
                                type="number"
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
                                required
                                step="0.01"
                                min="0"
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200"
                              />
                            </div>

                            <div>
                              <label className="block text-sm font-medium text-gray-700">Stock Quantity</label>
                              <input
                                type="number"
                                name="stock"
                                value={formData.stock}
                                onChange={handleChange}
                                required
                                min="0"
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200"
                              />
                            </div>

                            <div>
                              <label className="block text-sm font-medium text-gray-700">Description</label>
                              <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                rows="3"
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200"
                              ></textarea>
                            </div>

                            <div className="flex justify-end space-x-3 mt-6">
                              <button
                                type="button"
                                onClick={() => {
                                  setShowAddProductForm(false)
                                  setImagePreview(null)
                                }}
                                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                              >
                                Cancel
                              </button>
                              <button
                                type="submit"
                                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                              >
                                Save Product
                              </button>
                            </div>
                          </form>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

             {activeTab === "customers" && (
  <div className="mt-8">
    <div className="bg-white shadow rounded-lg">
      <div className="px-5 py-4 border-b border-gray-200 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">Customer Orders</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Vendeur ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Nom
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Téléphone
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Rôle
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Commande ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date de commande
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sellerOrders.length > 0 ? (
              sellerOrders.map((order, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.vendeur_id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.vendeur_name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.vendeur_email}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.vendeur_phone}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.vendeur_role}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.commande_id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.date_commande}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="px-6 py-4 text-center text-sm text-gray-500">
                  Aucune donnée disponible.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  </div>
)}
              {activeTab === "settings" && (
                <div className="mt-8">
                  <div className="bg-white shadow rounded-lg">
                    <div className="px-5 py-4 border-b border-gray-200 sm:px-6">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg leading-6 font-medium text-gray-900">Settings</h3>
                        <button className="text-sm font-medium text-indigo-600 hover:text-indigo-500">View all</button>
                      </div>
                    </div>
                    <div className="px-5 py-6 sm:px-6">
                      <p className="text-gray-500">Settings content will be displayed here</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default FournisseuDashborde