# Authentication System Setup Guide

This guide will help you set up the user authentication system for your Next.js 15 application.

## Prerequisites

- Node.js 18+ installed
- PostgreSQL database running
- Next.js 15 project set up

## Installation Steps

### 1. Install Dependencies

The following packages have been installed:

```bash
npm install bcryptjs jsonwebtoken @types/bcryptjs @types/jsonwebtoken prisma @prisma/client
```

### 2. Environment Variables

Create a `.env.local` file in the `web` directory with the following variables:

```env
# Database Configuration
DATABASE_URL="postgresql://username:password@localhost:5432/your_database_name"

# JWT Configuration
JWT_SECRET="your-super-secret-jwt-key-here"
JWT_REFRESH_SECRET="your-super-secret-refresh-key-here"

# Environment
NODE_ENV="development"
```

**Important Security Notes:**

- Generate strong, unique secrets for JWT_SECRET and JWT_REFRESH_SECRET
- Never commit these secrets to version control
- Use different secrets for development and production

### 3. Database Setup

1. **Update Database URL**: Replace the DATABASE_URL with your actual PostgreSQL connection string.

2. **Run Prisma Migration**:

```bash
npx prisma migrate dev --name init
```

3. **Generate Prisma Client**:

```bash
npx prisma generate
```

### 4. Database Schema

The system uses the following User model:

```prisma
model User {
  id              String   @id @default(cuid())
  email           String   @unique @db.VarChar(255)
  firstName       String?
  lastName        String?
  hashed_password String
  status          UserStatus @default(Active)
  role            UserRole @default(staff)
  created_at      DateTime @default(now())
  updated_at      DateTime @updatedAt

  @@map("users")
}

enum UserStatus {
  Active
  Inactive
  Delete
}

enum UserRole {
  admin
  staff
}
```

## API Endpoints

### Registration

- **POST** `/api/register`
- **Body**: `{ email, password, firstName?, lastName? }`
- **Response**: User data and JWT tokens

### Login

- **POST** `/api/login`
- **Body**: `{ email, password }`
- **Response**: User data and JWT tokens

### Refresh Token

- **POST** `/api/refresh`
- **Body**: `{ refreshToken }`
- **Response**: New access and refresh tokens

## Frontend Components

### Available Components

1. **RegisterForm** (`/src/components/RegisterForm.tsx`)

   - Email and password registration
   - Password strength indicator
   - Form validation
   - Error handling

2. **LoginForm** (`/src/components/LoginForm.tsx`)

   - Email and password login
   - Form validation
   - Error handling

3. **PasswordStrengthIndicator** (`/src/components/PasswordStrengthIndicator.tsx`)

   - Visual password strength meter
   - Color-coded feedback

4. **AuthPage** (`/src/app/auth/page.tsx`)

   - Combined login/register interface
   - Tab switching
   - Responsive design

5. **DashboardPage** (`/src/app/dashboard/page.tsx`)
   - Protected dashboard
   - User information display
   - Logout functionality

## Usage

### 1. Access Authentication Page

Navigate to `/auth` to access the login/register interface.

### 2. User Registration

1. Click "Create Account" tab
2. Fill in email, password, and optional name fields
3. Submit form
4. User will be automatically logged in and redirected to dashboard

### 3. User Login

1. Click "Sign In" tab
2. Enter email and password
3. Submit form
4. User will be redirected to dashboard

### 4. Dashboard Access

- Protected route at `/dashboard`
- Shows user information
- Includes logout functionality

## Security Features

- **Password Hashing**: Uses bcrypt with 12 salt rounds
- **JWT Tokens**: 7-day access tokens, 30-day refresh tokens
- **Input Validation**: Server-side validation for all inputs
- **Error Handling**: Comprehensive error messages
- **Token Storage**: Secure localStorage management (frontend responsibility)

## Customization

### Password Requirements

Modify the `validatePassword` function in `/src/lib/password.ts` to change password requirements.

### JWT Expiration

Update token expiration times in `/src/lib/jwt.ts`:

- Access tokens: 7 days
- Refresh tokens: 30 days

### User Roles

Add new roles to the `UserRole` enum in the Prisma schema.

### UI Styling

All components use Tailwind CSS and shadcn/ui components for consistent styling.

## Testing

### Manual Testing

1. Test registration with valid/invalid data
2. Test login with correct/incorrect credentials
3. Test password strength indicator
4. Test form validation
5. Test error handling
6. Test token refresh functionality

### API Testing

Use tools like Postman or curl to test API endpoints directly.

## Troubleshooting

### Common Issues

1. **Database Connection Error**

   - Verify DATABASE_URL is correct
   - Ensure PostgreSQL is running
   - Check database permissions

2. **JWT Errors**

   - Verify JWT_SECRET and JWT_REFRESH_SECRET are set
   - Ensure secrets are strong and unique

3. **Prisma Errors**

   - Run `npx prisma generate` after schema changes
   - Run `npx prisma migrate dev` for database updates

4. **Import Errors**
   - Verify tsconfig.json path mappings
   - Check file paths and imports

## Production Deployment

### Security Checklist

- [ ] Use strong, unique JWT secrets
- [ ] Enable HTTPS
- [ ] Set up proper CORS configuration
- [ ] Implement rate limiting
- [ ] Add logging and monitoring
- [ ] Use environment-specific database URLs
- [ ] Set NODE_ENV to "production"

### Environment Variables

Ensure all environment variables are properly set in your production environment.

## Support

For issues or questions:

1. Check the troubleshooting section
2. Review the code comments
3. Verify environment configuration
4. Test with minimal data

The authentication system is now ready for use!
