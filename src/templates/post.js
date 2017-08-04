import React from 'react'
import Helmet from 'react-helmet'
import get from 'lodash/get'

export default function PostTemplate (props) {
  const post = props.data.markdownRemark
  const siteTitle = get(props, 'data.site.siteMetadata.title')

  return (
    <div>
      <Helmet title={`${post.frontmatter.title} | ${siteTitle}`} />

      <h1 className='mb0'>{post.frontmatter.title}</h1>
      <span className='f5 mid-gray'>{post.frontmatter.date}</span>

      <article
        dangerouslySetInnerHTML={{ __html: post.html }} />
    </div>
  )
}

export const pageQuery = graphql`
  query PostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      html
      frontmatter {
        title
        summary
        tags
        date(formatString: "MMMM DD, YYYY")
      }
    }
  }
`
