import { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';

const GEOAPIFY_API_KEY = "e882252cda4347fdb70641cb81130523";

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function HotelBooking() {
  const { hotelId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { hotel } = location.state || {};

  // Generate variable total rooms and booked rooms per hotel
  const [hotelDetails] = useState(() => {
    const totalRooms = getRandomInt(20, 100);
    const bookedRooms = getRandomInt(0, Math.floor(totalRooms * 0.7));
    return {
      totalRooms,
      bookedRooms,
      pricePerNight: hotel?.price || 1999
    };
  });

  const [bookingData, setBookingData] = useState({
    checkIn: '',
    checkOut: '',
    guests: 1,
    rooms: 1
  });
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showEmailSent, setShowEmailSent] = useState(false);
  const [loading, setLoading] = useState(false);

  // Tourist places state
  const [touristPlaces, setTouristPlaces] = useState([]);
  const [placesLoading, setPlacesLoading] = useState(false);

  // Fetch nearby tourist places when hotel is available
  useEffect(() => {
    const fetchTouristPlaces = async () => {
      if (!hotel || !hotel.lat || !hotel.lon) return;
      setPlacesLoading(true);
      try {
        const url = `https://api.geoapify.com/v2/places?categories=tourism.sights&filter=circle:${hotel.lon},${hotel.lat},5000&limit=6&apiKey=${GEOAPIFY_API_KEY}`;
        const res = await fetch(url);
        const data = await res.json();
        setTouristPlaces(
          (data.features || []).map(f => ({
            name: f.properties.name || "Tourist Place",
            address: f.properties.address_line2 || f.properties.address_line1 || "",
            category: f.properties.categories?.[0] || "",
            distance: f.properties.distance,
          }))
        );
      } catch (err) {
        setTouristPlaces([]);
      }
      setPlacesLoading(false);
    };

    fetchTouristPlaces();
  }, [hotel]);

  const calculateTotalPrice = () => {
    if (!bookingData.checkIn || !bookingData.checkOut) return 0;
    const checkIn = new Date(bookingData.checkIn);
    const checkOut = new Date(bookingData.checkOut);
    const nights = Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24));
    return hotelDetails.pricePerNight * bookingData.rooms * nights;
  };

  const handleInputChange = (e) => {
    setBookingData({
      ...bookingData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      setShowConfirmation(true);
      setLoading(false);
      setTimeout(() => setShowEmailSent(true), 1000);
    }, 1500);
  };

  if (!hotel) return <div className="text-center mt-8">Hotel not found</div>;

  const availableRooms = hotelDetails.totalRooms - hotelDetails.bookedRooms;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Hotel Info */}
        <div>
          <img 
            src={hotel.img} 
            alt={hotel.title} 
            className="w-full h-64 object-cover rounded-xl"
          />
          <h1 className="text-2xl font-bold mt-4">{hotel.title}</h1>
          <p className="text-gray-600">{hotel.address}</p>
          
          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <h2 className="font-semibold mb-2">Availability</h2>
            <div className="flex justify-between">
              <span>Total Rooms:</span>
              <span>{hotelDetails.totalRooms}</span>
            </div>
            <div className="flex justify-between mt-1">
              <span>Available Rooms:</span>
              <span>{availableRooms}</span>
            </div>
            <div className="mt-2 text-lg font-semibold">
              ₹{hotelDetails.pricePerNight} per night
            </div>
          </div>

          {/* Nearby Tourist Places */}
          <div className="mt-6 p-4 bg-white rounded-lg shadow">
            <h2 className="font-semibold mb-3 text-purple-700">Nearby Tourist Places</h2>
            {placesLoading ? (
              <div className="text-gray-500">Loading nearby places...</div>
            ) : touristPlaces.length === 0 ? (
              <div className="text-gray-500">No tourist places found nearby.</div>
            ) : (
              <ul className="space-y-2">
                {touristPlaces.map((place, idx) => (
                  <li key={idx} className="border-b pb-2">
                    <div className="font-medium text-gray-800">{place.name}</div>
                    <div className="text-sm text-gray-600">{place.address}</div>
                    {place.distance && (
                      <div className="text-xs text-gray-400">
                        {(place.distance / 1000).toFixed(1)} km away
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Booking Form */}
        <div>
          {showConfirmation ? (
            <div className="bg-green-50 p-6 rounded-xl">
              <div className="text-green-600 text-xl font-semibold mb-2">
                Booking Confirmed!
              </div>
              <div className="text-gray-600">
                <p>Check-in: {bookingData.checkIn}</p>
                <p>Check-out: {bookingData.checkOut}</p>
                <p>Guests: {bookingData.guests}</p>
                <p>Rooms: {bookingData.rooms}</p>
                <p className="font-semibold pt-2 border-t">
                  Total Amount: ₹{calculateTotalPrice()}
                </p>
              </div>
              {showEmailSent && (
                <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-center text-blue-600">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span className="font-medium">Booking details have been sent to your email!</span>
                  </div>
                </div>
              )}
              <button
                onClick={() => navigate('/')}
                className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                Back to Home
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-lg">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Check-in Date
                  </label>
                  <input
                    type="date"
                    name="checkIn"
                    value={bookingData.checkIn}
                    onChange={handleInputChange}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Check-out Date
                  </label>
                  <input
                    type="date"
                    name="checkOut"
                    value={bookingData.checkOut}
                    onChange={handleInputChange}
                    min={bookingData.checkIn || new Date().toISOString().split('T')[0]}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Number of Guests
                  </label>
                  <input
                    type="number"
                    name="guests"
                    value={bookingData.guests}
                    onChange={handleInputChange}
                    min="1"
                    max="10"
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Number of Rooms
                  </label>
                  <input
                    type="number"
                    name="rooms"
                    value={bookingData.rooms}
                    onChange={handleInputChange}
                    min="1"
                    max={availableRooms}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
                    required
                  />
                </div>

                {bookingData.checkIn && bookingData.checkOut && (
                  <div className="pt-4 border-t">
                    <div className="text-lg font-semibold text-gray-800">
                      Total Amount: ₹{calculateTotalPrice()}
                    </div>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full py-3 rounded-lg text-white font-medium ${
                    loading 
                      ? 'bg-purple-400' 
                      : 'bg-purple-500 hover:bg-purple-600'
                  }`}
                >
                  {loading ? 'Processing...' : 'Book Now'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default HotelBooking;