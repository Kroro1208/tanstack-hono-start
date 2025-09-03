import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { useUsers, useCreateUser } from '../hooks';
import { Button } from '../components/ui';
import { type CreateUser } from '../lib/api';
import { formatDate } from '../lib/utils';

function Users() {
  const [newUser, setNewUser] = useState<CreateUser>({ name: '', email: '' });
  const [showForm, setShowForm] = useState(false);

  // Use custom hooks
  const { data: users = [], isLoading, error } = useUsers();
  const createUserMutation = useCreateUser();

  const handleCreateUser = (e: React.FormEvent) => {
    e.preventDefault();
    createUserMutation.mutate(newUser, {
      onSuccess: () => {
        setNewUser({ name: '', email: '' });
        setShowForm(false);
      }
    });
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading users...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center text-red-600">
          <p>Error: {error.message}</p>
          <Button onClick={() => window.location.reload()} className="mt-4">
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Users</h1>
        <Button onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancel' : 'Add User'}
        </Button>
      </div>

      {showForm && (
        <form onSubmit={handleCreateUser} className="mb-6 p-4 border rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Name"
              value={newUser.name}
              onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
              className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={newUser.email}
              onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
              className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <Button 
            type="submit" 
            disabled={createUserMutation.isPending}
            className="mt-4"
          >
            {createUserMutation.isPending ? 'Creating...' : 'Create User'}
          </Button>
        </form>
      )}

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {users.map(user => (
          <div key={user.id} className="border rounded-lg p-4">
            <h3 className="font-semibold">{user.name}</h3>
            <p className="text-gray-600">{user.email}</p>
            {user.createdAt && (
              <p className="text-sm text-gray-500 mt-2">
                Joined {formatDate(user.createdAt)}
              </p>
            )}
          </div>
        ))}
      </div>

      {users.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500">No users found.</p>
        </div>
      )}
    </div>
  );
}

export const Route = createFileRoute('/users')({
  component: Users,
});