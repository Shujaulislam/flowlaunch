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

## Common Interview Questions & Answers

### 1. Why Axios over Fetch?
Axios was chosen for several advantages:
- Automatic JSON data transformation
- Built-in request/response interceptors
- Better error handling
- Consistent API across browsers
- Request cancellation support
- Progress monitoring for uploads/downloads

### 2. Why TailwindCSS?
TailwindCSS offers:
- Rapid UI development with utility classes
- Consistent design system
- Smaller production bundle (purges unused styles)
- Highly customizable
- Great developer experience
- Mobile-first responsive design

### 3. State Management Approach
We use React Context because:
- Perfect for medium-sized applications
- Avoids prop drilling
- Simpler than Redux for our needs
- Built into React (no extra dependencies)
- Easy to test and maintain

### 4. Component Architecture Decisions
- Modular components for reusability
- Smart/Dumb component pattern
- Props for component configuration
- Context for global state
- Custom hooks for shared logic

### 5. Performance Considerations
- Component memoization where needed
- Efficient state updates
- Lazy loading of components
- Optimized bundle size
- Debounced search functionality

### 6. Error Handling Strategy
- Global error boundary
- Try-catch blocks in async operations
- User-friendly error messages
- Toast notifications
- Fallback UI components

### 7. Why Vite?
- Faster development server
- Quick hot module replacement
- Optimized production builds
- Modern ESM-based dev server
- Better developer experience

### 8. Testing Approach
- Unit tests for utilities
- Component testing with React Testing Library
- Context testing
- Integration tests for critical paths
- Mocked API calls

### 9. Styling Philosophy
- Utility-first approach with Tailwind
- Consistent spacing and colors
- Responsive design patterns
- Component-specific styles when needed
- Design system implementation

### 10. Future Improvements
- Implement authentication
- Add task categories
- Offline support
- Dark mode
- Performance monitoring
- E2E testing

### 11. API Error Handling Approach
In our task manager application, I handle API errors through:
- Try-catch blocks around API calls
```javascript
try {
    const response = await axios.get('/api/tasks');
    setTasks(response.data);
} catch (error) {
    // Check for specific error types
    if (error.response?.status === 404) {
        setError('Tasks not found');
    } else if (error.response?.status === 401) {
        setError('Please login again');
    } else {
        setError('Something went wrong. Please try again.');
    }
    // Show error to user via Toast
    showToast(error.message, 'error');
}
```
- Global axios interceptors for common errors
- User-friendly error messages via Toast notifications
- Loading states during API calls
- Fallback UI components when data fails to load

### 12. React Context vs Redux
As a junior developer, here's my understanding of Context vs Redux:

React Context:
- Built into React - no extra dependencies
- Simpler to set up and use
- Great for small/medium applications
- Perfect for our task manager app
- Mainly for state management
- Less boilerplate code

Redux:
- External library with more features
- Better for large applications
- More complex setup
- Includes dev tools and middleware
- Better for complex state logic
- More boilerplate code required

I chose Context for our task manager because:
1. Our state is relatively simple
2. We don't need complex state transformations
3. The app is medium-sized
4. Team familiarity with Context

### 13. Responsive Design Implementation
I ensure responsive design through:

1. TailwindCSS breakpoints:
```jsx
<div className="
    w-full          // Mobile first
    md:w-1/2       // Tablet (768px)
    lg:w-1/3       // Desktop (1024px)
">
```

2. Common breakpoints used:
- sm: 640px (small devices)
- md: 768px (tablets)
- lg: 1024px (laptops)
- xl: 1280px (desktops)

3. Responsive practices:
- Mobile-first approach
- Flexible grid layouts
- Responsive typography
- Dynamic spacing
- Testing on multiple devices

### 14. Application Performance Optimization
As a junior developer, I focus on these key areas:

1. React-specific optimizations:
```javascript
// Memoization for expensive calculations
const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);

// Prevent unnecessary re-renders
const MemoizedComponent = React.memo(MyComponent);

// Optimize event handlers
const handleChange = useCallback((e) => {
    setSearchTerm(e.target.value);
}, []);
```

