const nodemailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport');

// 1. Best Practice: Use environment variables for the email too
// Make sure to add SENDER_EMAIL='your-verified-sendgrid-email@example.com' to your .env file
const SENDER_EMAIL = process.env.SENDER_EMAIL;

if (process.env.SENDGRID_API_KEY === 'YOUR_SENDGRID_API_KEY' || !process.env.SENDGRID_API_KEY) {
  console.warn(
    'WARNING: SendGrid API Key is not configured. Email will not be sent. ' +
    'Please set the SENDGRID_API_KEY in your backend/.env file.'
  );
}

const transporter = nodemailer.createTransport(
  sendgridTransport({
    auth: {
      api_key: process.env.SENDGRID_API_KEY,
    },
  })
);

/**
 * FEATURE 1: Send OTP Verification Email
 */
const sendVerificationEmail = async (email, otp) => {
  try {
    const emailHtml = `
      <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
        <h2 style="color: #d4a373;">Welcome to Sahara!</h2>
        <p>Please use the following One-Time Password (OTP) to verify your account:</p>
        <div style="background-color: #f4f4f4; padding: 15px; text-align: center; border-radius: 5px; font-size: 24px; letter-spacing: 5px; font-weight: bold;">
          ${otp}
        </div>
        <p>This code will expire in 10 minutes.</p>
        <p>If you did not request this, please ignore this email.</p>
      </div>
    `;

    await transporter.sendMail({
      to: email,
      from: SENDER_EMAIL,
      subject: 'Verify Your Sahara Account - OTP',
      html: emailHtml,
    });
    console.log(`OTP email sent successfully to ${email}`);
  } catch (error) {
    console.error('Error sending OTP email:', error);
    throw new Error('Email sending failed');
  }
};

/**
 * FEATURE 2: Send Order Confirmation Email
 */
const sendOrderConfirmationEmail = async (order) => {
  try {
    // Calculate total if not provided in the order object
    const totalAmount = order.items.reduce((acc, item) => acc + (item.price * item.quantity), 0);

    const emailHtml = `
      <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: auto; border: 1px solid #ddd; padding: 20px;">
        <h1 style="color: #2a9d8f; text-align: center;">Order Successful!</h1>
        <p>Hi <strong>${order.name}</strong>,</p>
        <p>Thank you for shopping with Sahara. We have received your order.</p>
        
        <h3 style="border-bottom: 2px solid #eee; padding-bottom: 10px;">Order Summary</h3>
        <table style="width: 100%; border-collapse: collapse;">
          <thead>
            <tr style="background-color: #f8f9fa;">
              <th style="padding: 10px; text-align: left;">Product</th>
              <th style="padding: 10px; text-align: center;">Qty</th>
              <th style="padding: 10px; text-align: right;">Price</th>
            </tr>
          </thead>
          <tbody>
            ${order.items.map(item => `
              <tr>
                <td style="padding: 10px; border-bottom: 1px solid #eee;">
                  <div style="display: flex; align-items: center;">
                    <img src="${item.image}" alt="${item.title}" style="width: 50px; height: 50px; object-fit: cover; margin-right: 10px; border-radius: 4px;" />
                    <span>${item.title}</span>
                  </div>
                </td>
                <td style="padding: 10px; text-align: center; border-bottom: 1px solid #eee;">${item.quantity}</td>
                <td style="padding: 10px; text-align: right; border-bottom: 1px solid #eee;">₹${item.price.toLocaleString('en-IN')}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>

        <div style="text-align: right; margin-top: 20px;">
           <h3>Total: ₹${totalAmount.toLocaleString('en-IN')}</h3>
        </div>

        <div style="background-color: #f4f4f4; padding: 10px; text-align: center; margin-top: 20px; font-size: 12px; color: #666;">
           <p>Need help? Contact support at support@sahara.com</p>
           <p>&copy; ${new Date().getFullYear()} Sahara. All rights reserved.</p>
        </div>
      </div>
    `;

    await transporter.sendMail({
      to: order.email, // Ensure order object has the customer's email
      from: SENDER_EMAIL,
      subject: 'Order Confirmation - Sahara',
      html: emailHtml,
    });

    console.log(`Order confirmation sent to ${order.email}`);
  } catch (error) {
    console.error('Error sending order email:', error);
    // Don't throw error here if you don't want to fail the order process just because email failed
    // Or throw it if email is critical
  }
};

// 3. Export the functions so other files can use them
module.exports = {
  sendVerificationEmail,
  sendOrderConfirmationEmail,
};