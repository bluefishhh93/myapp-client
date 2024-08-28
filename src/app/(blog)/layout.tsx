// layout.tsx
import Sidebar from "./sidebar-blog";

export default function BlogLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex h-screen">
            <Sidebar />
            <div className="flex-grow p-4">
                {children}
            </div>
        </div>
    );
}
