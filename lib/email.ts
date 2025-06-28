import sgMail from "@sendgrid/mail"

sgMail.setApiKey(process.env.SENDGRID_API_KEY!)

interface EmailTemplate {
  to: string
  subject: string
  html: string
  text?: string
}

export async function sendEmail({ to, subject, html, text }: EmailTemplate) {
  try {
    await sgMail.send({
      to,
      from: process.env.FROM_EMAIL!,
      subject,
      html,
      text,
    })
  } catch (error) {
    console.error("Error sending email:", error)
    throw error
  }
}

export async function sendWelcomeEmail(userEmail: string, userName: string) {
  const html = `
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
  `

  await sendEmail({
    to: userEmail,
    subject: "Welcome to Sleep Directory!",
    html,
    text: `Welcome to Sleep Directory! Start exploring at ${process.env.NEXT_PUBLIC_APP_URL}/products`,
  })
}

export async function sendNewReplyNotification(
  userEmail: string,
  userName: string,
  threadTitle: string,
  threadSlug: string,
  replyAuthor: string,
) {
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h1 style="color: #333;">New Reply in "${threadTitle}"</h1>
      <p>Hi ${userName},</p>
      <p>${replyAuthor} replied to a thread you're following:</p>
      <p style="background: #f5f5f5; padding: 16px; border-radius: 4px;">
        <strong>${threadTitle}</strong>
      </p>
      <p>
        <a href="${process.env.NEXT_PUBLIC_APP_URL}/forum/threads/${threadSlug}" 
           style="background: #007bff; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px;">
          View Thread
        </a>
      </p>
      <p>
        <a href="${process.env.NEXT_PUBLIC_APP_URL}/settings/notifications" 
           style="color: #666; font-size: 12px;">
          Manage notification preferences
        </a>
      </p>
    </div>
  `

  await sendEmail({
    to: userEmail,
    subject: `New reply in "${threadTitle}"`,
    html,
  })
}
