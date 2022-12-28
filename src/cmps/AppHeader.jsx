import React, { useRef } from 'react'
import { NavLink } from 'react-router-dom'

export const AppHeader = () => {
  const navRef = useRef(null)
  const menuRef = useRef(null)

  const toggleNav = () => {
    navRef.current.classList.toggle('active')
    menuRef.current.classList.toggle('active')
  }

  return (
    <section className='app-header flex space-between align-center'>
      <h1 className='logo'>Mister Bitcoin</h1>
      <nav ref={navRef} className='flex space-between'>
        <NavLink onClick={toggleNav} to='/'>
          Home
        </NavLink>
        <NavLink to='/contact' onClick={toggleNav}>Contacts</NavLink>
        <NavLink to='/stats' onClick={toggleNav}>Statistics</NavLink>
        <NavLink to='/signup' onClick={toggleNav}>Log out</NavLink>
      </nav>
      <span ref={menuRef}className='menu-toggle' onClick={toggleNav}></span>
    </section>
  )
}
