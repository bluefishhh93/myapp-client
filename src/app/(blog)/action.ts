"use server";
import { authenticatedAction } from "@/lib/safe-action";
import { createDraftUseCase, updateBlogContentUseCase } from "@/use-case/blog";
import { z } from "zod";
import sanitizeHtml from "sanitize-html";
import { revalidatePath } from "next/cache";
import { sanitizeOptions } from "@/lib/tiptap";


export const updateBlogContentAction = authenticatedAction
    .createServerAction()
    .input(
        z.object({
            blogId: z.string(),
            content: z.string(),
            title: z.string().optional(),
        })
    )
    .handler(async ({input, ctx}) => {
        const sanitizedContent = sanitizeHtml(input.content, sanitizeOptions);
        await updateBlogContentUseCase(ctx.user, {
            blogId: input.blogId,
            content: input.content,
            title: input.title ?? ""
        });

        revalidatePath(`/dashboard/blogs/${input.blogId}`);
    });

export const createDraftAction = authenticatedAction
    .createServerAction()
    .input(
        z.object({
            title: z.string(),
            content: z.string(),
        })
    )
    .handler(async ({input, ctx}) => {
        const newDraft = await createDraftUseCase(ctx.user, {
            title: input.title,
            content: sanitizeHtml(input.content),
        });
        return {id: newDraft.id};
    });

    