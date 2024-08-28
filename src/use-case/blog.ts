// import { User } from "@/types";
import { User } from "next-auth";
import { assertBlogOwner } from "./authorizations";
import { updateBlog, createDraft } from "@/data-access/graphql/blogs";


export async function updateBlogContentUseCase(
  authenticatedUser: User,
  {
    blogId,
    content,
    title
  }: {
    blogId: string;
    content: string;
    title: string;
  }
) {
  const updatePayload: { content: string; title?: string } = { content };

  if (title) {
    updatePayload.title = title;
  }

  await assertBlogOwner(authenticatedUser, blogId);
  await updateBlog(authenticatedUser.accessToken, blogId, updatePayload);
}

export async function createDraftUseCase(
  authenticatedUser: User,
  {
    title,
    content,
  }: {
    title: string;
    content: string;
  }
) {
  const newDraft = await createDraft(authenticatedUser.accessToken, {
    title, content,
  });

  return newDraft;
}

export async function isAdminOrOwnerOfGroupUseCase(
  authenticatedUser: User | undefined,
  blogId: string
) {
  // return isAdminOrOwnerOfGroup(authenticatedUser, blogId);


}

export async function isBlogOwnerUseCase(
  authenticatedUser: User | undefined,
  blogId: string
): Promise<boolean> {
  if (!authenticatedUser) {
    return false;
  }

  try {
    await assertBlogOwner(authenticatedUser, blogId);
    return true;
  } catch (e) {
    return false;
  }
}

export async function getBlogsUserUseCase({ }: {
  authenticatedUser: User | undefined;
  isPublished: boolean;

}){
  return [
    // ...(await getBlogsUser({ isPublished: true })),
    // ...(await getBlogsUser({ isPublished: false })),
  ];
}