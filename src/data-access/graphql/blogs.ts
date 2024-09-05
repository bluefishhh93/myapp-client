import { gql } from 'graphql-request';
import { client, privateClient } from '@/lib/graphqlClient';
import { GetPublishedPostsResponse, PostOrder } from '../interface';
import { NotFoundError } from '@/app/utils';
import { notFound } from 'next/navigation';

export const GET_BLOG_BY_ID_QUERY = gql`
query GetPostById($postId: String!) {
  post(id: $postId) {
    id
    title
    content
    published
    createdAt
    updatedAt
    status
    heartCount
    author {
      id
      email
      firstname
      lastname
      image
    }
  }
}
`;

export const UPDATE_BLOG_MUTATION = gql`
mutation UpdatePost($id: String!, $data: UpdatePostInput!) {
  updatePost(id: {
    postId: $id
  }, data: $data) {
    id
    title
    content
    published
    updatedAt
    author {
      id
    }
  }
}
`;

export const CREATE_BLOG_MUTATION = gql`
mutation CreatePost($data: CreatePostInput!) {
  createPost(data: $data) {
    id
    title
    content
    published
    author {
      id
      email
      firstname
      lastname
      role
    }
  }
}
`;
export const GET_USER_BLOGS_QUERY = gql`
  query GetUserBlogs($input: UserPostsInput!) {
    userPosts(input: $input) {
      id
      title
      content
      published
      createdAt
      updatedAt
      status
    }
  }
`;

const GET_PUBLISHED_POSTS_QUERY = `
  query GetPublishedPosts(
    $after: String
    $before: String
    $first: Int
    $last: Int
    $query: String
    $orderBy: PostOrder
  ) {
    publishedPosts(
      after: $after
      before: $before
      first: $first
      last: $last
      query: $query
      orderBy: $orderBy
    ) {
      edges {
        node {
          id
          title
          content
          createdAt
          author {
            id
            email
            firstname
            lastname
            image
          }
        }
        cursor
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
      totalCount
    }
  }
`;

export const GET_BOOKMARKED_POST_IDS_QUERY = gql`
  query GetBookmarkedPostIds {
      bookmarkedPosts {
        id
      }
  }
`;

export const GET_BOOKMARKED_POSTS_QUERY = gql`
    query GetBookmarkedPosts{
        bookmarkedPosts {
            id
            title
            content
            createdAt
            author {
                id
                email
                firstname
                lastname
                image
            }
        }
    }
`;

export const TOGGLE_HEART_BLOG_MUTATION = gql`
  mutation InteractWithPost($postId: String!, $type: InteractionType!) {
    interactWithPost(postId: $postId, type: $type) {
      id
      type
      user {
        id
      }
      post {
        id
      }
    }
  }
`;

export const GET_HEART_COUNT_QUERY = gql`
  query GetPostInteractions($postId: String!) {
    postInteractions(postId: $postId) {
      heart
    }
  }
`;

export const GET_USER_INTERACTION_QUERY = gql`
  query GetUserInteraction($postId: String!) {
    getUserInteractions(postId: $postId) {
      bookmarked
      hearted
    }
  }
`;

export const GET_POST_INTERACTIONS_QUERY = gql`
  query GetPostInteractions($postId: String!) {
    postInteractions(postId: $postId) {
      heart
      likedBy {
        id
        firstname
        lastname
        image
        email
      }
    }
  }
`;
//======================FUNCTION=====================
export async function getBlogById(id: string) {
  try {
    const response = await client.request<GetPostByIdResponse>(GET_BLOG_BY_ID_QUERY, { postId: id });
    if (!response.post) {
      notFound();
    }
    return response;
  } catch (error) {
    if (error instanceof Error && error.message.includes("not found")) {
      notFound();
    }
    throw error; // Re-throw other errors
  }
}

export async function updateBlog(token: string, id: string, data: UpdatePostInput) {
  return await privateClient(token).request(UPDATE_BLOG_MUTATION, { id, data });
}

export async function createDraft(token: string, data: CreatePostInput) {
  const response = await privateClient(token).request<CreatePostResponse>(CREATE_BLOG_MUTATION, { data });
  return response.createPost;
}

export async function getUserBlogs({userId , published, status} : {
  userId: string;
  published?: boolean;
  status?: Status;
}) {
  console.log(userId);
  return await client.request<GetUserPostsResponse>(GET_USER_BLOGS_QUERY, { input: { userId, published, status } });
}

export async function getPublishedPosts(
  after?: string,
  before?: string,
  first?: number,
  last?: number,
  query?: string,
  orderBy?: PostOrder
) {
  return await client.request<GetPublishedPostsResponse>(GET_PUBLISHED_POSTS_QUERY, {
    after,
    before,
    first,
    last,
    query,
    orderBy,
  });
}

export async function getBookmarkedPostIds(token: string) {
  const response = await privateClient(token).request<GetBookmarkedPostIdsResponse>(GET_BOOKMARKED_POST_IDS_QUERY);
  console.log(response, 'check');
  return response;
}

export async function getBookmarkedPosts(token: string) {
  const response = await privateClient(token).request<GetBookmarkedPostsResponse>(GET_BOOKMARKED_POSTS_QUERY);
  return response.bookmarkedPosts;
}



export async function toggleHeartBlog(token: string, postId: string) {
  const response = await privateClient(token).request<{ interactWithPost: InteractionResponse }>(
    TOGGLE_HEART_BLOG_MUTATION,
    { postId, type: "HEART" }
  );
  return response.interactWithPost;
}

export async function getHeartCount({ blogId }: { blogId: string }) {
  const response = await client.request<{ postInteractions: { heart: number } }>(GET_HEART_COUNT_QUERY, { postId: blogId });
  return response.postInteractions.heart;
}

export async function getUserInteractions(token: string, postId: string): Promise<UserInteraction> {
  const response = await privateClient(token).request<{ getUserInteractions: UserInteraction }>(
    GET_USER_INTERACTION_QUERY,
    { postId }
  );
  return response.getUserInteractions;
}

export async function getPostInteractions({blogId} : {blogId: string}){
  const response = await client.request<{ postInteractions: PostInteractionResponse }>(GET_POST_INTERACTIONS_QUERY, { postId: blogId });
  return response.postInteractions;
}