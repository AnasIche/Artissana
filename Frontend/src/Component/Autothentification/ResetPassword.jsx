import React, { useState, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

function ForgetPassword() {
  const [username, setUsername] = useState('');
  const [status, setStatus] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const savedUsername = localStorage.getItem('username');
    if (savedUsername) {
      setUsername(savedUsername);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || username.length < 3) {
      setError("Le nom d'utilisateur est requis.");
      return;
    }

    localStorage.setItem('username', username);

    try {
      const response = await fetch('http://localhost:8000/api/password/username', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({ username }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus(data.message || 'Un lien de réinitialisation a été envoyé.');
        setError(null);
      } else {
        setError(data.message || "Une erreur s'est produite.");
        setStatus(null);
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
          <h1 className="text-3xl font-serif font-semibold text-[#2C3E50]">Mot de passe oublié</h1>
          <p className="text-sm text-gray-500 mt-2">
            Entrez votre nom d'utilisateur pour recevoir un lien de réinitialisation.
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-[#2C3E50]">
              Nom d'utilisateur
            </label>
            <div className="mt-1">
              <input
                id="username"
                name="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="block w-full px-3 py-2.5 border border-[#BDC3C7] rounded-lg shadow-sm placeholder-[#BDC3C7] focus:outline-none focus:ring-2 focus:ring-[#2C3E50] focus:border-transparent"
                placeholder="ex: utilisateur123"
              />
            </div>
          </div>

          {status && <p className="text-green-600 text-sm text-center">{status}</p>}
          {error && <p className="text-red-600 text-sm text-center">{error}</p>}

          <button
            type="submit"
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-[#2C3E50] hover:bg-[#1F3A93] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2C3E50] transition-colors duration-200"
          >
            Envoyer le lien
          </button>
        </form>

        <div className="mt-4 text-center">
          <Link
            to="/enregister"
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

export default ForgetPassword;
