import { getBookmarkedPosts, getHeartCount, getUserInteractions } from "@/data-access/graphql/blogs";
import { getCurrentUser } from "@/lib/session";
import { Suspense } from "react";
import Loading from "../dashboard/loading";
import { User } from "next-auth";
import { redirect } from "next/navigation";
import { BlogCard } from "@/components/BlogCard";
import { calculateReadingTime } from "../utils";

const BookmarksTitle = () => {
    return (
        <div className="w-full relative bg-white dark:bg-slate-950 flex flex-col gap-1 items-start rounded-2xl border border-slate-200 dark:border-slate-800 p-6 overflow-hidden">
            <div className="font-heading text-2xl text-slate-700 dark:text-slate-200 font-semibold">Bookmarks</div>
            <div className="text-base text-slate-500 dark:text-slate-400 w-4/5 sm:w-auto">All articles you have bookmarked on Hivedev</div>
            <div className="flex items-center justify-center text-indigo-500 absolute top-1/2 bottom-1/2 right-0">
                {/* SVG 1: Light mode, small screens */}
                <svg width="381" height="120" viewBox="0 0 381 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="hidden sm:block dark:hidden">
                    <mask id="mask0_48_18" maskUnits="userSpaceOnUse" x="0" y="-219" width="558" height="557" style={{ maskType: 'alpha' }}>
                        <rect x="0.943115" y="1.10583" width="402.136" height="402.136" rx="10.0534" transform="rotate(-33.1785 0.943115 1.10583)" fill="url(#paint0_radial_48_18)"></rect>
                    </mask>
                    <g mask="url(#mask0_48_18)">
                        <rect x="223.105" y="60.025" width="79.4272" height="79.4272" rx="23.5" transform="rotate(-45.6785 223.105 60.025)" stroke="#C7D2FE"></rect>
                        <rect x="185.195" y="60.4732" width="133.045" height="133.045" rx="23.5" transform="rotate(-45.6785 185.195 60.4732)" stroke="#C7D2FE"></rect>
                        <rect x="147.284" y="60.9224" width="186.663" height="186.663" rx="23.5" transform="rotate(-45.6785 147.284 60.9224)" stroke="#C7D2FE"></rect>
                        <rect x="109.373" y="61.3715" width="240.281" height="240.281" rx="23.5" transform="rotate(-45.6785 109.373 61.3715)" stroke="#C7D2FE"></rect>
                        <rect x="71.4607" y="61.8207" width="293.9" height="293.9" rx="23.5" transform="rotate(-45.6785 71.4607 61.8207)" stroke="#C7D2FE"></rect>
                        <rect x="33.5496" y="62.2698" width="347.518" height="347.518" rx="23.5" transform="rotate(-45.6785 33.5496 62.2698)" stroke="#C7D2FE"></rect>
                        <rect x="-4.36057" y="62.7181" width="401.136" height="401.136" rx="23.5" transform="rotate(-45.6785 -4.36057 62.7181)" stroke="#C7D2FE"></rect>
                    </g>
                    <path fillRule="evenodd" clipRule="evenodd" d="M272.75 53C272.75 50.9289 274.429 49.25 276.5 49.25H283.5C285.571 49.25 287.25 50.9289 287.25 53V68C287.25 68.2717 287.103 68.5222 286.866 68.6547C286.629 68.7873 286.338 68.7811 286.107 68.6387L280.131 64.9613C280.051 64.9118 279.949 64.9118 279.869 64.9613L273.893 68.6387C273.662 68.7811 273.371 68.7873 273.134 68.6547C272.897 68.5222 272.75 68.2717 272.75 68V53ZM283.53 56.0303C283.823 55.7374 283.823 55.2626 283.53 54.9697C283.237 54.6768 282.763 54.6768 282.47 54.9697L279 58.4393L277.53 56.9697C277.237 56.6768 276.763 56.6768 276.47 56.9697C276.177 57.2626 276.177 57.7374 276.47 58.0303L278.47 60.0303C278.763 60.3232 279.237 60.3232 279.53 60.0303L283.53 56.0303Z" fill="#818CF8"></path>
                    <defs>
                        <radialGradient id="paint0_radial_48_18" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(202.011 202.174) rotate(90) scale(201.068 201.068)">
                            <stop></stop>
                            <stop offset="1" stopOpacity="0"></stop>
                        </radialGradient>
                    </defs>
                </svg>

                {/* SVG 2: Light mode, larger screens */}
                <svg width="207" height="132" viewBox="0 0 207 132" fill="none" xmlns="http://www.w3.org/2000/svg" className="block sm:hidden dark:hidden">
                    {/* ... (keep the content the same) ... */}
                </svg>

                {/* SVG 3: Dark mode, larger screens */}
                <svg width="381" height="120" viewBox="0 0 381 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="hidden sm:dark:block">
                    <mask id="mask0_52_4664" maskUnits="userSpaceOnUse" x="0" y="-219" width="558" height="557" style={{ maskType: 'alpha' }}>
                        <rect x="0.943" y="1.106" width="402.136" height="402.136" rx="10.053" transform="rotate(-33.1785 0.943 1.106)" fill="url(#paint0_radial_52_4664)"></rect>
                    </mask>
                    <g mask="url(#mask0_52_4664)">
                        <rect x="223.105" y="60.025" width="79.427" height="79.427" rx="23.5" transform="rotate(-45.6785 223.105 60.025)" stroke="#334155" strokeOpacity="0.8"></rect>
                        <rect x="185.195" y="60.473" width="133.045" height="133.045" rx="23.5" transform="rotate(-45.6785 185.195 60.473)" stroke="#334155" strokeOpacity="0.8"></rect>
                        <rect x="147.284" y="60.922" width="186.663" height="186.663" rx="23.5" transform="rotate(-45.6785 147.284 60.922)" stroke="#334155" strokeOpacity="0.8"></rect>
                        <rect x="109.373" y="61.372" width="240.281" height="240.281" rx="23.5" transform="rotate(-45.6785 109.373 61.372)" stroke="#334155" strokeOpacity="0.8"></rect>
                        <rect x="71.461" y="61.821" width="293.9" height="293.9" rx="23.5" transform="rotate(-45.6785 71.461 61.821)" stroke="#334155" strokeOpacity="0.8"></rect>
                        <rect x="33.55" y="62.270" width="347.518" height="347.518" rx="23.5" transform="rotate(-45.6785 33.55 62.270)" stroke="#334155" strokeOpacity="0.8"></rect>
                        <rect x="-4.361" y="62.718" width="401.136" height="401.136" rx="23.5" transform="rotate(-45.6785 -4.361 62.718)" stroke="#334155" strokeOpacity="0.8"></rect>
                    </g>
                    <path fillRule="evenodd" clipRule="evenodd" d="M272.75 53C272.75 50.9289 274.429 49.25 276.5 49.25H283.5C285.571 49.25 287.25 50.9289 287.25 53V68C287.25 68.2717 287.103 68.5222 286.866 68.6547C286.629 68.7873 286.338 68.7811 286.107 68.6387L280.131 64.9613C280.051 64.9118 279.949 64.9118 279.869 64.9613L273.893 68.6387C273.662 68.7811 273.371 68.7873 273.134 68.6547C272.897 68.5222 272.75 68.2717 272.75 68V53ZM283.53 56.0303C283.823 55.7374 283.823 55.2626 283.53 54.9697C283.237 54.6768 282.763 54.6768 282.47 54.9697L279 58.4393L277.53 56.9697C277.237 56.6768 276.763 56.6768 276.47 56.9697C276.177 57.2626 276.177 57.7374 276.47 58.0303L278.47 60.0303C278.763 60.3232 279.237 60.3232 279.53 60.0303L283.53 56.0303Z" fill="#4338CA"></path>
                    <defs>
                        <radialGradient id="paint0_radial_52_4664" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(202.011 202.174) rotate(90) scale(201.068 201.068)">
                            <stop></stop>
                            <stop offset="1" stopOpacity="0"></stop>
                        </radialGradient>
                    </defs>
                </svg>

                {/* SVG 4: Dark mode, small screens */}
                <svg width="207" height="132" viewBox="0 0 207 132" fill="none" xmlns="http://www.w3.org/2000/svg" className="hidden dark:block dark:sm:hidden">
                    {/* ... (keep the content the same, but update attributes as done for SVG 3) ... */}
                </svg>
            </div>
        </div>
    );
}

