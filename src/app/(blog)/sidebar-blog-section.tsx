"use client";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger
} from "@/components/ui/accordion";
import {
    MoreVertical,
    Trash,
    LinkIcon,
    Eye,
    FileCheck,
    FileText,
    ExternalLink
} from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { usePathname } from 'next/navigation';
import { cn } from "@/lib/utils";

enum Status {
    INACTIVE = "INACTIVE",
    ACTIVE = "ACTIVE",
    PENDING = "PENDING"
}

const DropdownMenuItemWithIcon = ({ icon: Icon, iconColor, text }: {
    icon: React.FC<any>;
    iconColor: string;
    text: string;
}) => (
    <DropdownMenuItem className="flex items-center space-x-2">
        <Icon className={`text-${iconColor}-500`} size={16} />
        <span className="text-gray-700">{text}</span>
    </DropdownMenuItem>
);

const BlogEntryDropdown = ({ isPublished }: { isPublished: boolean }) => (
    <DropdownMenu>
        <DropdownMenuTrigger>
            <MoreVertical className="cursor-pointer text-slate-500 hover:text-slate-700" size={20} />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-48 rounded-md shadow-lg ring-1 ring-black ring-opacity-5">
            {isPublished ? (
                <>
                    <DropdownMenuItemWithIcon icon={LinkIcon} iconColor="blue" text="Copy article link" />
                    <DropdownMenuItemWithIcon icon={ExternalLink} iconColor="green" text="View on blog" />
                </>
            ) : (
                <>
                    <DropdownMenuItemWithIcon icon={LinkIcon} iconColor="blue" text="Copy preview link" />
                    <DropdownMenuItemWithIcon icon={Eye} iconColor="green" text="Preview draft" />
                </>
            )}
            <DropdownMenuItemWithIcon icon={Trash} iconColor="red" text="Delete" />
        </DropdownMenuContent>
    </DropdownMenu>
);

const truncateTitle = (title: string, maxLength: number = 20) => {
    if (title.length <= maxLength) return title;
    return `${title.slice(0, maxLength)} ...`;
};

const BlogEntry = ({ id, title, isPublished }: {
    id: string;
    title: string;
    isPublished: boolean;
}) => {
    const pathname = usePathname();
    const isActive = pathname.includes(id);

    return (
        <div
            className={cn(
                "flex items-center p-3 rounded-lg transition-colors duration-200 shadow-sm",
                "hover:bg-gray-100 dark:hover:bg-slate-800",
                isActive ? "bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100" : "text-gray-700 dark:text-gray-300"
            )}
        >
            <div className="flex items-center justify-between w-full space-x-4">
                <Link href={isPublished ? `/edit/${id}` : `/draft/${id}`} className="flex-grow">
                    <div className="flex items-center space-x-3 group">
                        {isPublished ? (
                            <FileCheck className="text-green-600 group-hover:text-green-800 transition-colors duration-200" size={20} />
                        ) : (
                            <FileText className="text-yellow-600 group-hover:text-yellow-800 transition-colors duration-200" size={20} />
                        )}
                        <span
                            className="flex-grow truncate font-medium text-gray-800 dark:text-gray-200 group-hover:text-blue-600 dark:group-hover:text-blue-300 transition-colors duration-200"
                            title={title}
                        >
                            {truncateTitle(title)}
                        </span>
                    </div>
                </Link>
                <BlogEntryDropdown isPublished={isPublished} />
            </div>
        </div>
    );
};

const BlogSection = ({ title, blogs }: {
    title: string;
    blogs: Post[];
}) => (
    <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
            <AccordionTrigger className="text-sm text-slate-500 hover:text-slate-700 hover:no-underline">
                {title}
            </AccordionTrigger>
            <AccordionContent>
                {blogs.map((blog) => (
                    <BlogEntry
                        key={blog.id}
                        id={blog.id}
                        title={blog.title}
                        isPublished={blog.status === Status.ACTIVE}
                    />
                ))}
            </AccordionContent>
        </AccordionItem>
    </Accordion>
);
interface BlogProps {
    blogs: Post[];
}
export function SibarBlogSection({ blogs }: BlogProps) {
    const publishedBlogs = blogs.filter((blog) => blog.status === Status.ACTIVE);
    const draftBlogs = blogs.filter((blog) => blog.status !== Status.ACTIVE);

    return (
        <div>
            <BlogSection title="MY DRAFT" blogs={draftBlogs} />
            <BlogSection title="PUBLISHED" blogs={publishedBlogs} />
        </div>
    );
}
