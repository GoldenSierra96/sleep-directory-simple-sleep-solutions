// FREE Alternative to SendGrid - Resend (10,000 emails/month free)
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendWelcomeEmailResend(userEmail: string, userName: string) {
  try {
    await resend.emails.send({
      from: "Sleep Directory <noreply@yourdomain.com>",
      to: userEmail,
      subject: "Welcome to Sleep Directory!",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #333;">Welcome to Sleep Directory!</h1>
          <p>Hi ${userName},</p>
          <p>Welcome to Sleep Directory, your comprehensive resource for better sleep!</p>
          <p>Here's what you can do:</p>
          <ul>
            <li>Discover the best sleep products</li>
            <li>Read expert sleep advice on our blog</li>
            <li>Join our community forum</li>
            <li>Get personalized recommendations</li>
          </ul>
          <p>
            <a href="${process.env.NEXT_PUBLIC_APP_URL}/products" 
               style="background: #007bff; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px;">
              Start Exploring
            </a>
          </p>
          <p>Sweet dreams,<br>The Sleep Directory Team</p>
        </div>
      `,
    })
  } catch (error) {
    console.error("Error sending welcome email:", error)
  }
}
