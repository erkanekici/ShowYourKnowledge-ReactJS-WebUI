import React from 'react'
import { Route } from 'react-router-dom'

const MenuLink = ({ label, to, exact }) => {
 return (
  <Route
   path={to}
   exact={exact}
   children={({ match }) => (
    <span className={match ? 'selected' : ''}>{label}<span className="nav-dot"></span></span>
   )}
  />
 )
}

export default MenuLink