'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus, Trash2, ExternalLink, Github } from 'lucide-react'
import { Project } from "@/types/portfolio"

interface ProjectsFormProps {
  data: Project[]
  onUpdate: (data: Project[]) => void
}

export function ProjectsForm({ data, onUpdate }: ProjectsFormProps) {
  const [projects, setProjects] = useState<Project[]>(data.length > 0 ? data : [createEmptyProject()])

  function createEmptyProject(): Project {
    return {
      id: Date.now().toString(),
      title: '',
      description: '',
      image: '',
      technologies: [],
      liveUrl: '',
      githubUrl: '',
      featured: false
    }
  }

  const addProject = () => {
    const newProjects = [...projects, createEmptyProject()]
    setProjects(newProjects)
    onUpdate(newProjects)
  }

  const removeProject = (id: string) => {
    const newProjects = projects.filter(p => p.id !== id)
    setProjects(newProjects)
    onUpdate(newProjects)
  }

  const updateProject = (id: string, field: keyof Project, value: any) => {
    const newProjects = projects.map(p => 
      p.id === id ? { ...p, [field]: value } : p
    )
    setProjects(newProjects)
    onUpdate(newProjects)
  }

  const addTechnology = (projectId: string, tech: string) => {
    if (!tech.trim()) return
    
    const project = projects.find(p => p.id === projectId)
    if (project && !project.technologies.includes(tech)) {
      updateProject(projectId, 'technologies', [...project.technologies, tech])
    }
  }

  const removeTechnology = (projectId: string, tech: string) => {
    const project = projects.find(p => p.id === projectId)
    if (project) {
      updateProject(projectId, 'technologies', project.technologies.filter(t => t !== tech))
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Projects
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Showcase your best work and projects. Add at least 2-3 projects to make your portfolio stand out.
          </p>
        </div>
        <Button onClick={addProject} className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Add Project
        </Button>
      </div>

      <div className="space-y-6">
        {projects.map((project, index) => (
          <Card key={project.id} className="relative">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  Project {index + 1}
                  {project.featured && (
                    <Badge variant="secondary">Featured</Badge>
                  )}
                </CardTitle>
                {projects.length > 1 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeProject(project.id)}
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
                  <Label htmlFor={`title-${project.id}`}>Project Title *</Label>
                  <Input
                    id={`title-${project.id}`}
                    value={project.title}
                    onChange={(e) => updateProject(project.id, 'title', e.target.value)}
                    placeholder="My Awesome Project"
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor={`image-${project.id}`}>Project Image URL</Label>
                  <Input
                    id={`image-${project.id}`}
                    value={project.image}
                    onChange={(e) => updateProject(project.id, 'image', e.target.value)}
                    placeholder="https://example.com/project-image.jpg"
                    className="mt-1"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor={`description-${project.id}`}>Description *</Label>
                <Textarea
                  id={`description-${project.id}`}
                  value={project.description}
                  onChange={(e) => updateProject(project.id, 'description', e.target.value)}
                  placeholder="Describe what this project does, the problem it solves, and your role in building it..."
                  className="mt-1 min-h-[100px]"
                />
              </div>

              <div>
                <Label>Technologies Used</Label>
                <div className="mt-2 space-y-2">
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <Badge
                        key={tech}
                        variant="secondary"
                        className="cursor-pointer hover:bg-red-100 hover:text-red-800"
                        onClick={() => removeTechnology(project.id, tech)}
                      >
                        {tech} ×
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Add technology (e.g., React, Node.js)"
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          addTechnology(project.id, e.currentTarget.value)
                          e.currentTarget.value = ''
                        }
                      }}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={(e) => {
                        const input = e.currentTarget.previousElementSibling as HTMLInputElement
                        addTechnology(project.id, input.value)
                        input.value = ''
                      }}
                    >
                      Add
                    </Button>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor={`liveUrl-${project.id}`}>Live Demo URL</Label>
                  <div className="mt-1 relative">
                    <Input
                      id={`liveUrl-${project.id}`}
                      value={project.liveUrl}
                      onChange={(e) => updateProject(project.id, 'liveUrl', e.target.value)}
                      placeholder="https://myproject.com"
                      className="pr-10"
                    />
                    <ExternalLink className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  </div>
                </div>

                <div>
                  <Label htmlFor={`githubUrl-${project.id}`}>GitHub Repository</Label>
                  <div className="mt-1 relative">
                    <Input
                      id={`githubUrl-${project.id}`}
                      value={project.githubUrl}
                      onChange={(e) => updateProject(project.id, 'githubUrl', e.target.value)}
                      placeholder="https://github.com/username/project"
                      className="pr-10"
                    />
                    <Github className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id={`featured-${project.id}`}
                  checked={project.featured}
                  onChange={(e) => updateProject(project.id, 'featured', e.target.checked)}
                  className="rounded"
                />
                <Label htmlFor={`featured-${project.id}`}>
                  Mark as featured project
                </Label>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
