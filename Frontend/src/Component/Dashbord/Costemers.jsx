import { useEffect, useState } from "react";

const CustomersTable = () => {
  const [fournisseurs, setFournisseurs] = useState([]);
  const [vendeurs, setVendeurs] = useState([]);

  const fetchUsers = () => {
    const token = localStorage.getItem("token");

    fetch("http://localhost:8000/api/getallusers", {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) throw new Error("Accès refusé ou non autorisé");
        return response.json();
      })
      .then((data) => {
        setFournisseurs(data.fournisseurs || []);
        setVendeurs(data.vendeurs || []);
      })
      .catch((error) => {
        console.error("Erreur lors du chargement des données :", error);
      });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = (userId) => {
    const confirmDelete = window.confirm("Voulez-vous vraiment supprimer ce compte ?");
    if (!confirmDelete) return;

    const token = localStorage.getItem("token");

    fetch(`http://localhost:8000/api/user/${userId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) throw new Error("Erreur lors de la suppression");
        fetchUsers(); // Recharger la liste après suppression
      })
      .catch((error) => {
        console.error("Erreur lors de la suppression :", error);
      });
  };

  const renderRow = (user, roleLabel) => (
    <tr key={user.id} className="border-b">
      <td className="p-2">{user.name}</td>
      <td className="p-2">{user.email}</td>
      <td className="p-2">{user.phone}</td>
      <td className="p-2">{roleLabel}</td>
      <td className="p-2">
        <button
          onClick={() => handleDelete(user.id)}
          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
        >
          Supprimer
        </button>
      </td>
    </tr>
  );

  return (
    <div className="bg-white p-5 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Liste des Fournisseurs & Vendeurs</h2>
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b">
            <th className="text-left p-2">Nom</th>
            <th className="text-left p-2">Email</th>
            <th className="text-left p-2">Téléphone</th>
            <th className="text-left p-2">Rôle</th>
            <th className="text-left p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {fournisseurs.map((f) => renderRow(f, "Fournisseur"))}
          {vendeurs.map((v) => renderRow(v, "Vendeur"))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomersTable;
