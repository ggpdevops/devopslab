import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Destinations from './pages/Destinations'
import About from './pages/About'
import Contact from './pages/Contact'
import DestInfo from './pages/DestInfo'
import AuthForm from './pages/AuthForm';
import Results from './pages/Results';
import HotelBooking from './pages/HotelBooking';

function App() {
  return (
    <>

      <Router>
        <Navbar />
        <div className="pt-24">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/results" element={<Results />} />
            <Route path="/destinations" element={<Destinations />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/destinfo/:id" element={<DestInfo />} />
            <Route path="/auth" element={<AuthForm />} />
            <Route path="/hotel/:hotelId" element={<HotelBooking />} />
          </Routes>
        </div>
      </Router>

    </>
  )
}

export default App