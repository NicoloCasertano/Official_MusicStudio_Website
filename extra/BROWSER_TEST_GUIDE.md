# 🧪 Browser Testing Guide - Calendar Booking System

## Prerequisites
✅ Application running at: http://localhost:5713

## Test Checklist

### 1. Homepage & Navigation
- [ ] Open http://localhost:5713
- [ ] Verify homepage loads without errors
- [ ] Navigate to the Calendar/Booking page
- [ ] Check browser console for errors (F12)

### 2. Calendar Display
- [ ] **Month Name Display**
  - Verify H1 shows current month and year (e.g., "January 2026")
  - Month name should be visible above the calendar days
  - Style: 2rem font size, white color

- [ ] **Google Calendar Status**
  - Check for status message below "Book a session"
  - Should show: "Loading availability from Google Calendar..." or "Calendar system ready..."
  - No error messages should appear

- [ ] **Days Grid**
  - Days should be displayed in a grid format
  - Each day should show the date number
  - Available dates should be clickable
  - Unavailable dates should be grayed out

### 3. Date Selection
- [ ] Click on an available date (green/clickable)
- [ ] Date should become highlighted/selected
- [ ] Selected date should be visually distinct
- [ ] Click another date to change selection
- [ ] Previous selection should be deselected

### 4. Time Slot Selection
- [ ] After selecting a date, verify time slots appear
- [ ] Default time slots should be visible (e.g., 15.00, 15.30, etc.)
- [ ] Click on a time slot
- [ ] Selected time should be highlighted
- [ ] Try selecting different times

### 5. Booking Form
- [ ] **Name Field**
  - Enter your name
  - Verify input is accepted
  - Try empty value (should require input)

- [ ] **Email Field**
  - Enter a valid email address
  - Verify input is accepted
  - Try invalid email format
  - Check if validation exists

- [ ] **Submit Button**
  - Should be labeled "Request booking" or similar
  - Should be clickable when form is complete

### 6. Booking Submission
- [ ] Fill out complete form:
  - Select a date
  - Select a time
  - Enter name: "Test User"
  - Enter email: "test@example.com"
- [ ] Click "Request booking"
- [ ] Verify loading state appears briefly
- [ ] Check for success message/alert
- [ ] Verify email client opens with pre-filled information
- [ ] Check if form resets after successful submission

### 7. Error Handling
- [ ] **Missing Date**
  - Try submitting without selecting date
  - Should show alert: "Select a date first"

- [ ] **Missing Information**
  - Try submitting with empty name/email
  - Should prevent submission or show error

- [ ] **Network Error Simulation**
  - Stop backend server
  - Try to submit booking
  - Should show error message
  - Restart backend and verify recovery

### 8. Browser Console Checks
Open Developer Tools (F12) and check:
- [ ] **Console Tab**
  - No red errors
  - API calls successful (200 status)
  - Warnings are acceptable

- [ ] **Network Tab**
  - Check API call to `/api/calendar/book`
  - Verify request payload contains: date, time, name, email
  - Verify response is JSON with "status": "success"

- [ ] **Application Tab**
  - Check if environment variables are loaded
  - Verify `VITE_GOOGLE_API_KEY` is present
  - Verify `VITE_GOOGLE_CALENDAR_ID` is present

### 9. Responsive Design
- [ ] Resize browser window
- [ ] Check mobile view (toggle device toolbar in DevTools)
- [ ] Verify calendar is readable on small screens
- [ ] Check that buttons/inputs are touchable on mobile

### 10. Multiple Bookings
- [ ] Submit first booking successfully
- [ ] Immediately submit second booking
- [ ] Verify both work independently
- [ ] Check that form resets between bookings

## API Testing via Browser DevTools

### Test API Endpoint Directly:
1. Open DevTools Console (F12)
2. Paste and run:
```javascript
fetch('/api/calendar/book', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    date: '2026-01-30',
    time: '15:00',
    name: 'Console Test',
    email: 'console@test.com'
  })
})
.then(r => r.json())
.then(data => console.log('Success:', data))
.catch(err => console.error('Error:', err));
```
3. Expected output: `Success: {status: "success", message: "...", date: "...", time: "..."}`

## Common Issues & Solutions

### Issue: Black/Blank Page
- **Check**: Browser console for errors
- **Solution**: Refresh page (Cmd+Shift+R / Ctrl+Shift+F5)
- **Cause**: Cached old files

### Issue: Month Name Not Showing
- **Check**: Inspect H1 element in HTML
- **Solution**: Verify `getCurrentMonthName()` function exists
- **Debug**: Check if days array is populated

### Issue: Booking Form Not Submitting
- **Check**: Network tab for API calls
- **Solution**: Verify backend is running on port 5713
- **Debug**: Check browser console for CORS errors

### Issue: Email Client Not Opening
- **Expected**: This is normal browser behavior
- **Note**: Some browsers block automatic mailto: links
- **Solution**: Check popup blocker settings

### Issue: Google Calendar Status Shows Error
- **Expected**: Calendar might not be public
- **Note**: This doesn't prevent bookings
- **Solution**: OAuth2 setup (see point 3)

## Visual Verification Checklist

### ✅ What You Should See:
1. **Header**: "Book a session"
2. **Month Display**: "January 2026" (or current month)
3. **Status Message**: Calendar status info
4. **Days Grid**: Multiple day cards in grid layout
5. **Available Dates**: Green/highlighted clickable dates
6. **Form Fields**: Name input, Email input
7. **Time Slots**: List of available times
8. **Submit Button**: "Request booking"

### ❌ What You Should NOT See:
1. White/black screen
2. "404 Not Found" errors
3. Red error messages (unless testing error cases)
4. Broken images/icons
5. Overlapping elements
6. Unreadable text

## Performance Checks
- [ ] Page loads in < 2 seconds
- [ ] Calendar renders immediately
- [ ] Date selection is instant
- [ ] Form submission response < 1 second
- [ ] No lag when clicking elements

## Accessibility Checks
- [ ] Tab through all interactive elements
- [ ] Press Enter on date/button (keyboard navigation)
- [ ] Verify contrast ratios (text should be readable)
- [ ] Check that focus indicators are visible

## Screenshots to Take
1. Homepage
2. Calendar page with month display
3. Selected date with time slots
4. Filled booking form
5. Success message/alert
6. Browser console showing successful API call

## Test Report Template

```
Date: ___________
Tester: ___________
Browser: ___________ (Chrome/Firefox/Safari)
OS: ___________ (Mac/Windows/Linux)

✅ Passed Tests: ___ / 40
❌ Failed Tests: ___ / 40
⚠️  Issues Found: _______________

Critical Issues: _______________
Minor Issues: _______________
Suggestions: _______________
```

## Next Steps After Testing
1. Document any bugs found
2. Take screenshots of issues
3. Note browser console errors
4. Report to development team (that's me! 😊)
5. Proceed to OAuth2 setup if all tests pass

---

**Ready to test?** Open http://localhost:5713 and go through this checklist!
