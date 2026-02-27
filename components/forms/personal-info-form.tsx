'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Upload, User } from 'lucide-react'
import { PersonalInfo } from "@/types/portfolio"

interface PersonalInfoFormProps {
  data: PersonalInfo
  onUpdate: (data: PersonalInfo) => void
}

export function PersonalInfoForm({ data, onUpdate }: PersonalInfoFormProps) {
  const [formData, setFormData] = useState<PersonalInfo>(data)

  const handleChange = (field: keyof PersonalInfo, value: string) => {
    const updatedData = { ...formData, [field]: value }
    setFormData(updatedData)
    onUpdate(updatedData)
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Personal Information
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Tell us about yourself. This information will be displayed prominently on your portfolio.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5" />
              Basic Info
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="name">Full Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                placeholder="John Doe"
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="title">Professional Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleChange('title', e.target.value)}
                placeholder="Full Stack Developer"
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="email">Email Address *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)}
                placeholder="john@example.com"
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
                placeholder="+1 (555) 123-4567"
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => handleChange('location', e.target.value)}
                placeholder="San Francisco, CA"
                className="mt-1"
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Profile & Bio</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="profileImage">Profile Image URL</Label>
              <div className="mt-1 space-y-2">
                <Input
                  id="profileImage"
                  value={formData.profileImage}
                  onChange={(e) => handleChange('profileImage', e.target.value)}
                  placeholder="https://example.com/profile.jpg"
                />
                <Button variant="outline" size="sm" className="w-full">
                  <Upload className="w-4 h-4 mr-2" />
                  Upload Image
                </Button>
              </div>
            </div>

            <div>
              <Label htmlFor="bio">Bio / About Me *</Label>
              <Textarea
                id="bio"
                value={formData.bio}
                onChange={(e) => handleChange('bio', e.target.value)}
                placeholder="I'm a passionate full-stack developer with 5+ years of experience building web applications..."
                className="mt-1 min-h-[120px]"
              />
              <p className="text-sm text-gray-500 mt-1">
                Write a compelling bio that highlights your expertise and personality.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
