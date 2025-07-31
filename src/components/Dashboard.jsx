import React from 'react'
import Header from './Header'
import Footer from './Footer'
import MainSection from './MainSection'

export default function Dashboard() {
  return (
    <div className="relative min-h-screen bg-[url('/src/images/background.jpg')] bg-cover bg-center bg-fixed">
    {/* <div className="flex flex-col min-h-screen"> */}
      <div className="absolute inset-0 bg-black/10 backdrop-blur-lg"></div>
        <div className="relative z-10 flex flex-col min-h-screen">
          <Header />
          {/* <main className="flex-grow container mx-auto px-2 py-6"> */}
          <main className="flex-grow w-full px-4 py-6">
            <MainSection />
          </main>
          <Footer />
        </div>
    </div>
  )
}