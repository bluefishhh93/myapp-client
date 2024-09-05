'use client'

import { usePathname } from 'next/navigation'
import { Header } from "./_header/header";
import { Footer } from "@/components/footer";

export function ConditionalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const shouldShowHeaderFooter = !pathname.startsWith('/draft') && !pathname.startsWith('/edit')

  return (
    <>
      {shouldShowHeaderFooter && <Header />}
      <div className="container mx-auto w-full py-12">{children}</div>
      {shouldShowHeaderFooter && <Footer />}
    </>
  )
}