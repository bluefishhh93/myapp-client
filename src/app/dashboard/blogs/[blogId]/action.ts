// "use server";
// import { authenticatedAction } from "@/lib/safe-action";
// import { updateBlogContentUseCase } from "@/use-case/blog";
// import { z } from "zod";
// import sanitizeHtml from "sanitize-html";
// import { revalidatePath } from "next/cache";
// import { sanitizeOptions } from "@/lib/tiptap";


// export const updateBlogContentAction = authenticatedAction
//     .createServerAction()
//     .input(
//         z.object({
//             blogId: z.string(),
//             content: z.string(),
//         })
//     )
//     .handler(async ({input, ctx}) => {
//         const sanitizedContent = sanitizeHtml(input.content, sanitizeOptions);
//         console.log(input.content ,'original content');
//         console.log(sanitizedContent, 'sanitized content');
//         await updateBlogContentUseCase(ctx.user, {
//             blogId: input.blogId,
//             content: sanitizedContent,
//         });

//         revalidatePath(`/dashboard/blogs/${input.blogId}`);
//     })
    