# Production Deployment Checklist

## Pre-Deployment Setup

### Backend (Spring Boot)

#### Database Configuration
- [ ] Create production PostgreSQL database
- [ ] Set up database user with appropriate permissions
- [ ] Configure database connection string
- [ ] Run initial schema creation (set `ddl-auto=create` once, then change to `validate`)
- [ ] Verify database seeding (or disable if not needed)

#### Environment Variables
```bash
export DATABASE_URL=jdbc:postgresql://your-production-db:5432/nosaintz
export DATABASE_USERNAME=your_production_user
export DATABASE_PASSWORD=your_secure_password
export PORT=8080
export CORS_ALLOWED_ORIGINS=https://yourdomain.com,https://www.yourdomain.com
export STRIPE_SECRET_KEY=sk_live_your_stripe_secret_key
```

#### Backend Security
- [ ] Enable password hashing (BCrypt) - **CRITICAL**
- [ ] Implement JWT authentication
- [ ] Review and update SecurityConfig for production
- [ ] Disable detailed error messages in production
- [ ] Set up rate limiting
- [ ] Configure session management
- [ ] Review CORS settings

#### Backend Build & Deploy
- [ ] Run tests: `./mvnw test`
- [ ] Build JAR: `./mvnw clean package`
- [ ] Test JAR locally: `java -jar target/demo-0.0.1-SNAPSHOT.jar --spring.profiles.active=prod`
- [ ] Deploy to server (AWS, Heroku, DigitalOcean, etc.)
- [ ] Set up reverse proxy (nginx/Apache)
- [ ] Configure SSL certificate
- [ ] Set up health check endpoint
- [ ] Configure logging and log rotation

---

### Frontend (React + Vite)

#### Environment Configuration
Create `.env.production`:
```bash
VITE_API_BASE_URL=https://api.yourdomain.com/api
VITE_STRIPE_PUBLISHABLE_KEY=pk_live_your_publishable_key
VITE_PAYPAL_CLIENT_ID=your_paypal_production_client_id
```

#### Frontend Build & Deploy
- [ ] Update API URLs in environment files
- [ ] Test build locally: `npm run build`
- [ ] Preview production build: `npm run preview`
- [ ] Optimize images and assets
- [ ] Configure CDN for static assets
- [ ] Deploy to hosting (Netlify, Vercel, S3+CloudFront, etc.)
- [ ] Set up custom domain
- [ ] Configure SSL certificate
- [ ] Set up redirects (SPA routing)

---

## Payment Integration

### Stripe
- [ ] Create production Stripe account
- [ ] Get live API keys (secret and publishable)
- [ ] Test payment flow in Stripe test mode
- [ ] Enable live mode in Stripe dashboard
- [ ] Configure webhook endpoints (if needed)
- [ ] Set up payment success/failure handling
- [ ] Verify currency settings

### PayPal
- [ ] Create production PayPal account
- [ ] Get live client ID
- [ ] Test PayPal integration in sandbox
- [ ] Switch to production mode
- [ ] Configure webhook endpoints (if needed)

---

## Security Hardening

### Backend
- [ ] **Implement password hashing** - Use BCrypt or Argon2
- [ ] Add JWT token authentication
- [ ] Configure HTTPS only
- [ ] Set secure headers (HSTS, CSP, X-Frame-Options)
- [ ] Disable stack traces in error responses
- [ ] Set up Web Application Firewall (WAF)
- [ ] Configure rate limiting per endpoint
- [ ] Add request logging and audit trail
- [ ] Sanitize all user inputs
- [ ] Use prepared statements (already done with JPA)

### Frontend
- [ ] Enable HTTPS
- [ ] Set Content Security Policy headers
- [ ] Validate all user inputs client-side
- [ ] Implement CSRF protection
- [ ] Store sensitive data securely (use httpOnly cookies for tokens)
- [ ] Add input sanitization

---

## Monitoring & Logging

### Backend
- [ ] Set up application monitoring (New Relic, DataDog, etc.)
- [ ] Configure error tracking (Sentry, Rollbar)
- [ ] Set up log aggregation (ELK stack, CloudWatch)
- [ ] Configure alerts for errors and downtime
- [ ] Monitor database performance
- [ ] Set up health check endpoints
- [ ] Configure metrics collection

