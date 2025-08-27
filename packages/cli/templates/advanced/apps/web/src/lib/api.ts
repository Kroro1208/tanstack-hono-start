import { z } from 'zod';

// Shared schemas matching the API
export const UserSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string().email(),
  createdAt: z.string().optional(),
});

export const CreateUserSchema = z.object({
  name: z.string(),
  email: z.string().email(),
});

export const AIRequestSchema = z.object({
  message: z.string(),
  context: z.string().optional(),
});

export const AIResponseSchema = z.object({
  response: z.string(),
  timestamp: z.string(),
});

// Types derived from schemas
export type User = z.infer<typeof UserSchema>;
export type CreateUser = z.infer<typeof CreateUserSchema>;
export type AIRequest = z.infer<typeof AIRequestSchema>;
export type AIResponse = z.infer<typeof AIResponseSchema>;

// API client with type safety
const API_BASE = 'http://localhost:8000';

export class APIClient {
  private async request<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const response = await fetch(`${API_BASE}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  // User endpoints
  async getUsers(): Promise<User[]> {
    const users = await this.request<User[]>('/api/users');
    return z.array(UserSchema).parse(users);
  }

  async createUser(userData: CreateUser): Promise<User> {
    const user = await this.request<User>('/api/users', {
      method: 'POST',
      body: JSON.stringify(CreateUserSchema.parse(userData)),
    });
    return UserSchema.parse(user);
  }

  // AI endpoints
  async chatWithAI(request: AIRequest): Promise<AIResponse> {
    const response = await this.request<AIResponse>('/api/ai/chat', {
      method: 'POST',
      body: JSON.stringify(AIRequestSchema.parse(request)),
    });
    return AIResponseSchema.parse(response);
  }

  // Health check
  async healthCheck(): Promise<{ status: string; uptime: number; timestamp: string }> {
    return this.request('/api/health');
  }
}

export const apiClient = new APIClient();