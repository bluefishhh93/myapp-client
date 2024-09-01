// components/Sidebar.tsx

import ReusableSidebar from "@/components/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FilePlus, Settings, User } from 'lucide-react';
import CreateDraftButton from './create-draft-button';
import { getCurrentUser } from '@/lib/session';
import { getUserBlogs } from "@/data-access/graphql/blogs";
import { SibarBlogSection } from "./sidebar-blog-section";

const BlogSidebar: React.FC = async () => {
  const user = await getCurrentUser();

  if (!user) {
    return null;
  }

  const { userPosts } = await getUserBlogs({userId: user.id});

  const header = (
    <div className="flex items-center gap-4">
      <Avatar>
        <AvatarImage src={user.image} alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <h1 className="text-lg font-bold">{user.firstname + ' ' + user.lastname}</h1>
    </div>
  );

  const content = (
    <>
      <CreateDraftButton />
      <SibarBlogSection blogs={userPosts} />
    </>
  );

  const footer = (
    <nav className="flex flex-col gap-2">
      <a href="#" className="flex items-center py-3 px-4 transition-colors duration-200 hover:bg-gray-100 dark:hover:bg-slate-900 rounded-md">
        <Settings className="mr-3" size={18} /> Settings
      </a>
      <a href="#" className="flex items-center py-3 px-4 transition-colors duration-200 hover:bg-gray-100 dark:hover:bg-slate-900 rounded-md">
        <User className="mr-3" size={18} /> Profile
      </a>
    </nav>
  );

  return <ReusableSidebar header={header} content={content} footer={footer} />;
};

export default BlogSidebar;
