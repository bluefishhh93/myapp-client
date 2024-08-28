//* This is for user
interface UpdateUserInput {
    name?: string;
    email?: string;
    image?: string;
    firstname?: string;
    lastname?: string;
}

interface UpdateUserResponse {
    updateUser: {
        id: string;
        firstname: string;
        lastname: string;
        email: string;
        image: string;
    };
}
interface User {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  email: string;
  password: string;
  firstname?: string;
  lastname?: string;
  posts: Post[];
  role: Role;
  verifyEmailTokens: VerifyEmailToken[];
  emailVerified?: Date;
  image?: string;
}

//* This is for blog
interface UpdatePostInput {
    title?: string;
    content?: string;
    published?: boolean;
}

interface CreatePostInput {
    title: string;
    content: string;
}

  
  interface Post {
    id: string;
    title: string;
    content: string;
    published: boolean;
    author: User;
    createdAt: Date;
    updatedAt: Date;
    status : Status;
  }
  
  interface GetPostByIdResponse {
    post: Post;
  }

  interface UpdatePostResponse {
    updatePost: Post;
  }

  interface CreatePostResponse {
    createPost: Post;
  }
  
  enum Role {
    ADMIN,
    USER,
  }

  enum Status {
    ACTIVE,
    INACTIVE,
    PENDING,
  }
  
  interface VerifyEmailToken {
    id: string;
    token: string;
    userId: string;
    user: User;
    createdAt: Date;
    expiresAt: Date;
  }