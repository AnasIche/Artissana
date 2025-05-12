import { useState, useEffect } from "react";
import { Menu, X, UserCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Navbar = ({ background }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const navigate = useNavigate();

  const navClass = background === "dark"
    ? "bg-[#2C3E50]"
    : "bg-transparent shadow-none";

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token");
      
      if (token) {
        try {
          const response = await fetch('http://localhost:8000/api/getuser', {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          
          if (response.ok) {
            const userData = await response.json();
            setIsAuthenticated(true);
            setUserRole(userData.role);
            localStorage.setItem("role", userData.role);
          } else {
            handleLogout();
          }
        } catch (error) {
          console.error("Erreur lors de la vérification de l'authentification:", error);
          handleLogout();
        }
      } else {
        setIsAuthenticated(false);
        setUserRole(null);
      }
    };

    checkAuth();
    const interval = setInterval(checkAuth, 300000); // vérif toutes les 5 minutes
    return () => clearInterval(interval);
  }, []);

  const handleNavigate = (path) => {
    navigate(path);
    setIsOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setIsAuthenticated(false);
    setUserRole(null);
    navigate("/");
  };

  const renderLogo = () => (
    <div
      className="text-2xl font-bold text-white cursor-pointer hover:text-[#E67E22] transition duration-300"
      onClick={() => navigate("/")}
    >
      Artisanal
    </div>
  );

  return (
    <nav className={`absolute top-0 left-0 w-full ${navClass} z-50`}>
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        {renderLogo()}

        <ul className="hidden md:flex gap-6 text-lg font-medium text-white">
          <li className="hover:text-[#E67E22] cursor-pointer" onClick={() => handleNavigate("/")}>Home</li>
          <li className="hover:text-[#E67E22] cursor-pointer" onClick={() => handleNavigate("/shop")}>Shop</li>
          <li className="hover:text-[#E67E22] cursor-pointer" onClick={() => handleNavigate("/About")}>About</li>
          <li className="hover:text-[#E67E22] cursor-pointer" onClick={() => handleNavigate("/contact")}>Contact Us</li>
        </ul>

        <div className="hidden md:flex items-center gap-4">
          {isAuthenticated && userRole && (
            <button
              className="flex items-center gap-1 text-white hover:text-[#E67E22]"
              onClick={() =>
                navigate(userRole === "vendeur" ? "/Vendeur" : userRole === "Fournisseur" ? "/Fournisseur" : "/Dashbordadmin")
              }
            >
              <UserCircle size={28} />
              <span className="text-sm capitalize">{userRole}</span>
            </button>
          )}

          {!isAuthenticated && (
            <button
              className="bg-[#2C3E50] text-white px-5 py-2 rounded-lg hover:bg-[#1F3A93] transition-colors duration-200"
              onClick={() => handleNavigate("/enregister")}
            >
              Login
            </button>
          )}
        </div>

        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-white">
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {isOpen && (
        <ul className="md:hidden bg-[#F5F5DC] text-center space-y-4 py-6 shadow-md">
          <li className="text-lg font-medium text-[#1F3A93] hover:text-[#E67E22] cursor-pointer" onClick={() => handleNavigate("/")}>Home</li>
          <li className="text-lg font-medium text-[#1F3A93] hover:text-[#E67E22] cursor-pointer" onClick={() => handleNavigate("/shop")}>Shop</li>
          <li className="text-lg font-medium text-[#1F3A93] hover:text-[#E67E22] cursor-pointer" onClick={() => handleNavigate("/About")}>About</li>
          <li className="text-lg font-medium text-[#1F3A93] hover:text-[#E67E22] cursor-pointer" onClick={() => handleNavigate("/contact")}>Contact Us</li>

          {isAuthenticated && userRole && (
            <button
              className="flex items-center justify-center gap-2 text-[#2C3E50] hover:text-[#E67E22]"
              onClick={() => {
                setIsOpen(false);
                navigate(userRole === "vendeur" ? "/Vendeur" : "/Fournisseur");
              }}
            >
              <UserCircle size={24} />
              <span className="capitalize">{userRole} Dashboard</span>
            </button>
          )}

          {!isAuthenticated && (
            <button
              className="bg-[#2C3E50] text-white px-5 py-2 rounded-lg hover:bg-[#1F3A93] transition-colors duration-200"
              onClick={() => handleNavigate("/enregister")}
            >
              Login
            </button>
          )}
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
