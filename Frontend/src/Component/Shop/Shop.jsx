import React, { useEffect, useState } from 'react';
import { Search, Menu, Filter } from 'lucide-react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Shoppage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    categories: [],
    priceRange: { min: '', max: '' },
    productType: 'Wholesale',
    country: 'Morocco',
    sortOrder: 'highToLow'
  });

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const categories = ['Home & garden', 'Kitchen', "Men's textile", "Women's textile", 'Tools & Home Improvement', 'Cosmetics', 'Bags & shoes', 'Jewelry & Watches', 'Accessories (Cars, phones)'];

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const params = {
        search: searchQuery,
        categories: filters.categories.join(','),
        min_price: filters.priceRange.min,
        max_price: filters.priceRange.max,
        sort: filters.sortOrder,
        page: currentPage
      };

      const response = await axios.get('http://localhost:8000/api/products', { params });

      const data = response.data;
      const productList = Array.isArray(data.data) ? data.data : data;

      setProducts(productList);
      setTotalPages(data.last_page || 1);
    } catch (error) {
      console.error("Erreur lors du chargement des produits:", error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [searchQuery, filters, currentPage]);

  const handleCategoryChange = (category) => {
    setFilters(prev => ({
      ...prev,
      categories: prev.categories.includes(category)
        ? prev.categories.filter(c => c !== category)
        : [...prev.categories, category]
    }));
    setCurrentPage(1);
  };

  const resetFilters = () => {
    setFilters({
      categories: [],
      priceRange: { min: '', max: '' },
      productType: 'Wholesale',
      country: 'Morocco',
      sortOrder: 'highToLow'
    });
    setSearchQuery('');
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <nav className="bg-[#2C3E50] shadow-sm text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden p-2 rounded-md hover:bg-[#1F3A93]">
                <Menu className="h-6 w-6" />
              </button>
              <h1 className="text-xl font-semibold ml-2">Artisanal</h1>
            </div>

            <div className="hidden md:flex items-center space-x-6">
              {["Home", "Shop", "About", "contact"].map(link => (
                <Link key={link} to={link === "Home" ? "/" : `/${link.toLowerCase()}`} className="hover:text-[#E67E22]">{link}</Link>
              ))}
            </div>

            <div className="flex items-center">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products..."
                  className="w-64 px-4 py-2 rounded-full border border-[#BDC3C7] text-black focus:ring-[#2C3E50]"
                />
                <Search className="absolute right-3 top-2.5 h-5 w-5 text-[#BDC3C7]" />
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Filters */}
          <aside className="hidden md:block w-64 space-y-6">
            <div className="bg-[#ECF0F1] p-6 rounded-lg shadow-sm">
              <h2 className="text-lg font-semibold mb-4 text-[#2C3E50]">Categories</h2>
              {categories.map(category => (
                <label key={category} className="block text-sm text-[#2C3E50]">
                  <input
                    type="checkbox"
                    checked={filters.categories.includes(category)}
                    onChange={() => handleCategoryChange(category)}
                    className="mr-2 text-[#A3B18A]"
                  />
                  {category}
                </label>
              ))}

              <div className="mt-4 space-y-2">
                <h2 className="font-semibold text-[#2C3E50]">Price</h2>
                <input
                  type="number"
                  placeholder="Min"
                  value={filters.priceRange.min}
                  onChange={(e) => setFilters(prev => ({ ...prev, priceRange: { ...prev.priceRange, min: e.target.value } }))}
                  className="w-full px-3 py-1 border border-[#BDC3C7] rounded"
                />
                <input
                  type="number"
                  placeholder="Max"
                  value={filters.priceRange.max}
                  onChange={(e) => setFilters(prev => ({ ...prev, priceRange: { ...prev.priceRange, max: e.target.value } }))}
                  className="w-full px-3 py-1 border border-[#BDC3C7] rounded"
                />
              </div>

              <div className="mt-4">
                <label className="block text-[#2C3E50]">Sort by</label>
                <select
                  value={filters.sortOrder}
                  onChange={(e) => setFilters(prev => ({ ...prev, sortOrder: e.target.value }))}
                  className="w-full mt-1 border border-[#BDC3C7] rounded px-3 py-1"
                >
                  <option value="highToLow">High to low</option>
                  <option value="lowToHigh">Low to high</option>
                </select>
              </div>

              <div className="mt-4">
                <label className="block text-[#2C3E50]">Product type</label>
                <select
                  value={filters.productType}
                  onChange={(e) => setFilters(prev => ({ ...prev, productType: e.target.value }))}
                  className="w-full mt-1 border border-[#BDC3C7] rounded px-3 py-1"
                >
                  <option value="Wholesale">Wholesale</option>
                  <option value="Retail">Retail</option>
                </select>
              </div>

              <div className="mt-4">
                <label className="block text-[#2C3E50]">Country</label>
                <select
                  value={filters.country}
                  onChange={(e) => setFilters(prev => ({ ...prev, country: e.target.value }))}
                  className="w-full mt-1 border border-[#BDC3C7] rounded px-3 py-1"
                >
                  <option value="Morocco">Morocco</option>
                  <option value="Algeria">Algeria</option>
                  <option value="Tunisia">Tunisia</option>
                </select>
              </div>

              <div className="mt-6">
                <button
                  onClick={resetFilters}
                  className="px-6 py-2 bg-[#E67E22] text-white rounded-lg hover:bg-[#2C3E50] transition"
                >
                  Reset Filters
                </button>
              </div>
            </div>
          </aside>

          {/* Products */}
          <section className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-[#2C3E50]">All Products</h2>
              <button className="md:hidden flex items-center px-4 py-2 bg-[#E67E22] text-white rounded-lg">
                <Filter className="h-5 w-5 mr-2" />
                Filters
              </button>
            </div>

            {loading ? (
              <div className="text-center text-[#2C3E50]">Loading products...</div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map(product => (
                  <div key={product.id} className="bg-[#ECF0F1] rounded-lg shadow hover:shadow-md transition-shadow overflow-hidden">
                    <img
                      src={`http://localhost:8000${product.image_path}`}
                      alt={product.nom}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-4">
                      <h3 className="text-[#2C3E50] font-medium">{product.nom}</h3>
                      <div className="flex justify-between items-center mt-2">
                        <span className="font-semibold text-[#2C3E50]">${product.prix}</span>
                        <button className="px-4 py-1 bg-[#2C3E50] text-white rounded-full text-sm hover:bg-[#E67E22] transition">
                            <Link to={`/Detail-product/${product.id}`}>View Details</Link>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-8 space-x-2">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-1 bg-[#2C3E50] text-white rounded disabled:opacity-50"
                >
                  Prev
                </button>
                <span className="px-3 py-1 text-[#2C3E50]">{currentPage} / {totalPages}</span>
                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="px-3 py-1 bg-[#2C3E50] text-white rounded disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}

export default Shoppage;
