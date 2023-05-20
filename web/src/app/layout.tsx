import { Hero } from '@/components/Hero'
import { Profile } from '@/components/Profile'
import { SignIn } from '@/components/SignIn'
import './globals.css'
import { Roboto_Flex as Roboto, Bai_Jamjuree as BaiJamjuree } from 'next/font/google'
import { Copyright } from '@/components/Copyright'
import { cookies } from 'next/headers'

const roboto = Roboto({ subsets: ['latin'], variable: '--font-roboto' })
const baiJamjuree = BaiJamjuree({ subsets: ['latin'], weight: '700', variable: '--font-bai-jamjuree' })

export const metadata = {
  title: 'Spacetime',
  description: 'Uma cápsula do tempo construída com React, NextJS, TailwindCSS e TypeScript',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const isAuthenticated = cookies().has('token');
  return (
    <html lang="en">
      <body className={`${roboto.variable} ${baiJamjuree.variable} font-sans bg-gray-900 text-gray-100`}>
        <main className="grid grid-cols-2 min-h-screen">
          {/* left */}
          <section className="flex flex-col items-start justify-between px-28 py-16 relative overflow-hidden border-r border-white/10 bg-[url(../assets/bg-stars.svg)] bg-cover">
            {/* blur */}
            <div className="absolute right-0 top-1/2 h-[288px] w-[526px] -translate-y-1/2 
        translate-x-1/2 bg-purple-700 opacity-50 rounded-full blur-full"></div>

            {/* stripes */}
            <div className="absolute right-2 top-0 bottom-0 w-2 bg-stripes" />

            {isAuthenticated ? <Profile /> : <SignIn />}

            <Hero />

            <Copyright />
          </section>

          {/* right */}
          <section className="flex flex-col p-16 bg-[url(../assets/bg-stars.svg)] bg-cover">
            {children}
          </section>
        </main>
      </body>
    </html>
  )
}
