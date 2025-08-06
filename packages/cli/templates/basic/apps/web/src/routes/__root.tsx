import { createRootRoute, Link, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';

export const Route = createRootRoute({
  component: () => (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Modern Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200/50 sticky top-0 z-50">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">M</span>
              </div>
              <span className="font-bold text-gray-900 text-lg">ModernStack</span>
            </div>

            {/* Navigation Links */}
            <div className="hidden md:flex items-center space-x-1">
              <Link 
                to="/" 
                className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-gray-100 [&.active]:bg-blue-100 [&.active]:text-blue-700 [&.active]:font-semibold"
              >
                🏠 Home
              </Link>
              <Link 
                to="/about" 
                className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-gray-100 [&.active]:bg-blue-100 [&.active]:text-blue-700 [&.active]:font-semibold"
              >
                ℹ️ About
              </Link>
              <Link 
                to="/users" 
                className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-gray-100 [&.active]:bg-blue-100 [&.active]:text-blue-700 [&.active]:font-semibold"
              >
                👥 Users
              </Link>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden border-t border-gray-200 py-2">
            <div className="flex flex-col space-y-1">
              <Link 
                to="/" 
                className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-gray-100 [&.active]:bg-blue-100 [&.active]:text-blue-700"
              >
                🏠 Home
              </Link>
              <Link 
                to="/about" 
                className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-gray-100 [&.active]:bg-blue-100 [&.active]:text-blue-700"
              >
                ℹ️ About
              </Link>
              <Link 
                to="/users" 
                className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-gray-100 [&.active]:bg-blue-100 [&.active]:text-blue-700"
              >
                👥 Users
              </Link>
            </div>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="pb-8">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <p className="text-gray-400 text-sm">
              Built with ❤️ using <span className="text-blue-400">Modern Fullstack CLI</span>
            </p>
            <div className="mt-4 flex justify-center space-x-6">
              <span className="text-xs text-gray-500">React 18</span>
              <span className="text-xs text-gray-500">TanStack Router</span>
              <span className="text-xs text-gray-500">Hono</span>
              <span className="text-xs text-gray-500">TypeScript</span>
            </div>
          </div>
        </div>
      </footer>

      <TanStackRouterDevtools />
    </div>
  ),
});