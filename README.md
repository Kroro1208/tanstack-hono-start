# 🚀 TanStack Hono Start

[![npm version](https://badge.fury.io/js/create-tanstack-hono-start.svg)](https://www.npmjs.com/package/create-tanstack-hono-start)
[![Downloads](https://img.shields.io/npm/dm/create-tanstack-hono-start)](https://www.npmjs.com/package/create-tanstack-hono-start)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Hono](https://img.shields.io/badge/Hono-FF6B35?style=for-the-badge&logo=hono&logoColor=white)](https://hono.dev/)
[![TanStack Router](https://img.shields.io/badge/TanStack_Router-FF4154?style=for-the-badge&logo=react-router&logoColor=white)](https://tanstack.com/router)

> ⚡ The fastest way to bootstrap modern fullstack applications with React 19, TanStack Router, Hono OpenAPI, and Mastra AI

## 🎬 Quick Demo

![CLI Demo](https://raw.githubusercontent.com/Kroro1208/tanstack-hono-starter/main/demo.gif)

_Create a modern fullstack app in seconds with React 19, TanStack Router, Hono OpenAPI, and AI integration!_

## ✨ Features

- 🎯 **Type-Safe**: End-to-end TypeScript from frontend to backend
- ⚡ **Lightning Fast**: Powered by Vite and Hono for optimal performance
- 🧪 **Test Ready**: Vitest setup with modern testing practices
- 🎨 **Beautiful**: Tailwind CSS with responsive design
- 🔧 **Developer Experience**: Hot reloading, ESLint, Prettier
- 🚀 **Production Ready**: CI/CD with GitHub Actions, Docker support
- 📦 **Monorepo**: Clean workspace organization

## 🚀 Quick Start

```bash
# Create a new project (recommended)
npx create-tanstack-hono-start@latest my-awesome-app

# Or with npm
npm create tanstack-hono-start@latest my-awesome-app

# Or with yarn
yarn create tanstack-hono-start@latest my-awesome-app
```

## 🎯 What's New in 2025

- 🆕 **React 19** - Latest React with improved performance and features
- 🔗 **Hono OpenAPI** - Auto-generated API documentation with Swagger UI

![OpenAPI Documentation](./openapi.gif)

- 🤖 **Mastra AI** - Built-in AI assistant capabilities
- 🔒 **End-to-End Type Safety** - Shared Zod schemas between frontend/backend
- ⚡ **React Query** - Advanced server state management
- 🎨 **Modern UI** - Beautiful Tailwind components out of the box

## 🎯 What You Get

### Frontend (React 19 + TanStack Router)

- ⚛️ **React 19** - Latest features and performance improvements
- 🛣️ **TanStack Router** - Type-safe routing with file-based structure
- ⚡ **Vite** - Lightning-fast development and build
- 🎨 **Tailwind CSS** - Beautiful, responsive UI components
- 🔄 **React Query** - Advanced data fetching and caching
- 🧪 **Vitest** - Modern testing framework

### Backend (Hono + OpenAPI)

- 🔥 **Hono** - Ultra-fast web framework
- 📚 **OpenAPI/Swagger** - Auto-generated API documentation
- 🛡️ **Zod Schemas** - Runtime validation and type safety
- 🤖 **Mastra AI** - Built-in AI assistant endpoints
- 🔍 **Logging & Error Handling** - Production-ready setup
- 📝 **Full TypeScript** - End-to-end type safety

### Generated API Endpoints

- `GET /api/users` - User management with type validation
- `POST /api/users` - Create users with Zod schema validation
- `POST /api/ai/chat` - AI assistant with Mastra integration
- `GET /ui` - Interactive Swagger UI documentation
- `GET /doc` - OpenAPI JSON specification

## 🛠️ Available Templates

### 🔰 **Basic Template**

```bash
npx create-tanstack-hono-start my-app --template basic
```

**Perfect for:**

- 🎓 Learning React and fullstack development
- 🚀 Small to medium projects
- 📚 Understanding each piece as you add it

**What's included:**

- React 19 + TanStack Router frontend
- Hono API with OpenAPI/Swagger
- TypeScript end-to-end
- **Choose your features:** Vitest, Tailwind, Auth, Database, ESLint, CI/CD, Docker

### 🚀 **Advanced Template**

```bash
npx create-tanstack-hono-start my-app --template advanced
```

**Perfect for:**

- 💼 Production-ready applications
- ⚡ Experienced developers who want everything
- 🎯 Getting started immediately without setup

**What's included (ALL features):**

- ✅ React 19 + TanStack Router + Auth
- ✅ Hono API + Database (PostgreSQL + Drizzle ORM)
- ✅ User authentication system (register/login)
- ✅ Testing setup (Vitest + React Testing Library)
- ✅ Code quality (ESLint + Prettier)
- ✅ CI/CD (GitHub Actions)
- ✅ Docker containerization
- ✅ Tailwind CSS styling

## 📋 CLI Options

```bash
# Interactive mode (recommended)
npx create-tanstack-hono-start

# Skip prompts with defaults
npx create-tanstack-hono-start my-app --yes

# Specify template
npx create-tanstack-hono-start my-app --template basic

# List available templates
npx create-tanstack-hono-start list
```

## 🏗️ Generated Project Structure

When you run `npx create-tanstack-hono-start my-app`, you'll get:

```
my-app/                   # ← Your new project
├── apps/
│   ├── web/             # React app with TanStack Router
│   └── api/             # Hono API server
├── packages/            # Shared packages
├── package.json         # Workspace configuration
└── README.md
```

## 🛠️ Usage

### 🎯 Step-by-Step Experience

#### **Basic Template Flow:**

```bash
$ npx create-tanstack-hono-start my-app
? Which template would you like to use? basic
? Select additional features:
 ◯ 🧪 Vitest Testing
 ◯ 🎨 Tailwind CSS
 ◯ 🔒 Authentication (Auth.js)
 ◯ 🗃️ Database (Drizzle ORM)
 ◯ 🔧 ESLint + Prettier
 ◯ 🚀 GitHub Actions CI/CD
 ◯ 🐳 Docker
```

#### **Advanced Template Flow:**

```bash
$ npx create-tanstack-hono-start my-app
? Which template would you like to use? advanced
# 👆 Feature selection is SKIPPED - all features included automatically!
🏗️  Creating project...
✅ Project created successfully!
```

### 💡 Quick Commands

```bash
# Interactive mode (recommended for beginners)
npx create-tanstack-hono-start

# Skip all prompts with basic template
npx create-tanstack-hono-start my-project --template basic --yes

# Get everything with advanced template
npx create-tanstack-hono-start my-project --template advanced

# List available templates and features
npx create-tanstack-hono-start list
```

## 🤝 Why TanStack Router + Hono?

- **🔥 Performance**: Hono is one of the fastest web frameworks
- **🔒 Type Safety**: End-to-end TypeScript support
- **🎯 Developer Experience**: Excellent tooling and debugging
- **🌐 Edge Ready**: Deploy anywhere with minimal configuration
- **📱 Modern**: Built for the latest web standards

## 🧪 Tech Stack

### Frontend (Web App)

- **React** - UI library
- **TanStack Router** - Type-safe routing
- **TypeScript** - Type safety
- **Vite** - Build tool

### Backend (API)

- **Hono** - Web framework
- **TypeScript** - Type safety
- **Node.js** - Runtime

## 📖 Documentation

- [TanStack Router Docs](https://tanstack.com/router)
- [Hono Documentation](https://hono.dev/)
- [Getting Started Guide](./docs/getting-started.md)
- [API Reference](./docs/api-reference.md)

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](./CONTRIBUTING.md) for details.

```bash
# Clone the repository
git clone https://github.com/Kroro1208/tanstack-hono-starter.git

# Install dependencies
cd tanstack-hono-starter
npm install

# Start development
npm run dev
```

## 📄 License

MIT License - see the [LICENSE](./LICENSE) file for details.

## 🌟 Show Your Support

If this project helped you, please consider giving it a ⭐ on GitHub!

## 🔗 Links

- [GitHub Repository](https://github.com/Kroro1208/tanstack-hono-starter)
- [npm Package](https://www.npmjs.com/package/create-tanstack-hono-start)
- [Issues & Bug Reports](https://github.com/Kroro1208/tanstack-hono-starter/issues)

---

**Happy coding!** 🎉 Built with ❤️ for the modern web development community.
