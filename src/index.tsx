import ReactDOM from 'react-dom/client'
import { App } from './App'
import { Auth0Provider } from '@auth0/auth0-react'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Auth0Provider
    domain="dev-pgobo3tr621jp6nd.us.auth0.com"
    clientId="Bg71tT5rkNkwWLWPYF7MRbydliA8Jdxj"
    authorizationParams={{
      redirect_uri: window.location.origin,
    }}
  >
    <App />
  </Auth0Provider>
)
