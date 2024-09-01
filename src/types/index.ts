//* auth
type UserId = number;

type AuthContextType = {
    user: User | null;
    setUser: (user: User | null) => void;
};


//* user
type UpdateUserInput = {
    name?: string;
    email?: string;
    image?: string;
    firstname?: string;
    lastname?: string;
};

type UpdateUserResponse = {
    updateUser: {
        id: string;
        firstname: string;
        lastname: string;
        email: string;
        image: string;
    };
};

type User = {
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
};

//* blog
type UpdatePostInput = {
    title?: string;
    content?: string;
    published?: boolean;
    status?: Status;
};

type CreatePostInput = {
    title: string;
    content: string;
};

type Post = {
    id: string;
    title: string;
    content: string;
    published: boolean;
    author: User;
    createdAt: Date;
    updatedAt: Date;
    status: Status;
};

type GetPostByIdResponse = {
    post: Post;
};

type GetUserPostsResponse = {
    userPosts: Post[];
};

type UpdatePostResponse = {
    updatePost: Post;
};

type CreatePostResponse = {
    createPost: Post;
};

type Role = 'ADMIN' | 'USER';

enum Status{
    ACTIVE = 'ACTIVE',
    INACTIVE = 'INACTIVE',
    PENDING = 'PENDING',
}

type VerifyEmailToken = {
    id: string;
    token: string;
    userId: string;
    user: User;
    createdAt: Date;
    expiresAt: Date;
};