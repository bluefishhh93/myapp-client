// components/ui/tooltip.tsx

import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { Heart, MessageCircle, Bookmark, MoreVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
interface TooltipProps {
    children: React.ReactNode;
    tooltipText: string;
}

export function TooltipCustom({ children, tooltipText }: TooltipProps) {
    return (
        <Tooltip>
            <TooltipTrigger asChild>
                {children}
            </TooltipTrigger>
            <TooltipContent align="start" className="border-0 text-sm p-2 bg-slate-800 text-white dark:bg-white dark:text-gray-800  shadow-lg">
                {tooltipText}
            </TooltipContent>
        </Tooltip>
    );
}

export function BottomBar() {
    return (
        <div className="fixed bottom-4 left-0 right-0 mx-auto px-4 w-max border bg-white dark:bg-gray-800 shadow-lg rounded-full flex justify-around items-center space-x-4 z-50">
            <TooltipProvider>
                <div className="flex items-center">
                    <TooltipCustom tooltipText="Like this Article">
                        <Button variant="ghost" className="text-gray-600 dark:text-gray-300 p-2 rounded-full">
                            <Heart className="w-5 h-5" />
                        </Button>
                    </TooltipCustom>
                    <div className="w-px h-6 mx-2 bg-gray-300 dark:bg-gray-700" />
                    <TooltipCustom tooltipText="Write a Comment">
                        <Button variant="ghost" className="text-gray-600 dark:text-gray-300 p-2 rounded-full">
                            <MessageCircle className="w-5 h-5" />
                        </Button>
                    </TooltipCustom>
                    <div className="w-px h-6 mx-2 bg-gray-300 dark:bg-gray-700" />
                    <TooltipCustom tooltipText="Add Bookmark">
                        <Button variant="ghost" className="text-gray-600 dark:text-gray-300 p-2 rounded-full">
                            <Bookmark className="w-5 h-5" />
                        </Button>
                    </TooltipCustom>
                    <div className="w-px h-6 mx-2 bg-gray-300 dark:bg-gray-700" />
                    <TooltipCustom tooltipText="More Options">
                        <Button variant="ghost" className="text-gray-600 dark:text-gray-300 p-2 rounded-full">
                            <MoreVertical className="w-5 h-5" />
                        </Button>
                    </TooltipCustom>
                </div>
            </TooltipProvider>
        </div>
    );
}
{/* <Popover>
    <PopoverTrigger asChild>
        <Button variant="ghost" className="text-gray-600 dark:text-gray-300 p-2">
            <MoreVertical className="w-5 h-5" />
        </Button>
    </PopoverTrigger>
    <PopoverContent side="top" className="text-sm w-32 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200 shadow-lg">
        <div className="flex flex-col">
            <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700">Follow</button>
            <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700">Report</button>
        </div>
    </PopoverContent>
</Popover> */}