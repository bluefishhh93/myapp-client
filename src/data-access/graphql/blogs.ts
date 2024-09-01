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