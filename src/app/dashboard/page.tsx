import dynamic from 'next/dynamic';
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardDescription, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { HashIcon } from "lucide-react";
import Image from "next/image";
import { Breadcrumb } from "@/components/Breadcrumb";

// // Dynamically import DropdownMenu components
// const DropdownMenu = dynamic(() => import('@/components/ui/dropdown-menu').then(mod => mod.DropdownMenu), { ssr: false });
// const DropdownMenuTrigger = dynamic(() => import('@/components/ui/dropdown-menu').then(mod => mod.DropdownMenuTrigger), { ssr: false });
// const DropdownMenuContent = dynamic(() => import('@/components/ui/dropdown-menu').then(mod => mod.DropdownMenuContent), { ssr: false });
// const DropdownMenuLabel = dynamic(() => import('@/components/ui/dropdown-menu').then(mod => mod.DropdownMenuLabel), { ssr: false });
// const DropdownMenuSeparator = dynamic(() => import('@/components/ui/dropdown-menu').then(mod => mod.DropdownMenuSeparator), { ssr: false });
// const DropdownMenuItem = dynamic(() => import('@/components/ui/dropdown-menu').then(mod => mod.DropdownMenuItem), { ssr: false });

export default function DashboardPage() {
    return (
        <>
            <Breadcrumb
                items={[
                    { label: "Dashboard", link: "/dashboard" },
                    { label: "Overview", link: "/dashboard/overview" },
                ]}
            />
            <main className="flex-1 bg-muted/40 p-4 md:p-6 lg:p-8">
                <header className="mb-6 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <h1 className="text-3xl font-bold">Overview</h1>
                    </div>
                    {/* <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="icon" className="rounded-full">
                                <Image
                                    src="/placeholder.svg"
                                    width={36}
                                    height={36}
                                    alt="Avatar"
                                    className="rounded-full"
                                    style={{ aspectRatio: "36/36", objectFit: "cover" }}
                                />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>My Account</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Settings</DropdownMenuItem>
                            <DropdownMenuItem>Support</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Logout</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu> */}
                </header>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    <Card className="flex flex-col">
                        <CardHeader>
                            <CardDescription>Total Posts</CardDescription>
                            <CardTitle>124</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-xs text-muted-foreground">+10% from last month</div>
                        </CardContent>
                        <CardFooter>
                            <Progress value={10} aria-label="10% increase" />
                        </CardFooter>
                    </Card>
                    <Card className="flex flex-col">
                        <CardHeader>
                            <CardDescription>Total Views</CardDescription>
                            <CardTitle>12,345</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-xs text-muted-foreground">+25% from last month</div>
                        </CardContent>
                        <CardFooter>
                            <Progress value={25} aria-label="25% increase" />
                        </CardFooter>
                    </Card>
                    <Card className="flex flex-col">
                        <CardHeader>
                            <CardDescription>Total Comments</CardDescription>
                            <CardTitle>1,234</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-xs text-muted-foreground">+15% from last month</div>
                        </CardContent>
                        <CardFooter>
                            <Progress value={15} aria-label="15% increase" />
                        </CardFooter>
                    </Card>
                </div>
                <div className="mt-6 grid gap-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Post Engagement</CardTitle>
                            <CardDescription>Engagement metrics for your blog posts over time.</CardDescription>
                        </CardHeader>
                        <CardContent></CardContent>
                    </Card>
                </div>
            </main>
        </>
    );
}