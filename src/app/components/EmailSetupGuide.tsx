/**
 * 📧 EmailJS Setup Guide for AYL Travel OTP System
 * 
 * Follow these steps to enable real email sending:
 * 
 * ═══════════════════════════════════════════════════════════════════
 * 
 * STEP 1: CREATE EMAILJS ACCOUNT
 * ═══════════════════════════════════════════════════════════════════
 * 
 * 1. Go to https://www.emailjs.com/
 * 2. Click "Sign Up" (Free tier: 200 emails/month)
 * 3. Verify your email address
 * 
 * ═══════════════════════════════════════════════════════════════════
 * 
 * STEP 2: CONNECT EMAIL SERVICE
 * ═══════════════════════════════════════════════════════════════════
 * 
 * 1. Login to EmailJS Dashboard
 * 2. Click "Add New Service"
 * 3. Choose your email provider:
 *    - Gmail (recommended)
 *    - Outlook
 *    - Yahoo
 *    - Custom SMTP
 * 
 * 4. For Gmail:
 *    a. Click "Connect Account"
 *    b. Sign in with your Gmail
 *    c. Grant permissions
 *    d. Copy the SERVICE ID (e.g., "service_abc123")
 * 
 * ═══════════════════════════════════════════════════════════════════
 * 
 * STEP 3: CREATE EMAIL TEMPLATE
 * ═══════════════════════════════════════════════════════════════════
 * 
 * 1. Go to "Email Templates" tab
 * 2. Click "Create New Template"
 * 3. Use this template content:
 * 
 *    Subject:
 *    ────────
 *    Your AYL Travel Verification Code
 * 
 *    Content:
 *    ────────
 *    Hello {{to_name}},
 * 
 *    Thank you for signing up for AYL Travel!
 * 
 *    Your email verification code is:
 * 
 *    {{otp_code}}
 * 
 *    This code will expire in 10 minutes.
 * 
 *    If you didn't request this code, please ignore this email.
 * 
 *    Best regards,
 *    The AYL Travel Team
 *    🇲🇳 Explore the beauty of Mongolia
 * 
 *    ────────────────────────────────
 *    © 2026 AYL Travel. All rights reserved.
 * 
 * 4. Save template and copy TEMPLATE ID (e.g., "template_xyz789")
 * 
 * ═══════════════════════════════════════════════════════════════════
 * 
 * STEP 4: GET PUBLIC KEY
 * ═══════════════════════════════════════════════════════════════════
 * 
 * 1. Go to "Account" → "General"
 * 2. Find "Public Key" section
 * 3. Copy your PUBLIC KEY (e.g., "user_abc123xyz")
 * 
 * ═══════════════════════════════════════════════════════════════════
 * 
 * STEP 5: ADD EMAILJS SCRIPT
 * ═══════════════════════════════════════════════════════════════════
 * 
 * Add this script tag to your HTML <head> or before </body>:
 * 
 * <script 
 *   type="text/javascript" 
 *   src="https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js">
 * </script>
 * 
 * ═══════════════════════════════════════════════════════════════════
 * 
 * STEP 6: UPDATE CONFIGURATION
 * ═══════════════════════════════════════════════════════════════════
 * 
 * Open /components/AuthPage.tsx and replace these values (around line 108):
 * 
 * const EMAILJS_SERVICE_ID = 'YOUR_SERVICE_ID';      // From Step 2
 * const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID';    // From Step 3
 * const EMAILJS_PUBLIC_KEY = 'YOUR_PUBLIC_KEY';      // From Step 4
 * 
 * Example:
 * ────────
 * const EMAILJS_SERVICE_ID = 'service_abc123';
 * const EMAILJS_TEMPLATE_ID = 'template_xyz789';
 * const EMAILJS_PUBLIC_KEY = 'user_abc123xyz';
 * 
 * ═══════════════════════════════════════════════════════════════════
 * 
 * STEP 7: TEST YOUR SETUP
 * ═══════════════════════════════════════════════════════════════════
 * 
 * 1. Go to your AYL website
 * 2. Click "Sign Up"
 * 3. Fill in the form with YOUR REAL EMAIL
 * 4. Click "Create Account"
 * 5. Check your email inbox
 * 6. Enter the 4-digit OTP code
 * 7. Success! 🎉
 * 
 * ═══════════════════════════════════════════════════════════════════
 * 
 * TROUBLESHOOTING
 * ═══════════════════════════════════════════════════════════════════
 * 
 * ❌ Email not received?
 * ───────────────────
 * 1. Check spam/junk folder
 * 2. Verify email address is correct
 * 3. Check EmailJS dashboard for sent emails
 * 4. Verify template variables: {{to_name}}, {{otp_code}}, {{to_email}}
 * 5. Check browser console for errors
 * 
 * ❌ "EmailJS library not loaded" error?
 * ─────────────────────────────────────
 * Make sure you added the script tag (Step 5)
 * 
 * ❌ "Failed to send email" error?
 * ────────────────────────────────
 * 1. Check your EmailJS keys are correct
 * 2. Verify email service is connected
 * 3. Check you haven't exceeded free tier limit (200/month)
 * 4. Try reconnecting your Gmail account
 * 
 * ═══════════════════════════════════════════════════════════════════
 * 
 * SECURITY NOTES
 * ═══════════════════════════════════════════════════════════════════
 * 
 * ✅ EmailJS Public Key is safe to expose (client-side)
 * ✅ OTP codes are random 4-digit numbers
 * ✅ Emails are sent through EmailJS servers
 * ⚠️  Free tier: 200 emails/month
 * ⚠️  For production: upgrade to paid plan or use backend API
 * 
 * ═══════════════════════════════════════════════════════════════════
 * 
 * ALTERNATIVE: Backend API (Production)
 * ═══════════════════════════════════════════════════════════════════
 * 
 * For production apps with high volume, consider:
 * 
 * 1. SendGrid API (99,000 emails/month free)
 * 2. AWS SES (62,000 emails/month free)
 * 3. Mailgun (5,000 emails/month free)
 * 4. Resend (3,000 emails/month free)
 * 
 * These require backend servers (Node.js, Python, etc.)
 * 
 * ═══════════════════════════════════════════════════════════════════
 * 
 * CURRENT STATUS: DEVELOPMENT MODE
 * ═══════════════════════════════════════════════════════════════════
 * 
 * - OTP codes are shown in browser console
 * - No real emails are sent yet
 * - Configuration needed (see steps above)
 * 
 * ═══════════════════════════════════════════════════════════════════
 * 
 * Need help? 
 * - EmailJS Docs: https://www.emailjs.com/docs/
 * - EmailJS Support: https://www.emailjs.com/support/
 * 
 * ═══════════════════════════════════════════════════════════════════
 */

