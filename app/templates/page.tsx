'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Eye, Palette } from 'lucide-react'
import Link from "next/link"
import { motion } from "framer-motion"
import Image from "next/image"

const templates = [
  {
    id: 'modern',
    name: 'Modern Professional',
    description: 'Clean, minimalist design perfect for developers and designers',
    image: '/modern-professional-portfolio.png',
    features: ['Gradient backgrounds', 'Smooth animations', 'Mobile responsive'],
    color: 'blue'
  },
  {
    id: 'creative',
    name: 'Creative Portfolio',
    description: 'Bold and artistic design for creative professionals',
    image: '/placeholder-ttu05.png',
    features: ['Bold typography', 'Creative layouts', 'Interactive elements'],
    color: 'purple'
  },
  {
    id: 'minimal',
    name: 'Minimal Elegance',
    description: 'Simple and elegant design focusing on content',
    image: '/minimal-elegant-portfolio-template.png',
    features: ['Clean typography', 'Whitespace focus', 'Fast loading'],
    color: 'gray'
  }
]

export default function TemplatesPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link href="/">
            <Button variant="ghost" className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Button>
          </Link>
        </div>

        {/* Page Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-6">
            Choose Your Template
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Select from our professionally designed templates. Each template is fully customizable and responsive.
          </p>
        </motion.div>

        {/* Templates Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {templates.map((template, index) => (
            <motion.div
              key={template.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
            >
              <Card className="h-full hover:shadow-lg transition-all duration-300 group">
                <div className="aspect-video relative overflow-hidden rounded-t-lg">
                  <Image
                    src={template.image || "/placeholder.svg"}
                    alt={template.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <Button variant="secondary" size="sm">
                      <Eye className="w-4 h-4 mr-2" />
                      Preview
                    </Button>
                  </div>
                </div>
                
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl">{template.name}</CardTitle>
                    <Palette className={`w-5 h-5 text-${template.color}-500`} />
                  </div>
                  <CardDescription>{template.description}</CardDescription>
                </CardHeader>
                
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex flex-wrap gap-2">
                      {template.features.map((feature) => (
                        <Badge key={feature} variant="secondary" className="text-xs">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="flex gap-2">
                      <Button className="flex-1" asChild>
                        <Link href="/builder">
                          Use Template
                        </Link>
                      </Button>
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 text-white"
        >
          <h2 className="text-3xl font-bold mb-4">
            Ready to Build Your Portfolio?
          </h2>
          <p className="text-lg mb-8 opacity-90">
            Choose a template and start building your professional portfolio in minutes
          </p>
          <Link href="/builder">
            <Button size="lg" variant="secondary" className="px-8 py-3">
              Start Building Now
            </Button>
          </Link>
        </motion.div>
      </div>
    </div>
  )
}
