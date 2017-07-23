import React from 'react'
import PropTypes from 'prop-types'
import Link from 'gatsby-link'
import Helmet from 'react-helmet'

import Header from './header'
import Footer from './footer'

import '../index.css'
import '../css/prism-github.css'

function Template (props) {
  return (
    <div>
      <Helmet
        title='Nate Taylor'
        meta={[
          { name: 'description', content: 'Website of Nate A Taylor' },
          { name: 'keywords', content: 'homepage, blog, programming' }
        ]}
      />
      <Header />
      <main className='bg-white measure-wide mw100 center pt4 pb5'>
        <div className='lh-copy f4 baskerville'>
          {props.children()}
        </div>
      </main>
      <Footer />
  </div>
  )
}

Template.propTypes = {
  children: PropTypes.func,
}

export default Template

