import '@/styles/globals.css'

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

import App from '@/_app.tsx'
import { Toaster } from '@/components/ui'
import { Auth0ConfigError } from '@/config-error.tsx'
import { Auth0Provider } from '@auth0/auth0-react'

const root = createRoot(document.getElementById('root') as HTMLElement)

const auth0Domain = import.meta.env.AUTH0_DOMAIN
const auth0ClientId = import.meta.env.AUTH0_CLIENT_ID
const auth0Audience = import.meta.env.AUTH0_AUDIENCE

root.render(
  <StrictMode>
    <BrowserRouter>
      {!auth0Domain || !auth0ClientId ? (
        <Auth0ConfigError />
      ) : (
        <Auth0Provider
          domain={auth0Domain}
          clientId={auth0ClientId}
          cacheLocation="localstorage"
          authorizationParams={{
            redirect_uri: window.location.origin,
            audience: auth0Audience,
          }}
        >
          <Toaster />
          <App />
        </Auth0Provider>
      )}
    </BrowserRouter>
  </StrictMode>
)
