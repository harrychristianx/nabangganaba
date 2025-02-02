'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { MessagesSquare, Heart, Facebook } from "lucide-react"
import Link from "next/link"
import { Footer } from '@/components/Footer'
import { AdsBanner } from "@/components/AdsBanner"

const MainHeader = () => {
    return (
        <div className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
            <div className="container mx-auto">
                <div className="flex h-16 items-center justify-between px-4">
                    <Link href="/" className="hover:opacity-80 transition-opacity">
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

const sourceGroups = [
    {
        region: "Metro Manila",
        pages: [
            {
                name: "Contact us",
                url: "https://www.facebook.com/",
                followers: "3.4M followers",
                description: "For more details, contact us via Facebook at fb.com/trafficwatchph"
            },
            //   {
            //     name: "MMDA Traffic",
            //     url: "https://www.facebook.com/mmda137",
            //     followers: "950K followers",
            //     description: "Real-time traffic updates in Metro Manila."
            //   },
        ]
    },
    {
        region: "Provincial",
        pages: [
            {
                name: "Contact us",
                url: "https://www.facebook.com/",
                followers: "1.2M followers",
                description: "For more details, contact us via Facebook at fb.com/trafficwatchph"
            },
            //   {
            //     name: "Batangas Traffic Alert",
            //     url: "https://www.facebook.com/batangasalert",
            //     followers: "320K followers",
            //     description: "Traffic and accident updates in Batangas province."
            //   }
        ]
    },
    {
        region: "Community Groups",
        pages: [
            {
                name: "Nabangga na ba?",
                url: "https://www.facebook.com/profile.php?id=100063780864289",
                followers: "22K followers",
                description: "Buying a second hand car? Double check mo sa amin baka may history na ng bangga yan."
            },
            //   {
            //     name: "Traffic Watch Philippines",
            //     url: "https://www.facebook.com/trafficwatchph",
            //     followers: "22K followers",
            //     description: "Buying a second hand car? Double check mo sa amin baka may history na ng bangga yan."
            //   }
        ]
    }
];

export default function SourcePage() {
    return (
        <div className="min-h-screen flex flex-col">

            <MainHeader />
            <AdsBanner />

            <main className="flex-grow mt-8">
                <div className="container mx-auto p-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Our Sources</CardTitle>
                            <CardDescription>
                                Information provided in Nabangga na ba? is sourced from these trusted Facebook pages and groups
                            </CardDescription>
                        </CardHeader>

                        <CardContent>
                            <div className="space-y-8">
                                {sourceGroups.map((group, index) => (
                                    <div key={index}>
                                        <h2 className="text-lg font-semibold mb-4 text-[#007DFE]">{group.region}</h2>
                                        <div className="grid gap-4 md:grid-cols-2">
                                            {group.pages.map((page, pageIndex) => (
                                                <div
                                                    key={pageIndex}
                                                    className="p-4 border rounded-lg hover:border-[#007DFE] transition-colors"
                                                >
                                                    <div className="flex items-start justify-between">
                                                        <div>
                                                            <h3 className="font-semibold">{page.name}</h3>
                                                            <p className="text-sm text-muted-foreground mb-2">{page.followers}</p>
                                                        </div>
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            className="text-[#1877F2] hover:text-[#1877F2] hover:bg-[#1877F2]/10"
                                                            asChild
                                                        >
                                                            <Link href={page.url} target="_blank">
                                                                <Facebook className="h-5 w-5" strokeWidth={2.5} />
                                                            </Link>
                                                        </Button>
                                                    </div>
                                                    <p className="text-sm text-muted-foreground">{page.description}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>

                        <CardFooter className="flex flex-col space-y-2 text-sm text-muted-foreground">
                            <p>Follow these pages to get updates about traffic and accidents.</p>
                            <p>
                                Want to add a source? {" "}
                                <Link
                                    href="https://www.facebook.com/trafficwatchph"
                                    target="_blank"
                                    className="text-[#007DFE] hover:underline font-medium"
                                >
                                    Contact us via Facebook
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