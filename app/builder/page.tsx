'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeft, ArrowRight, Eye } from 'lucide-react'
import Link from "next/link"
import { PersonalInfoForm } from "@/components/forms/personal-info-form"
import { ProjectsForm } from "@/components/forms/projects-form"
import { ExperienceForm } from "@/components/forms/experience-form"
import { ContactForm } from "@/components/forms/contact-form"
import { PortfolioData } from "@/types/portfolio"

const steps = [
  { id: 1, title: "Personal Info", description: "Basic information about you" },
  { id: 2, title: "Projects", description: "Your best work and projects" },
  { id: 3, title: "Experience", description: "Work experience and skills" },
  { id: 4, title: "Contact", description: "How people can reach you" }
]

const defaultPortfolioData: PortfolioData = {
  personalInfo: {
    name: '',
    title: '',
    bio: '',
    email: '',
    phone: '',
    location: '',
    profileImage: ''
  },
  projects: [],
  experience: [],
  skills: [],
  social: {
    github: '',
    linkedin: '',
    twitter: '',
    website: ''
  },
  testimonials: [],
  contact: {
    email: '',
    message: ''
  }
}

export default function BuilderPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [portfolioData, setPortfolioData] = useState<PortfolioData>(defaultPortfolioData)
  const [isLoaded, setIsLoaded] = useState(false)

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedData = localStorage.getItem('portfolioData')
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData)
        setPortfolioData(parsedData)
      } catch (error) {
        console.error('Error loading saved data:', error)
      }
    }
    setIsLoaded(true)
  }, [])

  // Save data to localStorage whenever portfolioData changes
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('portfolioData', JSON.stringify(portfolioData))
    }
  }, [portfolioData, isLoaded])

  const updatePortfolioData = (section: keyof PortfolioData, data: any) => {
    setPortfolioData(prev => ({
      ...prev,
      [section]: data
    }))
  }

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const progress = (currentStep / steps.length) * 100

  const renderCurrentForm = () => {
    switch (currentStep) {
      case 1:
        return (
          <PersonalInfoForm
            data={portfolioData.personalInfo}
            onUpdate={(data) => updatePortfolioData('personalInfo', data)}
          />
        )
      case 2:
        return (
          <ProjectsForm
            data={portfolioData.projects}
            onUpdate={(data) => updatePortfolioData('projects', data)}
          />
        )
      case 3:
        return (
          <ExperienceForm
            experience={portfolioData.experience}
            skills={portfolioData.skills}
            onUpdateExperience={(data) => updatePortfolioData('experience', data)}
            onUpdateSkills={(data) => updatePortfolioData('skills', data)}
          />
        )
      case 4:
        return (
          <ContactForm
            social={portfolioData.social}
            testimonials={portfolioData.testimonials}
            onUpdateSocial={(data) => updatePortfolioData('social', data)}
            onUpdateTestimonials={(data) => updatePortfolioData('testimonials', data)}
          />
        )
      default:
        return null
    }
  }

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

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
          <Link href="/preview">
            <Button variant="outline" className="flex items-center gap-2">
              <Eye className="w-4 h-4" />
              Preview Portfolio
            </Button>
          </Link>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Build Your Portfolio
            </h1>
            <span className="text-sm text-gray-600 dark:text-gray-400">
              Step {currentStep} of {steps.length}
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          {steps.map((step) => (
            <Card
              key={step.id}
              className={`cursor-pointer transition-all duration-300 ${
                step.id === currentStep
                  ? 'ring-2 ring-blue-500 bg-blue-50 dark:bg-blue-900/20'
                  : step.id < currentStep
                  ? 'bg-green-50 dark:bg-green-900/20'
                  : ''
              }`}
              onClick={() => setCurrentStep(step.id)}
            >
              <CardHeader className="pb-2">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                      step.id === currentStep
                        ? 'bg-blue-500 text-white'
                        : step.id < currentStep
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-200 text-gray-600 dark:bg-gray-700 dark:text-gray-400'
                    }`}
                  >
                    {step.id}
                  </div>
                  <CardTitle className="text-lg">{step.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {step.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Form Content */}
        <Card className="mb-8">
          <CardContent className="p-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                {renderCurrentForm()}
              </motion.div>
            </AnimatePresence>
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={prevStep}
            disabled={currentStep === 1}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Previous
          </Button>
          
          {currentStep === steps.length ? (
            <Link href="/preview">
              <Button className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600">
                Generate Portfolio
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          ) : (
            <Button
              onClick={nextStep}
              className="flex items-center gap-2"
            >
              Next
              <ArrowRight className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
