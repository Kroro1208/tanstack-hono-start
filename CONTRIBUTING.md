# Contributing to TanStack Hono Starter 🤝

First off, thank you for considering contributing to TanStack Hono Starter! It's people like you that make this project a great tool for the developer community.

## 🌟 Ways to Contribute

- 🐛 **Bug Reports**: Found a bug? Let us know!
- 💡 **Feature Requests**: Have an idea for improvement? We'd love to hear it!
- 📝 **Documentation**: Help improve our docs
- 🔧 **Code Contributions**: Fix bugs or implement new features
- 🎨 **Templates**: Create new project templates
- 📢 **Spread the Word**: Share with other developers

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, or pnpm
- Git

### Development Setup

1. **Fork & Clone**

   ```bash
   git clone https://github.com/Kroro1208/tanstack-hono-start.git
   cd tanstack-hono-starter
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Start Development**

   ```bash
   npm run dev
   ```

4. **Test Your Changes**
   ```bash
   npm run test
   npm run build
   ```

## 📋 Development Guidelines

### Code Style

- Use **TypeScript** throughout
- Follow existing code formatting (Prettier)
- Write meaningful commit messages
- Add JSDoc comments for public APIs

### Commit Messages

Follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
type(scope): description

feat(cli): add support for custom templates
fix(templates): resolve React 19 compatibility issue
docs(readme): update installation instructions
```

**Types:**

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation only changes
- `style`: Formatting, missing semi colons, etc
- `refactor`: Code change that neither fixes a bug nor adds a feature
- `test`: Adding missing tests
- `chore`: Changes to build process or auxiliary tools

### Pull Request Process

1. **Create a Branch**

   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make Your Changes**

   - Write clean, readable code
   - Add tests if applicable
   - Update documentation

3. **Test Everything**

   ```bash
   npm run test
   npm run build
   ```

4. **Submit PR**
   - Use the PR template
   - Link related issues
   - Provide clear description of changes

## 🐛 Bug Reports

### Before Submitting

- Search existing issues to avoid duplicates
- Test with the latest version
- Check if it's already fixed in `main` branch

### What to Include

- **Environment**: OS, Node version, package version
- **Steps to Reproduce**: Clear, numbered steps
- **Expected vs Actual**: What should happen vs what happens
- **Code Samples**: Minimal reproduction case
- **Screenshots**: If UI-related

**Template:**

```markdown
## Bug Description

Brief description of the issue

## Environment

- OS: [e.g., macOS 14.0]
- Node: [e.g., v20.0.0]
- Package Version: [e.g., v1.2.0]

## Steps to Reproduce

1. Run `npx create-tanstack-hono-start my-app`
2. ...
3. See error

## Expected Behavior

What should happen

## Actual Behavior

What actually happens

## Additional Context

Any other context, screenshots, etc.
```

## 💡 Feature Requests

We love new ideas! Before submitting:

- Check if it aligns with project goals
- Search existing feature requests
- Consider if it fits the "batteries included" philosophy

**Template:**

```markdown
## Feature Description

Clear, concise description of the feature

## Problem It Solves

What problem does this solve for users?

## Proposed Solution

How should this work?

## Alternatives Considered

What other approaches did you consider?

## Additional Context

Mockups, examples, related issues, etc.
```

## 🎨 Creating Templates

Want to add a new template? Great!

### Template Structure

```
templates/your-template/
├── template.json          # Template configuration
├── package.json.hbs      # Root package.json template
├── README.md.hbs         # Project README template
└── apps/
    ├── web/              # Frontend app
    └── api/              # Backend app
```

### Template Configuration (`template.json`)

```json
{
  "name": "your-template",
  "description": "Description of your template",
  "features": ["typescript", "react", "hono"],
  "prompts": [
    {
      "name": "includeAuth",
      "message": "Include authentication?",
      "type": "confirm",
      "default": true
    }
  ]
}
```

## 🧪 Testing

- **Unit Tests**: Test individual functions
- **Integration Tests**: Test CLI commands end-to-end
- **Template Tests**: Ensure generated projects work

```bash
# Run all tests
npm run test

# Test specific template generation
npm run test:templates

# Test CLI commands
npm run test:cli
```

## 📖 Documentation

Documentation improvements are always welcome!

- Fix typos or grammar
- Add examples and use cases
- Improve clarity and organization
- Update outdated information

## 🏷️ Issue Labels

- `bug` - Something isn't working
- `enhancement` - New feature or request
- `documentation` - Improvements or additions to docs
- `good first issue` - Good for newcomers
- `help wanted` - Extra attention is needed
- `question` - Further information is requested

## 🎯 Project Goals

This project aims to:

- **Fast Setup**: Get developers productive in seconds, not hours
- **Modern Stack**: Use the latest, stable web technologies
- **Type Safety**: End-to-end TypeScript with runtime validation
- **Developer Experience**: Excellent tooling and clear errors
- **Production Ready**: Include testing, linting, and deployment setup

## 📞 Getting Help

- **GitHub Discussions**: General questions and ideas
- **Issues**: Bug reports and feature requests
- **Discord**: Real-time chat with the community

## � Quick start for first-time contributors

If you'd like to make your first contribution, follow these simple steps:

1. Fork the repo and clone it locally.
2. Create a branch: `git checkout -b fix/your-issue-name`.
3. Make a small change (typo fix, doc improvement, or a small bugfix).
4. Run `npm install` then `npm run test` to ensure nothing breaks.
5. Push your branch and open a PR referencing the issue or write `Closes #<issue-number>`.

See `GOOD_FIRST_ISSUES.md` for curated starter tasks.

## �📜 Code of Conduct

This project follows our [Code of Conduct](CODE_OF_CONDUCT.md). Please read it before participating.

## 📝 License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

**Thank you for contributing! 🙏**

Every contribution, no matter how small, helps make this project better for everyone.
