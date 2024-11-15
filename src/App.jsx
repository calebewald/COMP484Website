import './App.css'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import MapPage from './MapPage.jsx'
import MapAddPage from './MapAddPage.jsx'
import MapEditPage from './MapEditPage.jsx'
import MapDeletePage from './MapDeletePage.jsx'
import SignUpPage from './SignUpPage.jsx'
import SignInPage from './SignInPage.jsx'

function App() {

  const htmlroutes = [
    { path: '/', component: <MapPage /> },
    { path: '/sign_up', component: <SignUpPage /> },
    { path: '/sign_in', component: <SignInPage /> },
    { path: '/map_edit', component: <MapEditPage /> },
    { path: '/map_add', component: <MapAddPage /> },
    { path: '/map_delete', component: <MapDeletePage /> }
  ]

  return (
    <Router>
      <Routes>
        {htmlroutes.map((route, index) => (
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
