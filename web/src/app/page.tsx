import { cookies } from 'next/headers'
import { Copyright } from '@/components/Copyright'
import { EmptyMemories } from '@/components/EmptyMemories'
import { Hero } from '@/components/Hero'
import { SignIn } from '@/components/SignIn'
import { Profile } from '@/components/Profile'

export default function Home() {
  const isAuthenticated = cookies().has('token');

  return (
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
        <EmptyMemories />
      </section>
    </main>
  )
}
