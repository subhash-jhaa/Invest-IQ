import { createContext, useContext, useState, useEffect } from 'react'
import { useAuth } from './AuthContext'
import { databaseService } from '../services/databaseService'

const ProfileContext = createContext(null)

export function ProfileProvider({ children }) {
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const { user, isAuthenticated } = useAuth()

  // Fetch profile when authenticated
  useEffect(() => {
    const fetchProfile = async () => {
      if (!isAuthenticated || !user) {
        setProfile(null)
        setLoading(false)
        return
      }

      try {
        const result = await databaseService.getUserProfile(user.$id)
        if (result.success) {
          setProfile(result.data)
        }
      } catch (error) {
        console.error('Error fetching profile:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchProfile()
  }, [isAuthenticated, user])

  const updateProfile = async (formData) => {
    if (!user) return

    try {
      setLoading(true)
      const existingProfile = await databaseService.getUserProfile(user.$id)
      
      let result
      if (!existingProfile?.success) {
        // Create new profile
        result = await databaseService.createUserProfile(user.$id, formData)
      } else {
        // Update existing profile
        result = await databaseService.updateUserProfile(user.$id, formData)
      }

      if (result.success) {
        setProfile(result.data)
      }
      return result
    } catch (error) {
      console.error('Error updating profile:', error)
      return { success: false, error: error.message }
    } finally {
      setLoading(false)
    }
  }

  return (
    <ProfileContext.Provider value={{ profile, loading, updateProfile }}>
      {children}
    </ProfileContext.Provider>
  )
}

export const useProfile = () => {
  const context = useContext(ProfileContext)
  if (!context) {
    throw new Error('useProfile must be used within a ProfileProvider')
  }
  return context
}