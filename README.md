# 🚀 Modern Fullstack CLI

[![npm version](https://badge.fury.io/js/create-modern-fullstack.svg)](https://www.npmjs.com/package/create-modern-fullstack)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Hono](https://img.shields.io/badge/Hono-FF6B35?style=for-the-badge&logo=hono&logoColor=white)](https://hono.dev/)
[![TanStack Router](https://img.shields.io/badge/TanStack_Router-FF4154?style=for-the-badge&logo=react-router&logoColor=white)](https://tanstack.com/router)

> ⚡ The fastest way to bootstrap modern fullstack applications with TanStack Router and Hono

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
# Create a new project
npx create-modern-fullstack my-awesome-app

# Or with options
npx create-modern-fullstack my-app --template basic --yes
```

## 🎯 What You Get

### Frontend (React + TanStack Router)
- ⚛️ React 18 with concurrent features
- 🛣️ Type-safe routing with TanStack Router  
- ⚡ Vite for lightning-fast development
- 🎨 Tailwind CSS for beautiful UIs
- 🧪 Vitest for testing

### Backend (Hono API)
- 🔥 Hono for ultrafast API development
- 🛡️ Built-in CORS and security
- 📝 TypeScript throughout
- 🧪 API testing setup
- 🔍 Request logging and error handling

## 🛠️ Available Templates

- **basic** - Essential fullstack setup with React + Hono
- **advanced** - Includes auth, database, and testing (coming soon)

## 📋 CLI Options

```bash
# Interactive mode (recommended)
npx create-modern-fullstack

# Skip prompts with defaults
npx create-modern-fullstack my-app --yes

# Specify template
npx create-modern-fullstack my-app --template basic

# List available templates
npx create-modern-fullstack list
```

## 🏗️ Generated Project Structure

When you run `npx tanstack-hono-starter my-app`, you'll get:

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

```bash
# Interactive mode
npx tanstack-hono-starter

# Specify project name
npx tanstack-hono-starter my-project

# Choose template (coming soon)
npx tanstack-hono-starter my-project --template advanced
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
git clone https://github.com/yourusername/tanstack-hono-starter.git

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

- [GitHub Repository](https://github.com/kuroro1208/tanstack-hono-starter)
- [npm Package](https://www.npmjs.com/package/tanstack-hono-starter)
- [Issues & Bug Reports](https://github.com/kuroro1208/tanstack-hono-starter/issues)

---

**Happy coding!** 🎉 Built with ❤️ for the modern web development community.
