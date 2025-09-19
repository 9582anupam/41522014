import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import MakeUrl from './makeUrl.jsx'
import RedirectUrl from './redirectUrl.jsx'
import './App.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MakeUrl />} />
        <Route path="/:shortName" element={<RedirectUrl />} />
      </Routes>
    </Router>
  )
}

export default App
