export interface PersonalInfo {
  name: string
  title: string
  bio: string
  email: string
  phone: string
  location: string
  profileImage: string
}

export interface Project {
  id: string
  title: string
  description: string
  image: string
  technologies: string[]
  liveUrl: string
  githubUrl: string
  featured: boolean
}

export interface Experience {
  id: string
  company: string
  position: string
  duration: string
  description: string
  current: boolean
}

export interface SocialLinks {
  github: string
  linkedin: string
  twitter: string
  website: string
}

export interface Testimonial {
  id: string
  name: string
  role: string
  company: string
  content: string
  image: string
}

export interface ContactInfo {
  email: string
  message: string
}

export interface PortfolioData {
  personalInfo: PersonalInfo
  projects: Project[]
  experience: Experience[]
  skills: string[]
  social: SocialLinks
  testimonials: Testimonial[]
  contact: ContactInfo
}
