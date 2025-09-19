import { useState } from 'react'

function MakeUrl() {
  const [originalUrl, setOriginalUrl] = useState('')
  const [shortName, setShortName] = useState('')
  const [validity, setValidity] = useState(30)
  const [shortUrl, setShortUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!originalUrl) {
      setError('Please enter a URL to shorten')
      return
    }

    setLoading(true)
    setError('')
    setSuccess('')

    try {
      const response = await fetch('http://localhost:5000/api/v1/url/shorten', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          originalUrl,
          shortName: shortName || undefined,
          validity
        })
      })

      const data = await response.json()

      if (response.ok) {
        setShortUrl(`http://localhost:3000/${data.data.shortUrl}`)
        setSuccess('URL shortened successfully!')
        setOriginalUrl('')
        setShortName('')
      } else {
        setError(data.error || 'Failed to shorten URL')
      }
    } catch (error) {
      setError('Network error. Please try again.')
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shortUrl)
    setSuccess('Copied to clipboard!')
  }

  return (
    <div>
      <h1>URL Shortener</h1>
      
      <form onSubmit={handleSubmit}>
        <div>
          <label>Enter your long URL</label>
          <input
            type="url"
            value={originalUrl}
            onChange={(e) => setOriginalUrl(e.target.value)}
            placeholder="https://example.com/very/long/url"
            required
          />
        </div>
        
        <div>
          <label>Custom short name (optional)</label>
          <input
            type="text"
            value={shortName}
            onChange={(e) => setShortName(e.target.value)}
            placeholder="my-link"
          />
          <small>Leave empty for random name</small>
        </div>
        
        <div>
          <label>Validity (minutes)</label>
          <input
            type="number"
            value={validity}
            onChange={(e) => setValidity(e.target.value)}
            min="1"
          />
        </div>
        
        <button type="submit" disabled={loading}>
          {loading ? 'Shortening...' : 'Shorten URL'}
        </button>
      </form>

      {error && <div style={{color: 'red'}}>{error}</div>}
      {success && <div style={{color: 'green'}}>{success}</div>}

      {shortUrl && (
        <div>
          <h3>Your shortened URL:</h3>
          <input type="text" value={shortUrl} readOnly />
          <button onClick={copyToClipboard}>Copy</button>
        </div>
      )}
    </div>
  )
}

export default MakeUrl