import React, { useState } from 'react';
import { X, Monitor, Smartphone, BookOpen, NotepadText } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Footer } from '@/components/footer';
import Image from 'next/image';
import { calculateReadingTime } from '../utils';

type PreviewMode = 'desktop' | 'mobile';

interface BlogPreviewOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  post: Post;
}


const BlogPreviewOverlay: React.FC<BlogPreviewOverlayProps> = ({ isOpen, onClose, post }) => {
  const [previewMode, setPreviewMode] = useState<PreviewMode>('desktop');
  const readingTime = calculateReadingTime(post.content);

  const PhoneFrame = ({ children }: { children: React.ReactNode }) => (
    <div className="relative my-6 mx-auto" style={{ width: '375px', height: '812px' }}>
      <Image width={375} height={812} src="/phone-frame.png" alt="Phone frame" className="absolute inset-0 w-full h-full" />
      <div className="absolute inset-0 overflow-y-auto p-6" style={{ top: '60px', bottom: '60px' }}>
        {children}
      </div>
    </div>
  );

  const MonitorFrame = ({ children }: { children: React.ReactNode }) => (
    <div className="relative my-6 mx-auto" style={{ width: '1280px', height: '800px' }}>
      <Image width={1280} height={800} src="/monitor-frame.png" alt="Monitor frame" className="absolute inset-0 w-full h-full" />
      <div className="absolute inset-0 overflow-y-auto p-8" style={{ top: '60px', bottom: '160px', left: '40px', right: '40px' }}>
        {children}
      </div>
    </div>
  );

  const Content = () => (
    <article className="bg-white dark:bg-gray-900 shadow-lg rounded-lg overflow-hidden">
      <div className="p-6">
        <header className="mb-8 text-center">
          <h1 className={`${previewMode === 'mobile' ? 'text-xl sm:text-2xl' : 'text-2xl sm:text-3xl md:text-4xl'} font-extrabold leading-tight mb-4 text-gray-900 dark:text-gray-100`}>
            {post.title}
          </h1>
          <div className={`flex ${previewMode === 'mobile' ? 'flex-col' : 'flex-row'} items-center justify-center text-gray-500 dark:text-gray-400 mb-6 ${previewMode === 'mobile' ? 'space-y-4' : 'space-x-4'}`}>
            <div className="flex items-center space-x-2">
              <Avatar className={previewMode === 'mobile' ? 'w-8 h-8' : 'w-10 h-10'}>
                <AvatarImage src={post.author.image} alt={`${post.author.firstname} ${post.author.lastname}`} />
                <AvatarFallback>
                  {post.author.firstname?.charAt(0) || ''}{post.author.lastname?.charAt(0) || ''}
                </AvatarFallback>
              </Avatar>
              <p className={`${previewMode === 'mobile' ? 'text-sm' : 'text-lg'} font-medium text-gray-800 dark:text-gray-200`}>
                {post.author.firstname} {post.author.lastname}
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <p className={`${previewMode === 'mobile' ? 'text-xs' : 'text-sm'} text-gray-600 dark:text-gray-400`}>
                {new Date(post.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
              <span className={`${previewMode === 'mobile' ? 'text-xs' : 'text-sm'} text-gray-600 dark:text-gray-400 flex items-center`}>
                <BookOpen className={`${previewMode === 'mobile' ? 'w-3 h-3' : 'w-4 h-4'} text-gray-500 dark:text-gray-400 mr-1`} />
                {readingTime} min read
              </span>
            </div>
          </div>
          <Separator />
        </header>
        <section className="blog-content mt-6">
          <div
            className={`prose dark:prose-invert max-w-none ${previewMode === 'mobile' ? 'text-sm' : 'text-base'}`}
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </section>
        <footer className="mt-8">
          <Footer />
        </footer>
      </div>
    </article>
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-screen h-screen max-w-full max-h-full m-0 p-0">
        <DialogHeader className="absolute top-0 left-0 right-0 bg-white dark:bg-gray-800 p-4 flex justify-between items-center z-10">
          <div className='flex justify-between w-full px-20'>
            <DialogTitle className="text-lg sm:text-xl md:text-2xl">
              <div className='flex items-center text-slate-600 text-xl dark:text-slate-400'>
                <NotepadText className="mr-2 h-4 w-4 sm:h-8 sm:w-8" />
                <span>Preview Draft</span>
              </div>

            </DialogTitle>
            <Button className='px-6 text-blue-500 font-bold rounded-full border border-blue-600 hover:bg-blue-50 hover:text-blue-500' variant="ghost" size="default" onClick={onClose}>
              Close
            </Button>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant={previewMode === 'desktop' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setPreviewMode('desktop')}
            >
              <Monitor className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
              Desktop
            </Button>
            <Button
              variant={previewMode === 'mobile' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setPreviewMode('mobile')}
            >
              <Smartphone className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
              Mobile
            </Button>

          </div>
        </DialogHeader>
        <div className="mt-16 p-4 sm:p-6 h-full overflow-auto flex justify-center items-start">
          {previewMode === 'mobile' ? (
            <PhoneFrame>
              <Content />
            </PhoneFrame>
          ) : (
            <MonitorFrame>
              <Content />
            </MonitorFrame>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BlogPreviewOverlay;