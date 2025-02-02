'use client'

import React from 'react'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft } from 'lucide-react'

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-background py-6">
      <div className="container mx-auto px-4">
        <Link href="/">
          <Button variant="ghost" className="mb-4">
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </Link>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl md:text-3xl">Privacy Policy</CardTitle>
            <p className="text-sm text-muted-foreground">Last Updated: October 25, 2024</p>
          </CardHeader>
          <CardContent className="space-y-6">
            <section>
              <h3 className="font-semibold text-lg mb-2">Information We Collect</h3>
              <ul className="list-disc pl-6 space-y-1">
                <li>Search queries for vehicle plate numbers</li>
                <li>Usage analytics (page views, search patterns)</li>
                <li>Report submissions on vehicle incidents</li>
              </ul>
            </section>

            <section>
              <h3 className="font-semibold text-lg mb-2">How We Use Your Information</h3>
              <ul className="list-disc pl-6 space-y-1">
                <li>To provide vehicle incident history search results</li>
                <li>To improve our search functionality</li>
                <li>To maintain accuracy of vehicle incident reports</li>
                <li>To analyze usage patterns and improve user experience</li>
              </ul>
            </section>

            <section>
              <h3 className="font-semibold text-lg mb-2">Information Sharing</h3>
              <p>We do not sell your personal information. We may share aggregated, non-personal information for analytical purposes.</p>
            </section>

            <section>
              <h3 className="font-semibold text-lg mb-2">Data Security</h3>
              <p>We implement reasonable security measures to protect the information in our database.</p>
            </section>

            <section>
              <h3 className="font-semibold text-lg mb-2">Updates to Privacy Policy</h3>
              <p>We may update this policy occasionally. Continued use of our service implies acceptance of any changes.</p>
            </section>

            <section>
              <h3 className="font-semibold text-lg mb-2">Contact</h3>
              <p>For privacy concerns, please visit our{' '}
                <Link href="/our-source" className="text-blue-600 hover:underline">
                  "Our Source" page
                </Link>.
              </p>
            </section>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}