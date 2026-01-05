# OAuth2 Setup Guide for Google Calendar Integration

## 🎯 Overview
To enable full Google Calendar write access (creating events automatically), you need to set up OAuth2 authentication with a Google Service Account.

## 📋 Prerequisites
- Google Cloud Console access
- Admin access to info.nosaintz@gmail.com calendar
- Java backend running

## 🔧 Step-by-Step Setup

### Step 1: Create Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Name it: "NoSaintz Booking System" (or similar)

### Step 2: Enable Google Calendar API

1. In the Google Cloud Console, go to **APIs & Services** > **Library**
2. Search for "Google Calendar API"
3. Click on it and press **Enable**

### Step 3: Create Service Account

1. Go to **APIs & Services** > **Credentials**
2. Click **Create Credentials** > **Service Account**
3. Fill in details:
   - **Service account name**: nosaintz-booking-service
   - **Service account ID**: nosaintz-booking-service
   - **Description**: Service account for NoSaintz booking system
4. Click **Create and Continue**
5. Grant role: **Project** > **Editor** (or just Calendar access)
6. Click **Continue** then **Done**

### Step 4: Generate JSON Key

1. In the **Credentials** page, find your service account
2. Click on the service account email
3. Go to the **Keys** tab
4. Click **Add Key** > **Create new key**
5. Choose **JSON** format
6. Click **Create**
7. A JSON file will be downloaded automatically
8. **IMPORTANT**: Keep this file secure and never commit it to version control!

### Step 5: Share Calendar with Service Account

1. Open Google Calendar at [calendar.google.com](https://calendar.google.com)
2. Log in as info.nosaintz@gmail.com
3. Find your calendar in the left sidebar
4. Click the three dots next to it
5. Select **Settings and sharing**
6. Scroll to **Share with specific people**
7. Click **Add people**
8. Enter the service account email (looks like: `nosaintz-booking-service@project-id.iam.gserviceaccount.com`)
9. Set permission to **Make changes to events**
10. Click **Send**

### Step 6: Configure the Backend

1. **Save the JSON credentials file**:
   ```bash
   mkdir -p mac/Dev_N/React/demo/src/main/resources/credentials
   mv ~/Downloads/nosaintz-booking-*.json mac/Dev_N/React/demo/src/main/resources/credentials/google-calendar-credentials.json
   ```

2. **Add to .gitignore** (if not already):
   ```bash
   echo "src/main/resources/credentials/" >> mac/Dev_N/React/demo/.gitignore
   ```

3. **Update application.properties**:
   ```properties
   # Google Calendar OAuth2 Configuration
   google.credentials.path=classpath:credentials/google-calendar-credentials.json
   google.calendar.id=info.nosaintz@gmail.com
   ```

### Step 7: Update GoogleCalendarService

The service is already configured to use OAuth2 credentials. Once you add the JSON file, it will automatically:
- Authenticate using the service account
- Create events in the Google Calendar
- Send notifications to attendees

### Step 8: Test the Integration

1. **Rebuild and restart the application**:
   ```bash
   cd mac/Dev_N/React
   ./rebuild-and-deploy.sh
   ```

2. **Test booking**:
   - Open http://localhost:5713
   - Navigate to the calendar
   - Book a test session
   - Check the Google Calendar to verify the event was created

3. **Verify in logs**:
   ```bash
   # Check backend logs for:
   # "=== New Booking Request ==="
   # And no errors about credentials
   ```

## 🔍 Verification Checklist

- [ ] Google Cloud Project created
- [ ] Google Calendar API enabled
- [ ] Service Account created
- [ ] JSON key downloaded and saved securely
- [ ] Calendar shared with service account email
- [ ] Credentials file placed in correct location
- [ ] application.properties updated
- [ ] Application rebuilt and restarted
- [ ] Test booking created successfully
- [ ] Event appears in Google Calendar

## 🔒 Security Best Practices

### 1. Protect the Credentials File
```bash
# Set restrictive permissions
chmod 600 mac/Dev_N/React/demo/src/main/resources/credentials/google-calendar-credentials.json
```

### 2. Add to .gitignore
```gitignore
# Google Calendar Credentials
src/main/resources/credentials/
*.json
!package.json
!package-lock.json
```

### 3. Use Environment Variables in Production
For production deployment, use environment variables instead of file:
```properties
google.credentials.json=${GOOGLE_CREDENTIALS_JSON}
```

Then set the environment variable with the JSON content.

## 🐛 Troubleshooting

### Issue: "Credentials not found"
**Solution**: 
- Verify the file path in application.properties
- Check file exists: `ls -la src/main/resources/credentials/`
- Ensure file name matches configuration

### Issue: "403 Forbidden" when creating events
**Solution**:
- Verify calendar is shared with service account
- Check service account has "Make changes to events" permission
- Wait a few minutes after sharing (propagation delay)

### Issue: "Invalid JSON" error
**Solution**:
- Verify JSON file is not corrupted
- Re-download the key from Google Cloud Console
- Check file encoding (should be UTF-8)

### Issue: Events created but no email notifications
**Solution**:
- Verify `setSendNotifications(true)` is set in the code
- Check attendee email is valid
- Gmail might mark as spam initially

## 📝 Alternative: API Key (Current Setup)

Currently, the system uses an API key for read-only access:
- **API Key**: `AIzaSyDGNhhC3Med0jmuL9l_aooyIuBy0kbnZ94`
- **Limitations**: Read-only, cannot create events
- **Fallback**: Email notifications still work

## 🎉 Benefits of OAuth2 Setup

Once OAuth2 is configured:

1. **Automatic Calendar Events**: Bookings automatically create calendar events
2. **Email Notifications**: Google sends automatic notifications to attendees
3. **Calendar Management**: Events can be edited/cancelled from Google Calendar
4. **Professional**: More integrated and automatic workflow
5. **Sync**: Works across all devices connected to the calendar

## 📊 Testing Script

Use this curl command to test the booking API:

```bash
curl -X POST http://localhost:5713/api/calendar/book \
  -H "Content-Type: application/json" \
  -d '{
    "date": "2026-01-30",
    "time": "15:00",
    "name": "OAuth2 Test User",
    "email": "test@example.com",
    "phone": "+39 123 456 7890",
    "sessionType": "recording",
    "notes": "Testing OAuth2 integration"
  }'
```

Check Google Calendar to see if the event was created automatically!

## 🔄 Maintenance

### Rotating Credentials
Service account keys don't expire, but you can rotate them:
1. Create a new key in Google Cloud Console
2. Update the credentials file
3. Restart the application
4. Delete the old key from Google Cloud Console

### Monitoring
- Check backend logs regularly for authentication errors
- Monitor Google Cloud Console for API usage
- Set up alerts for quota limits

## 📚 Additional Resources

- [Google Calendar API Documentation](https://developers.google.com/calendar/api/guides/overview)
- [Service Accounts Overview](https://cloud.google.com/iam/docs/service-accounts)
- [OAuth2 for Server to Server](https://developers.google.com/identity/protocols/oauth2/service-account)

---

**Current Status**: System uses email fallback. OAuth2 setup is optional but recommended for production use.