export const EmailSetupGuide = () => {
  return (
    <div className="max-w-4xl mx-auto p-8 bg-gray-50 rounded-2xl">
      <div className="bg-white p-8 rounded-xl shadow-lg">
        <h1 className="text-3xl mb-4 text-gray-900">
          📧 EmailJS Setup Guide
        </h1>
        <p className="text-gray-600 mb-6">
          Follow the instructions in <code className="bg-gray-100 px-2 py-1 rounded">/components/EmailSetupGuide.tsx</code>
        </p>
        
        <div className="space-y-4">
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h3 className="font-semibold text-blue-900 mb-2">🔑 Quick Setup</h3>
            <ol className="list-decimal list-inside space-y-2 text-blue-800 text-sm">
              <li>Create account at <a href="https://www.emailjs.com/" target="_blank" rel="noopener noreferrer" className="underline">emailjs.com</a></li>
              <li>Connect your Gmail/Outlook</li>
              <li>Create email template</li>
              <li>Copy Service ID, Template ID, Public Key</li>
              <li>Update AuthPage.tsx with your keys</li>
              <li>Test with your email!</li>
            </ol>
          </div>

          <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <h3 className="font-semibold text-yellow-900 mb-2">⚠️ Important</h3>
            <p className="text-yellow-800 text-sm">
              You must add the EmailJS script to your HTML file:
            </p>
            <pre className="mt-2 p-3 bg-yellow-100 rounded text-xs overflow-x-auto">
{`<script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js"></script>`}
            </pre>
          </div>

          <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
            <h3 className="font-semibold text-green-900 mb-2">✅ Free Tier</h3>
            <p className="text-green-800 text-sm">
              EmailJS offers 200 emails per month for free - perfect for testing!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
