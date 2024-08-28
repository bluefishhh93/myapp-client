import { gql } from 'graphql-request';
import { client, privateClient } from '@/lib/graphqlClient';

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

//======================FUNCTION=====================
export async function getBlogById(id: string) {
  return await client.request<GetPostByIdResponse>(GET_BLOG_BY_ID_QUERY, { postId: id });

}

export async function updateBlog(token: string, id: string, data: UpdatePostInput) {
  return await privateClient(token).request(UPDATE_BLOG_MUTATION, { id, data });
}
export async function createDraft(token: string, data: CreatePostInput) {
  const response = await privateClient(token).request<CreatePostResponse>(CREATE_BLOG_MUTATION, { data });
  return response.createPost;
}

// export 