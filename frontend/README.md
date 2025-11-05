# Equipment Lending Portal - Frontend

A modern React application with Tailwind CSS for the Equipment Lending Portal, featuring a beautiful gradient-based UI design.

## 🎨 Design Philosophy

This frontend is built with a focus on:
- **Modern Aesthetics**: Gradient backgrounds, smooth transitions, and elevated components
- **User Experience**: Intuitive navigation, clear visual hierarchy, and responsive design
- **Performance**: Fast loading times with Vite and optimized components
- **Accessibility**: Semantic HTML and keyboard navigation support

## 🚀 Technology Stack

- **React 19**: Latest React with hooks and concurrent features
- **React Router DOM 7**: Client-side routing
- **Tailwind CSS 3**: Utility-first CSS framework
- **Axios**: Promise-based HTTP client
- **Vite**: Next-generation frontend tooling

## 📦 Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🎨 Design System

### Color Scheme

The application uses a vibrant gradient-based color palette:

```javascript
Primary: Blue (#0ea5e9) → Purple (#d946ef)
Success: Green (#10b981) → Teal (#14b8a6)
Warning: Yellow (#fbbf24) → Orange (#f97316)
Danger: Red (#ef4444) → Pink (#ec4899)
```

### Custom Components

#### Buttons
```jsx
<button className="btn-primary">Primary Action</button>
<button className="btn-secondary">Secondary Action</button>
<button className="btn-success">Success Action</button>
<button className="btn-danger">Danger Action</button>
```

#### Cards
```jsx
<div className="card">Basic Card</div>
<div className="card-gradient">Card with Gradient</div>
```

#### Badges
```jsx
<span className="badge badge-primary">Primary</span>
<span className="badge badge-success">Success</span>
<span className="badge badge-warning">Warning</span>
<span className="badge badge-danger">Danger</span>
```

#### Form Inputs
```jsx
<input type="text" className="input-field" />
```

### Typography

```jsx
<h1 className="text-gradient">Gradient Text</h1>
<h2 className="text-gradient-warm">Warm Gradient Text</h2>
```

## 📂 Project Structure

```
src/
├── components/
│   ├── auth/
│   │   ├── Login.jsx              # Login page
│   │   ├── Register.jsx           # Registration page
│   │   └── ProtectedRoute.jsx     # Route protection HOC
│   ├── equipment/
│   │   ├── EquipmentCard.jsx      # Equipment card component
│   │   ├── EquipmentDetails.jsx   # Equipment details view
│   │   ├── EquipmentForm.jsx      # Create/Edit equipment form
│   │   └── EquipmentList.jsx      # Equipment catalog with filters
│   ├── layout/
│   │   └── Navbar.jsx             # Navigation bar
│   └── requests/
│       ├── RequestCard.jsx        # Request card component
│       ├── RequestForm.jsx        # Create request form
│       ├── RequestList.jsx        # List of requests
│       └── RequestActions.jsx     # Request action buttons
├── contexts/
│   └── AuthContext.jsx            # Authentication context
├── pages/
│   ├── Dashboard.jsx              # Main dashboard
│   └── AdminEquipmentPage.jsx     # Admin equipment management
├── services/
│   ├── api.js                     # Axios instance
│   ├── authService.js             # Authentication API
│   ├── equipmentService.js        # Equipment API
│   └── requestService.js          # Request API
├── App.jsx                        # Main app component
├── App.css                        # Additional styles
├── index.css                      # Tailwind imports & custom utilities
└── main.jsx                       # App entry point
```

## 🔌 API Integration

### Configuration

API base URL is configured in `src/services/api.js`:

```javascript
const API_BASE_URL = 'http://localhost:8080/api';
```

### Authentication

The app uses JWT tokens stored in localStorage:

```javascript
// Login
const response = await authService.login({ username, password });
localStorage.setItem('token', response.token);
localStorage.setItem('user', JSON.stringify(response));

// Logout
localStorage.removeItem('token');
localStorage.removeItem('user');
```

### API Services

All API calls are abstracted in service files:

```javascript
// equipmentService.js
export const getAllEquipment = () => api.get('/equipment');
export const getEquipmentById = (id) => api.get(`/equipment/${id}`);
export const createEquipment = (data) => api.post('/equipment', data);
```

## 🎯 Key Features

### Authentication Flow
1. User logs in with credentials
2. JWT token is received and stored
3. Token is automatically attached to subsequent requests
4. Protected routes check for valid token

### Equipment Browsing
- Grid layout with responsive cards
- Search and filter functionality
- Category-based filtering
- Availability status indicators

### Request Management
- Create borrow requests
- View request status
- Admin/Staff approval workflow

### Admin Panel
- Equipment CRUD operations
- Searchable equipment table
- Quick action buttons

## 🎨 Styling Guidelines

### Using Tailwind Utilities

The project heavily uses Tailwind CSS utilities:

```jsx
<div className="
  bg-white               // White background
  rounded-xl             // Extra large border radius
  shadow-lg              // Large shadow
  hover:shadow-2xl       // Extra large shadow on hover
  transition-shadow      // Smooth shadow transition
  duration-300           // 300ms duration
  p-6                    // Padding 1.5rem
">
  Content
</div>
```

### Custom Utilities

Defined in `index.css`:

```css
@layer utilities {
  .text-gradient {
    @apply bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600;
  }
}
```

## 🔄 State Management

The app uses React Context API for global state:

### AuthContext

```javascript
const { user, login, logout, isAdmin, isStaff } = useAuth();
```

Provides:
- `user`: Current user object
- `login(credentials)`: Login function
- `logout()`: Logout function
- `isAdmin()`: Check if user is admin
- `isStaff()`: Check if user is staff

## 📱 Responsive Design

The application is fully responsive with breakpoints:

```javascript
sm: '640px'   // Small devices
md: '768px'   // Medium devices
lg: '1024px'  // Large devices
xl: '1280px'  // Extra large devices
```

Example usage:

```jsx
<div className="
  grid 
  grid-cols-1           // 1 column on mobile
  md:grid-cols-2        // 2 columns on tablet
  lg:grid-cols-3        // 3 columns on desktop
  gap-6
">
```

## 🚀 Performance Optimization

- **Code Splitting**: Routes are lazy-loaded
- **Optimized Images**: Gradient placeholders for missing images
- **Memoization**: React.memo for expensive components
- **Debounced Search**: Search queries are debounced

## 🧪 Development

### Environment Variables

Create a `.env` file:

```env
VITE_API_BASE_URL=http://localhost:8080/api
```

### Running in Development

```bash
npm run dev
```

Hot Module Replacement (HMR) is enabled for instant updates.

### Building for Production

```bash
npm run build
```

Output will be in the `dist/` directory.

## 📦 Deployment

### Static Hosting (Netlify, Vercel)

```bash
npm run build
# Deploy dist/ folder
```

### Nginx Configuration

```nginx
server {
    listen 80;
    server_name your-domain.com;
    root /path/to/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

## 🐛 Troubleshooting

### API Connection Issues
- Verify backend is running
- Check CORS configuration
- Ensure API_BASE_URL is correct

### Styling Not Applied
- Run `npm install` to ensure Tailwind is installed
- Check `tailwind.config.js` content paths
- Verify PostCSS configuration

### Build Errors
- Clear node_modules and reinstall
- Check for ESLint errors
- Ensure all dependencies are compatible

## 📝 License

MIT License

## 🤝 Contributing

Contributions welcome! Please follow the existing code style and component patterns.

---

**Built with ⚛️ React and 🎨 Tailwind CSS**
