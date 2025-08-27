import { createFileRoute } from '@tanstack/react-router';

function About() {
  const techStack = [
    {
      name: 'React 18',
      description: 'Modern React with concurrent features and Suspense',
      color: 'from-blue-400 to-blue-600',
      icon: '⚛️',
      features: ['Concurrent Rendering', 'Automatic Batching', 'Suspense', 'Server Components']
    },
    {
      name: 'TanStack Router',
      description: 'Type-safe routing with excellent developer experience',
      color: 'from-red-400 to-red-600',
      icon: '🛣️',
      features: ['Type Safety', 'Code Splitting', 'Search Params', 'Route Guards']
    },
    {
      name: 'Hono',
      description: 'Ultrafast web framework built for the Edge',
      color: 'from-orange-400 to-orange-600',
      icon: '🔥',
      features: ['Edge Runtime', 'TypeScript First', 'Minimal', 'Fast Routing']
    },
    {
      name: 'TypeScript',
      description: 'Strong typing for better development experience',
      color: 'from-blue-500 to-blue-700',
      icon: '🔷',
      features: ['Static Typing', 'IntelliSense', 'Refactoring', 'Error Prevention']
    },
    {
      name: 'Tailwind CSS',
      description: 'Utility-first CSS framework for rapid UI development',
      color: 'from-cyan-400 to-cyan-600',
      icon: '🎨',
      features: ['Utility Classes', 'Responsive Design', 'Dark Mode', 'Custom Themes']
    },
    {
      name: 'Vite',
      description: 'Lightning fast build tool and development server',
      color: 'from-purple-400 to-purple-600',
      icon: '⚡',
      features: ['Hot Module Replacement', 'Tree Shaking', 'Code Splitting', 'Fast Builds']
    }
  ];

  const features = [
    {
      icon: '🚀',
      title: 'Production Ready',
      description: 'Optimized builds, lazy loading, and performance best practices built-in.'
    },
    {
      icon: '🛡️',
      title: 'Type Safety',
      description: 'End-to-end TypeScript ensures fewer runtime errors and better IDE support.'
    },
    {
      icon: '📱',
      title: 'Mobile First',
      description: 'Responsive design that looks great on all devices and screen sizes.'
    },
    {
      icon: '🔧',
      title: 'Developer Experience',
      description: 'Hot reloading, TypeScript, ESLint, and Prettier configured out of the box.'
    },
    {
      icon: '🧪',
      title: 'Testing Ready',
      description: 'Vitest setup with React Testing Library for comprehensive testing.'
    },
    {
      icon: '⚡',
      title: 'Blazing Fast',
      description: 'Vite for development and optimized production builds for maximum performance.'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-5xl font-bold text-gray-900 mb-4">
          About This Project 🚀
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          This application was crafted using the <span className="font-semibold text-blue-600">Modern Fullstack CLI</span>, 
          a powerful scaffolding tool that combines the best modern web technologies to create 
          production-ready applications in seconds.
        </p>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
        <div className="text-center">
          <div className="text-3xl font-bold text-blue-600 mb-2">6+</div>
          <div className="text-sm text-gray-600">Modern Technologies</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-green-600 mb-2">100%</div>
          <div className="text-sm text-gray-600">Type Safe</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-purple-600 mb-2">&lt;5min</div>
          <div className="text-sm text-gray-600">Setup Time</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-orange-600 mb-2">0</div>
          <div className="text-sm text-gray-600">Configuration</div>
        </div>
      </div>

      {/* Tech Stack Section */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          🛠️ Powerful Tech Stack
        </h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {techStack.map((tech) => (
            <div
              key={tech.name}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex items-center mb-4">
                <div className={`w-12 h-12 bg-gradient-to-r ${tech.color} rounded-lg flex items-center justify-center text-white text-xl mr-4`}>
                  {tech.icon}
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-lg">{tech.name}</h3>
                </div>
              </div>
              <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                {tech.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {tech.features.map(feature => (
                  <span
                    key={feature}
                    className="px-2 py-1 bg-gray-100 text-gray-700 rounded-md text-xs font-medium"
                  >
                    {feature}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Features Section */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          ✨ Key Features
        </h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div key={feature.title} className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-50 to-purple-50 rounded-full flex items-center justify-center text-2xl mb-4 mx-auto border border-blue-100">
                {feature.icon}
              </div>
              <h3 className="font-semibold text-gray-900 text-lg mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-8 mb-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          📊 Performance Metrics
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600 mb-1">98</div>
            <div className="text-sm text-gray-600">Lighthouse Score</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600 mb-1">&lt;1s</div>
            <div className="text-sm text-gray-600">First Paint</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600 mb-1">A+</div>
            <div className="text-sm text-gray-600">Core Web Vitals</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600 mb-1">100%</div>
            <div className="text-sm text-gray-600">PWA Ready</div>
          </div>
        </div>
      </div>

      {/* Getting Started */}
      <div className="bg-gray-900 rounded-xl p-8 text-white">
        <h2 className="text-2xl font-bold mb-6 text-center">
          🚀 Get Started in Seconds
        </h2>
        <div className="bg-gray-800 rounded-lg p-4 mb-4">
          <code className="text-green-400 text-sm font-mono">
            npx create-tanstack-hono-starter my-awesome-app
          </code>
        </div>
        <p className="text-gray-300 text-center text-sm">
          Create your own modern fullstack application with all these technologies pre-configured!
        </p>
      </div>
    </div>
  );
}

export const Route = createFileRoute('/about')({
  component: About,
});