import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient, type User, type CreateUser, type AIRequest } from '../lib/api';

function Users() {
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showAIChat, setShowAIChat] = useState(false);
  const [aiMessage, setAiMessage] = useState('');
  const [newUser, setNewUser] = useState<CreateUser>({ name: '', email: '' });

  // Queries and mutations with React Query
  const { data: users = [], isLoading, error } = useQuery({
    queryKey: ['users'],
    queryFn: () => apiClient.getUsers(),
  });

  const createUserMutation = useMutation({
    mutationFn: (userData: CreateUser) => apiClient.createUser(userData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      setShowCreateForm(false);
      setNewUser({ name: '', email: '' });
    },
  });

  const aiChatMutation = useMutation({
    mutationFn: (request: AIRequest) => apiClient.chatWithAI(request),
  });

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreateUser = (e: React.FormEvent) => {
    e.preventDefault();
    createUserMutation.mutate(newUser);
  };

  const handleAIChat = (e: React.FormEvent) => {
    e.preventDefault();
    aiChatMutation.mutate({
      message: aiMessage,
      context: 'user management',
    });
  };

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center py-16">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-200 border-t-blue-600 mx-auto mb-4"></div>
          <p className="text-lg text-gray-600">Loading amazing users...</p>
          <p className="text-sm text-gray-500 mt-2">Fetching data from API</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center py-16">
          <div className="bg-red-50 border border-red-200 rounded-lg p-8 max-w-md mx-auto">
            <div className="text-red-500 text-4xl mb-4">⚠️</div>
            <h3 className="text-lg font-medium text-red-900 mb-2">Connection Error</h3>
            <p className="text-red-700 mb-4">{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header Section */}
      <div className="mb-8">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Team Members 👥
            </h1>
            <p className="text-lg text-gray-600">
              Manage and view all team members with real-time API integration
            </p>
          </div>
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 px-6 py-4 rounded-lg border border-blue-200">
            <div className="text-2xl font-bold text-blue-600">{filteredUsers.length}</div>
            <div className="text-sm text-blue-500">Active Users</div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative max-w-md">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          />
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-500">Online</p>
              <p className="text-2xl font-bold text-green-600">
                {filteredUsers.filter(u => u.status === 'online').length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-500">Away</p>
              <p className="text-2xl font-bold text-yellow-600">
                {filteredUsers.filter(u => u.status === 'away').length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-2 bg-gray-100 rounded-lg">
              <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-500">Offline</p>
              <p className="text-2xl font-bold text-gray-600">
                {filteredUsers.filter(u => u.status === 'offline').length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Users Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredUsers.map(user => (
          <div 
            key={user.id} 
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md hover:scale-105 transition-all duration-200 cursor-pointer"
            onClick={() => {
              setSelectedUser(user);
              setShowModal(true);
            }}
          >
            {/* User Avatar */}
            <div className="flex items-center mb-4">
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                  {user.name.charAt(0)}
                </div>
                {/* Status Indicator */}
                <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${
                  user.status === 'online' ? 'bg-green-500' :
                  user.status === 'away' ? 'bg-yellow-500' : 'bg-gray-400'
                }`}></div>
              </div>
              <div className="ml-4 flex-1">
                <h3 className="font-semibold text-gray-900 text-lg">{user.name}</h3>
                <p className="text-gray-600 text-sm">{user.email}</p>
              </div>
            </div>

            {/* User Details */}
            <div className="space-y-2 mb-4">
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">Role</span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  user.role === 'Admin' ? 'bg-red-100 text-red-700' :
                  user.role === 'Moderator' ? 'bg-blue-100 text-blue-700' :
                  'bg-gray-100 text-gray-700'
                }`}>
                  {user.role}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">Status</span>
                <span className={`capitalize text-xs font-medium ${
                  user.status === 'online' ? 'text-green-600' :
                  user.status === 'away' ? 'text-yellow-600' : 'text-gray-600'
                }`}>
                  {user.status}
                </span>
              </div>
            </div>

            {/* Action Button */}
            <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 px-4 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 font-medium text-sm">
              View Details
            </button>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredUsers.length === 0 && !loading && (
        <div className="text-center py-16">
          <div className="text-gray-400 text-6xl mb-4">🔍</div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No users found</h3>
          <p className="text-gray-600">
            {searchTerm ? 'Try adjusting your search terms.' : 'There are no users to display at the moment.'}
          </p>
        </div>
      )}

      {/* User Detail Modal */}
      {showModal && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900">User Details</h2>
              <button 
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="text-center mb-6">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-2xl mx-auto mb-4">
                {selectedUser.name.charAt(0)}
              </div>
              <h3 className="text-lg font-semibold text-gray-900">{selectedUser.name}</h3>
              <p className="text-gray-600">{selectedUser.email}</p>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-500">Role</span>
                <span className="font-medium">{selectedUser.role}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Status</span>
                <span className={`capitalize font-medium ${
                  selectedUser.status === 'online' ? 'text-green-600' :
                  selectedUser.status === 'away' ? 'text-yellow-600' : 'text-gray-600'
                }`}>
                  {selectedUser.status}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Joined</span>
                <span className="font-medium">
                  {selectedUser.createdAt ? new Date(selectedUser.createdAt).toLocaleDateString() : 'Recently'}
                </span>
              </div>
            </div>

            <div className="mt-6 flex space-x-3">
              <button className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                Send Message
              </button>
              <button className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors">
                View Profile
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export const Route = createFileRoute('/users')({
  component: Users,
});