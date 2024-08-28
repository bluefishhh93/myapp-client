import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger
} from "@/components/ui/accordion";
import {
    MoreVertical,
    Link,
    Trash,
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

const DropdownMenuItemWithIcon = ({ icon: Icon, iconColor, text } : {
    icon: React.FC<any>;
    iconColor: string;
    text: string;
}) => (
    <DropdownMenuItem className="flex items-center space-x-2">
        <Icon className={`text-${iconColor}-500`} size={16} />
        <span className="text-gray-700">{text}</span>
    </DropdownMenuItem>
);

const PublishedDropdown = () => (
    <DropdownMenu>
        <DropdownMenuTrigger>
            <MoreVertical className="cursor-pointer text-slate-500 hover:text-slate-700" size={20} />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-48  rounded-md shadow-lg ring-1 ring-black ring-opacity-5">
            <DropdownMenuItemWithIcon icon={Link} iconColor="blue" text="Copy article link" />
            <DropdownMenuItemWithIcon icon={ExternalLink} iconColor="green" text="View on blog" />
            <DropdownMenuItemWithIcon icon={Trash} iconColor="red" text="Delete" />
        </DropdownMenuContent>
    </DropdownMenu>
);

const DraftDropdown = () => (
    <DropdownMenu>
        <DropdownMenuTrigger>
            <MoreVertical className="cursor-pointer text-slate-500 hover:text-slate-700" size={20} />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-48  rounded-md shadow-lg ring-1 ring-black ring-opacity-5">
            <DropdownMenuItemWithIcon icon={Link} iconColor="blue" text="Copy preview link" />
            <DropdownMenuItemWithIcon icon={Eye} iconColor="green" text="Preview draft" />
            <DropdownMenuItemWithIcon icon={Trash} iconColor="red" text="Delete" />
        </DropdownMenuContent>
    </DropdownMenu>
);

const BlogEntry = ({ title, isPublished }: {
    title: string;
    isPublished: boolean;
}) => (
    <div className="flex items-center justify-between p-2 hover:bg-gray-100 dark:hover:bg-slate-900 rounded-lg">
        <div className="flex items-center space-x-2">
            {isPublished ? <FileCheck size={20} /> : <FileText size={20} />}
            <span>{title}</span>
        </div>
        {isPublished ? <PublishedDropdown /> : <DraftDropdown />}
    </div>
);

const BlogSection = ({ title, isPublished }: {
    title: string;
    isPublished: boolean;
}) => (
    <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
            <AccordionTrigger className="text-sm text-slate-500 hover:text-slate-700 hover:no-underline">
                {title}
            </AccordionTrigger>
            <AccordionContent>
                <BlogEntry title="Blog 1" isPublished={isPublished} />
                <BlogEntry title="Blog 2" isPublished={isPublished} />
                <BlogEntry title="Blog 3" isPublished={isPublished} />
            </AccordionContent>
        </AccordionItem>
    </Accordion>
);

export default function Blog() {
    return (
        <div>
            <BlogSection title="PUBLISHED" isPublished={true} />
            <BlogSection title="MY DRAFT" isPublished={false} />
        </div>
    );
}
