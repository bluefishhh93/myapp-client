'use client';

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BlogCard } from './BlogCard';
import { useBlogPosts } from '@/hooks/useBlogPosts';

export function BlogTabs() {
    const [activeTab, setActiveTab] = useState('personalized');
    const { data: personalizedData, loading: personalizedLoading } = useBlogPosts('personalized', 6);
    const { data: popularData, loading: popularLoading } = useBlogPosts('popular', 6);
    const { data: followingData, loading: followingLoading } = useBlogPosts('following', 6);

    return (
        <Tabs defaultValue="personalized" onValueChange={setActiveTab}>
            <TabsList>
                <TabsTrigger value="personalized">Personalized</TabsTrigger>
                <TabsTrigger value="popular">Popular</TabsTrigger>
                <TabsTrigger value="following">Following</TabsTrigger>
            </TabsList>
            <TabsContent value="personalized">
                {personalizedLoading ? (
                    <p>Loading personalized posts...</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {personalizedData?.blogPosts.map((post) => (
                            <BlogCard key={post.id} {...post} />
                        ))}
                    </div>
                )}
            </TabsContent>
            <TabsContent value="popular">
                {popularLoading ? (
                    <p>Loading popular posts...</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {popularData?.blogPosts.map((post) => (
                            <BlogCard key={post.id} {...post} />
                        ))}
                    </div>
                )}
            </TabsContent>
            <TabsContent value="following">
                {followingLoading ? (
                    <p>Loading following posts...</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {followingData?.blogPosts.map((post) => (
                            <BlogCard key={post.id} {...post} />
                        ))}
                    </div>
                )}
            </TabsContent>

        </Tabs>
    )


}