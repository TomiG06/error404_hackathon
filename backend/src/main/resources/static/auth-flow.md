# Authentication Flow Documentation

## System Architecture Overview

```mermaid
graph TB
    subgraph Frontend
        UI[User Interface]
        Forms[Form Components]
        State[State Management]
        Router[Client Router]
    end

    subgraph Backend
        API[API Gateway]
        Auth[Auth Service]
        DB[(Database)]
        Cache[(Redis Cache)]
        Email[Email Service]
    end

    subgraph Security
        JWT[JWT Service]
        Hash[Password Hashing]
        Rate[Rate Limiter]
        CSRF[CSRF Protection]
    end

    UI --> Forms
    Forms --> State
    State --> Router
    Router --> API
    API --> Auth
    Auth --> DB
    Auth --> Cache
    Auth --> Email
    Auth --> Security
    Security --> JWT
    Security --> Hash
    Security --> Rate
    Security --> CSRF
```

## Data Flow Diagram

```mermaid
sequenceDiagram
    participant User
    participant Frontend
    participant API
    participant Auth
    participant DB
    participant Email

    User->>Frontend: Enter Credentials
    Frontend->>API: POST /auth/login
    API->>Auth: Validate Request
    Auth->>DB: Query User
    DB-->>Auth: User Data
    Auth->>Auth: Verify Password
    Auth->>Auth: Generate JWT
    Auth-->>API: Auth Response
    API-->>Frontend: JWT Token
    Frontend-->>User: Redirect to Dashboard

    Note over User,Email: Registration Flow
    User->>Frontend: Submit Registration
    Frontend->>API: POST /auth/register
    API->>Auth: Process Registration
    Auth->>DB: Create User
    Auth->>Email: Send Verification
    Email-->>User: Verification Email
```

## Component Relationships

```mermaid
classDiagram
    class AuthController {
        +login()
        +register()
        +resetPassword()
        +verifyEmail()
        +logout()
    }
    
    class AuthService {
        +validateCredentials()
        +createUser()
        +generateToken()
        +verifyToken()
        +resetPassword()
    }
    
    class UserModel {
        +String email
        +String passwordHash
        +String fullName
        +Boolean isVerified
        +DateTime lastLogin
        +save()
        +update()
    }
    
    class EmailService {
        +sendVerification()
        +sendResetLink()
        +sendWelcome()
    }
    
    class SecurityService {
        +hashPassword()
        +verifyPassword()
        +generateJWT()
        +validateJWT()
    }

    AuthController --> AuthService
    AuthService --> UserModel
    AuthService --> EmailService
    AuthService --> SecurityService
```

## State Management Flow

```mermaid
stateDiagram-v2
    [*] --> Unauthenticated
    Unauthenticated --> LoginForm: Click Login
    Unauthenticated --> RegisterForm: Click Register
    LoginForm --> Authenticating: Submit
    RegisterForm --> Registering: Submit
    Authenticating --> Authenticated: Success
    Authenticating --> LoginForm: Failed
    Registering --> Unauthenticated: Success
    Registering --> RegisterForm: Failed
    Authenticated --> [*]: Logout
    Authenticated --> PasswordReset: Forgot Password
    PasswordReset --> Unauthenticated: Reset Complete
    PasswordReset --> Authenticated: Cancel
```

## Security Layers

```mermaid
mindmap
    root((Security))
        Authentication
            JWT Tokens
            Session Management
            Password Hashing
            Rate Limiting
        Authorization
            Role Based Access
            Permission Checks
            Token Validation
        Data Protection
            HTTPS
            CSRF Protection
            XSS Prevention
            SQL Injection Prevention
        Monitoring
            Audit Logs
            Security Events
            Failed Attempts
            Session Tracking
```

## Registration Process

```mermaid
flowchart TD
    A[Start Registration] --> B{User Clicks Register}
    B --> C[Load Registration Form]
    C --> D[User Inputs Data]
    D --> E{Validate Input}
    
    E -->|Invalid| F[Show Error Messages]
    F --> D
    
    E -->|Valid| G[Check Email Uniqueness]
    G -->|Email Exists| H[Show Email Taken Error]
    H --> D
    
    G -->|Email Unique| I[Hash Password]
    I --> J[Create User Account]
    J --> K[Generate Verification Token]
    K --> L[Send Verification Email]
    L --> M[Show Success Message]
    M --> N[Redirect to Login]
    
    subgraph Input Validation
        E1[Email Format]
        E2[Password Strength]
        E3[Required Fields]
        E4[Age Verification]
    end
    
    subgraph User Data
        D1[Email]
        D2[Password]
        D3[Full Name]
        D4[Age]
        D5[University]
        D6[Study Program]
    end
```

