import useSWRInfinite from 'swr/infinite';
import { getPublishedPosts } from '@/data-access/graphql/blogs';
import { after } from 'lodash';

const PAGE_SIZE = 5;

export function useBlogs(searchTerm = '') {
    const getKey = (pageIndex: number, previousData: any) => {
        if (previousData && !previousData.publishedPosts.edges.length) return null;

        return {
            after: pageIndex > 0 ? previousData.publishedPosts.pageInfo.endCursor : undefined,
            first: PAGE_SIZE,
            query: searchTerm
        }
    };

    const { data, error, size, setSize } = useSWRInfinite(
        getKey,
        (key) => getPublishedPosts(key.after, undefined, key.first, undefined, key.query),
        { revalidateFirstPage: false }
    );

    const blogs = data ? data.flatMap(page => page.publishedPosts.edges.map(edge => edge.node)) : [];
    const isLoading = !data && !error;
    const isError = !!error;
    const isReachingEnd = data && data[data.length - 1]?.publishedPosts.edges.length < PAGE_SIZE;

    return { blogs, isLoading, isError, size, setSize, isReachingEnd };
}