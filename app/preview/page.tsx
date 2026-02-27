'use client'

import { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { ArrowLeft, Download, Share2 } from 'lucide-react'
import Link from "next/link"
import { PortfolioData } from "@/types/portfolio"
import { PortfolioTemplate } from "@/components/portfolio/portfolio-template"
import { motion } from "framer-motion"

const defaultPortfolioData: PortfolioData = {
  personalInfo: {
    name: 'John Doe',
    title: 'Full Stack Developer',
    bio: 'Passionate developer with 5+ years of experience building web applications.',
    email: 'john@example.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    profileImage: ''
  },
  projects: [
    {
      id: '1',
      title: 'E-commerce Platform',
      description: 'A full-stack e-commerce solution built with React and Node.js',
      image: '',
      technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      liveUrl: 'https://example.com',
      githubUrl: 'https://github.com/example',
      featured: true
    }
  ],
  experience: [
    {
      id: '1',
      company: 'Tech Corp',
      position: 'Senior Developer',
      duration: 'Jan 2020 - Present',
      description: 'Led development of multiple web applications',
      current: true
    }
  ],
  skills: ['JavaScript', 'React', 'Node.js', 'Python', 'AWS'],
  social: {
    github: 'https://github.com/johndoe',
    linkedin: 'https://linkedin.com/in/johndoe',
    twitter: 'https://twitter.com/johndoe',
    website: 'https://johndoe.com'
  },
  testimonials: [],
  contact: {
    email: 'john@example.com',
    message: ''
  }
}

export default function PreviewPage() {
  const [portfolioData, setPortfolioData] = useState<PortfolioData>(defaultPortfolioData)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Load data from localStorage
    const savedData = localStorage.getItem('portfolioData')
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData)
        setPortfolioData(parsedData)
      } catch (error) {
        console.error('Error loading portfolio data:', error)
      }
    }
    setIsLoading(false)
  }, [])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Loading your portfolio...</h2>
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-white dark:bg-gray-800 border-b shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/builder">
              <Button variant="ghost" className="flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back to Builder
              </Button>
            </Link>
            
            <div className="flex items-center gap-3">
              <Button variant="outline" className="flex items-center gap-2">
                <Share2 className="w-4 h-4" />
                Share
              </Button>
              <Button className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600">
                <Download className="w-4 h-4" />
                Download
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Portfolio Preview */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <PortfolioTemplate data={portfolioData} />
      </motion.div>
    </div>
  )
}
