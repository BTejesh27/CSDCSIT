import React, { useState } from 'react';
import { Microscope, Library, Building2, Handshake, ChevronRight, Search, Phone, Mail, MapPin, ArrowRight } from 'lucide-react';

const FacilitiesPage = () => {
  const [activeTab, setActiveTab] = useState(1);

  const facilities = [
    {
      id: 1,
      title: "Laboratories",
      icon: <Microscope className="w-8 h-8" />,
      description: "State-of-the-art laboratories equipped with cutting-edge technology and modern instruments for advanced research and learning",
      details: [
        "Advanced Computing Lab with High-Performance Workstations",
        "Research Laboratory with Specialized Equipment",
        "IoT and Embedded Systems Innovation Hub",
        "Cybersecurity and Networking Lab",
        "Digital Electronics and Microprocessor Lab",
        "Software Development and Testing Center"
      ],
      image: "https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?auto=format&fit=crop&q=80&w=1200",
      stats: {
        area: "15,000 sq ft",
        capacity: "200+ students",
        equipment: "Latest Tech",
        investment: "$2M+"
      }
    },
    {
      id: 2,
      title: "Library Resources",
      icon: <Library className="w-8 h-8" />,
      description: "A comprehensive knowledge hub featuring an extensive collection of books, journals, and digital resources for academic excellence",
      details: [
        "24/7 Digital Library with Global Database Access",
        "International Journal & Research Paper Repository",
        "Interactive E-Learning Platform Access",
        "Technical Magazine & Publication Archive",
        "Dedicated Research Scholar Section",
        "Multimedia Learning Resources"
      ],
      image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&q=80&w=1200",
      stats: {
        books: "50,000+",
        journals: "200+",
        databases: "50+",
        seating: "300+"
      }
    },
    {
      id: 3,
      title: "Department Infrastructure",
      icon: <Building2 className="w-8 h-8" />,
      description: "Modern infrastructure designed to foster innovation, collaboration, and academic excellence in a conducive learning environment",
      details: [
        "Smart Classrooms with Interactive Technology",
        "State-of-the-art Conference & Seminar Halls",
        "Collaborative Student Discussion Zones",
        "Advanced Research Centers",
        "Innovation Labs & Maker Spaces",
        "Faculty Research Offices"
      ],
      image: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=1200",
      stats: {
        classrooms: "25+",
        halls: "5",
        capacity: "1000+",
        facilities: "15+"
      }
    },
    {
      id: 4,
      title: "Industry Collaborations",
      icon: <Handshake className="w-8 h-8" />,
      description: "Strategic partnerships with leading industry players ensuring real-world exposure and enhanced learning opportunities",
      details: [
        "Industry-sponsored Research Projects",
        "Comprehensive Internship Programs",
        "Expert Lecture Series & Workshops",
        "Research & Development Collaborations",
        "Industry Mentorship Programs",
        "Technology Transfer Initiatives"
      ],
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=1200",
      stats: {
        partners: "50+",
        projects: "100+",
        internships: "200+",
        workshops: "24/year"
      }
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-800 via-indigo-700 to-purple-800 text-white py-40 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1200')] opacity-10 bg-cover bg-center"></div>
        <div className="absolute inset-0 bg-blue-900/50"></div>
        <div className="container mx-auto px-6 relative">
          <div className="max-w-5xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight animate-fade-in">
              World-Class Facilities<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-purple-200">
                for Future Innovators
              </span>
            </h1>
            <p className="text-lg md:text-2xl opacity-90 max-w-3xl mx-auto leading-relaxed mb-12">
              Experience excellence through our state-of-the-art facilities designed to nurture talent, foster innovation, and drive academic success.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 sm:items-center justify-center">
              <button className="group bg-white text-blue-700 px-10 py-5 rounded-xl font-semibold hover:bg-blue-50 transition-all duration-300 flex items-center justify-center transform hover:scale-105">
                <Search className="w-6 h-6 mr-3" />
                Explore Facilities
                <ArrowRight className="w-6 h-6 ml-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-[-10px] group-hover:translate-x-0" />
              </button>
              <button className="group border-2 border-white text-white px-10 py-5 rounded-xl font-semibold hover:bg-white hover:text-blue-700 transition-all duration-300 flex items-center justify-center transform hover:scale-105">
                Schedule  Tour
                <ArrowRight className="w-6 h-6 ml-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-[-10px] group-hover:translate-x-0" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex overflow-x-auto space-x-2 md:space-x-8 py-4 scrollbar-hide">
            {facilities.map((facility) => (
              <button
                key={facility.id}
                onClick={() => setActiveTab(facility.id)}
                className={`flex items-center px-4 py-3 rounded-xl whitespace-nowrap transition-all duration-300 transform hover:scale-105 ${
                  activeTab === facility.id
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/25'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {React.cloneElement(facility.icon, { 
                  className: `w-5 h-5 mr-2 ${activeTab === facility.id ? 'text-white' : 'text-blue-600'}` 
                })}
                {facility.title}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Facilities Content */}
      <div className="container mx-auto px-4 py-16">
        {facilities.map((facility) => (
          <div
            key={facility.id}
            className={`transition-all duration-500 transform ${
              activeTab === facility.id 
                ? 'opacity-100 translate-y-0' 
                : 'hidden opacity-0 translate-y-4'
            }`}
          >
            <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
              <div className="md:flex">
                <div className="md:w-1/2 relative group">
                  <img
                    src={facility.image}
                    alt={facility.title}
                    className="h-[500px] w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 p-8">
                    <div className="flex items-center mb-4">
                      <div className="p-4 bg-white/10 backdrop-blur-xl rounded-2xl">
                        {facility.icon}
                      </div>
                      <h2 className="text-3xl md:text-4xl font-bold ml-4 text-white">
                        {facility.title}
                      </h2>
                    </div>
                  </div>
                </div>
                <div className="md:w-1/2 p-8 md:p-12">
                  <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                    {facility.description}
                  </p>
                  
                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 gap-6 mb-10">
                    {Object.entries(facility.stats).map(([key, value]) => (
                      <div key={key} className="group bg-gradient-to-br from-gray-50 to-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 transform hover:scale-105 border border-gray-100">
                        <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text">{value}</div>
                        <div className="text-sm text-gray-500 capitalize mt-1">{key}</div>
                      </div>
                    ))}
                  </div>

                  <h3 className="text-2xl font-semibold mb-6 text-gray-800">Key Features</h3>
                  <ul className="grid md:grid-cols-2 gap-4">
                    {facility.details.map((detail, index) => (
                      <li 
                        key={index} 
                        className="flex items-center text-gray-700 bg-gradient-to-r from-gray-50 to-white p-4 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 transform hover:scale-105 border border-gray-100"
                      >
                        <ChevronRight className="w-5 h-5 text-blue-500 mr-3 flex-shrink-0" />
                        <span className="text-sm">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Contact Section */}
      <div className="relative bg-gradient-to-r from-gray-900 via-blue-900 to-indigo-900 text-white py-24 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200')] opacity-10 bg-cover bg-center mix-blend-overlay"></div>
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-4xl font-bold mb-6">
              Experience Our Facilities
            </h3>
            <p className="text-xl mb-12 text-blue-200">
              Schedule a visit to our campus and explore our world-class facilities firsthand
            </p>
            
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="group bg-white/5 backdrop-blur-xl rounded-2xl p-8 hover:bg-white/10 transition-all duration-300 transform hover:scale-105 border border-white/10">
                <Phone className="w-10 h-10 mb-6 mx-auto text-blue-400 group-hover:text-blue-300 transition-colors duration-300" />
                <h4 className="text-xl font-semibold mb-3">Call Us</h4>
                <p className="text-blue-200">123456789</p>
              </div>
              <div className="group bg-white/5 backdrop-blur-xl rounded-2xl p-8 hover:bg-white/10 transition-all duration-300 transform hover:scale-105 border border-white/10">
                <Mail className="w-10 h-10 mb-6 mx-auto text-blue-400 group-hover:text-blue-300 transition-colors duration-300" />
                <h4 className="text-xl font-semibold mb-3">Email Us</h4>
                <p className="text-blue-200">csd-csit@gmail.come</p>
              </div>
              <div className="group bg-white/5 backdrop-blur-xl rounded-2xl p-8 hover:bg-white/10 transition-all duration-300 transform hover:scale-105 border border-white/10">
                <MapPin className="w-10 h-10 mb-6 mx-auto text-blue-400 group-hover:text-blue-300 transition-colors duration-300" />
                <h4 className="text-xl font-semibold mb-3">Visit Us</h4>
                <p className="text-blue-200">SRKR ENGINEERING COLLEGE</p>
              </div>
            </div>

            <button className="group bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-12 py-5 rounded-2xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-blue-500/25 flex items-center mx-auto">
              Schedule a Campus Tour
              <ArrowRight className="w-5 h-5 ml-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-[-10px] group-hover:translate-x-0" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FacilitiesPage;