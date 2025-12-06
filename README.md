# 🚀 TanStack Hono Start

[![CI](https://github.com/Kroro1208/tanstack-hono-starter/actions/workflows/ci.yml/badge.svg)](https://github.com/Kroro1208/tanstack-hono-starter/actions)

## Try it in 1 minute

```bash
# Create a new project (one line)
npx create-tanstack-hono-start@latest my-app && cd my-app && npm install && npm run dev

# Frontend: http://localhost:3000
# Backend: http://localhost:8000
```

This will scaffold a working fullstack app you can open immediately. If you prefer a faster demo, check the `demo.gif` at the repo root.

## Contribute

[![Good First Issues](https://img.shields.io/badge/Contribute-Good%20First%20Issues-brightgreen?style=for-the-badge)](./GOOD_FIRST_ISSUES.md) [![Contributing Guide](https://img.shields.io/badge/Read-Contributing%20Guide-blue?style=for-the-badge)](./CONTRIBUTING.md) [![Open Issues](https://img.shields.io/github/issues/Kroro1208/tanstack-hono-starter?style=for-the-badge)](https://github.com/Kroro1208/tanstack-hono-starter/issues)

Get started with a tiny contribution in 3 steps:

1. Pick a task from `GOOD_FIRST_ISSUES.md` or open an issue describing your idea.
2. Fork, create a branch `fix/your-issue`, implement and run `npm run test`.
3. Open a PR, reference the issue, and add the `good first issue` label if applicable.

We welcome all improvements — documentation, tests, or small bug fixes are perfect first PRs.

[![npm version](https://badge.fury.io/js/create-tanstack-hono-start.svg)](https://www.npmjs.com/package/create-tanstack-hono-start)
[![Downloads](https://img.shields.io/npm/dm/create-tanstack-hono-start)](https://www.npmjs.com/package/create-tanstack-hono-start)
[![Dependabot Status](https://img.shields.io/github/dependabot/Kroro1208/tanstack-hono-starter?label=dependabot&logo=dependabot&style=for-the-badge)](https://github.com/Kroro1208/tanstack-hono-starter/security/dependabot)
[![Good First Issues](https://img.shields.io/badge/good%20first%20issue-welcome-brightgreen?style=for-the-badge)](https://github.com/Kroro1208/tanstack-hono-starter/issues?q=is%3Aissue+is%3Aopen+label%3A%22good+first+issue%22)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Hono](https://img.shields.io/badge/Hono-FF6B35?style=for-the-badge&logo=hono&logoColor=white)](https://hono.dev/)
[![TanStack Router](https://img.shields.io/badge/TanStack_Router-FF4154?style=for-the-badge&logo=react-router&logoColor=white)](https://tanstack.com/router)

> ⚡ The fastest way to bootstrap modern fullstack applications with React 19, TanStack Router, Hono OpenAPI, and Mastra AI

## 🔒 Security Notice

**Important:** This project uses React 19, which has been updated to address **CVE-2025-55182** (React Server Components vulnerability). All templates now use React **^19.2.1** which includes the security fix.

If you're using Next.js in your project, be aware of **CVE-2025-66478**. Please ensure you're using a patched version:

- Next.js 15.x: Update to 15.0.5, 15.1.9, 15.2.6, 15.3.6, 15.4.8, or 15.5.7
- Next.js 16.x: Update to 16.0.7 or later

To update your dependencies:

```bash
# Update React (for projects created with older templates)
npm install react@^19.2.1 react-dom@^19.2.1

# If using Next.js, update to a patched version
npm install next@^16.0.7  # or appropriate 15.x version
```

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
