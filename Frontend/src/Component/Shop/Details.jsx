import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from "../NavBare/Navebare";
import {
  Star, Minus, Plus, Heart, Share2,
  ShoppingCart
} from 'lucide-react';
import Footer from '../Footer/Footer';
import axios from 'axios';

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isVendeur, setIsVendeur] = useState(false);

  useEffect(() => {
    axios.get(`http://localhost:8000/api/products/${id}`)
      .then(res => setProduct(res.data))
      .catch(err => console.error("Erreur produit :", err));

    const token = localStorage.getItem('token');
    if (token) {
      axios.get('http://localhost:8000/api/user', {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then(res => {
          setUser(res.data);
          setIsAuthenticated(true);
          setIsVendeur(res.data.role === 'vendeur');
        })
        .catch(() => {
          setIsAuthenticated(false);
          setIsVendeur(false);
        });
    }
  }, [id]);

  const decreaseQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      alert("Vous devez être connecté pour passer une commande.");
      return;
    }

    const token = localStorage.getItem('token');
    if (token) {
      axios.post(
        'http://127.0.0.1:8000/api/commandes',
        {
          product_id: product.id,
          quantite: quantity
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      )
        .then(res => {
          alert('Commande passée avec succès !');

          setProduct(prev => ({
            ...prev,
            quantite_disponible: prev.quantite_disponible - quantity
          }));
        })
        .catch(err => {
          console.error('Erreur lors de la commande :', err);
          alert("Erreur lors de la commande.");
        });
    }
  };

  if (!product) {
    return <div className="text-center py-20 text-lg font-medium text-gray-600">Chargement du produit...</div>;
  }

  return (
    <>
      <Navbar background="dark" />
      <div className="min-h-screen bg-gray-50 pt-24 pb-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-12 lg:items-start">
            {/* Image produit */}
            <div className="overflow-hidden rounded-lg bg-white">
              <img
                src={`http://localhost:8000${product.image_path}`}
                alt={product.nom}
                className="h-[600px] w-full object-cover object-center"
                onError={(e) => {
                  e.target.src = '/default-image.png';
                }}
              />
            </div>

            {/* Détails produit */}
            <div className="mt-6 sm:mt-8 lg:mt-0 px-4 sm:px-0">
              <div className="flex justify-between">
                <h1 className="text-3xl font-bold tracking-tight text-gray-900">{product.nom}</h1>
                <div className="flex items-center space-x-4">
                  <button className="p-2 rounded-full hover:bg-gray-100">
                    <Heart className="h-6 w-6 text-gray-400" />
                  </button>
                  <button className="p-2 rounded-full hover:bg-gray-100">
                    <Share2 className="h-6 w-6 text-gray-400" />
                  </button>
                </div>
              </div>

              <div className="mt-4 flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`h-5 w-5 ${i < 4 ? 'text-yellow-400' : 'text-gray-200'}`} fill="currentColor" />
                ))}
                <span className="ml-2 text-sm text-gray-500">(128 avis)</span>
              </div>

              <div className="mt-6">
                <p className="text-3xl font-bold text-gray-900">${product.prix}</p>
                <p className="mt-2 text-sm text-gray-600">Stock disponible : {product.quantite_disponible}</p>
              </div>

              <div className="mt-6">
                <p className="text-base text-gray-700">{product.description}</p>
              </div>

              <div className="mt-6 space-y-4">
                {['Livraison rapide', 'Qualité garantie', 'Disponible en stock'].map((feature) => (
                  <div key={feature} className="flex items-center">
                    <div className="h-2 w-2 rounded-full bg-blue-600" />
                    <p className="ml-3 text-sm text-gray-700">{feature}</p>
                  </div>
                ))}
              </div>

              {!isAuthenticated && (
                <div className="mt-6 p-4 bg-yellow-100 border border-yellow-300 text-yellow-800 rounded">
                  Vous devez être <strong>connecté</strong> pour passer une commande. <br />
                  <a href="/login" className="underline text-blue-600">Connectez-vous ici</a> ou <a href="/register" className="underline text-blue-600">créez un compte</a>.
                </div>
              )}

              <div className="mt-6 space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center border rounded-lg">
                    <button onClick={decreaseQuantity} className="p-2 hover:bg-gray-100">
                      <Minus className="h-5 w-5 text-gray-600" />
                    </button>
                    <span className="px-4 text-lg font-medium">{quantity}</span>
                    <button onClick={increaseQuantity} className="p-2 hover:bg-gray-100">
                      <Plus className="h-5 w-5 text-gray-600" />
                    </button>
                  </div>
                  <button
                    onClick={handleAddToCart}
                    className={`flex-1 px-6 py-3 rounded-lg font-medium flex items-center justify-center space-x-2 ${isAuthenticated && isVendeur ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-gray-400 text-white cursor-not-allowed'}`}
                    disabled={!isAuthenticated || !isVendeur}
                  >
                    <ShoppingCart className="h-5 w-5" />
                    <span>Passer commande</span>
                  </button>
                </div>

                {isAuthenticated && !isVendeur && (
                  <div className="mt-4 p-4 bg-red-100 border border-red-300 text-red-700 rounded">
                    Vous devez avoir un <strong>compte vendeur</strong> pour pouvoir commander des produits. <br />
                    <a href="/register" className="underline text-blue-600">Créez un compte vendeur</a> ou contactez l’administrateur.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default ProductDetail;
