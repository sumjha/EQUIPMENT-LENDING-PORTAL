# Equipment Lending Portal - Backend (JAX-RS)

A RESTful API backend built with **JAX-RS (Jersey)**, Hibernate, and JWT authentication for the Equipment Lending Portal.

## 🚀 Technology Stack

- **JAX-RS Implementation:** Jersey 3.1.5
- **ORM:** Hibernate 6.4.1
- **Database:** MySQL 8.x
- **Authentication:** JWT (JSON Web Tokens)
- **Build Tool:** Maven
- **Java Version:** 17
- **Application Server:** Jetty (for standalone execution)

## 📋 Prerequisites

- Java 17 or higher
- Maven 3.6+
- MySQL 8.x database
- An IDE (IntelliJ IDEA, Eclipse, or VS Code)

## 🔧 Configuration

### Database Setup

1. Create a MySQL database:
```sql
CREATE DATABASE equipment_lending_db;
```

2. Update database credentials in `src/main/resources/META-INF/persistence.xml`:
```xml
<property name="jakarta.persistence.jdbc.url" value="jdbc:mysql://localhost:3306/equipment_lending_db"/>
<property name="jakarta.persistence.jdbc.user" value="your_username"/>
<property name="jakarta.persistence.jdbc.password" value="your_password"/>
```

### JWT Configuration

The JWT secret is configured in `JwtTokenProvider.java`. For production, it's recommended to externalize this:

```java
private static final String JWT_SECRET = "your-secret-key";
private static final long JWT_EXPIRATION_MS = 86400000; // 24 hours
```

## 🏃‍♂️ Running the Application

### Option 1: Using Maven Jetty Plugin

```bash
cd backend
mvn clean install
mvn jetty:run
```

The application will start on `http://localhost:8080/api`

### Option 2: Build WAR and Deploy

```bash
mvn clean package
```

This creates a WAR file in `target/equipment-lending.war`. Deploy this to any Jakarta EE compatible application server (Tomcat, Wildfly, etc.).

## 📡 API Endpoints

### Authentication

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/auth/register` | Register a new user | No |
| POST | `/auth/login` | Login and receive JWT | No |

### Equipment

| Method | Endpoint | Description | Auth Required | Roles |
|--------|----------|-------------|---------------|-------|
| GET | `/equipment` | Get all equipment | Yes | All |
| GET | `/equipment/{id}` | Get equipment by ID | Yes | All |
| GET | `/equipment/search?keyword={keyword}` | Search equipment | Yes | All |
| POST | `/equipment` | Create new equipment | Yes | ADMIN |
| PUT | `/equipment/{id}` | Update equipment | Yes | ADMIN |
| DELETE | `/equipment/{id}` | Delete equipment | Yes | ADMIN |

### Borrow Requests

| Method | Endpoint | Description | Auth Required | Roles |
|--------|----------|-------------|---------------|-------|
| GET | `/requests` | Get all requests | Yes | All |
| GET | `/requests/{id}` | Get request by ID | Yes | All |
| POST | `/requests` | Create borrow request | Yes | All |
| PUT | `/requests/{id}/approve` | Approve request | Yes | STAFF, ADMIN |
| PUT | `/requests/{id}/reject` | Reject request | Yes | STAFF, ADMIN |
| PUT | `/requests/{id}/return` | Mark as returned | Yes | STAFF, ADMIN |

## 🔐 Authentication

The API uses JWT Bearer tokens for authentication:

1. Register or login to receive a JWT token
2. Include the token in subsequent requests:
   ```
   Authorization: Bearer <your-jwt-token>
   ```

## 🏗️ Project Structure

```
backend/
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── com/school/equipmentlending/
│   │   │       ├── annotation/          # Custom annotations
│   │   │       │   └── Secured.java
│   │   │       ├── dto/                 # Data Transfer Objects
│   │   │       ├── exception/           # Exception handlers
│   │   │       ├── filter/              # JAX-RS filters (CORS, Auth)
│   │   │       ├── model/               # JPA entities
│   │   │       ├── repository/          # Data access layer
│   │   │       ├── resource/            # JAX-RS resources (controllers)
│   │   │       ├── security/            # JWT provider
│   │   │       ├── service/             # Business logic
│   │   │       ├── util/                # Utility classes
│   │   │       └── JaxRsApplication.java
│   │   └── resources/
│   │       └── META-INF/
│   │           └── persistence.xml      # JPA configuration
│   └── test/
├── pom.xml
└── README.md
```

## 🎯 Key Features

### JAX-RS Resources
RESTful endpoints using JAX-RS annotations:
```java
@Path("/equipment")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class EquipmentResource {
    @GET
    @Secured
    public Response getAllEquipment() { ... }
}
```

### Custom Security
JWT authentication implemented using JAX-RS filters:
```java
@Provider
@Secured
@Priority(Priorities.AUTHENTICATION)
public class JwtAuthenticationFilter implements ContainerRequestFilter { ... }
```

### JPA/Hibernate Integration
Direct EntityManager usage without Spring's abstraction:
```java
public class EquipmentRepository {
    public List<Equipment> findAll() {
        EntityManager em = HibernateUtil.getEntityManager();
        try {
            return em.createQuery("SELECT e FROM Equipment e", Equipment.class)
                    .getResultList();
        } finally {
            em.close();
        }
    }
}
```

## 🔄 Differences from Spring Boot

This implementation uses pure JAX-RS instead of Spring Boot:

| Feature | Spring Boot | JAX-RS (This Project) |
|---------|-------------|----------------------|
| DI Container | Spring IoC | Manual instantiation |
| REST Controllers | `@RestController` | `@Path` resources |
| Security | Spring Security | Custom JAX-RS filters |
| Data Access | Spring Data JPA | Direct EntityManager |
| Configuration | application.properties | persistence.xml |
| Server | Embedded Tomcat | Jetty (or any Jakarta EE server) |

## 🧪 Testing

Run unit tests:
```bash
mvn test
```

## 📦 Building for Production

1. Update database credentials
2. Change JWT secret
3. Build the project:
```bash
mvn clean package -DskipTests
```
4. Deploy the WAR file to your production server

## 🐛 Troubleshooting

### Database Connection Issues
- Verify MySQL is running
- Check credentials in `persistence.xml`
- Ensure MySQL driver is included in dependencies

### JWT Token Issues
- Verify token is sent in `Authorization` header
- Check token expiration (default: 24 hours)
- Ensure JWT secret matches between token generation and validation

### CORS Issues
- The `CorsFilter` is configured to allow all origins (`*`)
- For production, update to allow only specific origins

## 📝 License

This project is licensed under the MIT License.

## 👥 Authors

Equipment Lending Portal Team

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
