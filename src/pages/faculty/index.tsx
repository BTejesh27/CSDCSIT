import React from 'react';
import { Mail, MapPin, Bookmark, Award, BookOpen, ExternalLink, Globe, Clock } from 'lucide-react';

interface Faculty {
  id: number;
  name: string;
  role: string;
  image: string;
  qualifications: string[];
  researchInterests: string[];
  email: string;
  office: string;
  publications: string[];
  officeHours: string;
  website?: string;
}

const facultyData: Faculty[] = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    role: "Professor & HOD",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400",
    qualifications: [
      "Ph.D. in Computer Science, MIT",
      "M.Tech in AI, Stanford University"
    ],
    researchInterests: [
      "Artificial Intelligence",
      "Machine Learning",
      "Computer Vision",
      "Neural Networks"
    ],
    email: "sarah.johnson@university.edu",
    office: "Room 301, CS Building",
    publications: [
      "Advanced Machine Learning Algorithms for Big Data Processing - International Journal of Computer Science, 2024",
      "AI in Modern Computing - IEEE Transactions, 2023"
    ],
    officeHours: "Monday & Wednesday, 2:00 PM - 4:00 PM",
    website: "https://sarahjohnson.edu"
  },
  {
    id: 2,
    name: "Dr. Michael Chen",
    role: "Associate Professor",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400",
    qualifications: [
      "Ph.D. in Data Science, Berkeley",
      "M.S. in Computer Science, UCLA"
    ],
    researchInterests: [
      "Big Data Analytics",
      "Cloud Computing",
      "Distributed Systems",
      "Blockchain"
    ],
    email: "michael.chen@university.edu",
    office: "Room 302, CS Building",
    publications: [
      "Novel Approaches in Cloud Computing Security - IEEE Transactions, 2024",
      "Distributed Systems in Practice - ACM Digital Library, 2023"
    ],
    officeHours: "Tuesday & Thursday, 1:00 PM - 3:00 PM",
    website: "https://michaelchen.edu"
  }
];

const FacultyPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-16">
        {/* Header with animated background */}
        <div className="relative text-center mb-20 p-8 rounded-3xl bg-gradient-to-r from-indigo-600 to-purple-600 shadow-xl overflow-hidden">
          <div className="absolute inset-0 bg-grid-white/[0.2] bg-[size:20px_20px]" />
          <div className="relative z-10">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 animate-fade-in">
              Meet Our Distinguished Faculty
            </h1>
            <p className="text-xl text-indigo-100 max-w-3xl mx-auto leading-relaxed">
              Pioneering the future of computer science through groundbreaking research and exceptional education.
            </p>
          </div>
        </div>

        {/* Faculty Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16">
          {facultyData.map((faculty) => (
            <div
              key={faculty.id}
              className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300"
            >
              <div className="p-8">
                {/* Header */}
                <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6 mb-8">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-full blur-lg opacity-20 group-hover:opacity-30 transition-opacity" />
                    <img
                      src={faculty.image}
                      alt={faculty.name}
                      className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-xl relative z-10"
                    />
                  </div>
                  <div className="text-center md:text-left">
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">{faculty.name}</h2>
                    <p className="text-lg text-indigo-600 font-semibold mb-3">{faculty.role}</p>
                    <div className="flex flex-wrap justify-center md:justify-start gap-3">
                      {faculty.website && (
                        <a
                          href={faculty.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center space-x-1 text-gray-600 hover:text-indigo-600 transition-colors"
                        >
                          <Globe className="w-4 h-4" />
                          <span>Website</span>
                        </a>
                      )}
                    </div>
                  </div>
                </div>

                {/* Content Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Left Column */}
                  <div className="space-y-6">
                    {/* Qualifications */}
                    <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-4">
                      <div className="flex items-center space-x-2 mb-3">
                        <Award className="w-5 h-5 text-indigo-600" />
                        <h3 className="text-lg font-semibold text-gray-900">Qualifications</h3>
                      </div>
                      <ul className="space-y-2 pl-4">
                        {faculty.qualifications.map((qual, index) => (
                          <li key={index} className="text-gray-700 flex items-start">
                            <span className="inline-block w-2 h-2 bg-indigo-400 rounded-full mt-2 mr-2" />
                            {qual}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Contact Information */}
                    <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-4">
                      <div className="space-y-3">
                        <div className="flex items-center space-x-2">
                          <Mail className="w-5 h-5 text-purple-600" />
                          <span className="text-gray-700">{faculty.email}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <MapPin className="w-5 h-5 text-purple-600" />
                          <span className="text-gray-700">{faculty.office}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Clock className="w-5 h-5 text-purple-600" />
                          <span className="text-gray-700">{faculty.officeHours}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Column */}
                  <div className="space-y-6">
                    {/* Research Interests */}
                    <div>
                      <div className="flex items-center space-x-2 mb-3">
                        <Bookmark className="w-5 h-5 text-indigo-600" />
                        <h3 className="text-lg font-semibold text-gray-900">Research Interests</h3>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {faculty.researchInterests.map((interest, index) => (
                          <span
                            key={index}
                            className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-full text-sm font-medium shadow-md hover:shadow-lg transition-shadow"
                          >
                            {interest}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Publications */}
                    <div>
                      <div className="flex items-center space-x-2 mb-3">
                        <BookOpen className="w-5 h-5 text-indigo-600" />
                        <h3 className="text-lg font-semibold text-gray-900">Recent Publications</h3>
                      </div>
                      <ul className="space-y-3">
                        {faculty.publications.map((pub, index) => (
                          <li key={index} className="group flex items-start space-x-2 bg-gray-50 p-3 rounded-lg hover:bg-gray-100 transition-colors">
                            <ExternalLink className="w-4 h-4 text-gray-400 mt-1 flex-shrink-0 group-hover:text-indigo-600 transition-colors" />
                            <span className="text-gray-700 text-sm">{pub}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FacultyPage;