2. General optimizations:
- Lazy loading components
- Image optimization
- Minimizing bundle size
- Code splitting
- Debouncing search inputs

3. Performance monitoring:
- React DevTools
- Chrome DevTools
- Lighthouse scores
- Regular testing

### 15. Git Workflow
My typical Git workflow includes:

1. Basic workflow:
```bash
# Start new feature
git checkout -b feature/task-filter

# Make changes and commit
git add .
git commit -m "Add task filter functionality"

# Push to remote
git push origin feature/task-filter

# Create pull request
# After review and approval
git checkout main
git pull origin main
git merge feature/task-filter
```

2. Best practices I follow:
- Clear commit messages
- Regular small commits
- Branch naming conventions
- Pull requests for review
- Never commit directly to main

3. Common commands I use:
- git status
- git log
- git diff
- git stash
- git reset

4. When I need help:
- Check documentation
- Ask team members
- Use Git GUI tools
- Google common issues

### 16. Task Filtering Implementation
In our task manager, filtering happens through two main components:

1. **TaskFilters Component:**
```jsx
function TaskFilters({ searchQuery, setSearchQuery, statusFilter, setStatusFilter }) {
  // Search input for text filtering
  <input
    type="text"
    value={searchQuery}
    onChange={(e) => setSearchQuery(e.target.value)}
  />
  
  // Status dropdown for status filtering
  <select
    value={statusFilter}
    onChange={(e) => setStatusFilter(e.target.value)}
  >
    <option value="">All Status</option>
    <option value="To Do">To Do</option>
    // ... other options
  </select>
}
```

Key features:
- Real-time search filtering
- Status-based filtering
- Task count display by status
- Responsive design with Tailwind

2. **Filter Logic in Landing Component:**
- State management for filters
- Updates when search or status changes
- Filters passed to TaskTable component

### 17. Tabulator Tables and Inline Editing
We use Tabulator for our task table because it provides:

1. **Table Setup:**
```javascript
const table = new Tabulator(tableRef.current, {
  data: tasks,
  layout: 'fitColumns',
  responsiveLayout: 'collapse',
  columns: [
    { 
      title: 'Title', 
      field: 'title',
      editor: 'input',  // Enables inline editing
      cellEdited: async function(cell) {
        const task = cell.getRow().getData();
        await updateTask(task);
      }
    }
  ]
});
```

Features I worked with:
- Inline cell editing
- Responsive layout
- Custom formatters for status
- Error handling for edits
- Real-time updates

2. **Edit Handling:**
```javascript
cellEdited: async function(cell) {
  try {
    await updateTask(task);
  } catch (error) {
    cell.restoreOldValue();  // Rollback on error
  }
}
```

### 18. useEffect vs useLayoutEffect
As a junior developer, here's my understanding:

**useEffect:**
```javascript
useEffect(() => {
  // Runs after render
  updateUIElement();
}, [dependency]);
```
- Runs asynchronously after render
- Most common choice
- Better performance
- Used for data fetching, subscriptions

**useLayoutEffect:**
```javascript
useLayoutEffect(() => {
  // Runs synchronously before browser paint
  measureAndUpdateElement();
}, [dependency]);
```
- Runs synchronously before browser paint
- Use for DOM measurements
- Can block visual updates
- Rarely needed

When I choose which to use:
1. Start with useEffect (99% of cases)
2. Only use useLayoutEffect if:
   - Need DOM measurements
   - Seeing visual flickering
   - Dealing with animations

Example from our app:
```javascript
// Good useEffect usage
useEffect(() => {
  // Initialize Tabulator after render
  const table = new Tabulator(tableRef.current, {
    // config
  });
}, [tasks]);

// When useLayoutEffect might be better
useLayoutEffect(() => {
  // Measure and update element height
  const height = element.getBoundingClientRect().height;
  element.style.height = `${height}px`;
}, [content]);


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
