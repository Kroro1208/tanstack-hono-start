# Create Modern Fullstack 🚀

A powerful CLI for creating modern fullstack applications with the latest technologies.

## Features

- **React 19** with the newest features and performance improvements
- **TanStack Router** for type-safe routing
- **Hono OpenAPI** for backend with automatic API documentation
- **Mastra AI** integration for intelligent applications
- **End-to-end type safety** with Zod schemas
- **React Query** for server state management
- **Tailwind CSS** for beautiful, responsive designs
- **TypeScript** throughout the entire stack

## Quick Start

```bash
# Create a new project
npx create-modern-fullstack my-awesome-app

# Or with npm
npm create modern-fullstack my-awesome-app

# Or with yarn
yarn create modern-fullstack my-awesome-app
```

## What's Included

### Frontend (React 19 + TanStack Router)
- Modern React 19 with latest features
- Type-safe routing with TanStack Router
- Beautiful UI components with Tailwind CSS
- React Query for data fetching and caching
- Full TypeScript support

### Backend (Hono + OpenAPI)
- Ultra-fast Hono web framework
- OpenAPI/Swagger documentation
- Zod schemas for runtime validation
- Type-safe API endpoints
- CORS and middleware support

### AI Integration (Mastra)
- Built-in AI assistant capabilities
- Ready-to-use chat endpoints
- Context-aware responses
- Easy integration with your app logic

## Generated Project Structure

```
my-awesome-app/
├── apps/
│   ├── web/          # React frontend
│   └── api/          # Hono backend
├── package.json      # Workspace configuration
└── README.md         # Project documentation
```

## API Documentation

Your generated project includes:
- Swagger UI at `http://localhost:8000/ui`
- OpenAPI spec at `http://localhost:8000/doc`
- Type-safe API client with runtime validation

## Development

```bash
# Start the development servers
npm run dev

# Frontend: http://localhost:3000
# Backend: http://localhost:8000
# API Docs: http://localhost:8000/ui
```

## Available Endpoints

- `GET /api/users` - User management
- `POST /api/users` - Create users
- `POST /api/ai/chat` - AI assistant
- `GET /api/health` - Health check

## Contributing

We welcome contributions! Please see our [Contributing Guide](https://github.com/create-modern-fullstack/cli/blob/main/CONTRIBUTING.md).

## License

MIT © [Modern Fullstack CLI](https://github.com/create-modern-fullstack/cli)

---

**Happy coding!** 🎉