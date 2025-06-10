import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const destinations = [
  {
    id: 1,
    name: 'Manali, India',
    images: [
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=80'
    ],
    ecoRating: '🌿 Eco Certified',
    description: 'A beautiful hill station nestled in the mountains of Himachal Pradesh, known for its clean air, breathtaking landscapes, and eco-friendly accommodations. Visitors can enjoy sustainable tourism activities while exploring the lush valleys and snow-capped peaks.',
    activities: ['Hiking', 'River Rafting', 'Mountain Biking', 'Paragliding'],
    sustainableFeatures: [
      'Solar-powered resorts',
      'Organic local cuisine',
      'Waste management initiatives',
      'Community-based tourism'
    ],
    bestTimeToVisit: 'April to June, October to February'
  },
  {
    id: 2,
    name: 'Goa, India',
    images: [
      'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=80'
    ],
    ecoRating: '♻️ Eco Friendly',
    description: 'Relax at nature-friendly resorts and explore local culture along the pristine beaches of this coastal paradise. Goa offers a perfect blend of relaxation, adventure, and cultural experiences with a growing focus on sustainable tourism.',
    activities: ['Beach Hopping', 'Water Sports', 'Wildlife Sanctuaries', 'Cultural Tours'],
    sustainableFeatures: [
      'Beach clean-up programs',
      'Marine conservation efforts',
      'Eco-friendly beach shacks',
      'Locally sourced seafood'
    ],
    bestTimeToVisit: 'November to February'
  },
  {
    id: 3,
    name: 'Delhi, India',
    images: [
      'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80'
    ],
    ecoRating: '🌱 Sustainable Travel Spot',
    description: 'Experience the perfect blend of historical grandeur and modern sustainability initiatives in India\'s capital. Explore ancient monuments while supporting the city\'s growing movement toward carbon neutrality and eco-conscious tourism.',
    activities: ['Heritage Walks', 'Cycling Tours', 'Food Trails', 'Museum Visits'],
    sustainableFeatures: [
      'Green public transportation',
      'Urban farming projects',
      'Heritage conservation',
      'Eco-friendly markets'
    ],
    bestTimeToVisit: 'October to March'
  }
];

