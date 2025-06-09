function About() {
  return (
    <div className="px-4 md:px-8 py-16 max-w-5xl mx-auto">
      <h2 className="text-5xl font-extrabold text-center text-purple-900 mb-4 tracking-tight">
        About <span className="text-pink-500">Travel Tech</span>
      </h2>
      <p className="text-xl text-center text-gray-600 mb-12 max-w-2xl mx-auto">
        Smart, sustainable, and meaningful journeys — powered by technology and care for the planet.
      </p>

      <div className="grid md:grid-cols-2 gap-12 items-center bg-white/80 rounded-2xl shadow-lg p-8">
        <img
          src="https://www.travelandleisure.com/thmb/JvI_2fj82BLmkgr0rnAa9HZZ9OY=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/NangaParbat-b96d13f27b9c4e3e8d20d146bbe3b5e0.jpg"
          alt="Eco travel"
          className="rounded-xl shadow-lg object-cover w-full h-72 md:h-full border-4 border-white"
        />

        <div className="space-y-6">
          <p className="text-lg text-gray-700 leading-relaxed">
            <span className="font-semibold text-purple-900">Travel Tech</span> is your smart and sustainable travel planner, designed to help you explore the world while reducing your environmental impact. Our mission is to make eco-friendly travel accessible, enjoyable, and impactful.
          </p>
          <div className="bg-purple-50 rounded-xl p-4 shadow flex flex-col gap-2">
            <span className="font-semibold text-purple-800 text-lg mb-1">🌍 What We Offer:</span>
            <ul className="list-none space-y-1 text-gray-700">
              <li>• <span className="font-semibold">Eco-Conscious Guides:</span> Find green stays and eco-destinations.</li>
              <li>• <span className="font-semibold">Smart Planning:</span> Get personalized itineraries based on your goals.</li>
              <li>• <span className="font-semibold">Local Culture:</span> Enjoy authentic, meaningful experiences.</li>
              <li>• <span className="font-semibold">Carbon Insights:</span> Understand and reduce your travel footprint.</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="mt-16 text-center">
        <img
          src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Adventure Travel"
          className="mx-auto mb-8 rounded-xl shadow-lg object-cover border-4 border-white max-w-3xl"
        />
        <p className="text-lg text-gray-700 max-w-2xl mx-auto leading-relaxed">
          <span className="text-pink-500 text-xl">💡</span> <span className="font-semibold">Why Travel Tech?</span><br />
          Whether you're a backpacker, a digital nomad, or a luxury explorer, <span className="font-semibold text-purple-900">Travel Tech</span> helps you make better travel choices — for the planet and for yourself.
          <br /><br />
          <span className="text-purple-900 font-semibold">Join us on a journey where travel meets technology and purpose.</span> Together, let’s create memories that matter — for you and the Earth.
        </p>
      </div>
    </div>
  );
}

export default About;