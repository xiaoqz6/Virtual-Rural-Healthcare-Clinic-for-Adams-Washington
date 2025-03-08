"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import type React from "react"
import { Inter } from "next/font/google"
import { Book } from "lucide-react"

const inter = Inter({ subsets: ["latin"] })

interface LayoutProps {
  children: React.ReactNode
  isProvider?: boolean
  isDark?: boolean
}

export default function Layout({ children, isProvider = false, isDark = false }: LayoutProps) {
  const router = useRouter()

  return (
    <div className={`min-h-screen flex flex-col ${inter.className} bg-gray-900 text-white`}>
      <header className={`sticky top-0 z-50 ${isDark ? "bg-transparent" : "bg-gray-800 shadow-sm"}`}>
        <div className="mx-auto max-w-7xl flex items-center justify-between p-4">
          <Link
            href="/"
            className={`text-2xl font-bold transition-colors duration-300 ${
              isDark ? "text-white hover:text-gray-200" : "text-white hover:text-gray-300"
            }`}
          >
            ADAMS HEALTH
          </Link>
          <nav className="flex items-center gap-6">
            {isProvider ? (
              <Button variant="ghost" onClick={() => router.push("/")} className="text-white hover:text-gray-300">
                Logout
              </Button>
            ) : (
              <>
                <Link
                  href="/resources"
                  className={`text-sm font-medium transition-colors flex items-center gap-1 transform hover:scale-105 active:scale-95 ${
                    isDark ? "text-white hover:text-gray-200" : "text-gray-300 hover:text-white"
                  }`}
                >
                  <Book size={16} />
                  Resources
                </Link>
                <Link
                  href="/emergency-services"
                  className={`text-sm font-medium transition-all px-3 py-2 rounded-md transform hover:scale-105 active:scale-95 ${
                    isDark ? "bg-red-600 text-white hover:bg-red-700" : "bg-red-500 text-white hover:bg-red-600"
                  }`}
                >
                  🚑 Emergency Services
                </Link>
              </>
            )}
          </nav>
        </div>
      </header>
      <main className="flex-grow">{children}</main>
      <footer className="bg-gray-800 border-t border-gray-700 mt-auto">
        <div className="mx-auto max-w-7xl p-4 text-center text-gray-400">
          <p>© 2025 Adams County Virtual Clinic. All rights reserved.</p>
          <div className="mt-2 space-x-4">
            <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors duration-300">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-gray-400 hover:text-white transition-colors duration-300">
              Terms of Service
            </Link>
            <Link href="/contact" className="text-gray-400 hover:text-white transition-colors duration-300">
              Contact Us
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

