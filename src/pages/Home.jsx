import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

const GEOAPIFY_API_KEY = "e882252cda4347fdb70641cb81130523";

function Home() {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const timeoutRef = useRef(null);
  const navigate = useNavigate();

  const fetchCities = async (value) => {
    if (!value) {
      setSuggestions([]);
      return;
    }
    const url = `https://api.geoapify.com/v1/geocode/autocomplete?text=${encodeURIComponent(
      value
    )}&type=city&limit=5&apiKey=${GEOAPIFY_API_KEY}`;
    const res = await fetch(url);
    const data = await res.json();
    setSuggestions(data.features || []);
  };

  const handleInput = (e) => {
    const value = e.target.value;
    setQuery(value);
    setShowDropdown(true);
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => fetchCities(value), 300);
  };

  const handleSelect = (city) => {
    setQuery(city.properties.city || city.properties.name);
    setShowDropdown(false);
    setSuggestions([]);
    navigate('/results', { state: { city } });
  };

  return (
    <div className="min-h-screen relative">
      {/* Hero Background */}
      <div
        className="fixed inset-0 -z-10"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "brightness(0.7)"
        }}
      />

      {/* Content */}
      <div className="max-w-6xl mx-auto pt-32 pb-16 px-4">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4">
            Where are we headed?
          </h1>
          <p className="text-xl text-gray-200">
            Search hotels and places to stay around the world
          </p>
        </div>

        {/* Search Bar */}
        <div className="bg-white/95 backdrop-blur rounded-2xl shadow-lg p-6 max-w-4xl mx-auto">
          <div className="flex gap-4 items-center">
            <div className="w-full relative">
              <input
                className="bg-gray-100 px-4 py-3 rounded-xl outline-none w-full"
                placeholder="Where do you want to go?"
                value={query}
                onChange={handleInput}
                onFocus={() => query && setShowDropdown(true)}
                autoComplete="off"
              />
              {showDropdown && suggestions.length > 0 && (
                <ul className="absolute left-0 right-0 top-14 bg-white rounded-xl shadow-lg z-10 max-h-60 overflow-auto">
                  {suggestions.map((city) => (
                    <li
                      key={city.properties.place_id}
                      className="px-4 py-3 hover:bg-gray-100 cursor-pointer"
                      onClick={() => handleSelect(city)}
                    >
                      {city.properties.city || city.properties.name}, {city.properties.country}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <button
              className="bg-purple-700 hover:bg-purple-900 text-white rounded-xl px-6 py-3 font-medium transition-colors flex-shrink-0"
            >
              Search
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;