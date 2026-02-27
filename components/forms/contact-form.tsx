'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Trash2, Github, Linkedin, Twitter, Globe, MessageSquare, Star } from 'lucide-react'
import { SocialLinks, Testimonial } from "@/types/portfolio"

interface ContactFormProps {
  social: SocialLinks
  testimonials: Testimonial[]
  onUpdateSocial: (data: SocialLinks) => void
  onUpdateTestimonials: (data: Testimonial[]) => void
}

export function ContactForm({ social, testimonials, onUpdateSocial, onUpdateTestimonials }: ContactFormProps) {
  const [socialData, setSocialData] = useState<SocialLinks>(social)
  const [testimonialsList, setTestimonialsList] = useState<Testimonial[]>(testimonials)

  const updateSocial = (field: keyof SocialLinks, value: string) => {
    const updatedSocial = { ...socialData, [field]: value }
    setSocialData(updatedSocial)
    onUpdateSocial(updatedSocial)
  }

  const createEmptyTestimonial = (): Testimonial => ({
    id: Date.now().toString(),
    name: '',
    role: '',
    company: '',
    content: '',
    image: ''
  })

  const addTestimonial = () => {
    const newTestimonials = [...testimonialsList, createEmptyTestimonial()]
    setTestimonialsList(newTestimonials)
    onUpdateTestimonials(newTestimonials)
  }

  const removeTestimonial = (id: string) => {
    const newTestimonials = testimonialsList.filter(t => t.id !== id)
    setTestimonialsList(newTestimonials)
    onUpdateTestimonials(newTestimonials)
  }

  const updateTestimonial = (id: string, field: keyof Testimonial, value: string) => {
    const newTestimonials = testimonialsList.map(t => 
      t.id === id ? { ...t, [field]: value } : t
    )
    setTestimonialsList(newTestimonials)
    onUpdateTestimonials(newTestimonials)
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Contact & Social
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Add your social media links and testimonials to build credibility and make it easy for people to connect with you.
        </p>
      </div>

      {/* Social Links */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5" />
            Social Media Links
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="github" className="flex items-center gap-2">
                <Github className="w-4 h-4" />
                GitHub
              </Label>
              <Input
                id="github"
                value={socialData.github}
                onChange={(e) => updateSocial('github', e.target.value)}
                placeholder="https://github.com/username"
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="linkedin" className="flex items-center gap-2">
                <Linkedin className="w-4 h-4" />
                LinkedIn
              </Label>
              <Input
                id="linkedin"
                value={socialData.linkedin}
                onChange={(e) => updateSocial('linkedin', e.target.value)}
                placeholder="https://linkedin.com/in/username"
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="twitter" className="flex items-center gap-2">
                <Twitter className="w-4 h-4" />
                Twitter
              </Label>
              <Input
                id="twitter"
                value={socialData.twitter}
                onChange={(e) => updateSocial('twitter', e.target.value)}
                placeholder="https://twitter.com/username"
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="website" className="flex items-center gap-2">
                <Globe className="w-4 h-4" />
                Personal Website
              </Label>
              <Input
                id="website"
                value={socialData.website}
                onChange={(e) => updateSocial('website', e.target.value)}
                placeholder="https://yourwebsite.com"
                className="mt-1"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Testimonials */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Star className="w-5 h-5" />
              Testimonials
            </CardTitle>
            <Button onClick={addTestimonial} variant="outline" size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Add Testimonial
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {testimonialsList.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <Star className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>No testimonials yet. Add some to build credibility!</p>
              <Button onClick={addTestimonial} className="mt-4">
                Add Your First Testimonial
              </Button>
            </div>
          ) : (
            testimonialsList.map((testimonial, index) => (
              <Card key={testimonial.id} className="border-l-4 border-l-yellow-500">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold">Testimonial {index + 1}</h4>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeTestimonial(testimonial.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor={`content-${testimonial.id}`}>Testimonial Content *</Label>
                    <Textarea
                      id={`content-${testimonial.id}`}
                      value={testimonial.content}
                      onChange={(e) => updateTestimonial(testimonial.id, 'content', e.target.value)}
                      placeholder="John is an exceptional developer who delivered outstanding results..."
                      className="mt-1 min-h-[100px]"
                    />
                  </div>

                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor={`name-${testimonial.id}`}>Name *</Label>
                      <Input
                        id={`name-${testimonial.id}`}
                        value={testimonial.name}
                        onChange={(e) => updateTestimonial(testimonial.id, 'name', e.target.value)}
                        placeholder="Jane Smith"
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor={`role-${testimonial.id}`}>Role *</Label>
                      <Input
                        id={`role-${testimonial.id}`}
                        value={testimonial.role}
                        onChange={(e) => updateTestimonial(testimonial.id, 'role', e.target.value)}
                        placeholder="Product Manager"
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor={`company-${testimonial.id}`}>Company</Label>
                      <Input
                        id={`company-${testimonial.id}`}
                        value={testimonial.company}
                        onChange={(e) => updateTestimonial(testimonial.id, 'company', e.target.value)}
                        placeholder="Tech Corp"
                        className="mt-1"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor={`image-${testimonial.id}`}>Profile Image URL</Label>
                    <Input
                      id={`image-${testimonial.id}`}
                      value={testimonial.image}
                      onChange={(e) => updateTestimonial(testimonial.id, 'image', e.target.value)}
                      placeholder="https://example.com/profile.jpg"
                      className="mt-1"
                    />
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </CardContent>
      </Card>
    </div>
  )
}
