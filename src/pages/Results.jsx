import { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const GEOAPIFY_API_KEY = "e882252cda4347fdb70641cb81130523";
const GOOGLE_API_KEY = "AIzaSyDy6V4P7a8-I_Pq2OG2xNlWEqdmFn5VpRY";
const GOOGLE_CSE_ID = "3774de64ee5344e28";

// Hotel image fetch helper
async function getHotelImage(hotelName) {
  try {
    const response = await fetch(
      `https://www.googleapis.com/customsearch/v1?key=${GOOGLE_API_KEY}&cx=${GOOGLE_CSE_ID}&q=${encodeURIComponent(
        hotelName + " hotel exterior"
      )}&searchType=image&num=1`
    );
    const data = await response.json();
    console.log("Image search result for", hotelName, data); // Debug log

    // Check for valid image result
    if (data.items && data.items.length > 0 && data.items[0].link) {
      return data.items[0].link;
    }
    // Fallback image
    return "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80";
  } catch (error) {
    console.error("Error fetching image:", error);
    return "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80";
  }
}

function HomeSection({ homes }) {
  const navigate = useNavigate();

  const handleHotelClick = (hotel) => {
    navigate(`/hotel/${encodeURIComponent(hotel.title)}`, {
      state: { hotel }
    });
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
      {homes.map((home, idx) => (
        <div 
          className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer"
          key={idx}
          onClick={() => handleHotelClick(home)}
        >
          <div className="relative">
            <img
              src={home.img}
              alt={home.title}
              className="w-full h-48 object-cover rounded-t-xl"
            />
            <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-xs px-3 py-1 rounded-full font-medium shadow">
              Hotel
            </span>
            <span className="absolute bottom-3 right-3 bg-purple-600 text-white text-xs px-3 py-1 rounded-full font-semibold shadow">
              ₹{home.price} / night
            </span>
          </div>
          <div className="p-4">
            <h3 className="font-semibold text-lg mb-1">{home.title}</h3>
            <p className="text-gray-600 text-sm mb-2">{home.address}</p>
            <div className="flex items-center text-sm">
              <span className="text-yellow-500 mr-1">★</span>
              <span className="font-medium">{home.rating || "New"}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function Results() {
  const location = useLocation();
  const { city } = location.state || {};
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const lastHotelRef = useRef(null);

  // Helper to generate a random price for each hotel
  const getRandomPrice = () => {
    // Random price between 1200 and 6000
    return Math.floor(Math.random() * (6000 - 1200 + 1)) + 1200;
  };

  const fetchHotels = async (lat, lon, pageNum = 1) => {
    if (pageNum === 1) {
      setLoading(true);
      setHotels([]);
    }
    
    const limit = 9;
    const offset = (pageNum - 1) * limit;
    
    const url = `https://api.geoapify.com/v2/places?categories=accommodation.hotel&filter=circle:${lon},${lat},5000&limit=${limit}&offset=${offset}&apiKey=${GEOAPIFY_API_KEY}`;
    
    try {
      const res = await fetch(url);
      const data = await res.json();
      
      if (!data.features?.length) {
        setHasMore(false);
        setLoading(false);
        return;
      }

      const newHotels = await Promise.all(
        data.features.map(async (f) => {
          const hotelName = f.properties.name || "Unnamed Hotel";
          const imageUrl = await getHotelImage(hotelName);
          return {
            title: hotelName,
            address: f.properties.address_line2 || f.properties.address_line1 || "",
            img: imageUrl,
            rating: ((Math.random() * (5 - 4) + 4).toFixed(2)),
            price: getRandomPrice()
          };
        })
      );

      setHotels(prev => pageNum === 1 ? newHotels : [...prev, ...newHotels]);
      setHasMore(newHotels.length === limit);
    } catch (error) {
      console.error("Error fetching hotels:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (loading) return;

    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && hasMore) {
          setPage(prev => prev + 1);
        }
      },
      { threshold: 0.5 }
    );

    if (lastHotelRef.current) {
      observer.observe(lastHotelRef.current);
    }

    return () => observer.disconnect();
  }, [loading, hasMore]);

  useEffect(() => {
    if (city) {
      fetchHotels(city.geometry.coordinates[1], city.geometry.coordinates[0], 1);
    }
  }, [city]);

  useEffect(() => {
    if (city && page > 1) {
      fetchHotels(
        city.geometry.coordinates[1],
        city.geometry.coordinates[0],
        page
      );
    }
  }, [page]);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-6xl mx-auto pt-24 pb-16 px-4">
        <h1 className="text-3xl font-bold mb-8">
          Hotels in {city?.properties?.city || city?.properties?.name || 'Selected City'}
        </h1>
        
        {loading && hotels.length === 0 ? (
          <div className="text-center">Loading hotels...</div>
        ) : (
          <>
            <HomeSection homes={hotels} />
            {loading && (
              <div className="text-center mt-8">Loading more hotels...</div>
            )}
            <div ref={lastHotelRef} className="h-4" />
          </>
        )}
      </div>
    </div>
  );
}

export default Results;