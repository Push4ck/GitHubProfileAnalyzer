# GitHub Profile Analyzer

A React application designed to analyze GitHub profiles, providing insights into repository information and commit activity. Features a user-friendly light/dark mode toggle and a clean, professional interface.

## Table of Contents

- [GitHub Profile Analyzer](#github-profile-analyzer)
  - [Table of Contents](#table-of-contents)
  - [Project Overview](#project-overview)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Development](#development)
  - [Production Build](#production-build)
  - [Deployment](#deployment)
    - [Netlify](#netlify)
    - [GitHub Pages](#github-pages)
  - [Dependencies](#dependencies)
  - [Contributing](#contributing)

## Project Overview

This application leverages the GitHub API to fetch and display detailed information about a user's repositories and commit history. It's built with React, styled with Tailwind CSS, and utilizes libraries like Recharts for data visualization and Framer Motion for smooth animations.

## Prerequisites

Before proceeding, ensure you have the following installed:

- **Node.js**: (Recommended version >= 14) Download from [nodejs.org](https://nodejs.org/).
- **npm** or **Yarn**: (npm is included with Node.js; Yarn can be installed from [yarnpkg.com](https://yarnpkg.com/)).

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Push4ck/GitHubProfileAnalyzer.git
   cd GitHubProfileAnalyzer
   ```

2. **Install dependencies:**

   Using npm:

   ```bash
   npm install
   ```

   Or using Yarn:

   ```bash
   yarn install
   ```

## Development

To run the application in development mode:

Using npm:

```bash
npm run dev
```

Or using Yarn:

```bash
yarn dev
```

Open your browser and navigate to `http://localhost:5173/` (or the port specified in your console).

## Production Build

To build the application for production:

Using npm:

```bash
npm run build
```

Or using Yarn:

```bash
yarn build
```

The production-ready build will be located in the `dist` folder.

## Deployment

### Netlify

1. **Create a Netlify account** and log in.
2. **Connect your GitHub repository** to Netlify.
3. **Configure build settings:**
   - **Build command:** `npm run build` or `yarn build`
   - **Publish directory:** `dist`
4. **Deploy your site.** Netlify will automatically build and deploy your application.

### GitHub Pages

1. **Add `homepage` field** to `package.json`. Replace `<username>` with your GitHub username (Push4ck) and `<repo-name>` with the repository name (GitHubProfileAnalyzer):

   ```json
   "homepage": "https://Push4ck.github.io/GitHubProfileAnalyzer/"
   ```

2. **Install `gh-pages` as a dev dependency:**

   Using npm:

   ```bash
   npm install gh-pages --save-dev
   ```

   Or using Yarn:

   ```bash
   yarn add gh-pages --dev
   ```

3. **Add deploy scripts** to `package.json`:

   ```json
   "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d dist",
       "dev": "vite",
       "build": "tsc && vite build",
       "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
       "preview": "vite preview"
   }
   ```

4. **Deploy to GitHub Pages:**

   Using npm:

   ```bash
   npm run deploy
   ```

   Or using Yarn:

   ```bash
   yarn deploy
   ```

5. **Enable GitHub Pages** in your repository settings:

   - Go to your repository settings.
   - Navigate to the "Pages" section.
   - Select the `gh-pages` branch as the source.

   Your site will be deployed to `https://Push4ck.github.io/GitHubProfileAnalyzer/`.

## Dependencies

- **React**: JavaScript library for building user interfaces.
- **Tailwind CSS**: Utility-first CSS framework.
- **Lucide React:** Beautifully simple, pixel-perfect icons.
- **Recharts**: Redefined chart library built with React and D3.
- **Framer Motion**: Motion and animation library for React.
- **@/components/ui/\***: Custom UI components.
- **@/services/githubApi**: API handling functions.
- **@/types/github**: TypeScript type definitions.

## Contributing

Contributions are welcome! Please feel free to submit a pull request.
