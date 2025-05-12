// AuthoForm.jsx
import React, { useState } from 'react';
import { Facebook, Mail, Lock, LogIn, User, ArrowLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

function AuthoForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: '',
  });
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const url = isLogin
        ? 'http://localhost:8000/api/login'
        : 'http://localhost:8000/api/register';

      const form = new FormData();
      if (isLogin) {
        form.append('email', formData.email);
        form.append('password', formData.password);
      } else {
        form.append('name', formData.name);
        form.append('email', formData.email);
        form.append('phone', formData.phone);
        form.append('password', formData.password);
        form.append('password_confirmation', formData.confirmPassword);
        form.append('role', formData.role);
      }

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
        },
        body: form,
      });

      const data = await response.json();

      if (!response.ok) {
        const errorMsg =
          data.message || (data.errors && Object.values(data.errors).flat().join(', '));
        throw new Error(errorMsg || 'Une erreur est survenue');
      }

      if (isLogin) {
        if (data.token) {
          localStorage.setItem('token', data.token);
        }

        if (data.user?.role === 'vendeur') {
          navigate('/vendeur');
        } else if (data.user?.role === 'fournisseur') {
          navigate('/fournisseur');
        } else if (data.user?.role === 'Dashbordadmin') {
          navigate('/Dashbordadmin');
        }
        
        
        else {
          navigate('/');
        }
      } else {
        // Après inscription, basculer vers le formulaire de login
        setIsLogin(true);
      }
    } catch (err) {
      setError(`Erreur: ${err.message}`);
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F5DC] flex items-center justify-center p-4 relative">
      <button className="absolute top-4 left-4 flex items-center text-[#E67E22] hover:text-[#D35400]">
        <ArrowLeft className="w-5 h-5 mr-1" />
        <span className="text-sm font-medium">
          <Link to="/">Back</Link>
        </span>
      </button>

      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="p-8 lg:p-12">
          <div className="flex items-center gap-2 text-[#2C3E50] mb-8">
            <LogIn className="w-8 h-8" />
            <span className="text-2xl font-semibold">Logo Here</span>
          </div>

          <h2 className="text-3xl font-bold mb-2">
            {isLogin ? 'Welcome back!' : 'Create Account'}
          </h2>
          <p className="text-[#2C3E50] mb-8">
            {isLogin ? 'Please enter your details to sign in' : 'Get started with your free account'}
          </p>

          <form onSubmit={handleSubmit} className="space-y-4 mb-8">
            {!isLogin && (
              <>
                <div>
                  <label className="block text-sm font-medium text-[#2C3E50] mb-1">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 text-[#BDC3C7] w-5 h-5" />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-2 border border-[#BDC3C7] rounded-lg focus:ring-2 focus:ring-[#E67E22] focus:border-transparent"
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#2C3E50] mb-1">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full pl-4 pr-4 py-2 border border-[#BDC3C7] rounded-lg focus:ring-2 focus:ring-[#E67E22] focus:border-transparent"
                    placeholder="Enter your phone number"
                    required
                  />
                </div>
              </>
            )}

            <div>
              <label className="block text-sm font-medium text-[#2C3E50] mb-1">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-[#BDC3C7] w-5 h-5" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2 border border-[#BDC3C7] rounded-lg focus:ring-2 focus:ring-[#E67E22] focus:border-transparent"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#2C3E50] mb-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-[#BDC3C7] w-5 h-5" />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2 border border-[#BDC3C7] rounded-lg focus:ring-2 focus:ring-[#E67E22] focus:border-transparent"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            {!isLogin && (
              <>
                <div>
                  <label className="block text-sm font-medium text-[#2C3E50] mb-1">Confirm Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-[#BDC3C7] w-5 h-5" />
                    <input
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-2 border border-[#BDC3C7] rounded-lg focus:ring-2 focus:ring-[#E67E22] focus:border-transparent"
                      placeholder="••••••••"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#2C3E50] mb-1">Rôle</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 text-[#BDC3C7] w-5 h-5" />
                    <select
                      name="role"
                      value={formData.role}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-2 border border-[#BDC3C7] rounded-lg focus:ring-2 focus:ring-[#E67E22] focus:border-transparent bg-white"
                      required
                    >
                      <option value="" disabled hidden>Choisissez un rôle</option>
                      <option value="fournisseur">Fournisseur</option>
                      <option value="vendeur">Vendeur</option>
                    </select>
                  </div>
                </div>
              </>
            )}

            {isLogin && (
              <div className="flex justify-end">
                <Link to="/ResetPassworde" className="text-sm text-[#E67E22] hover:text-[#D35400]">
                  Forgot Password?
                </Link>
              </div>
            )}

            {error && (
              <div className="text-red-500 text-sm text-center">{error}</div>
            )}

            <button
              type="submit"
              className="w-full bg-[#2C3E50] text-white py-2 rounded-lg hover:bg-[#1F3A93] transition-colors mb-6"
            >
              {isLogin ? 'Sign In' : 'Create Account'}
            </button>
          </form>

          <p className="text-sm text-center mt-4">
            {isLogin ? 'Don’t have an account? ' : 'Already have an account? '}
            <span
              onClick={() => setIsLogin(!isLogin)}
              className="text-[#E67E22] cursor-pointer hover:text-[#D35400]"
            >
              {isLogin ? 'Sign up' : 'Sign in'}
            </span>
          </p>
        </div>

        <div className="hidden lg:block relative bg-[#ECF0F1]">
          <img
            className="object-cover h-full w-full"
            src="/images/arrt.jpg"
            alt="Illustration"
          />
        </div>
      </div>
    </div>
  );
}

export default AuthoForm;
