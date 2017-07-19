import React from 'react'
import Link from 'gatsby-link'

function Title () {
  return (
    <div className='db dtc-ns v-mid tl w-50'>
      <Link to='/' className='dib f5 f4-ns fw6 mt0 mb1 link black'>
        Nate Taylor
    </Link>
    </div>
  )
}

function NavLink ({title, href, ...other}) {
  return (
      <Link {...other}
        title={title}
        to={href}
        className='f6 fw6 hover-blue link black mr2 mr3-m mr4-l dib'>
          {title}
      </Link>
  )
}

function NavBar () {
  return (
    <nav className='db dtc-ns v-mid w-100 tl tr-ns mt2 mt0-ns'>
      <NavLink title='Contact' href='/contact/' />
      <NavLink title='Projects' href='/projects/' />
      <NavLink title='Writing' href='/writing/' />
    </nav>
  )
}

export default function Header () {
  return (
    <header className='w-100 pa3 ph5-ns bg-white'>
      <div className='db dt-ns mw9 center w-100'>
        <Title />
        <NavBar />
      </div>
    </header>
  )
}

