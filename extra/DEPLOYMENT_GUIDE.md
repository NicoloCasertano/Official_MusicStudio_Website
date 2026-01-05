# NoSaintz Music Studio Website - Deployment Guide

## Overview
Full-stack music studio producer website with React frontend and Spring Boot backend.

## Backend Setup (Spring Boot)

### Local Development
1. Ensure PostgreSQL is running on port 5433
2. Database credentials in `demo/src/main/resources/application.properties`:
   - Database: `nosaintz`
   - Username: `postgres`
   - Password: `N1i9k9e9#!database`

3. Run backend:
   ```bash
   cd demo
   ./mvnw spring-boot:run
   ```
   Backend runs on: http://localhost:5713

### Production Deployment

1. **Set Environment Variables:**
   ```bash
   export DATABASE_URL=jdbc:postgresql://your-db-host:5432/nosaintz
   export DATABASE_USERNAME=your_db_user
   export DATABASE_PASSWORD=your_db_password
   export PORT=8080
   export CORS_ALLOWED_ORIGINS=https://yourdomain.com,https://www.yourdomain.com
   export STRIPE_SECRET_KEY=sk_live_your_stripe_secret_key
   ```

2. **Build the application:**
   ```bash
   cd demo
   ./mvnw clean package -DskipTests
   ```

3. **Run with production profile:**
   ```bash
   java -jar target/demo-0.0.1-SNAPSHOT.jar --spring.profiles.active=prod
   ```

4. **Database Schema:**
   - For first deployment, temporarily set `spring.jpa.hibernate.ddl-auto=create` to create tables
   - After first run, change to `validate` for safety
   - Or manually create schema using generated DDL

## Frontend Setup (React + Vite)

### Local Development
1. Install dependencies:
   ```bash
   cd react-app-2
   npm install
   ```

2. Run development server:
   ```bash
   npm run dev
   ```
   Frontend runs on: http://localhost:5173

### Production Deployment

1. **Configure Environment Variables:**
   Create `.env.production` file:
   ```bash
   VITE_API_BASE_URL=https://your-backend-api.com/api
   VITE_STRIPE_PUBLISHABLE_KEY=pk_live_your_publishable_key
   VITE_PAYPAL_CLIENT_ID=your_paypal_client_id
   ```

2. **Build for production:**
   ```bash
   npm run build
   ```
   This creates optimized files in `dist/` folder

3. **Deploy to hosting:**
   - **Netlify/Vercel:** Connect your Git repo and set build command to `npm run build` and publish directory to `dist`
   - **Traditional hosting:** Upload contents of `dist/` folder to your web server

## Features & Pages

### Working Pages:
- ✅ **Home** (`/`) - Hero, Merch preview, About Us, Footer
- ✅ **Gallery** (`/gallery`) - Photo gallery
- ✅ **Merch** (`/merch`) - Product catalog
- ✅ **Product Details** (`/merch/:id`) - Single product view
- ✅ **Basket** (`/basket`) - Shopping cart with invoice generation
- ✅ **Calendar** (`/calendar`) - Events/booking calendar
- ✅ **Register** (`/register`) - User registration with validation
- ✅ **Checkout** (`/checkout`) - Stripe & PayPal payment integration

## API Endpoints

### Authentication
- `POST /api/login` - User login
- `POST /api/users` - User registration

### Users
- `GET /api/users` - List all users
- `GET /api/users/{id}` - Get user by ID
- `PUT /api/users/{id}` - Update user
- `DELETE /api/users/{id}` - Delete user

### Beats
- `GET /api/beats` - List all beats
- `GET /api/beats/{id}` - Get beat by ID
- `POST /api/beats` - Create beat
- `PUT /api/beats/{id}` - Update beat
- `DELETE /api/beats/{id}` - Delete beat

### Products
- `GET /api/products` - List all products
- `GET /api/products/{id}` - Get product by ID
- `POST /api/products` - Create product
- `PUT /api/products/{id}` - Update product
- `DELETE /api/products/{id}` - Delete product

### Works
- `GET /api/works` - List all works
- `GET /api/works/{id}` - Get work by ID
- `POST /api/works` - Create work
- `PUT /api/works/{id}` - Update work
- `DELETE /api/works/{id}` - Delete work

### Payments
- `POST /api/payments/create-intent` - Create Stripe payment intent
- `POST /api/purchase` - Record beat purchase

## Bug Fixes Applied

### Backend
1. ✅ **Fixed 500 error on user registration**
   - Added validation for required fields (username, email, password)
   - Added proper error handling for duplicate email/username
   - Returns 409 Conflict with clear error message

2. ✅ **Added comprehensive error handling to all controllers**
   - UserController, BeatController, ProductController, WorkController
   - Proper validation and exception handling
   - Clear error messages returned to frontend

3. ✅ **Created GlobalExceptionHandler**
   - Centralized error handling
   - Consistent error response format
   - Better logging and debugging

4. ✅ **Enhanced security configuration**
   - CORS properly configured
   - CSRF disabled for REST API
   - All endpoints accessible (adjust as needed)

### Frontend
1. ✅ **Fixed registration form**
   - Added proper error display
   - Loading states
   - Form validation
   - Better UX with success messages

2. ✅ **Enabled register route**
   - Uncommented in App.jsx
   - Now accessible at `/register`

3. ✅ **Fixed checkout payment integration**
   - Proper error handling
   - Environment variable support
   - API URL configuration

4. ✅ **Added environment variable support**
   - API base URL configurable
   - Stripe & PayPal keys from environment
   - Development and production configs

## Testing

### Test User Registration:
1. Navigate to http://localhost:5173/register
2. Fill in: Name, Email, Password
3. Click "Create Account"
4. Should see success message

### Test API Endpoints:
```bash
# Create user
curl -X POST http://localhost:5713/api/users \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","email":"test@example.com","password":"password123"}'

# Login
curl -X POST http://localhost:5713/api/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'

# Get all users
curl http://localhost:5713/api/users
```

## Production Checklist

- [ ] Update database credentials in environment variables
- [ ] Set strong database password
- [ ] Configure production CORS origins
- [ ] Set up Stripe with live API keys
- [ ] Set up PayPal with live credentials
- [ ] Enable HTTPS/SSL on backend
- [ ] Configure CDN for frontend assets
- [ ] Set up monitoring and logging
- [ ] Configure backup strategy for database
- [ ] Test all payment flows in production
- [ ] Set up error tracking (e.g., Sentry)
- [ ] Configure rate limiting on API
- [ ] Review and adjust security settings

## Support

For issues or questions, contact the development team.

## License

Proprietary - NoSaintz Music Studio
