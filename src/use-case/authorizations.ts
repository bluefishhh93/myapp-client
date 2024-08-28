import { AuthenticationError, NotFoundError } from "@/app/utils";
import { getBlogById } from "@/data-access/graphql/blogs";
import userService from "@/data-access/rest/users";
import { User } from "next-auth";

export function isBlogOwner(user: User, blog: Post) {
    return user.id === blog.author.id;      
}

export async function assertBlogOwner(
    user: User | undefined,
    blogId: string
) {
    const response = await getBlogById(blogId);

    if (!response.post) {
        throw new NotFoundError("Blog not found");
    }

    if (!user) {
        throw new AuthenticationError();
    }

    if (!isBlogOwner(user, response.post)) {
        throw new AuthenticationError();
    }

    return response.post;
}

// Add this to your environment variables or configuration file
const API_BASE_URL = process.env.NEXTAUTH_URL || 'http://localhost:3000';

export async function registerUserUseCase(email: string, password: string, role: 'USER' | 'ADMIN' = 'USER') {
    // register user
    const data = await userService.createAndVerify({ email, password, role });
    if(data.token) {
        const result = await fetch(`${API_BASE_URL}/api/send-email`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, token: data.token }),
          });

        if (!result.ok) {
            throw new Error(`Failed to send email: ${result.statusText}`);
        }

        return await result.json();
    }
}