// pages/blog/[id].tsx
import { NotFoundError } from "@/app/utils";
import { BlogPost } from "../BlogPost";
import { getBlogById, getHeartCount, getPostInteractions, getUserInteractions } from "@/data-access/graphql/blogs";
import { Suspense } from "react";
import BlogLoading from "./loading";
import { getCurrentUser } from "@/lib/session";
import { isBookmarked } from "@/data-access/rest/blog";
export const fetchCache = 'force-no-store';

export default async function BlogPage({ params }: { params: { blogId: string } }) {

    const { blogId } = params;

    const [user, { post }] = await Promise.all([getCurrentUser(), getBlogById(blogId)]);

    if (!post) {
        throw new NotFoundError("Blog not found");
    }

    const heart = await getHeartCount({blogId});
    // const {heart, likedBy} = await getPostInteractions({blogId});

    const { hearted, bookmarked } = user 
        ? await getUserInteractions(user.accessToken, blogId)
        : { hearted: false, bookmarked: false };

    return (
        <Suspense fallback={<BlogLoading />}>
            <BlogPost
                isBookmarked = {bookmarked}
                isHearted = {hearted}
                userId={user?.id}
                post={post}
                author={post.author}
                heartCount={heart}
            />
        </Suspense>
    );
}