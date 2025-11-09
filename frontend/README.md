# Equipment Lending Portal - Frontend

## Screenshots

<p align="center">
  <img src="public/screenshots/screenshot1.jpeg" alt="Screenshot 1" width="600" />
  <img src="public/screenshots/screenshot2.jpeg" alt="Screenshot 2" width="600" />
  <img src="public/screenshots/screenshot3.jpeg" alt="Screenshot 3" width="600" />
  <img src="public/screenshots/screenshot4.jpeg" alt="Screenshot 4" width="600" />
  <img src="public/screenshots/screenshot5.jpeg" alt="Screenshot 5" width="600" />
</p>

React frontend application for the Equipment Lending Portal.

## Technology Stack

- **React**: 18+
- **React Router**: v6 for routing
- **Axios**: HTTP client for API calls
- **Context API**: State management
- **Vite**: Build tool and development server

## Prerequisites

- Node.js 16+ and npm
- Backend server running on http://localhost:8080

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Configuration

The API base URL is configured in `src/services/api.js`. By default, it points to:

```javascript
const API_BASE_URL = 'http://localhost:8080/api';
```

If your backend runs on a different port, update this URL.

### 3. Run Development Server

```bash
npm run dev
```

The application will start on `http://localhost:5173` (or another port if 5173 is busy).

### 4. Build for Production

```bash
npm run build
```

The optimized production build will be created in the `dist/` directory.

## Project Structure

```
src/
├── components/
│   ├── auth/                 # Authentication components
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   └── ProtectedRoute.jsx
│   ├── equipment/            # Equipment components
│   │   ├── EquipmentList.jsx
│   │   ├── EquipmentCard.jsx
│   │   ├── EquipmentForm.jsx
│   │   └── EquipmentDetails.jsx
│   ├── requests/             # Request components
│   │   ├── RequestList.jsx
│   │   ├── RequestCard.jsx
│   │   ├── RequestForm.jsx
│   │   └── RequestActions.jsx
│   └── layout/               # Layout components
│       └── Navbar.jsx
├── contexts/                 # React contexts
│   └── AuthContext.jsx
├── services/                 # API services
│   ├── api.js
│   ├── authService.js
│   ├── equipmentService.js
│   └── requestService.js
├── pages/                    # Page components
│   ├── Dashboard.jsx
│   └── AdminEquipmentPage.jsx
├── App.jsx                   # Main app component
├── main.jsx                  # Entry point
└── index.css                 # Global styles
```

## Features

### Authentication
- User login and registration
- JWT token-based authentication
- Protected routes
- Role-based access control

### Equipment Management
- Browse equipment with search and filters
- View equipment details
- Admin: Add, edit, delete equipment

### Borrow Requests
- Create borrow requests
- View request history
- Staff/Admin: Approve, reject, or mark as returned

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint

## User Roles

The application supports three user roles:

1. **STUDENT**: Can view equipment and create borrow requests
2. **STAFF**: Student permissions + approve/reject/return requests
3. **ADMIN**: Full access including equipment management

## Sample Login Credentials

After setting up the database with sample data:

| Username       | Password     | Role    |
|----------------|--------------|---------|
| admin          | password123  | ADMIN   |
| john_staff     | password123  | STAFF   |
| alice_student  | password123  | STUDENT |

## Component Overview

### Authentication Flow
1. User accesses protected route
2. `ProtectedRoute` checks authentication
3. If not authenticated, redirects to login
4. After login, JWT token is stored in localStorage
5. Token is automatically attached to API requests

### Equipment Workflow
1. Browse equipment on equipment list page
2. Filter by category or availability
3. View details and create borrow request
4. Admin can manage equipment via admin panel

### Request Workflow
1. Student creates borrow request
2. Request shows as PENDING
3. Staff/Admin approves or rejects
4. If approved, equipment is issued
5. Staff/Admin marks as returned when equipment is back

## Styling

The application uses custom CSS with a component-based approach. Styles are defined in `index.css` with utility classes for common patterns.

Key style features:
- Responsive grid system
- Card-based layouts
- Form styling
- Button variants
- Status badges
- Loading spinners

## Error Handling

- API errors are caught and displayed to users
- Form validation on client and server side
- Loading states for async operations
- User-friendly error messages

## State Management

The application uses React Context API for:
- **AuthContext**: User authentication state and methods

Local state is managed with `useState` and `useEffect` hooks in individual components.

## API Integration

All API calls go through the centralized `api.js` service which:
- Sets base URL
- Adds JWT token to requests
- Handles authentication errors
- Provides consistent error handling

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Troubleshooting

### CORS Issues
If you encounter CORS errors, ensure:
- Backend CORS configuration includes frontend URL
- Backend is running on http://localhost:8080

### Authentication Issues
- Check JWT token in localStorage
- Verify token hasn't expired
- Ensure backend is accessible

### Build Issues
- Clear node_modules and reinstall: `rm -rf node_modules && npm install`
- Clear Vite cache: `rm -rf node_modules/.vite`

## Development Tips

1. Use React Developer Tools browser extension
2. Check browser console for errors
3. Use network tab to inspect API calls
4. Hot module replacement works automatically in dev mode
