import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 dark:mb-4">
         <Image
            src="/404.png"
            alt="404 Not Found"
            width={400}
            height={300}
            className="block dark:hidden"
          />
          <Image
            src="/404-dark.png"
            alt="404 Not Found in Dark Mode"
            width={400}
            height={300}
            className="hidden dark:block"
          />
        <p className="text-lg sm:text-xl mb-6 sm:mb-8 text-center text-gray-900 dark:text-gray-100">
          Oops! The page you are looking for doesnt exist.
        </p>
        <div className="flex justify-center">
          <Link 
            href="/"
            className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 dark:bg-blue-700 dark:hover:bg-blue-800 transition-colors text-base sm:text-lg"
          >
            Take Me Home
          </Link>
        </div>
      </div>
    </div>
  );
}