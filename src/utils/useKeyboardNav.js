import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export function useKeyboardNav() {
  const navigate = useNavigate()

  useEffect(() => {
    const handleKeyPress = (e) => {
      // Only trigger if user is not typing in an input
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
        return
      }

      // Keyboard shortcuts with Alt key
      if (e.altKey) {
        switch (e.key) {
          case 'd':
            navigate('/dashboard')
            break
          case 'i':
            navigate('/fund-suggestions')
            break
          case 'p':
            navigate('/profile-form')
            break
          case 's':
            navigate('/settings')
            break
          default:
            break
        }
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [navigate])
}