import { ThemeProvider } from '@emotion/react'
import theme from './utils/themes/theme'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './styles.css'
import Dashboard from './pages/Dashboard'
import BreweryDetails from './pages/BreweryDetails'

export const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/brewery/:id" element={<BreweryDetails />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}
