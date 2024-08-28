// pages/blog/[id].tsx
import { NotFoundError } from "@/app/utils";
import { BlogPost } from "../BlogPost";
import { getBlogById } from "@/data-access/graphql/blogs";
export const fetchCache = 'force-no-store';

export default async function BlogPage({ params }: { params: { blogId: string } }) {
    const { blogId } = params;
    const { post } = await getBlogById(blogId);

    if (!post) {
        throw new NotFoundError("Blog not found");
    }

    
    return (
        <BlogPost
            post={post}
            author={post.author}
        />
    );
}