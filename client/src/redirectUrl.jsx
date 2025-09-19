import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { logSuccess, logError, logWarning } from './utils/sendLogs.js'

function RedirectUrl() {
  const { shortName } = useParams()

  useEffect(() => {
    const fetchAndRedirect = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/v1/url/${shortName}`)
        const data = await response.json()
        
        if (response.ok) {
          logSuccess(`Redirect: ${shortName}`, 'component')
          window.location.href = data.originalUrl
        } else {
          logWarning(`URL not found: ${shortName}`, 'component')
          alert('URL not found or expired')
        }
      } catch (error) {
        logError(`Redirect error: ${error.message}`, 'component')
        console.error('Error:', error)
        alert('Error fetching URL')
      }
    }

    if (shortName) {
      fetchAndRedirect()
    }
  }, [shortName])

  return (<div>Redirecting...</div>)
}

export default RedirectUrl;