## Login Process

```mermaid
flowchart TD
    A[Start Login] --> B{User Clicks Login}
    B --> C[Load Login Form]
    C --> D[User Inputs Credentials]
    D --> E{Validate Input}
    
    E -->|Invalid| F[Show Error Messages]
    F --> D
    
    E -->|Valid| G[Check User Exists]
    G -->|User Not Found| H[Show Invalid Credentials]
    H --> D
    
    G -->|User Found| I[Verify Password]
    I -->|Password Incorrect| J[Show Invalid Credentials]
    J --> D
    
    I -->|Password Correct| K{Account Verified?}
    K -->|No| L[Show Verification Required]
    L --> M[Resend Verification Email]
    
    K -->|Yes| N[Generate JWT Token]
    N --> O[Store Token]
    O --> P[Update Last Login]
    P --> Q[Redirect to Dashboard]
    
    subgraph Security Measures
        S1[Rate Limiting]
        S2[Password Hashing]
        S3[JWT Token]
        S4[Session Management]
    end
    
    subgraph Error Handling
        E1[Invalid Email Format]
        E2[Invalid Password]
        E3[Account Locked]
        E4[Verification Required]
    end
```

## Password Reset Flow

```mermaid
flowchart TD
    A[Forgot Password] --> B[Enter Email]
    B --> C{Email Valid?}
    C -->|No| D[Show Error]
    D --> B
    
    C -->|Yes| E{User Exists?}
    E -->|No| F[Show Generic Message]
    F --> B
    
    E -->|Yes| G[Generate Reset Token]
    G --> H[Send Reset Email]
    H --> I[Show Success Message]
    
    I --> J[User Clicks Reset Link]
    J --> K{Token Valid?}
    K -->|No| L[Show Invalid Token]
    L --> A
    
    K -->|Yes| M[Show Reset Form]
    M --> N[Enter New Password]
    N --> O{Password Valid?}
    O -->|No| P[Show Requirements]
    P --> N
    
    O -->|Yes| Q[Update Password]
    Q --> R[Invalidate Reset Token]
    R --> S[Show Success Message]
    S --> T[Redirect to Login]
```

## Session Management

```mermaid
flowchart TD
    A[User Logged In] --> B{Token Valid?}
    B -->|No| C[Redirect to Login]
    
    B -->|Yes| D{Token Expired?}
    D -->|Yes| E[Refresh Token]
    E -->|Success| F[Update Session]
    E -->|Failed| C
    
    D -->|No| G[Continue Session]
    G --> H{User Activity}
    H -->|Inactive| I[Session Timeout]
    I --> C
    
    H -->|Active| J[Extend Session]
    J --> G
    
    subgraph Token Management
        T1[JWT Generation]
        T2[Token Refresh]
        T3[Token Validation]
        T4[Token Revocation]
    end
```

## Notes

1. **Security Considerations:**
   - All passwords are hashed using bcrypt
   - JWT tokens have a short expiration time
   - Rate limiting is implemented for login attempts
   - CSRF protection is enabled
   - All sensitive data is transmitted over HTTPS

2. **Validation Rules:**
   - Email must be a valid university email
   - Password must be at least 8 characters
   - Password must contain uppercase, lowercase, number, and special character
   - Username must be 3-20 characters
   - Age must be 18 or older

3. **Error Handling:**
   - Generic error messages for security
   - Detailed validation errors for user input
   - Proper logging of security events
   - Rate limiting notifications

4. **User Experience:**
   - Clear error messages
   - Progress indicators
   - Responsive design
   - Remember me functionality
   - Password strength indicator

5. **System Architecture:**
   - Microservices-based architecture
   - Separate authentication service
   - Redis for session management
   - PostgreSQL for user data
   - SMTP service for emails

6. **Component Details:**
   - Frontend: React with TypeScript
   - Backend: Spring Boot
   - Database: PostgreSQL
   - Cache: Redis
   - Email: SendGrid
   - Security: Spring Security

7. **Deployment:**
   - Docker containers
   - Kubernetes orchestration
   - CI/CD pipeline
   - Automated testing
   - Monitoring and logging 