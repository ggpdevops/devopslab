import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const destinations = [
  {
    id: 1,
    name: 'Manali, India',
    image: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=800&q=80',
    ecoRating: '🌿 Eco Certified',
    description: 'A beautiful hill station known for its clean air and green stays.',
    tags: ['Mountains', 'Adventure', 'Nature']
  },
  {
    id: 2,
    name: 'Goa, India',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
    ecoRating: '♻️ Eco Friendly',
    description: 'Relax at nature-friendly resorts and explore local culture.',
    tags: ['Beaches', 'Culture', 'Relaxation']
  },
  {
    id: 3,
    name: 'Delhi, India',
    image: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=800&q=80',
    ecoRating: '🌱 Sustainable Travel Spot',
    description: 'Cycle around a carbon-neutral city with rich heritage.',
    tags: ['Heritage', 'Urban', 'History']
  }
];

export default function Destinations() {
  const [hoveredCard, setHoveredCard] = useState(null);
  const navigate = useNavigate();

  const handleExploreClick = (id) => {
    navigate(`/destinfo/${id}`);
  };

  return (
    <div className="bg-gray-50 min-h-screen py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Discover Eco-Friendly Destinations</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore sustainable travel options that help preserve our planet while enjoying unforgettable experiences
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {destinations.map((place) => (
            <div
              key={place.id}
              className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              onMouseEnter={() => setHoveredCard(place.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className="relative">
                <img 
                  src={place.image} 
                  alt={place.name} 
                  className="w-full h-56 object-cover" 
                />
                <div className="absolute top-4 right-4">
                  <span className="inline-block text-sm font-medium text-green-700 bg-green-100 bg-opacity-90 rounded-full px-3 py-1">
                    {place.ecoRating}
                  </span>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{place.name}</h3>
                <p className="text-gray-600 mb-4">{place.description}</p>
                
                <div className="flex flex-wrap gap-2">
                  {place.tags.map((tag, index) => (
                    <span 
                      key={index} 
                      className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                
                <div className={`mt-4 transition-opacity duration-300 ${hoveredCard === place.id ? 'opacity-100' : 'opacity-0'}`}>
                  <button 
                    className="w-full py-2 bg-purple-900 hover:bg-purple-800 text-white font-medium rounded-lg transition-colors"
                    onClick={() => handleExploreClick(place.id)}
                  >
                    Explore Destination
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}