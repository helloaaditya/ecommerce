# Email Setup Guide for Password Reset

This guide will help you configure email functionality for the password reset feature.

## Option 1: Gmail Setup (Recommended for Development)

### Step 1: Enable 2-Factor Authentication
1. Go to your Google Account settings
2. Navigate to Security
3. Enable 2-Step Verification

### Step 2: Generate App Password
1. Go to Google Account settings
2. Navigate to Security
3. Under "2-Step Verification", click "App passwords"
4. Select "Mail" and "Other (Custom name)"
5. Enter "ShopHub" as the name
6. Copy the generated 16-character password

### Step 3: Configure Environment Variables
Create or update your `.env` file in the backend directory:

```env
# Email Configuration
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-16-character-app-password
```

### Step 4: Test the Setup
1. Start your backend server: `npm run dev`
2. Go to the forgot password page
3. Enter your email address
4. Check if you receive the reset email

## Option 2: Development Mode (No Email Setup)

If you don't want to set up email right now, the system will work in development mode:

1. **No email configuration needed**
2. When you request a password reset, the reset link will be displayed directly on the page
3. You can copy and paste the link to test the password reset functionality

## Option 3: Other Email Providers

### Outlook/Hotmail
```env
EMAIL_USER=your-email@outlook.com
EMAIL_PASS=your-app-password
```

### Yahoo Mail
```env
EMAIL_USER=your-email@yahoo.com
EMAIL_PASS=your-app-password
```

## Troubleshooting

### Common Issues:

1. **"Invalid credentials" error**
   - Make sure you're using an App Password, not your regular password
   - Ensure 2-Factor Authentication is enabled

2. **"Email not sent" error**
   - Check if EMAIL_USER and EMAIL_PASS are set in your .env file
   - Verify the email credentials are correct
   - Check the console logs for detailed error messages

3. **"Connection timeout" error**
   - Check your internet connection
   - Some networks may block SMTP connections

### Testing Without Email:

If you can't set up email right now, you can still test the password reset flow:

1. Request a password reset
2. Copy the reset link that appears on the page
3. Paste it in your browser
4. Set a new password
5. Try logging in with the new password

## Production Setup

For production, consider using:

- **SendGrid**: Professional email service
- **Mailgun**: Reliable email delivery
- **AWS SES**: Amazon's email service
- **Resend**: Modern email API

Example with SendGrid:
```env
EMAIL_USER=apikey
EMAIL_PASS=your-sendgrid-api-key
```

## Security Notes

- Never commit your `.env` file to version control
- Use App Passwords instead of regular passwords
- Regularly rotate your email credentials
- Consider using environment-specific email services for production

## Support

If you're still having issues:
- Check the console logs for error messages
- Verify your email provider's SMTP settings
- Contact support: support@shophub.com 