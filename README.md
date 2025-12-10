# Web3-Mag

Modern full-stack web application template for building web3-related content platforms with robust authentication and user management.

## Features

### Authentication & Security
- **Email/Password Authentication** - Secure user registration and login system
- **JWT-based Authentication** - Access and refresh token mechanism
- **Email Verification** - Automated email verification workflow
- **Session Management** - Hash-based session tracking with blacklisting
- **Argon2 Password Hashing** - Industry-standard password security
- **Token Refresh** - Seamless token renewal without re-authentication
- **Secure Logout** - Session invalidation with cache-based blacklisting

### User Management
- **User CRUD Operations** - Complete user lifecycle management
- **Soft Delete** - Data retention with soft delete functionality
- **Role-Based Access Control** - USER and ADMIN roles
- **Profile Management** - User profile endpoints
- **Unique Constraints** - Email and username uniqueness validation

### Background Processing
- **BullMQ Job Queue** - Reliable background task processing
- **Email Queue** - Asynchronous email sending
- **Retry Logic** - Exponential backoff for failed jobs
- **Job Monitoring** - Comprehensive job lifecycle logging

### Developer Experience
- **TypeScript** - Full type safety across the stack
- **Modular Architecture** - Clean separation of concerns
- **Custom Decorators** - Simplified validation and authentication
- **Docker Support** - Easy local development setup
- **Comprehensive Validation** - Request validation with custom error handling

## Tech Stack

### Frontend (Client)
- **Next.js 15.3.3** - React framework with App Router
- **React 19** - Latest React features
- **TypeScript 5** - Type-safe development
- **Tailwind CSS 4** - Utility-first CSS framework
- **Turbopack** - Fast development builds
- **Geist Font** - Modern font family

### Backend (Server)
- **NestJS 11** - Progressive Node.js framework
- **PostgreSQL** - Robust relational database
- **TypeORM 0.3.24** - Powerful ORM
- **BullMQ 5.56.0** - Redis-based job queue
- **JWT** - Secure token-based authentication
- **Argon2** - Password hashing
- **Nodemailer** - Email sending
- **Cache Manager** - Caching layer
- **Jest** - Testing framework


### Prerequisites

- Node.js 18+ and Yarn
- Docker and Docker Compose (for PostgreSQL)
- PostgreSQL 14+ (or use Docker)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd web3mag
   ```

2. **Install dependencies**
   ```bash
   # Install server dependencies
   cd server
   yarn install

   # Install client dependencies
   cd ../client
   yarn install
   ```

3. **Start PostgreSQL with Docker**
   ```bash
   cd server
   docker-compose up -d
   ```

4. **Configure environment variables**

   Create `.env` file in the `server` directory:
   ```env
   # Database
   DB_HOST=localhost
   DB_PORT=5433
   DB_USERNAME=postgres
   DB_PASSWORD=postgres
   DB_DATABASE=web3mag

   # JWT
   JWT_SECRET=your-secret-key-here
   JWT_REFRESH_SECRET=your-refresh-secret-here
   JWT_EXPIRES_IN=15m
   JWT_REFRESH_EXPIRES_IN=7d

   # Email (configure your SMTP)
   MAIL_HOST=smtp.example.com
   MAIL_PORT=587
   MAIL_USER=your-email@example.com
   MAIL_PASSWORD=your-password
   MAIL_FROM=noreply@example.com
   ```

5. **Start development servers**

   Terminal 1 - Backend:
   ```bash
   cd server
   yarn start:dev
   ```

   Terminal 2 - Frontend:
   ```bash
   cd client
   yarn dev
   ```

6. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:3000 (NestJS default)

## API Endpoints

### Authentication

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/auth/email/register` | Register new user | No |
| POST | `/auth/email/login` | Login user | No |
| POST | `/auth/logout` | Logout user | Yes |
| POST | `/auth/refresh` | Refresh access token | No |

### User Management

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/user/create` | Create user | Yes (Admin) |
| GET | `/user/me` | Get current user | Yes |
| GET | `/user/:id` | Get user by ID | Yes |
| DELETE | `/user/:id` | Soft delete user | Yes (Admin) |

## Database Schema

### UserEntity
- `id` - UUID primary key
- `username` - Unique username (max 50 chars)
- `email` - Unique email (indexed)
- `password` - Argon2 hashed password
- `role` - USER or ADMIN
- `deletedAt` - Soft delete timestamp
- `createdAt`, `updatedAt` - Audit timestamps
- `createdBy`, `updatedBy` - Audit fields

### SessionEntity
- Session tracking with hash validation
- One-to-many relationship with User

## Development

### Running Tests

```bash
# Unit tests
cd server
yarn test

# E2E tests
yarn test:e2e

# Test coverage
yarn test:cov
```

### Building for Production

```bash
# Build server
cd server
yarn build
yarn start:prod

# Build client
cd client
yarn build
yarn start
```

## Architecture Highlights

### Security Features
- **Argon2 Password Hashing** - More secure than bcrypt
- **JWT with Refresh Tokens** - Secure authentication flow
- **Session Blacklisting** - Invalidate compromised tokens
- **Request Validation** - Custom decorators for DTO validation
- **Sensitive Data Redaction** - Automatic logging sanitization

### Background Processing
- **Email Verification Queue** - Asynchronous email sending
- **Job Retry Logic** - Exponential backoff for reliability
- **Lifecycle Logging** - Track job progress and failures

### Custom Decorators
- `@IsPublic()` - Mark routes as public
- `@EmailField()` - Email validation
- `@PasswordField()` - Password validation
- `@UUIDField()` - UUID validation

### Validation System
- Class-validator integration
- Custom validation exceptions
- Error code constants
- DTO-based request validation

## Configuration

The application uses environment-based configuration for:
- Database connection
- JWT secrets and expiration
- Email SMTP settings
- Cache configuration
- Job queue settings

## Best Practices

This project follows:
- Clean architecture principles
- Modular design with separation of concerns
- Type safety throughout the stack
- Security-first approach
- Comprehensive validation
- Audit logging
- Soft deletes for data retention
- Docker containerization
- Test-driven development



## Roadmap

- [ ] Social authentication (Google, GitHub)
- [ ] Two-factor authentication (2FA)
- [ ] Email templates with Handlebars
- [ ] Rate limiting
- [ ] API documentation with Swagger
- [ ] User roles and permissions system
- [ ] File upload functionality
- [ ] Real-time notifications
- [ ] Content management system
- [ ] Web3 wallet integration

