import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./components/Navbar";

function App() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("business");
  const [country, setCountry] = useState("us");

  useEffect(() => {
    async function fetchNews() {
      try {
        setLoading(true);
        setError(null);

        // تكوين headers للطلب
        const headers = {
          'Authorization': `Bearer 645f1564846141e79bf2f08d27315b13`
        };

        const res = await axios.get(
          `https://newsapi.org/v2/top-headlines`,
          {
            params: {
              country: country,
              category: selectedCategory,
              apiKey: '645f1564846141e79bf2f08d27315b13'
            },
            headers: headers
          }
        );

        if (res.data.articles && res.data.articles.length > 0) {
          setNews(res.data.articles);
          console.log('Received articles:', res.data.articles.length);
        } else {
          setError('Sorry, there are no new news in this area to search for information.');
        }
      } catch (err) {
        setError(err.response?.data?.message || 'حدث خطأ في جلب الأخبار');
        console.error('API Error:', err.response?.data || err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchNews();
  }, [country, selectedCategory]);

  const handleCategoryChange = (category) => {
    console.log('Changing category to:', category);
    setSelectedCategory(category);
  };

  const handleCountrySearch = (countryCode) => {
    console.log('Searching for country:', countryCode);
    if (countryCode) {
      setCountry(countryCode.toLowerCase());
      // إذا لم يتم تحديد فئة، نستخدم 'general'
      if (!selectedCategory) {
        setSelectedCategory('general');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar 
        onCategoryChange={handleCategoryChange} 
        onCountrySearch={handleCountrySearch}
        selectedCategory={selectedCategory}
      />
      
      {loading && (
        <div className="flex justify-center items-center py-10">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      )}

      {error && (
        <div className="max-w-2xl mx-auto mt-8 p-4 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-center text-red-600">
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            <p className="text-sm font-medium">{error}</p>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {news.map((article, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="relative h-48 overflow-hidden">
                <img
                  src={article.urlToImage || 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=1000&auto=format&fit=crop'}
                  alt={article.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=1000&auto=format&fit=crop';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                    {article.source.name}
                  </span>
                  <span className="text-gray-500 text-sm">
                    {new Date(article.publishedAt).toLocaleDateString()}
                  </span>
                </div>
                <h2 className="text-xl font-bold mb-3 text-gray-800 line-clamp-2">
                  {article.title}
                </h2>
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {article.description}
                </p>
                <div className="flex justify-between items-center">
                  <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-red-600 hover:text-blue-800 font-bold transition-colors duration-200"
                  >
                    Read More →
                  </a>
                  {article.author && (
                    <span className="text-sm text-gray-500">
                      By {article.author}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default App