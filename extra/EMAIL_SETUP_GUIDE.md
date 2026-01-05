# Email Setup Guide - Gmail App Password

## 🎯 Overview
To enable automatic email sending to both the studio and clients, you need to set up a Gmail App Password for the `info.nosaintz@gmail.com` account.

## 📋 Prerequisites
- Access to info.nosaintz@gmail.com Gmail account
- 2-Step Verification enabled on the account

## 🔧 Step-by-Step Setup

### Step 1: Enable 2-Step Verification (if not already enabled)

1. Go to your Google Account: https://myaccount.google.com/
2. Click on **Security** in the left sidebar
3. Under "How you sign in to Google", click **2-Step Verification**
4. Follow the prompts to set it up (usually requires phone verification)

### Step 2: Generate App Password

1. Go to https://myaccount.google.com/security
2. Under "How you sign in to Google", click **2-Step Verification**
3. Scroll down to **App passwords** (at the bottom)
4. Click on **App passwords**
5. You might need to sign in again
6. In the "Select app" dropdown, choose **Mail**
7. In the "Select device" dropdown, choose **Other (Custom name)**
8. Enter: "NoSaintz Booking System"
9. Click **Generate**
10. Google will show you a 16-character password (e.g., `abcd efgh ijkl mnop`)
11. **IMPORTANT**: Copy this password immediately - you won't be able to see it again!

### Step 3: Configure the Application

#### Option A: Using Environment Variable (Recommended for Production)

Set the environment variable before starting the application:

```bash
export GMAIL_APP_PASSWORD="your-16-character-password-here"
cd mac/Dev_N/React/demo
./mvnw spring-boot:run
```

#### Option B: Using application.properties (For Development Only)

**⚠️ NEVER commit this to Git!**

Edit `demo/src/main/resources/application.properties`:

```properties
spring.mail.password=your-16-character-password-here
```

Add to `.gitignore`:
```
application-local.properties
```

### Step 4: Test Email Functionality

1. Start the application
2. Open http://localhost:5713
3. Fill out a booking form
4. Submit the booking
5. Check both email inboxes:
   - **info.nosaintz@gmail.com** - Should receive booking notification
   - **Client email** - Should receive confirmation email

## 📧 Email Features

When a booking is submitted, two emails are automatically sent:

### 1. Studio Email (to info.nosaintz@gmail.com)
- **Subject**: 🎵 New Booking Request - [Session Type]
- **Contains**:
  - Booking date and time
  - Session type
  - Client name, email, and phone
  - Additional notes (if provided)
  - Professional HTML formatting

### 2. Client Confirmation Email
- **Subject**: ✅ Booking Confirmation - NoSaintz Studio
- **Contains**:
  - Booking details
  - What's next instructions
  - Contact information
  - Professional HTML formatting

## 🔒 Security Notes

### DO:
- ✅ Store the App Password in environment variables
- ✅ Keep the password in a secure password manager
- ✅ Use different App Passwords for different applications
- ✅ Revoke and regenerate if compromised

### DON'T:
- ❌ Commit the password to version control
- ❌ Share the password in plain text
- ❌ Use your regular Gmail password
- ❌ Store in the application.properties file in production

## 🐛 Troubleshooting

### Issue: "Authentication failed"
**Solution**:
- Verify 2-Step Verification is enabled
- Regenerate the App Password
- Check that you're using the App Password, not your regular password
- Ensure no spaces in the password

### Issue: Emails not being sent
**Check**:
1. Backend logs for errors
2. App Password is correctly set
3. Internet connection is working
4. Gmail account is not locked

### Issue: Emails go to spam
**Solution**:
- This is normal for the first few emails
- Mark as "Not Spam" in Gmail
- After a few emails, Gmail will learn and deliver to inbox
- For production, consider using a dedicated email service (SendGrid, AWS SES)

### Issue: "⚠️ Mail sender not configured"
**This is OK**:
- The system will log this warning
- Bookings will still work
- Email is a nice-to-have feature, not critical
- Fix it when you're ready by setting up the App Password

## 🧪 Testing Without Email Setup

If you don't set up the App Password yet, the system will:
- ✅ Still accept bookings
- ✅ Still show confirmation modal
- ⚠️ Log a warning: "Mail sender not configured"
- ⚠️ Not send emails
- ✅ Everything else works normally

## 📊 Current Configuration

The application is configured to use:
- **SMTP Server**: smtp.gmail.com
- **Port**: 587 (TLS)
- **Username**: info.nosaintz@gmail.com
- **Password**: Set via `GMAIL_APP_PASSWORD` environment variable
- **Authentication**: Enabled
- **TLS**: Required

## 🔄 Updating/Rotating the Password

To change the App Password:
1. Go to Google Account > Security > App passwords
2. Find "NoSaintz Booking System"
3. Click **Revoke**
4. Generate a new one following Step 2 above
5. Update the environment variable
6. Restart the application

## 🚀 Production Deployment

For production, use one of these methods:

### Method 1: Environment Variable (Docker)
```dockerfile
docker run -e GMAIL_APP_PASSWORD="your-password" your-app
```

### Method 2: Environment Variable (Server)
```bash
echo 'export GMAIL_APP_PASSWORD="your-password"' >> ~/.bashrc
source ~/.bashrc
```

### Method 3: Secret Management (Kubernetes)
```yaml
apiVersion: v1
kind: Secret
metadata:
  name: gmail-secret
data:
  app-password: base64-encoded-password
```

## 📚 Alternative Email Services

For production, consider these alternatives to Gmail:

### SendGrid
- Free tier: 100 emails/day
- Better deliverability
- No App Password needed
- Easy setup with Spring Boot

### AWS SES
- Very cheap ($.10 per 1000 emails)
- Excellent deliverability
- Requires AWS account
- Good for high volume

### Mailgun
- Free tier: 5000 emails/month
- Simple API
- Good documentation
- Easy integration

## ✅ Quick Setup Summary

1. Enable 2-Step Verification on info.nosaintz@gmail.com
2. Generate App Password
3. Set environment variable: `export GMAIL_APP_PASSWORD="your-password"`
4. Restart application
5. Test by submitting a booking
6. Check both email inboxes

---

**Current Status**: Email service is configured but requires App Password to be active.

**Note**: The booking system works perfectly without email - it's just an enhancement!