export default async function BookmarksPage() {
    const user = await getCurrentUser();
    let bookmarkedPosts = [];

    if (!user) {
        redirect('/sign-in');
    }

    if (user) {
        bookmarkedPosts = await getBookmarkedPosts(user.accessToken);
    }
    return (
        <main className="flex min-h-screen flex-col items-center p-4">
            <div className="w-full max-w-3xl">
                <BookmarksTitle />
                <Suspense fallback={<Loading />}>
                    <BookmarkedPosts user={user} />
                </Suspense>
            </div>
        </main>
    );

    async function BookmarkedPosts({ user }: { user: User }) {
        let bookmarkedPosts : Post[] = [];
    
        if (user) {
            try {
                bookmarkedPosts = await getBookmarkedPosts(user.accessToken);
            } catch (error) {
                console.error("Error fetching bookmarked posts:", error);
                return <div>Error loading bookmarked posts. Please try again later.</div>;
            }
        }

        const heartCount = async (blogId: string) => {
            const heartCount = await getHeartCount({blogId});
            return heartCount;
        }   

       
  
    
        if (bookmarkedPosts.length === 0) {
            return (
                <div className="mt-8 w-full flex flex-col items-center justify-center text-center p-8 bg-white dark:bg-slate-900 rounded-lg shadow">
                    <svg className="w-16 h-16 text-gray-400 dark:text-gray-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                    </svg>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">No bookmarks yet</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">Start exploring and bookmark articles you would like to read later!</p>
                    <a href="/" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        Explore Articles
                    </a>
                </div>
            );
        }
    
        return (
            <div className="mt-8 w-full grid grid-cols-1 gap-6">
                {bookmarkedPosts.map((post) => (
                    <BlogCard
                        key={post.id}
                        title={post.title}
                        coverImage="/default-cover.jpg"
                        content={post.content}
                        author={{
                            name: `${post.author.firstname} ${post.author.lastname}`,
                            avatar: post.author.image || '/default-avatar.jpg',
                        }}
                        publishedAt={new Date(post.createdAt)}
                        readTime={calculateReadingTime(post.content)}
                        slug={post.id}
                        isBookmarked={true}
                        isSignedIn={true}
                        heartCount={0}
                        isHearted={false}
                    />
                ))}
            </div>
        );
    }

}