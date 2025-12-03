import { useEffect } from 'react'
import { FiX, FiCheck, FiAlertCircle } from 'react-icons/fi'

export default function Toast({ message, type = 'success', onClose, duration = 3000 }) {
  useEffect(() => {
    const timer = setTimeout(() => onClose?.(), duration)
    return () => clearTimeout(timer)
  }, [duration, onClose])

  const icons = {
    success: <FiCheck className="w-5 h-5" />,
    error: <FiAlertCircle className="w-5 h-5" />
  }

  const styles = {
    success: 'bg-emerald-500',
    error: 'bg-red-500'
  }

  return (
    <div className={`fixed top-4 right-4 z-50 ${styles[type]} text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-2`}>
      {icons[type]}
      <span>{message}</span>
      <button 
        onClick={() => onClose?.()}
        className="ml-2 hover:opacity-75"
      >
        <FiX className="w-5 h-5" />
      </button>
    </div>
  )
}