# Equipment Lending Portal - Backend

Spring Boot backend application for the Equipment Lending Portal.

## Technology Stack

- **Java**: 17
- **Spring Boot**: 3.2.0
- **Spring Security**: JWT-based authentication
- **Spring Data JPA**: Database interaction
- **MySQL**: 8.x
- **Maven**: Dependency management

## Prerequisites

- Java 17 or higher
- Maven 3.6+
- MySQL 8.0+
- IDE (IntelliJ IDEA, Eclipse, or VS Code)

## Setup Instructions

### 1. Database Setup

Create the MySQL database:

```bash
mysql -u root -p < schema.sql
```

Or manually:

```sql
CREATE DATABASE equipment_lending_db;
```

Then run the schema.sql file to create tables and insert sample data.

### 2. Configure Database Connection

Update `src/main/resources/application.properties` with your MySQL credentials:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/equipment_lending_db
spring.datasource.username=YOUR_USERNAME
spring.datasource.password=YOUR_PASSWORD
```

### 3. Build the Project

```bash
mvn clean install
```

### 4. Run the Application

```bash
mvn spring-boot:run
```

Or run the main class `EquipmentLendingApplication.java` from your IDE.

The application will start on `http://localhost:8080/api`

## Project Structure

```
src/main/java/com/school/equipmentlending/
├── EquipmentLendingApplication.java   # Main application class
├── config/                             # Configuration classes
│   ├── CorsConfig.java
│   └── WebSecurityConfig.java
├── controller/                         # REST controllers
│   ├── AuthController.java
│   ├── EquipmentController.java
│   └── BorrowRequestController.java
├── dto/                                # Data Transfer Objects
│   ├── LoginRequest.java
│   ├── RegisterRequest.java
│   ├── JwtResponse.java
│   └── ...
├── exception/                          # Custom exceptions
│   ├── ResourceNotFoundException.java
│   └── GlobalExceptionHandler.java
├── model/                              # JPA entities
│   ├── User.java
│   ├── Equipment.java
│   └── BorrowRequest.java
├── repository/                         # JPA repositories
│   ├── UserRepository.java
│   ├── EquipmentRepository.java
│   └── BorrowRequestRepository.java
├── security/                           # Security components
│   ├── JwtTokenProvider.java
│   ├── JwtAuthenticationFilter.java
│   └── UserDetailsServiceImpl.java
└── service/                            # Business logic
    ├── AuthService.java
    ├── EquipmentService.java
    └── BorrowRequestService.java
```

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login (returns JWT token)

### Equipment Management

- `GET /api/equipment` - Get all equipment (with filters)
- `GET /api/equipment/{id}` - Get equipment by ID
- `POST /api/equipment` - Add new equipment (Admin only)
- `PUT /api/equipment/{id}` - Update equipment (Admin only)
- `DELETE /api/equipment/{id}` - Delete equipment (Admin only)
- `GET /api/equipment/search` - Search equipment

### Borrow Requests

- `POST /api/requests` - Create borrow request
- `GET /api/requests` - Get all requests (filtered by role)
- `GET /api/requests/{id}` - Get request by ID
- `PUT /api/requests/{id}/approve` - Approve request (Staff/Admin)
- `PUT /api/requests/{id}/reject` - Reject request (Staff/Admin)
- `PUT /api/requests/{id}/return` - Mark as returned (Staff/Admin)

## Sample Users

After running schema.sql, you can login with:

| Username       | Password     | Role    |
|----------------|--------------|---------|
| admin          | password123  | ADMIN   |
| john_staff     | password123  | STAFF   |
| alice_student  | password123  | STUDENT |

## Testing

Run tests with:

```bash
mvn test
```

## Building for Production

```bash
mvn clean package
```

The JAR file will be created in the `target/` directory.

Run the JAR:

```bash
java -jar target/equipment-lending-1.0.0.jar
```

## Environment Variables

For production, use environment variables instead of application.properties:

```bash
export DB_URL=jdbc:mysql://production-db:3306/equipment_lending_db
export DB_USERNAME=prod_user
export DB_PASSWORD=prod_password
export JWT_SECRET=your-secret-key
```

## Troubleshooting

### Database Connection Issues

- Ensure MySQL is running: `mysql.server status`
- Verify database exists: `SHOW DATABASES;`
- Check credentials in application.properties

### Port Already in Use

Change the port in application.properties:

```properties
server.port=8081
```

### JWT Token Issues

- Ensure the JWT secret is at least 256 bits
- Check token expiration time in application.properties

## Documentation

See the `/docs` folder for detailed API documentation and architecture diagrams.

