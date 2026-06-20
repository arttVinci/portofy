import { renderHook, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useUploadAchievementImage } from '../hooks/mutations/achievement/useUploadAchievementImage'
import { useUploadProjectImage } from '../hooks/mutations/project/useUploadProjectImage'
import { useUploadEducationImage } from '../hooks/mutations/education/useUploadEducationImage'
import { useUploadExperienceImage } from '../hooks/mutations/experience/useUploadExperienceImage'
import { describe, it, expect, vi } from 'vitest'
import achievementService from '../services/achievement.service'
import projectService from '../services/project.service'
import educationService from '../services/education.service'
import experienceService from '../services/experience.service'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: false },
    mutations: { retry: false }
  }
})

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
)

describe('Upload Hooks Tests', () => {
  it('Achievement - should successfully call uploadImage service', async () => {
    const mockUpload = vi.spyOn(achievementService, 'uploadImage').mockResolvedValue('https://dummyimage.com/1')
    const { result } = renderHook(() => useUploadAchievementImage(), { wrapper })

    const formData = new FormData()
    formData.append('image', new Blob(['test'], { type: 'image/png' }))
    
    result.current.mutate(formData)

    await waitFor(() => expect(result.current.isSuccess).toBe(true))
    expect(mockUpload).toHaveBeenCalledWith(formData)
    expect(result.current.data).toBe('https://dummyimage.com/1')
  })

  it('Project - should successfully call uploadImage service', async () => {
    const mockUpload = vi.spyOn(projectService, 'uploadImage').mockResolvedValue('https://dummyimage.com/2')
    const { result } = renderHook(() => useUploadProjectImage(), { wrapper })

    const formData = new FormData()
    formData.append('image', new Blob(['test'], { type: 'image/png' }))
    
    result.current.mutate(formData)

    await waitFor(() => expect(result.current.isSuccess).toBe(true))
    expect(mockUpload).toHaveBeenCalledWith(formData)
    expect(result.current.data).toBe('https://dummyimage.com/2')
  })

  it('Education - should successfully call uploadImage service', async () => {
    const mockUpload = vi.spyOn(educationService, 'uploadImage').mockResolvedValue('https://dummyimage.com/3')
    const { result } = renderHook(() => useUploadEducationImage(), { wrapper })

    const formData = new FormData()
    formData.append('image', new Blob(['test'], { type: 'image/png' }))
    
    result.current.mutate(formData)

    await waitFor(() => expect(result.current.isSuccess).toBe(true))
    expect(mockUpload).toHaveBeenCalledWith(formData)
    expect(result.current.data).toBe('https://dummyimage.com/3')
  })

  it('Experience - should successfully call uploadImage service', async () => {
    const mockUpload = vi.spyOn(experienceService, 'uploadImage').mockResolvedValue('https://dummyimage.com/4')
    const { result } = renderHook(() => useUploadExperienceImage(), { wrapper })

    const formData = new FormData()
    formData.append('image', new Blob(['test'], { type: 'image/png' }))
    
    result.current.mutate(formData)

    await waitFor(() => expect(result.current.isSuccess).toBe(true))
    expect(mockUpload).toHaveBeenCalledWith(formData)
    expect(result.current.data).toBe('https://dummyimage.com/4')
  })
})
