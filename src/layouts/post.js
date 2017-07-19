import React from 'react'
import Helmet from 'react-helmet'
import Link from 'gatsby-link'
import get from 'lodash/get'

export default function PostTemplate (props) {
  const post = props.data.markdownRemark
  const siteTitle = get(props, 'data.site.siteMetadata.title')

  return (
    <div>
      <Helmet title={`${post.frontmatter.title} | ${siteTitle}`} />

      <h1>{post.frontmatter.title}</h1>

      <p>{post.frontmatter.data}</p>
      <article
        className='lh-copy f4'
        dangerouslySetInnerHTML={{ __html: post.html }} />
    </div>
  )
}

export const pageQuery = graphql`
  query PostByPath($path: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      id
      html
      frontmatter {
        title
        date
      }
    }
  }
`
