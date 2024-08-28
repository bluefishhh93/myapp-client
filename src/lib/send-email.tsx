// import { Resend } from "resend";

// import { env } from "@/env";
// import { ReactNode } from "react";

// const resend = new Resend(env.EMAIL_SERVER_PASSWORD);

// export async function sendEmail(
//     email: string,
//     subject: string,
//     body: ReactNode
// ){
//     const { error } = await resend.emails.send({
//         from: env.EMAIL_FROM,
//         to: email,
//         subject,
//         react: <>{body}</>,
//       });
    
//       if (error) {
//         throw error;
//       }
// }
import nodemailer from 'nodemailer';
import { env } from "@/env";

const transporter = nodemailer.createTransport({
    service: 'SMTP',
    host: env.NODE_EMAIL_SERVER_HOST,
    port: Number(env.NODE_EMAIL_SERVER_PORT),
    secure: env.NODE_EMAIL_SERVER_SECURE === 'true',
    auth: {
        user: env.NODE_EMAIL_SERVER_USER,
        pass: env.NODE_EMAIL_SERVER_PASSWORD,
    },
} as nodemailer.TransportOptions);

export async function sendEmail(
    email: string,
    subject: string,
    htmlBody: string
) {
    const mailOptions = {
        from: env.NODE_EMAIL_FROM,
        to: email,
        subject: subject,
        html: htmlBody,
    };

    try {
        await transporter.sendMail(mailOptions);
    } catch (error) {
        console.error('Error sending email:', error);
        throw error;
    }
}