# 🎓 Equipment Lending Portal

A modern, full-stack web application for managing school equipment lending with **JAX-RS backend** and **React + Tailwind CSS frontend**.

![Tech Stack](https://img.shields.io/badge/Backend-JAX--RS-blue)
![Tech Stack](https://img.shields.io/badge/Frontend-React-61DAFB)
![Tech Stack](https://img.shields.io/badge/Styling-Tailwind%20CSS-38B2AC)
![Tech Stack](https://img.shields.io/badge/ORM-Hibernate-59666C)
![Tech Stack](https://img.shields.io/badge/Auth-JWT-000000)

## ✨ Features

### 🎨 Modern UI/UX

- **Gradient-based Design**: Beautiful gradients throughout the interface
- **Tailwind CSS**: Utility-first CSS framework for rapid development
- **Responsive Layout**: Works seamlessly on desktop, tablet, and mobile
- **Smooth Animations**: Hover effects, transitions, and loading states
- **Intuitive Navigation**: Easy-to-use interface with clear visual hierarchy

### 🔐 Authentication & Authorization

- JWT-based authentication
- Role-based access control (Student, Staff, Admin)
- Secure password hashing with BCrypt
- Protected routes and endpoints

### 📦 Equipment Management

- Browse equipment catalog with filters and search
- View detailed equipment information
- Admin panel for CRUD operations
- Real-time availability tracking
- Category-based organization

### 📋 Request Management

- Create borrow requests
- Track request status (Pending, Approved, Rejected, Returned)
- Staff/Admin approval workflow
- Equipment return tracking

## 🏗️ Architecture

### Backend (JAX-RS)

- **Framework**: Jersey 3.1.5 (JAX-RS Implementation)
- **ORM**: Hibernate 6.4.1
- **Database**: MySQL 8.x
- **Authentication**: JWT with custom filters
- **Build Tool**: Maven

### Frontend (React + Tailwind)

- **Framework**: React 19
- **Routing**: React Router DOM 7
- **Styling**: Tailwind CSS 3.x
- **HTTP Client**: Axios
- **Build Tool**: Vite

## 🚀 Quick Start

### Prerequisites

- Java 17+
- Node.js 18+
- MySQL 8.x
- Maven 3.6+

### 1. Database Setup

```sql
CREATE DATABASE equipment_lending_db;
```

### 2. Backend Setup

```bash
cd backend

# Update database credentials in src/main/resources/META-INF/persistence.xml

# Build and run
mvn clean install
mvn jetty:run
```

Backend will run on: `http://localhost:8080/api`

### 3. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

Frontend will run on: `http://localhost:5173`

## 📸 Screenshots

### Dashboard

Modern dashboard with stats and quick actions

- Gradient card designs
- Real-time statistics
- Quick navigation

### Equipment Catalog

Beautiful equipment cards with:

- Gradient overlays
- Availability badges
- Hover animations
- Advanced filtering

### Login/Register

Sleek authentication pages with:

- Gradient icons
- Form validation
- Loading states
- Error handling

## 🎨 UI Design System

### Color Palette

```css
Primary: Blue (#0ea5e9) to Purple (#d946ef)
Success: Green (#10b981) to Teal (#14b8a6)
Warning: Yellow (#fbbf24) to Orange (#f97316)
Danger: Red (#ef4444) to Pink (#ec4899)
```

### Components

- **Cards**: Elevated with shadows and hover effects
- **Buttons**: Gradient backgrounds with smooth transitions
- **Badges**: Colorful status indicators
- **Forms**: Clean inputs with focus states
- **Tables**: Responsive with alternating row colors

## 📁 Project Structure

```
FSAD-Equipment-Lending-Portal/
├── backend/                    # JAX-RS Backend
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/
│   │   │   │   └── com/school/equipmentlending/
│   │   │   │       ├── annotation/     # Custom annotations
│   │   │   │       ├── dto/            # Data Transfer Objects
│   │   │   │       ├── exception/      # Exception handlers
│   │   │   │       ├── filter/         # JAX-RS filters
│   │   │   │       ├── model/          # JPA entities
│   │   │   │       ├── repository/     # Data access
│   │   │   │       ├── resource/       # REST endpoints
│   │   │   │       ├── security/       # JWT provider
│   │   │   │       ├── service/        # Business logic
│   │   │   │       └── util/           # Utilities
│   │   │   └── resources/
│   │   │       └── META-INF/
│   │   │           └── persistence.xml
│   │   └── test/
│   ├── pom.xml
│   └── README.md
│
├── frontend/                   # React Frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── auth/          # Login, Register
│   │   │   ├── equipment/     # Equipment components
│   │   │   ├── layout/        # Navbar, Layout
│   │   │   └── requests/      # Request components
│   │   ├── contexts/          # React contexts
│   │   ├── pages/             # Page components
│   │   ├── services/          # API services
│   │   ├── App.jsx
│   │   ├── index.css          # Tailwind config
│   │   └── main.jsx
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   ├── package.json
│   └── README.md
│
└── README.md
```

## 🔑 Key Technologies

### Backend

- **JAX-RS (Jersey)**: RESTful web services
- **Hibernate**: Object-relational mapping
- **JWT**: Stateless authentication
- **HikariCP**: Connection pooling
- **BCrypt**: Password hashing
- **Logback**: Logging

### Frontend

- **React**: UI library
- **React Router**: Client-side routing
- **Axios**: HTTP client
- **Tailwind CSS**: Utility-first CSS
- **Vite**: Fast build tool
- **Context API**: State management

## 🔒 Security Features

- JWT token-based authentication
- Password hashing with BCrypt
- Role-based access control
- Protected API endpoints
- CORS configuration
- Input validation

## 📊 User Roles

### Student

- Browse equipment catalog
- Create borrow requests
- View own requests

### Staff

- All Student permissions
- Approve/reject borrow requests
- Mark equipment as returned

### Admin

- All Staff permissions
- Full CRUD on equipment
- User management

## 🌐 API Documentation

Comprehensive API documentation available in `/backend/README.md`

Base URL: `http://localhost:8080/api`

Authentication: Bearer token in `Authorization` header

## 🧪 Testing

### Backend

```bash
cd backend
mvn test
```

### Frontend

```bash
cd frontend
npm run test
```

## 📦 Production Build

### Backend

```bash
cd backend
mvn clean package -DskipTests
# Deploy target/equipment-lending.war to your server
```

### Frontend

```bash
cd frontend
npm run build
# Deploy dist/ folder to your web server
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request
