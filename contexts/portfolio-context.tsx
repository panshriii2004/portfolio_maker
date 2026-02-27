'use client'

import { createContext, useContext, useState, ReactNode } from 'react'
import { PortfolioData } from '@/types/portfolio'

interface PortfolioContextType {
  portfolioData: PortfolioData
  updatePortfolioData: (section: keyof PortfolioData, data: any) => void
  setPortfolioData: (data: PortfolioData) => void
}

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

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined)

export function PortfolioProvider({ children }: { children: ReactNode }) {
  const [portfolioData, setPortfolioDataState] = useState<PortfolioData>(defaultPortfolioData)

  const updatePortfolioData = (section: keyof PortfolioData, data: any) => {
    setPortfolioDataState(prev => ({
      ...prev,
      [section]: data
    }))
  }

  const setPortfolioData = (data: PortfolioData) => {
    setPortfolioDataState(data)
  }

  return (
    <PortfolioContext.Provider value={{
      portfolioData,
      updatePortfolioData,
      setPortfolioData
    }}>
      {children}
    </PortfolioContext.Provider>
  )
}

export function usePortfolio() {
  const context = useContext(PortfolioContext)
  if (context === undefined) {
    throw new Error('usePortfolio must be used within a PortfolioProvider')
  }
  return context
}
