import { serve } from '@hono/node-server';
import { OpenAPIHono, createRoute, z } from '@hono/zod-openapi';
import { swaggerUI } from '@hono/swagger-ui';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';
import { prettyJSON } from 'hono/pretty-json';
import OpenAI from 'openai';

const app = new OpenAPIHono();

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Define schemas for type safety
const UserSchema = z.object({
  id: z.number().openapi({ example: 1 }),
  name: z.string().openapi({ example: 'John Doe' }),
  email: z.string().email().openapi({ example: 'john@example.com' }),
  createdAt: z.string().optional().openapi({ example: '2024-01-01T00:00:00Z' }),
});

const CreateUserSchema = z.object({
  name: z.string().openapi({ example: 'John Doe' }),
  email: z.string().email().openapi({ example: 'john@example.com' }),
});

const AIRequestSchema = z.object({
  message: z.string().openapi({ example: 'Hello, can you help me?' }),
  context: z.string().optional().openapi({ example: 'user management' }),
});

const AIResponseSchema = z.object({
  response: z.string().openapi({ example: 'I can help you with that!' }),
  timestamp: z.string().openapi({ example: '2024-01-01T00:00:00Z' }),
});

// Middleware
app.use('*', cors({
  origin: ['http://localhost:3000', 'http://localhost:5173'],
  credentials: true,
}));
app.use('*', logger());
app.use('*', prettyJSON());

// OpenAPI documentation
app.doc('/doc', {
  openapi: '3.0.0',
  info: {
    version: '1.0.0',
    title: '{{projectName}} API',
    description: 'Modern Fullstack API with TanStack Router, Hono OpenAPI, and Mastra AI',
  },
});

app.get('/ui', swaggerUI({ url: '/doc' }));

// Routes
const rootRoute = createRoute({
  method: 'get',
  path: '/',
  responses: {
    200: {
      content: {
        'application/json': {
          schema: z.object({
            message: z.string(),
            timestamp: z.string(),
            version: z.string(),
          }),
        },
      },
      description: 'API status',
    },
  },
});

app.openapi(rootRoute, (c) => {
  return c.json({
    message: '🚀 Modern Fullstack API is running!',
    timestamp: new Date().toISOString(),
    version: '1.0.0',
  });
});

app.get('/api/health', (c) => {
  return c.json({
    status: 'healthy',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

app.get('/api/hello', (c) => {
  const name = c.req.query('name') || 'World';
  return c.json({
    message: `Hello, ${name}!`,
    timestamp: new Date().toISOString(),
  });
});

// AI Assistant Routes
const aiChatRoute = createRoute({
  method: 'post',
  path: '/api/ai/chat',
  request: {
    body: {
      content: {
        'application/json': {
          schema: AIRequestSchema,
        },
      },
    },
  },
  responses: {
    200: {
      content: {
        'application/json': {
          schema: AIResponseSchema,
        },
      },
      description: 'AI assistant response',
    },
  },
});

app.openapi(aiChatRoute, async (c) => {
  const { message, context } = c.req.valid('json');
  
  try {
    // Use OpenAI API to generate response
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: `You are a helpful AI assistant for the {{projectName}} application.${context ? ` Context: ${context}` : ''}`,
        },
        {
          role: 'user',
          content: message,
        },
      ],
      max_tokens: 500,
      temperature: 0.7,
    });
    
    return c.json({
      response: completion.choices[0]?.message?.content || 'I apologize, but I could not generate a response.',
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('AI generation error:', error);
    return c.json(
      {
        response: 'I apologize, but I encountered an error processing your request.',
        timestamp: new Date().toISOString(),
      },
      500
    );
  }
});

// User Management Routes with OpenAPI
const getUsersRoute = createRoute({
  method: 'get',
  path: '/api/users',
  responses: {
    200: {
      content: {
        'application/json': {
          schema: z.array(UserSchema),
        },
      },
      description: 'List of users',
    },
  },
});

app.openapi(getUsersRoute, (c) => {
  const mockUsers = [
    { id: 1, name: 'John Doe', email: 'john@example.com', createdAt: '2024-01-01T00:00:00Z' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', createdAt: '2024-01-02T00:00:00Z' },
  ];
  return c.json(mockUsers);
});

const createUserRoute = createRoute({
  method: 'post',
  path: '/api/users',
  request: {
    body: {
      content: {
        'application/json': {
          schema: CreateUserSchema,
        },
      },
    },
  },
  responses: {
    201: {
      content: {
        'application/json': {
          schema: UserSchema,
        },
      },
      description: 'Created user',
    },
  },
});

app.openapi(createUserRoute, async (c) => {
  const body = c.req.valid('json');
  const newUser = {
    id: Math.floor(Math.random() * 1000),
    ...body,
    createdAt: new Date().toISOString(),
  };
  return c.json(newUser, 201);
});

// 404 handler
app.notFound((c) => {
  return c.json({
    error: 'Not Found',
    message: 'The requested resource was not found',
  }, 404);
});

// Error handler
app.onError((err, c) => {
  console.error('Server error:', err);
  return c.json({
    error: 'Internal Server Error',
    message: 'Something went wrong',
  }, 500);
});

const port = Number(process.env.PORT) || 8000;

console.log(`🚀 Server is running on http://localhost:${port}`);

serve({
  fetch: app.fetch,
  port,
});