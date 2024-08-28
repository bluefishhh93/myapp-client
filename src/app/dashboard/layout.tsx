// layout.tsx
import Sidebar from "@/app/dashboard/sidebar-dashboard";
import { Breadcrumb } from "@/components/Breadcrumb";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex h-screen">
            <Sidebar />
            <div className="flex-grow p-4">             
                {children}
            </div>
        </div>
    );
}
