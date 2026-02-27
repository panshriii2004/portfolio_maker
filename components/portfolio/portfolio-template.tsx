'use client'

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Github, Linkedin, Twitter, Globe, ExternalLink, Mail, Phone, MapPin, Star, Quote } from 'lucide-react'
import Image from "next/image"
import { PortfolioData } from "@/types/portfolio"

interface PortfolioTemplateProps {
  data: PortfolioData
}

export function PortfolioTemplate({ data }: PortfolioTemplateProps) {
  const { personalInfo, projects, experience, skills, social, testimonials } = data

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900">
        <div className="container mx-auto px-4 py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            {personalInfo.profileImage && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="mb-8"
              >
                <Image
                  src={personalInfo.profileImage || "/placeholder.svg?height=200&width=200"}
                  alt={personalInfo.name}
                  width={200}
                  height={200}
                  className="rounded-full mx-auto border-4 border-white shadow-xl"
                />
              </motion.div>
            )}
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-6"
            >
              {personalInfo.name || "Your Name"}
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-2xl text-gray-600 dark:text-gray-300 mb-8"
            >
              {personalInfo.title || "Your Professional Title"}
            </motion.p>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-lg text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto"
            >
              {personalInfo.bio || "Your professional bio will appear here..."}
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="flex flex-wrap justify-center gap-4"
            >
              {social.github && (
                <Button variant="outline" size="lg" asChild>
                  <a href={social.github} target="_blank" rel="noopener noreferrer">
                    <Github className="w-5 h-5 mr-2" />
                    GitHub
                  </a>
                </Button>
              )}
              {social.linkedin && (
                <Button variant="outline" size="lg" asChild>
                  <a href={social.linkedin} target="_blank" rel="noopener noreferrer">
                    <Linkedin className="w-5 h-5 mr-2" />
                    LinkedIn
                  </a>
                </Button>
              )}
              {social.twitter && (
                <Button variant="outline" size="lg" asChild>
                  <a href={social.twitter} target="_blank" rel="noopener noreferrer">
                    <Twitter className="w-5 h-5 mr-2" />
                    Twitter
                  </a>
                </Button>
              )}
              {personalInfo.email && (
                <Button size="lg" asChild>
                  <a href={`mailto:${personalInfo.email}`}>
                    <Mail className="w-5 h-5 mr-2" />
                    Contact Me
                  </a>
                </Button>
              )}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-4xl font-bold text-center mb-16 text-gray-900 dark:text-white">
              About Me
            </h2>
            
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                  {personalInfo.bio || "Your detailed bio will appear here..."}
                </p>
                
                <div className="space-y-3">
                  {personalInfo.email && (
                    <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
                      <Mail className="w-5 h-5" />
                      <span>{personalInfo.email}</span>
                    </div>
                  )}
                  {personalInfo.phone && (
                    <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
                      <Phone className="w-5 h-5" />
                      <span>{personalInfo.phone}</span>
                    </div>
                  )}
                  {personalInfo.location && (
                    <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
                      <MapPin className="w-5 h-5" />
                      <span>{personalInfo.location}</span>
                    </div>
                  )}
                </div>
              </div>
              
              <div>
                <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
                  Skills & Technologies
                </h3>
                <div className="flex flex-wrap gap-3">
                  {skills.map((skill) => (
                    <Badge key={skill} variant="secondary" className="text-sm py-2 px-4">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Projects Section */}
      {projects.length > 0 && (
        <section className="py-20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl font-bold text-center mb-16 text-gray-900 dark:text-white">
                Featured Projects
              </h2>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projects.map((project, index) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.6 }}
                  >
                    <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                      {project.image && (
                        <div className="aspect-video relative overflow-hidden rounded-t-lg">
                          <Image
                            src={project.image || "/placeholder.svg?height=200&width=400"}
                            alt={project.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                      )}
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                            {project.title}
                          </h3>
                          {project.featured && (
                            <Badge className="bg-yellow-100 text-yellow-800">
                              Featured
                            </Badge>
                          )}
                        </div>
                        
                        <p className="text-gray-600 dark:text-gray-300 mb-4">
                          {project.description}
                        </p>
                        
                        <div className="flex flex-wrap gap-2 mb-4">
                          {project.technologies.map((tech) => (
                            <Badge key={tech} variant="outline" className="text-xs">
                              {tech}
                            </Badge>
                          ))}
                        </div>
                        
                        <div className="flex gap-3">
                          {project.liveUrl && (
                            <Button size="sm" asChild>
                              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                                <ExternalLink className="w-4 h-4 mr-2" />
                                Live Demo
                              </a>
                            </Button>
                          )}
                          {project.githubUrl && (
                            <Button variant="outline" size="sm" asChild>
                              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                                <Github className="w-4 h-4 mr-2" />
                                Code
                              </a>
                            </Button>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Experience Section */}
      {experience.length > 0 && (
        <section className="py-20 bg-gray-50 dark:bg-gray-800">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl font-bold text-center mb-16 text-gray-900 dark:text-white">
                Work Experience
              </h2>
              
              <div className="max-w-4xl mx-auto">
                {experience.map((exp, index) => (
                  <motion.div
                    key={exp.id}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.6 }}
                    className="relative pl-8 pb-12 last:pb-0"
                  >
                    <div className="absolute left-0 top-0 w-4 h-4 bg-blue-500 rounded-full"></div>
                    <div className="absolute left-2 top-4 w-0.5 h-full bg-gray-200 dark:bg-gray-600"></div>
                    
                    <Card className="ml-6">
                      <CardContent className="p-6">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                          <div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                              {exp.position}
                            </h3>
                            <p className="text-lg text-blue-600 dark:text-blue-400 font-medium">
                              {exp.company}
                            </p>
                          </div>
                          <div className="flex items-center gap-2 mt-2 md:mt-0">
                            <Badge variant="outline">{exp.duration}</Badge>
                            {exp.current && (
                              <Badge className="bg-green-100 text-green-800">Current</Badge>
                            )}
                          </div>
                        </div>
                        
                        {exp.description && (
                          <p className="text-gray-600 dark:text-gray-300">
                            {exp.description}
                          </p>
                        )}
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Testimonials Section */}
      {testimonials.length > 0 && (
        <section className="py-20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl font-bold text-center mb-16 text-gray-900 dark:text-white">
                What People Say
              </h2>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {testimonials.map((testimonial, index) => (
                  <motion.div
                    key={testimonial.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.6 }}
                  >
                    <Card className="h-full">
                      <CardContent className="p-6">
                        <Quote className="w-8 h-8 text-blue-500 mb-4" />
                        <p className="text-gray-600 dark:text-gray-300 mb-6 italic">
                          "{testimonial.content}"
                        </p>
                        
                        <div className="flex items-center gap-4">
                          {testimonial.image && (
                            <Image
                              src={testimonial.image || "/placeholder.svg?height=50&width=50"}
                              alt={testimonial.name}
                              width={50}
                              height={50}
                              className="rounded-full"
                            />
                          )}
                          <div>
                            <p className="font-semibold text-gray-900 dark:text-white">
                              {testimonial.name}
                            </p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {testimonial.role}
                              {testimonial.company && ` at ${testimonial.company}`}
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex gap-1 mt-4">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Contact Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center text-white"
          >
            <h2 className="text-4xl font-bold mb-8">
              Let's Work Together
            </h2>
            <p className="text-xl mb-12 opacity-90 max-w-2xl mx-auto">
              I'm always interested in new opportunities and exciting projects. 
              Let's discuss how we can bring your ideas to life.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4">
              {personalInfo.email && (
                <Button size="lg" variant="secondary" asChild>
                  <a href={`mailto:${personalInfo.email}`}>
                    <Mail className="w-5 h-5 mr-2" />
                    Send Email
                  </a>
                </Button>
              )}
              {social.linkedin && (
                <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-blue-600" asChild>
                  <a href={social.linkedin} target="_blank" rel="noopener noreferrer">
                    <Linkedin className="w-5 h-5 mr-2" />
                    Connect on LinkedIn
                  </a>
                </Button>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-gray-900 text-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <p className="text-gray-400 mb-4 md:mb-0">
              © {new Date().getFullYear()} {personalInfo.name || "Your Name"}. All rights reserved.
            </p>
            
            <div className="flex gap-4">
              {social.github && (
                <a href={social.github} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                  <Github className="w-5 h-5" />
                </a>
              )}
              {social.linkedin && (
                <a href={social.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                  <Linkedin className="w-5 h-5" />
                </a>
              )}
              {social.twitter && (
                <a href={social.twitter} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                  <Twitter className="w-5 h-5" />
                </a>
              )}
              {social.website && (
                <a href={social.website} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                  <Globe className="w-5 h-5" />
                </a>
              )}
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
