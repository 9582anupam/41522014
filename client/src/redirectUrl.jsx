import { useEffect } from 'react'
import { useParams } from 'react-router-dom'

function RedirectUrl() {
  const { shortName } = useParams()

  useEffect(() => {
    const fetchAndRedirect = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/v1/url/${shortName}`)
        const data = await response.json()
        
        if (response.ok) {
          window.location.href = data.originalUrl
        } else {
          alert('URL not found or expired')
        }
      } catch (error) {
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