// components/Sidebar.tsx

import ReusableSidebar from "@/components/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowLeftIcon, ArrowUpLeftIcon, ArrowUpLeftSquareIcon, FilePlus, Settings, User } from 'lucide-react';
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
        <AvatarImage src={user.image ?? '/default-avatar.png'} alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <div>
        {user.firstname && user.lastname && (
          <h1 className="text-lg font-bold truncate">
            {`${user.firstname} ${user.lastname}`.length > 20
              ? `${user.firstname} ${user.lastname}`.slice(0, 20) + '...'
              : `${user.firstname} ${user.lastname}`}
          </h1>
        )}
        <p className="text-sm text-gray-600 dark:text-gray-400 truncate" title={user.email}>
          {user.email!.length > 15 ? user.email!.slice(0, 15) + '...' : user.email}
        </p>
      </div>
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
        <Settings className="mr-3" size={18} /> Blog dashboard
      </a>
      <a href="#" className="flex items-center py-3 px-4 transition-colors duration-200 hover:bg-gray-100 dark:hover:bg-slate-900 rounded-md">
        <ArrowLeftIcon className="mr-3" size={18} /> Back to Hivedev
      </a>
    </nav>
  );

  return <ReusableSidebar header={header} content={content} footer={footer} />;
};

export default BlogSidebar;
