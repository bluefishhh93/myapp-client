"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardHeader, CardDescription, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Breadcrumb } from "@/components/Breadcrumb";
import { Car, FilePenIcon, TrashIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useState } from "react";

// Dynamically import DropdownMenu components
// const DropdownMenu = dynamic(() => import('@/components/ui/dropdown-menu').then(mod => mod.DropdownMenu), { ssr: false });
// const DropdownMenuTrigger = dynamic(() => import('@/components/ui/dropdown-menu').then(mod => mod.DropdownMenuTrigger), { ssr: false });
// const DropdownMenuContent = dynamic(() => import('@/components/ui/dropdown-menu').then(mod => mod.DropdownMenuContent), { ssr: false });
// const DropdownMenuLabel = dynamic(() => import('@/components/ui/dropdown-menu').then(mod => mod.DropdownMenuLabel), { ssr: false });
// const DropdownMenuSeparator = dynamic(() => import('@/components/ui/dropdown-menu').then(mod => mod.DropdownMenuSeparator), { ssr: false });
// const DropdownMenuItem = dynamic(() => import('@/components/ui/dropdown-menu').then(mod => mod.DropdownMenuItem), { ssr: false });

const articles = [
    {
        id: 1,
        title: "The Future of AI in Business",
        author: {
            name: "John Doe",
            avatar: "/placeholder-user.jpg",
        },
        createdAt: "2023-04-15",
    },
    {
        id: 2,
        title: "Sustainable Practices for a Greener World",
        author: {
            name: "Jane Smith",
            avatar: "/placeholder-user.jpg",
        },
        createdAt: "2023-03-28",
    },
    {
        id: 3,
        title: "10 Tips for Effective Remote Work",
        author: {
            name: "Michael Johnson",
            avatar: "/placeholder-user.jpg",
        },
        createdAt: "2023-02-12",
    },
    {
        id: 4,
        title: "The Rise of Cryptocurrency in Finance",
        author: {
            name: "Emily Davis",
            avatar: "/placeholder-user.jpg",
        },
        createdAt: "2023-01-30",
    },
]
const drafts = [
    {
        id: 1,
        title: "Exploring the Metaverse",
        author: {
            name: "Sarah Lee",
            avatar: "/placeholder-user.jpg",
        },
        createdAt: "2023-05-01",
    },
    {
        id: 2,
        title: "The Future of Renewable Energy",
        author: {
            name: "David Kim",
            avatar: "/placeholder-user.jpg",
        },
        createdAt: "2023-04-20",
    },
    {
        id: 3,
        title: "Navigating the Gig Economy",
        author: {
            name: "Olivia Chen",
            avatar: "/placeholder-user.jpg",
        },
        createdAt: "2023-03-15",
    },
]

export default function PostsPage() {
    const [activeTab, setActiveTab] = useState("articles")
    const [searchText, setSearchText] = useState("")
    const filteredPosts =
        activeTab === "articles"
            ? articles.filter((post) => post.title.toLowerCase().includes(searchText.toLowerCase()))
            : drafts.filter((post) => post.title.toLowerCase().includes(searchText.toLowerCase()))
    return (
        <>
            <Breadcrumb
                items={[
                    { label: "Dashboard", link: "/dashboard" },
                    { label: "Articles and drafts", link: "/dashboard/posts" },
                ]}
            />
            <main className="flex-1 bg-muted/40 p-4 md:p-6 lg:p-8">
                <header className="mb-6 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <h1 className="text-3xl font-bold">Articles and draft</h1>
                    </div>
                </header>
                <div className="flex flex-col h-full">
                    <div className="bg-background p-4 border-b">
                        <Tabs >
                            <TabsList>
                                <TabsTrigger value="articles">Articles</TabsTrigger>
                                <TabsTrigger value="drafts">Drafts</TabsTrigger>
                            </TabsList>
                        </Tabs>
                    </div>
                    <div className="flex-1 p-4">
                        <div className="mb-4">
                            <Input
                                placeholder={`Search ${activeTab === "articles" ? "articles" : "drafts"} by title`}
                                value={searchText}
                                onChange={(e) => setSearchText(e.target.value)}
                                className="w-full"
                            />
                        </div>
                        <div className="grid gap-4">
                            {filteredPosts.map((post) => (
                                <Card key={post.id} className="flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <Avatar>
                                            <AvatarImage src="/placeholder-user.jpg" alt={post.author.name} />
                                            <AvatarFallback>{post.author.name.charAt(0).toUpperCase()}</AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <h3 className="font-medium">{post.title}</h3>
                                            <div className="text-sm text-muted-foreground">
                                                {post.author.name} - {post.createdAt}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <Button variant="ghost" size="icon">
                                            <FilePenIcon className="h-5 w-5" />
                                            <span className="sr-only">Edit</span>
                                        </Button>
                                        <Button variant="ghost" size="icon">
                                            <TrashIcon className="h-5 w-5" />
                                            <span className="sr-only">Delete</span>
                                        </Button>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}