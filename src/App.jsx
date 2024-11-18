import './App.css'
import { useState, useEffect } from 'react'
import { supabase } from './supabaseClient.js'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import MapPage from './MapPage.jsx'
import MapAddPage from './MapAddPage.jsx'
import MapEditPage from './MapEditPage.jsx'
import MapDeletePage from './MapDeletePage.jsx'
import SignUpPage from './SignUpPage.jsx'
import SignInPage from './SignInPage.jsx'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const nonAuthenticatedRouting = [
    { path: '/', component: <MapPage /> },
    { path: '/map', component: <MapPage /> },
    { path: '/sign_up', component: <SignUpPage /> },
    { path: '/sign_in', component: <SignInPage /> },
    // make the private routes redirect to sign in
    { path: '/map_edit', component: <SignInPage /> },
    { path: '/map_add', component: <SignInPage /> },
    { path: '/map_delete', component: <SignInPage /> }
  ]

  const authenticatedRouting = [
    { path: '/', component: <MapPage /> },
    { path: '/map', component: <MapPage /> },
    { path: '/sign_up', component: <SignUpPage /> },
    { path: '/sign_in', component: <SignInPage /> },
    { path: '/map_edit', component: <MapEditPage /> },
    { path: '/map_add', component: <MapAddPage /> },
    { path: '/map_delete', component: <MapDeletePage /> }
  ]

  useEffect(() => {
    // Optional: Listen for session changes
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        setIsLoggedIn(session.user.role == 'authenticated')
      }
    });

    // Clean up listener on component unmount
    // return () => {
    //   authListener?.unsubscribe();
    // };
  })

  return (
    <Router>
      <Routes>
        {!isLoggedIn && nonAuthenticatedRouting.map((route, index) => (
          <Route
            key={index}
            path={route.path}
            element={route.component}
          />
        ))}
        {isLoggedIn && authenticatedRouting.map((route, index) => (
          <Route
            key={index}
            path={route.path}
            element={route.component}
          />
        ))}
      </Routes>
    </Router>);
}

export default App;
