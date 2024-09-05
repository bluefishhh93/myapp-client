"use server";
import { authenticatedAction } from "@/lib/safe-action";
import {  createDraftUseCase, toggleBookmarkBlogUseCase, toggleHeartBlogUseCase, unBookmarkBlogUseCase, updateBlogContentUseCase, updateBlogStatusUseCase, updateBlogTitleUseCase } from "@/use-case/blog";
import { z } from "zod";
import sanitizeHtml from "sanitize-html";
import { revalidatePath } from "next/cache";
import { sanitizeOptions } from "@/lib/tiptap";
import { status } from "nprogress";
import { rateLimitByKey } from "@/lib/limiter";
import { RateLimitError } from "@/lib/errors";

enum Status {
    ACTIVE = 'ACTIVE',
    INACTIVE = 'INACTIVE',
    PENDING = 'PENDING'
}
export const updateBlogContentAction = authenticatedAction
    .createServerAction()
    .input(
        z.object({
            blogId: z.string(),
            content: z.string(),
            title: z.string().optional(),
            published: z.boolean().optional(),
            status: z.nativeEnum(Status).optional(),
        })
    )
    .handler(async ({ input, ctx }) => {
        const sanitizedContent = sanitizeHtml(input.content, sanitizeOptions);
        await updateBlogContentUseCase(ctx.user, {
            blogId: input.blogId,
            content: input.content,
            title: input.title ?? "",
            status: input.status
        });
        revalidatePath(`/(blog)`);
    });

export const updateBlogTitleAction = authenticatedAction
    .createServerAction()
    .input(
        z.object({
            blogId: z.string(),
            title: z.string(),
        })
    )
    .handler(async ({ input, ctx }) => {
        await updateBlogTitleUseCase(ctx.user, {
            blogId: input.blogId,
            title: input.title,
        });

        revalidatePath(`/(blog)`);
    });

export const updateBlogStatusAction = authenticatedAction
    .createServerAction()
    .input(
        z.object({
            blogId: z.string(),
            status: z.nativeEnum(Status),
        })
    )
    .handler(async ({ input, ctx }) => {
        await updateBlogStatusUseCase(ctx.user, {
            blogId: input.blogId,
            status: input.status,
        });

        revalidatePath(`/edit/${input.blogId}`);
        revalidatePath(`/draft/${input.blogId}`);
    });

export const createDraftAction = authenticatedAction
    .createServerAction()
    .input(
        z.object({
            title: z.string(),
            content: z.string(),
        })
    )
    .handler(async ({ input, ctx }) => {
        const newDraft = await createDraftUseCase(ctx.user, {
            title: input.title,
            content: sanitizeHtml(input.content),
        });
        revalidatePath(`/dashboard/blogs/${newDraft.id}`);
        return { id: newDraft.id };
    });

    export const toggleBookmarkBlogAction = authenticatedAction
    .createServerAction()
    .input(
        z.object({
            blogId: z.string(),
        })
    )
    .handler(async ({ input, ctx }) => {
        const { user } = ctx;
        try {
            await rateLimitByKey({
                key: `${user.id}-toggle-bookmark`,
                limit: 5,
                window: 60000, // 1 minute
            });

            const result = await toggleBookmarkBlogUseCase(user, input.blogId);
            revalidatePath(`/`);
            return result;
        } catch (error) {
            if (error instanceof RateLimitError) {
                throw new Error('Rate limit exceeded. Please try again later.');
            }
            throw error;
        }
    });

// export const bookmarkBlogAction = authenticatedAction
//     .createServerAction()
//     .input(
//         z.object({
//             blogId: z.string(),
//         })
//     )
//     .handler(async ({ input, ctx }) => {
//         const { user } = ctx;
//         revalidatePath(`/`);
//         return await bookmarkBlogUseCase(user, input.blogId);
//     });

export const unBookmarkBlogAction = authenticatedAction
    .createServerAction()
    .input(
        z.object({
            blogId: z.string(),
        })
    )
    .handler(async ({ input, ctx }) => {
        const { user } = ctx;
        revalidatePath(`/`);
        return await unBookmarkBlogUseCase(user, input.blogId);
    });

    export const toggleHeartBlogAction = authenticatedAction
    .createServerAction()
    .input(
        z.object({
            blogId: z.string(),
        })
    )
    .handler(async ({ input, ctx }) => {
        const { user } = ctx;
        try {
            await rateLimitByKey({
                key: `${user.id}-toggle-heart`,
                limit: 10,
                window: 60000, // 1 minute
            });

            const result = await toggleHeartBlogUseCase(user, input.blogId);
            revalidatePath(`/`);
            revalidatePath(`/blog/${input.blogId}`);
            return result;
        } catch (error) {
            if (error instanceof RateLimitError) {
                throw new Error('Rate limit exceeded. Please try again later.');
            }
            throw error;
        }
    });