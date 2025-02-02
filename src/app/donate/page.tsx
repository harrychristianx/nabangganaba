'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Footer } from '@/components/Footer'
import { Heart, MessageCircle, MessagesSquare } from "lucide-react"
import Link from "next/link"

const MainHeader = () => {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
      <div className="container mx-auto">
        <div className="flex h-16 items-center justify-between px-4">
          <Link href="/our-source" className="hover:opacity-80 transition-opacity">
            <h1 className="text-xl sm:text-2xl font-bold">
              Nabangga na ba?
            </h1>
          </Link>

          <div className="flex items-center space-x-2 md:space-x-3">
            <Link href="/our-source">
              <Button className="bg-[#5865F2] hover:bg-[#4752C4] text-white w-10 h-10 md:w-auto md:h-10 md:flex md:items-center md:gap-2 md:px-4 p-0 font-medium">
                <MessagesSquare className="h-5 w-5" strokeWidth={2} />
                <span className="hidden md:inline">Our Source</span>
              </Button>
            </Link>
            <Link href="/donate">
              <Button
                className="bg-[#007DFE] hover:bg-[#022DB8] text-white w-10 h-10 md:w-auto md:h-10 md:flex md:items-center md:gap-2 md:px-4 p-0 font-medium"
              >
                <Heart className="h-5 w-5" strokeWidth={3} />
                <span className="hidden md:inline">Donate GCash</span>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function DonatePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <MainHeader />

      <main className="flex-grow mt-16">
        <div className="container mx-auto p-4">
          <Card>
            <CardHeader>
              <CardTitle>Support Our Work</CardTitle>
              <CardDescription>
                Help us maintain and improve Nabangga na ba? by donating via GCash
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 p-6 border rounded-lg bg-[#E7F3FF]">
                  <h3 className="text-lg font-semibold text-[#007DFE] mb-2">Why Donate?</h3>
                  <ul className="space-y-2 text-sm">
                    <li>✓ Help keep our database updated</li>
                    <li>✓ Support server maintenance costs</li>
                    <li>✓ Enable new features development</li>
                    <li>✓ Keep the service free for everyone</li>
                  </ul>
                </div>

                <div className="flex-1 p-6 border rounded-lg">
                  <h3 className="text-lg font-semibold mb-4">Donate via GCash</h3>
                  <div className="space-y-4">
                    <div className="text-center">
                      <div className="bg-[#0063E5] rounded-lg inline-block w-full max-w-[400px] pt-8 pb-6 px-4">
                        {/* GCash Logo */}
                        <p className=" text-2xl mb-4 text-white">GCash</p>
                        {/* QR Code Container */}
                        <div className="bg-white rounded-lg p-4 mb-4">
                          <img
                            src="/images/gcash-qr.png"  // Make sure this path matches your public directory structure
                            alt="GCash QR Code"
                            className="w-full max-w-[300px] mx-auto"
                          />
                          <p className="text-gray-500 text-sm mt-4">Transfer fees may apply.</p>
                        </div>
                        {/* Account Details */}
                        <div className="text-white">
                          <p className="text-xl font-bold mb-2">HA**Y CH*****N B.</p>
                          <p className="text-sm mb-1">Mobile No.: 097• ••••650</p>
                          <p className="text-sm">User ID: •••••••••WDGOIO</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>

            <CardFooter className="flex flex-col space-y-2 text-sm text-muted-foreground">
              <p>All donations are greatly appreciated and will be used for site maintenance.</p>
              <p>
                For questions or concerns, please{" "}
                <Link
                  href="https://www.facebook.com/trafficwatchph"
                  target="_blank"
                  className="text-[#007DFE] hover:underline font-medium"
                >
                  contact us via Facebook
                </Link>
                .
              </p>
            </CardFooter>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  )
}