import { useState, useEffect, useRef } from 'react';
import {
  BookOpen,
  FlaskRound as Flask,
  Award,
  Users,
  Lightbulb,
  Moon,
  Sun,
  ChevronDown,
  ExternalLink
} from 'lucide-react';

function ResearchPage() {
  const [darkMode, setDarkMode] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const sectionRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;

      for (const sectionId in sectionRefs.current) {
        const section = sectionRefs.current[sectionId];
        if (section) {
          const offsetTop = section.offsetTop;
          const offsetBottom = offsetTop + section.offsetHeight;

          if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const section = sectionRefs.current[id];
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const sections = [
    {
      id: 'research-areas',
      title: 'Research Areas',
      description: 'Exploring cutting-edge technologies and scientific frontiers',
      icon: <Flask className="w-8 h-8 text-blue-600 dark:text-blue-400" />,
      image: 'https://images.unsplash.com/photo-1507668077129-56e32842fceb?auto=format&fit=crop&q=80&w=400',
      content: [
        'Artificial Intelligence & Machine Learning',
        'Quantum Computing & Information Systems',
        'Sustainable Energy Technologies',
        'Advanced Biotechnology Research',
        'Next-Generation Materials Science',
      ],
    },
    {
      id: 'projects',
      title: 'Projects & Grants',
      description: 'Funded initiatives driving innovation and discovery',
      icon: <Lightbulb className="w-8 h-8 text-blue-600 dark:text-blue-400" />,
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=400',
      content: [
        'Neural Network Optimization ($2.5M Grant)',
        'Green Energy Solutions ($1.8M Grant)',
        'Smart City Infrastructure ($3.2M Grant)',
        'Healthcare Innovation Platform ($2.1M Grant)',
      ],
    },
    {
      id: 'publications',
      title: 'Publications',
      description: 'Leading research papers and scientific contributions',
      icon: <BookOpen className="w-8 h-8 text-blue-600 dark:text-blue-400" />,
      image: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&q=80&w=400',
      content: [
        'Nature: "Quantum Computing Breakthroughs" - 2024',
        'Science: "AI in Healthcare" - 2023',
        'IEEE: "Smart Grid Implementation" - 2023',
        'Cell: "Biotech Innovation" - 2022',
      ],
    },
    {
      id: 'collaborations',
      title: 'Collaborations',
      description: 'Partnerships with leading institutions worldwide',
      icon: <Users className="w-8 h-8 text-blue-600 dark:text-blue-400" />,
      image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=400',
      content: ['MIT Research Lab', 'Stanford University', 'CERN', 'NASA Space Program'],
    },
    {
      id: 'patents',
      title: 'Patents',
      description: 'Protected innovations and technological advances',
      icon: <Award className="w-8 h-8 text-blue-600 dark:text-blue-400" />,
      image: 'https://images.unsplash.com/photo-1589859762194-eaae75c61f64?auto=format&fit=crop&q=80&w=400',
      content: [
        'Advanced AI Algorithm (Patent #12345)',
        'Sustainable Energy Storage (Patent #67890)',
        'Quantum Computing Architecture (Patent #11223)',
        'Biotech Process Innovation (Patent #44556)',
      ],
    },
  ];

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'dark bg-gray-900' : 'bg-white'}`}>
      {/* Fixed Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg shadow-lg">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Research Lab
            </h1>
            <div className="flex items-center gap-6">
              <div className="hidden md:flex gap-4">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                      activeSection === section.id
                        ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400'
                        : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`}
                  >
                    {section.title}
                  </button>
                ))}
              </div>
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
              >
                {darkMode ? (
                  <Sun className="w-5 h-5 text-yellow-400" />
                ) : (
                  <Moon className="w-5 h-5 text-gray-600" />
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=2072"
            alt="Research Lab"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-indigo-900/90 mix-blend-multiply" />
        </div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <div className="animate-fade-in-up">
              <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white">
                Advancing the Future
              </h1>
              <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto leading-relaxed">
                Pioneering breakthrough innovations and advancing scientific knowledge through
                cutting-edge research and collaborative partnerships.
              </p>
              <div className="flex flex-col gap-4 max-w-md mx-auto">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    className="group flex items-center gap-3 w-full px-6 py-4 bg-white/10 backdrop-blur-sm text-white rounded-xl hover:bg-white/20 transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    <div className="p-2 bg-white/10 rounded-lg">
                      {section.icon}
                    </div>
                    <span className="text-lg font-semibold">{section.title}</span>
                    <ChevronDown className="w-5 h-5 ml-auto group-hover:translate-y-1 transition-transform duration-300" />
                  </button>
                ))}
                <button className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl mt-4">
                  Contact Us
                  <ExternalLink className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden sticky top-16 bg-white dark:bg-gray-900 shadow-md z-40">
        <div className="container mx-auto px-6 py-4 overflow-x-auto">
          <div className="flex gap-4 whitespace-nowrap">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                  activeSection === section.id
                    ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                {section.title}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Section List */}
      <div className="container mx-auto px-6 py-24 space-y-24">
        {sections.map((section) => (
          <div
            key={section.id}
            ref={(el) => (sectionRefs.current[section.id] = el)}
            className="group"
          >
            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl overflow-hidden transform transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
              <div className="relative h-64 md:h-96 overflow-hidden">
                <img
                  src={section.image}
                  alt={section.title}
                  className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                <div className="absolute bottom-8 left-8 right-8">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="bg-white/10 backdrop-blur-sm p-4 rounded-2xl">
                      {section.icon}
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-white">{section.title}</h2>
                  </div>
                  <p className="text-lg text-gray-200">{section.description}</p>
                </div>
              </div>
              <div className="p-8">
                <ul className="grid gap-4 sm:grid-cols-2">
                  {section.content.map((item, index) => (
                    <li
                      key={index}
                      className="flex items-center gap-3 p-4 rounded-xl bg-gray-50 dark:bg-gray-700/50 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors duration-300"
                    >
                      <span className="w-2 h-2 rounded-full bg-blue-600 dark:bg-blue-400"></span>
                      <span className="text-gray-800 dark:text-gray-200">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <footer className="bg-gray-50 dark:bg-gray-800/50 py-12">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
              Ready to Collaborate?
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Join us in shaping the future of technology and innovation.
            </p>
            <button className="px-8 py-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl">
              Get in Touch
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default ResearchPage;