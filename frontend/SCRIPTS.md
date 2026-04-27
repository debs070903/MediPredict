# 📜 NPM Scripts Documentation

This document describes all available npm scripts for the MediPredict project.

## Available Scripts

### Development

#### `npm run dev`

Starts the development server with hot module replacement (HMR).

```bash
npm run dev
```

- **Default Port**: `http://localhost:5173`
- **Features**:
  - Hot Module Replacement (HMR)
  - Fast refresh
  - Instant updates on file changes
  - Source maps for debugging

**Usage**: Use this for daily development work.

---

### Production

#### `npm run build`

Creates an optimized production build.

```bash
npm run build
```

- **Output Directory**: `dist/`
- **Features**:
  - Minified JavaScript and CSS
  - Tree-shaking for smaller bundle size
  - Optimized assets
  - Production-ready code

**Usage**: Run this before deploying to production.

---

#### `npm run preview`

Preview the production build locally.

```bash
npm run preview
```

- **Default Port**: `http://localhost:4173`
- **Features**:
  - Serves the production build
  - Test production optimizations
  - Verify build works correctly

**Usage**: Test the production build before deploying.

---

### Code Quality

#### `npm run lint` (if configured)

Runs ESLint to check code quality.

```bash
npm run lint
```

**Note**: ESLint needs to be configured for this to work.

---

## Common Workflows

### Starting Development

```bash
# Install dependencies (first time only)
npm install

# Start development server
npm run dev
```

### Building for Production

```bash
# Create production build
npm run build

# Preview production build locally
npm run preview
```

### Full Development Cycle

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm run dev

# 3. Make your changes...

# 4. Build for production
npm run build

# 5. Test production build
npm run preview
```

---

## Environment Variables

Create a `.env` file in the root directory for environment-specific variables:

```env
# Example environment variables
VITE_API_URL=https://api.medipredict.com
VITE_APP_NAME=MediPredict
VITE_VERSION=1.0.0
```

**Note**: Vite requires environment variables to be prefixed with `VITE_`.

Access in code:

```javascript
const apiUrl = import.meta.env.VITE_API_URL;
```

---

## Port Configuration

### Change Development Port

Edit `vite.config.js`:

```javascript
export default defineConfig({
  server: {
    port: 3000, // Your custom port
    open: true, // Auto-open browser
  },
});
```

### Change Preview Port

```bash
npm run preview -- --port 8080
```

---

## Troubleshooting

### Port Already in Use

If port 5173 is already in use:

```bash
# Kill the process using the port (Windows)
npx kill-port 5173

# Or use a different port
npm run dev -- --port 3000
```

### Cache Issues

If you encounter build issues, try clearing the cache:

```bash
# Remove node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Clear npm cache
npm cache clean --force

# Reinstall dependencies
npm install
```

### Build Fails

1. Check Node.js version (should be v18 or higher):

   ```bash
   node --version
   ```

2. Update dependencies:

   ```bash
   npm update
   ```

3. Remove dist folder and rebuild:
   ```bash
   rm -rf dist
   npm run build
   ```

---

## Performance Tips

### Development

- **Use Fast Refresh**: Vite's HMR is very fast, keep files small
- **Code Splitting**: Lazy load routes and components
- **Avoid Large Dependencies**: Check bundle size regularly

### Production

- **Analyze Bundle Size**:

  ```bash
  npm run build -- --mode analyze
  ```

- **Optimize Images**: Compress images before adding to project
- **Tree Shaking**: Remove unused imports
- **Lazy Loading**: Use `React.lazy()` for code splitting

---

## Deployment

### Build for Different Environments

```bash
# Development build
npm run build -- --mode development

# Staging build
npm run build -- --mode staging

# Production build
npm run build -- --mode production
```

### Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Deploy to Netlify

```bash
# Install Netlify CLI
npm i -g netlify-cli

# Deploy
netlify deploy --prod --dir=dist
```

---

## Additional Scripts (Custom)

You can add custom scripts to `package.json`:

```json
{
  "scripts": {
    "clean": "rm -rf dist node_modules",
    "reinstall": "npm run clean && npm install",
    "format": "prettier --write \"src/**/*.{js,jsx,json,css,md}\"",
    "test": "vitest",
    "test:ui": "vitest --ui"
  }
}
```

---

## VS Code Integration

Add to `.vscode/tasks.json`:

```json
{
  "version": "2.0.0",
  "tasks": [
    {
      "label": "npm: dev",
      "type": "npm",
      "script": "dev",
      "problemMatcher": [],
      "isBackground": true
    },
    {
      "label": "npm: build",
      "type": "npm",
      "script": "build",
      "problemMatcher": []
    }
  ]
}
```

---

## Quick Reference

| Command           | Purpose                  | When to Use                             |
| ----------------- | ------------------------ | --------------------------------------- |
| `npm install`     | Install dependencies     | First time setup, after pulling changes |
| `npm run dev`     | Start dev server         | During development                      |
| `npm run build`   | Build for production     | Before deployment                       |
| `npm run preview` | Preview production build | Testing before deployment               |

---

## Need Help?

- 📖 [Vite Documentation](https://vitejs.dev/)
- 📖 [React Documentation](https://react.dev/)
- 📖 [Tailwind CSS Documentation](https://tailwindcss.com/)
- 💬 [Open an Issue](https://github.com/yourusername/medipredict/issues)

---

**Happy Coding! 🚀**
