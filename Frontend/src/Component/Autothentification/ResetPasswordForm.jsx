import React, { useState, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

function ResetPasswordForm() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    password_confirmation: '',
    token: ''
  });
  const [status, setStatus] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Extract token from URL query parameters
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get('token');
    const email = queryParams.get('email');
    
    if (token) {
      setFormData(prev => ({ ...prev, token }));
    }
    
    if (email) {
      setFormData(prev => ({ ...prev, email }));
    }
  }, [location]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (formData.password.length < 8) {
      setError("Le mot de passe doit contenir au moins 8 caractères.");
      return;
    }

    if (formData.password !== formData.password_confirmation) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }

    try {
      const response = await fetch('http://localhost:8000/api/password/reset', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus('Votre mot de passe a été réinitialisé avec succès.');
        setError(null);
        
        // Rediriger vers la page de connexion après 3 secondes
        setTimeout(() => {
          navigate('/login');
        }, 3000);
      } else {
        const data = await response.json();
        setError(data.message || "Une erreur s'est produite lors de la réinitialisation du mot de passe.");
      }
    } catch (err) {
      setError('Problème de connexion au serveur.');
      setStatus(null);
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F5DC] flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg border border-[#ECF0F1]">
        <div className="text-center">
          <h1 className="text-3xl font-serif font-semibold text-[#2C3E50]">Réinitialiser le mot de passe</h1>
          <p className="text-sm text-gray-500 mt-2">Veuillez entrer votre nouveau mot de passe.</p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-[#2C3E50]">
              Email
            </label>
            <div className="mt-1">
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="block w-full px-3 py-2.5 border border-[#BDC3C7] rounded-lg shadow-sm placeholder-[#BDC3C7] focus:outline-none focus:ring-2 focus:ring-[#2C3E50] focus:border-transparent"
                placeholder="exemple@email.com"
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-[#2C3E50]">
              Nouveau mot de passe
            </label>
            <div className="mt-1">
              <input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="block w-full px-3 py-2.5 border border-[#BDC3C7] rounded-lg shadow-sm placeholder-[#BDC3C7] focus:outline-none focus:ring-2 focus:ring-[#2C3E50] focus:border-transparent"
                placeholder="Minimum 8 caractères"
              />
            </div>
          </div>

          <div>
            <label htmlFor="password_confirmation" className="block text-sm font-medium text-[#2C3E50]">
              Confirmer le mot de passe
            </label>
            <div className="mt-1">
              <input
                id="password_confirmation"
                name="password_confirmation"
                type="password"
                value={formData.password_confirmation}
                onChange={handleChange}
                required
                className="block w-full px-3 py-2.5 border border-[#BDC3C7] rounded-lg shadow-sm placeholder-[#BDC3C7] focus:outline-none focus:ring-2 focus:ring-[#2C3E50] focus:border-transparent"
                placeholder="Confirmer votre mot de passe"
              />
            </div>
          </div>

          {status && <p className="text-green-600 text-sm text-center">{status}</p>}
          {error && <p className="text-red-600 text-sm text-center">{error}</p>}

          <button
            type="submit"
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-[#2C3E50] hover:bg-[#1F3A93] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2C3E50] transition-colors duration-200"
          >
            Réinitialiser le mot de passe
          </button>
        </form>

        <div className="mt-4 text-center">
          <Link
            to="/login"
            className="inline-flex items-center text-sm text-[#2C3E50] hover:text-[#E67E22]"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Retour à la connexion
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ResetPasswordForm;
