// app/blogs/[blogId]/draft/loading.tsx

import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
    return (
        <div className="space-y-4 mt-4 mr-3">
            <div className="flex justify-end items-center mb-4">
                <div className="flex space-x-4">
                    <Skeleton className="h-10 w-20 bg-gray-300 rounded-full p-2" />
                </div>
            </div>
            <div className="space-y-2">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
            </div>
            <Skeleton className="h-[500px] w-full" />
            {/* <div className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
      </div> */}
        </div>
    )
}