### Frontend
- [ ] Set up error tracking (Sentry)
- [ ] Configure analytics (Google Analytics, Plausible)
- [ ] Monitor page load performance
- [ ] Set up user behavior tracking
- [ ] Configure uptime monitoring

---

## Performance Optimization

### Backend
- [ ] Enable database connection pooling (HikariCP - already configured)
- [ ] Add caching layer (Redis) for frequently accessed data
- [ ] Optimize database queries (add indexes)
- [ ] Enable GZIP compression
- [ ] Configure proper JVM heap settings
- [ ] Set up horizontal scaling if needed

### Frontend
- [ ] Minify and bundle JavaScript/CSS (Vite does this)
- [ ] Optimize images (compress, use WebP)
- [ ] Enable lazy loading for images
- [ ] Implement code splitting
- [ ] Use CDN for static assets
- [ ] Enable browser caching
- [ ] Optimize font loading

---

## Backup & Disaster Recovery

- [ ] Set up automated database backups (daily minimum)
- [ ] Test backup restoration process
- [ ] Configure backup retention policy
- [ ] Set up off-site backup storage
- [ ] Document recovery procedures
- [ ] Create disaster recovery plan

---

## Testing

### Backend Testing
- [ ] Unit tests for all services
- [ ] Integration tests for controllers
- [ ] Test all API endpoints
- [ ] Test error handling
- [ ] Load testing
- [ ] Security testing (OWASP Top 10)

### Frontend Testing
- [ ] Test all user flows
- [ ] Test form validations
- [ ] Test error handling
- [ ] Cross-browser testing (Chrome, Firefox, Safari, Edge)
- [ ] Mobile responsiveness testing
- [ ] Accessibility testing (WCAG)

### Integration Testing
- [ ] Test registration flow end-to-end
- [ ] Test login flow
- [ ] Test payment flows (Stripe & PayPal)
- [ ] Test shopping cart functionality
- [ ] Test all CRUD operations

---

## Legal & Compliance

- [ ] Add Privacy Policy
- [ ] Add Terms of Service
- [ ] Add Cookie Policy (if using cookies)
- [ ] GDPR compliance (if applicable)
- [ ] PCI DSS compliance for payments
- [ ] Add contact information
- [ ] Set up customer support system

---

## Documentation

- [ ] API documentation (Swagger/OpenAPI)
- [ ] User documentation/FAQ
- [ ] Admin documentation
- [ ] Runbook for operations team
- [ ] Architecture diagrams
- [ ] Database schema documentation

---

## Post-Deployment

- [ ] Verify all pages load correctly
- [ ] Test registration with real email
- [ ] Test login functionality
- [ ] Test payment with real card (small amount)
- [ ] Verify email notifications work (if applicable)
- [ ] Check all links work
- [ ] Verify analytics tracking
- [ ] Monitor error logs for 24-48 hours
- [ ] Get feedback from beta users
- [ ] Announce launch

---

## Maintenance

### Daily
- [ ] Check error logs
- [ ] Monitor server resources
- [ ] Verify backups completed

### Weekly
- [ ] Review analytics
- [ ] Check for security updates
- [ ] Review performance metrics

### Monthly
- [ ] Update dependencies
- [ ] Review and optimize database
- [ ] Security audit
- [ ] Performance review

---

## Emergency Contacts

- **Hosting Provider Support:** _______________
- **Database Provider Support:** _______________
- **Domain Registrar:** _______________
- **Payment Processor Support:** _______________
- **Development Team Lead:** _______________

---

## Rollback Plan

In case of issues after deployment:

1. **Immediate Actions:**
   - Revert to previous working version
   - Notify users if necessary
   - Document the issue

2. **Backend Rollback:**
   - Stop current application
   - Deploy previous JAR version
   - Restart application
   - Verify functionality

3. **Frontend Rollback:**
   - Revert to previous build in hosting platform
   - Clear CDN cache
   - Verify functionality

4. **Database Rollback:**
   - Restore from last known good backup (if schema changed)
   - Run any necessary migration scripts
   - Verify data integrity

---

## Success Metrics

Track these metrics post-launch:
- [ ] Uptime percentage (target: 99.9%)
- [ ] Average response time (target: < 200ms)
- [ ] Error rate (target: < 0.1%)
- [ ] Successful registration rate
- [ ] Payment success rate
- [ ] User engagement metrics

---

**Last Updated:** 2026-01-04
**Prepared By:** Development Team
**Status:** Ready for Production Deployment
