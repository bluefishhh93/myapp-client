"use server";

import { authenticatedAction } from "@/lib/safe-action";
import { deleteBlogUseCase } from "@/use-case/blog";
import { redirect } from "next/navigation";
import { z } from "zod";

export const deleteBlogAction = authenticatedAction
    .createServerAction()
    .input(
        z.object({
            blogId: z.string(),
        })
    )
    .handler(async ({ input, ctx }) => {
        const blogId = input.blogId;
        await deleteBlogUseCase(ctx.user, {
            blogId,
        });
        redirect("/dashboard/posts");
    });
