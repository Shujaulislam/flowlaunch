# Task Manager Application

## Project Overview
A modern, responsive task management application built with React and Vite. The application allows users to create, view, filter, and manage tasks efficiently with a clean and intuitive user interface.

## Tech Stack

### Core Technologies
- **React 18**: Frontend library for building user interfaces
- **Vite**: Next-generation frontend build tool
- **TailwindCSS**: Utility-first CSS framework
- **Axios**: Promise-based HTTP client

### Development Tools
- ESLint for code quality
- PostCSS for CSS processing
- SWC for fast refresh and compilation

## Project Structure
```
flowlaunch/
├── src/
│   ├── components/      # Reusable UI components
│   ├── context/        # React Context for state management
│   ├── services/       # API and external service integrations
│   ├── utils/          # Helper functions and utilities
│   ├── landing.jsx     # Main landing page component
│   └── App.jsx         # Root application component
```

## Features
- Task creation and management
- Real-time search functionality
- Status-based filtering
- Responsive design
- Toast notifications
- Loading states and error handling

## Data Flow
1. Global state managed through React Context
2. Components consume state via useTaskContext hook
3. Actions dispatch updates to context
4. UI updates reflect state changes

## Getting Started

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

3. Run development server:
```bash
npm run dev
```

4. Build for production:
```bash
npm run build
```

## Development Guidelines
- Follow ESLint rules
- Write meaningful commit messages
- Document complex logic
- Test before committing
- Follow component structure guidelines

## Contributing
1. Fork the repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Create Pull Request

## License
MIT License - feel free to use this project for learning and development.
