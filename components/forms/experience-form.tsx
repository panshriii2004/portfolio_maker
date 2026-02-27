'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus, Trash2, Briefcase, Award } from 'lucide-react'
import { Experience } from "@/types/portfolio"

interface ExperienceFormProps {
  experience: Experience[]
  skills: string[]
  onUpdateExperience: (data: Experience[]) => void
  onUpdateSkills: (data: string[]) => void
}

export function ExperienceForm({ experience, skills, onUpdateExperience, onUpdateSkills }: ExperienceFormProps) {
  const [experienceList, setExperienceList] = useState<Experience[]>(
    experience.length > 0 ? experience : [createEmptyExperience()]
  )
  const [skillsList, setSkillsList] = useState<string[]>(skills)

  function createEmptyExperience(): Experience {
    return {
      id: Date.now().toString(),
      company: '',
      position: '',
      duration: '',
      description: '',
      current: false
    }
  }

  const addExperience = () => {
    const newExperience = [...experienceList, createEmptyExperience()]
    setExperienceList(newExperience)
    onUpdateExperience(newExperience)
  }

  const removeExperience = (id: string) => {
    const newExperience = experienceList.filter(e => e.id !== id)
    setExperienceList(newExperience)
    onUpdateExperience(newExperience)
  }

  const updateExperience = (id: string, field: keyof Experience, value: any) => {
    const newExperience = experienceList.map(e => 
      e.id === id ? { ...e, [field]: value } : e
    )
    setExperienceList(newExperience)
    onUpdateExperience(newExperience)
  }

  const addSkill = (skill: string) => {
    if (!skill.trim() || skillsList.includes(skill)) return
    
    const newSkills = [...skillsList, skill]
    setSkillsList(newSkills)
    onUpdateSkills(newSkills)
  }

  const removeSkill = (skill: string) => {
    const newSkills = skillsList.filter(s => s !== skill)
    setSkillsList(newSkills)
    onUpdateSkills(newSkills)
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Experience & Skills
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Add your work experience and technical skills to showcase your professional background.
        </p>
      </div>

      {/* Experience Section */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Briefcase className="w-5 h-5" />
              Work Experience
            </CardTitle>
            <Button onClick={addExperience} variant="outline" size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Add Experience
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {experienceList.map((exp, index) => (
            <Card key={exp.id} className="border-l-4 border-l-blue-500">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold">Experience {index + 1}</h4>
                  {experienceList.length > 1 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeExperience(exp.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor={`company-${exp.id}`}>Company *</Label>
                    <Input
                      id={`company-${exp.id}`}
                      value={exp.company}
                      onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                      placeholder="Google"
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor={`position-${exp.id}`}>Position *</Label>
                    <Input
                      id={`position-${exp.id}`}
                      value={exp.position}
                      onChange={(e) => updateExperience(exp.id, 'position', e.target.value)}
                      placeholder="Senior Software Engineer"
                      className="mt-1"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor={`duration-${exp.id}`}>Duration *</Label>
                  <Input
                    id={`duration-${exp.id}`}
                    value={exp.duration}
                    onChange={(e) => updateExperience(exp.id, 'duration', e.target.value)}
                    placeholder="Jan 2020 - Present"
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor={`description-${exp.id}`}>Description</Label>
                  <Textarea
                    id={`description-${exp.id}`}
                    value={exp.description}
                    onChange={(e) => updateExperience(exp.id, 'description', e.target.value)}
                    placeholder="Describe your responsibilities, achievements, and impact..."
                    className="mt-1 min-h-[100px]"
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id={`current-${exp.id}`}
                    checked={exp.current}
                    onChange={(e) => updateExperience(exp.id, 'current', e.target.checked)}
                    className="rounded"
                  />
                  <Label htmlFor={`current-${exp.id}`}>
                    This is my current position
                  </Label>
                </div>
              </CardContent>
            </Card>
          ))}
        </CardContent>
      </Card>

      {/* Skills Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="w-5 h-5" />
            Technical Skills
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Your Skills</Label>
            <div className="mt-2 space-y-3">
              <div className="flex flex-wrap gap-2">
                {skillsList.map((skill) => (
                  <Badge
                    key={skill}
                    variant="secondary"
                    className="cursor-pointer hover:bg-red-100 hover:text-red-800"
                    onClick={() => removeSkill(skill)}
                  >
                    {skill} ×
                  </Badge>
                ))}
              </div>
              <div className="flex gap-2">
                <Input
                  placeholder="Add a skill (e.g., JavaScript, Python, Design)"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      addSkill(e.currentTarget.value)
                      e.currentTarget.value = ''
                    }
                  }}
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={(e) => {
                    const input = e.currentTarget.previousElementSibling as HTMLInputElement
                    addSkill(input.value)
                    input.value = ''
                  }}
                >
                  Add
                </Button>
              </div>
            </div>
            <p className="text-sm text-gray-500 mt-2">
              Add your technical skills, programming languages, frameworks, and tools.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
