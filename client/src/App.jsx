import React, { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import UserAuthForm from './pages/UserAuthForm'
import { createContext, useContext, useState } from 'react'
import { lookInSession } from './common/session'

export const UserContext = createContext()

const App = () => {
  const [userAuth, setUserAuth] = useState({})

  useEffect(() => {
    let userInSession = lookInSession('user');
    if (userInSession) {
      setUserAuth(JSON.parse(userInSession));
    }else{
      setUserAuth({access_token: null});
    }
  }
  , [])

  return (
    <UserContext.Provider value={{userAuth, setUserAuth}}>
    <Routes>
      <Route path='/' element={<Navbar/>}>
        <Route path='signin' element={<UserAuthForm type="sign-in"/>}/>
        <Route path='signup' element={<UserAuthForm type="sign-up"/>}/>
      </Route>
    </Routes>
    </UserContext.Provider>
  )
}

export default App