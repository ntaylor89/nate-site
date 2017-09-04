import React from 'react'
import Link from 'gatsby-link'

function Title () {
  return (
    <div className='db dtc-ns v-mid tl w-50 sans-serif'>
      <Link to='/' className='dib f3 f3-ns fw6 mt0 mb1 link black'>
        Nate Taylor
    </Link>
    </div>
  )
}

function NavLink ({title, href, last, ...other}) {
  let styles = 'f6 fw6 hover-blue link black-80 dib ttu'
  if (!last) styles = styles.concat(' mr2 mr3-m mr3-l')

  return (
    <Link {...other}
      title={title}
      to={href}
      className={styles}>
      {title}
    </Link>
  )
}

function NavBar () {
  return (
    <nav className='db dtc-ns v-mid w-100 tl tr-ns mt2 mt0-ns sans-serif'>
      <NavLink title='Contact' href='/contact/' />
      <NavLink title='Projects' href='/projects/' />
      <NavLink title='Writing' href='/posts/' last />
    </nav>
  )
}

export default function Header () {
  return (
    <header className='bg-white measure-wide mw100 center pt4 pb2 ph3'>
      <div className='db dt-ns mw9 center w-100 garamond'>
        <Title />
        <NavBar />
      </div>
    </header>
  )
}
