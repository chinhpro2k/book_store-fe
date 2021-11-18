import React, { useEffect } from 'react'
import { Route, Redirect } from 'react-router-dom'
import local from 'services/local'

function ProtectedRoute({
  component: Component,
  isProtected,
  redirectUrl,
  subRoutes,
  ...restProps
}) {
  let isAuthenticated = false

  if (isProtected) {
    const token = local.get('token')
    isAuthenticated = token
  }


  return (
    <Route
      {...restProps}
      render={(props) =>
        (isProtected && !isAuthenticated )? (
          <Redirect to={redirectUrl} />
        ) : (
          <Component {...props} subRoutes={subRoutes} />
        )
      }
    />
  )
}

export default ProtectedRoute
