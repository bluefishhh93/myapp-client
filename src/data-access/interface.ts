export enum PostOrderField {
    id = 'id',
    createdAt = 'createdAt',
    updatedAt = 'updatedAt',
    published = 'published',
    title = 'title',
}

export interface PostOrder {
    field: PostOrderField;
    direction: 'asc' | 'desc';
}

export interface GetPublishedPostsResponse {
    publishedPosts: {
      edges: {
        node: {
          id: string;
          title: string;
          content: string;
          createdAt: string;
          author: {
            id: string;
            email: string;
            firstname: string;
            lastname: string;
            image: string;
          };
        };
        cursor: string;
      }[];
      pageInfo: {
        hasNextPage: boolean;
        hasPreviousPage: boolean;
        startCursor: string;
        endCursor: string;
      };
      totalCount: number;
    };
  }

  export interface getLastDraftIdResponse {
    
  }