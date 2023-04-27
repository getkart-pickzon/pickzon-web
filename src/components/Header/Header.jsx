import React from 'react'
import { useLocation } from 'react-router-dom'
import NavigationPaths from '../../route/navigationPath'
import Navbar from './navbar/Navbar'

const Header = () => {
  const location = useLocation()
  let path = location.pathname.split("/")[1].split("-")[0]
  let route = NavigationPaths.APP_REFER.split("/")[1].split("-")[0]

  return (
    <>
      {
        path === route ? null :
          <Navbar />
      }

    </>
  )
}

export default Header