export default function DestInfo() {
  const { id } = useParams();
  const place = destinations.find((d) => d.id === Number(id));

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('about');

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, [id]);

  // If no place found, show a message
  if (!place && !isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-gray-500 text-xl">Destination not found.</div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-32 h-32 bg-gray-200 rounded-full mb-4"></div>
          <div className="text-gray-500">Loading destination details...</div>
        </div>
      </div>
    );
  }

  const nextSlide = () => setCurrentSlide((currentSlide + 1) % place.images.length);
  const prevSlide = () => setCurrentSlide((currentSlide - 1 + place.images.length) % place.images.length);
  const goToSlide = (index) => setCurrentSlide(index);

  return (
    <div className="bg-gray-50 min-h-screen pb-16">
      {/* Hero Image Carousel */}
      <div className="relative h-96 md:h-screen max-h-[70vh] w-full overflow-hidden">
        {/* Image Carousel */}
        <div className="relative w-full h-full">
          {place.images.map((img, index) => (
            <div
              key={index}
              className={`absolute top-0 left-0 w-full h-full transition-opacity duration-500 ease-in-out ${index === currentSlide ? 'opacity-100' : 'opacity-0 pointer-events-none'
                }`}
            >
              <img
                src={img}
                alt={`${place.name} view ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-6 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-3 shadow-lg transition-all z-10"
            aria-label="Previous image"
          >
            <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-6 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-3 shadow-lg transition-all z-10"
            aria-label="Next image"
          >
            <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Image Indicators */}
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
            {place.images.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all ${index === currentSlide
                    ? 'bg-white w-6'
                    : 'bg-white bg-opacity-50 hover:bg-opacity-75'
                  }`}
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
          </div>

          {/* Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        </div>

        {/* Destination Title Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
          <div className="max-w-6xl mx-auto">
            <span className="inline-block mb-2 text-sm font-medium bg-green-500 bg-opacity-90 rounded-full px-4 py-1">
              {place.ecoRating}
            </span>
            <h1 className="text-4xl md:text-5xl font-bold">{place.name}</h1>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-6xl mx-auto px-4 -mt-6 relative z-10">
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
          {/* Navigation Tabs */}
          <div className="flex border-b border-gray-200 mb-6 overflow-x-auto">
            <button
              className={`px-4 py-3 font-medium text-sm transition-colors ${activeTab === 'about'
                  ? 'text-teal-600 border-b-2 border-teal-600'
                  : 'text-gray-500 hover:text-gray-700'
                }`}
              onClick={() => setActiveTab('about')}
            >
              About
            </button>
            <button
              className={`px-4 py-3 font-medium text-sm transition-colors ${activeTab === 'activities'
                  ? 'text-teal-600 border-b-2 border-teal-600'
                  : 'text-gray-500 hover:text-gray-700'
                }`}
              onClick={() => setActiveTab('activities')}
            >
              Activities
            </button>
            <button
              className={`px-4 py-3 font-medium text-sm transition-colors ${activeTab === 'sustainability'
                  ? 'text-teal-600 border-b-2 border-teal-600'
                  : 'text-gray-500 hover:text-gray-700'
                }`}
              onClick={() => setActiveTab('sustainability')}
            >
              Sustainability
            </button>
          </div>

          {/* Tab Content */}
          <div className="space-y-6">
            {activeTab === 'about' && (
              <div className="space-y-6">
                <p className="text-lg text-gray-700 leading-relaxed">
                  {place.description}
                </p>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-gray-800 font-medium mb-2">Best Time to Visit</h3>
                  <p className="text-gray-700">{place.bestTimeToVisit}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                  <div className="bg-teal-50 p-6 rounded-lg">
                    <h3 className="text-teal-800 font-medium mb-3 flex items-center">
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Why Visit
                    </h3>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <span className="text-teal-600 mr-2">•</span>
                        <span>Experience authentic local culture and traditions</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-teal-600 mr-2">•</span>
                        <span>Support eco-friendly tourism initiatives</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-teal-600 mr-2">•</span>
                        <span>Enjoy breathtaking natural landscapes</span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-blue-50 p-6 rounded-lg">
                    <h3 className="text-blue-800 font-medium mb-3 flex items-center">
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Travel Tips
                    </h3>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <span className="text-blue-600 mr-2">•</span>
                        <span>Book eco-friendly accommodations in advance</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-600 mr-2">•</span>
                        <span>Bring reusable water bottles and shopping bags</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-600 mr-2">•</span>
                        <span>Support local businesses and artisans</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'activities' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {place.activities.map((activity, index) => (
                  <div key={index} className="bg-white border border-gray-100 rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
                    <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mb-4">
                      <span className="text-2xl">{['🥾', '🏄‍♂️', '🚲', '🧗‍♀️'][index % 4]}</span>
                    </div>
                    <h3 className="text-xl font-medium text-gray-800 mb-2">{activity}</h3>
                    <p className="text-gray-600">
                      Experience the beauty of {place.name} through this eco-friendly activity that showcases the natural splendor of the region.
                    </p>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'sustainability' && (
              <div className="space-y-8">
                <div className="bg-green-50 rounded-lg p-6">
                  <h3 className="text-xl font-medium text-green-800 mb-4">Sustainability Initiatives</h3>
                  <p className="text-gray-700 mb-6">
                    {place.name} is committed to sustainable tourism practices that protect the environment and benefit local communities.
                  </p>

                  <div className="space-y-4">
                    {place.sustainableFeatures.map((feature, index) => (
                      <div key={index} className="flex items-start">
                        <div className="bg-green-100 rounded-full p-2 mr-4">
                          <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-800">{feature}</h4>
                          <p className="text-gray-600 text-sm mt-1">
                            Supporting local environmental conservation and community development.
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-6 border border-gray-200 rounded-lg">
                  <h3 className="text-xl font-medium text-gray-800 mb-4">How You Can Help</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <span className="text-green-600 mr-2 font-bold">•</span>
                      <span>Choose accommodations with environmental certifications</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-600 mr-2 font-bold">•</span>
                      <span>Minimize plastic waste by using reusable containers</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-600 mr-2 font-bold">•</span>
                      <span>Participate in local conservation activities</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-600 mr-2 font-bold">•</span>
                      <span>Support businesses that employ sustainable practices</span>
                    </li>
                  </ul>
                </div>
              </div>
            )}
          </div>

          {/* Book Now Button */}

        </div>
      </div>
    </div>
  );
}