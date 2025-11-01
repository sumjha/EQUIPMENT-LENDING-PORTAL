# Equipment Lending Portal

A full-stack web application for managing school equipment loans, built with React (frontend) and Java Spring Boot (backend).

## Project Overview

This project demonstrates both manual development and AI-assisted development approaches to building a complete equipment lending system for schools. The system allows students and staff to request equipment, while administrators can manage inventory and approve requests.

## Core Features

### User Authentication & Roles

- Login/signup for students, staff, and admins
- Role-based access control (STUDENT, STAFF, ADMIN)
- JWT token-based authentication

### Equipment Management

- Add, edit, and delete equipment items (Admin only)
- Track equipment details: name, category, condition, quantity, availability
- Real-time availability tracking

### Borrowing & Returns

- Students and staff can request equipment
- Admins/staff approve or reject requests
- Mark items as returned when completed
- Prevent overlapping bookings

### Dashboard & Search

- List all available equipment
- Search and filter by category or availability
- Role-specific dashboards

## Technology Stack

**Backend:**

- Java 17+
- Spring Boot 3.x
- Spring Data JPA
- Spring Security with JWT
- MySQL 8.x
- Maven

**Frontend:**

- React 18+
- React Router v6
- Axios for API calls
- Context API for state management
- Tailwind CSS for styling
- Vite as build tool
