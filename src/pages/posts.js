import React from 'react'
import Link from 'gatsby-link'
import Slat from '../layouts/slat'

export default function PostIndex (props) {
  const posts = props.data.allMarkdownRemark.edges

  return (
    <section>
      {posts.map(post => (
        <Slat
          title={post.node.frontmatter.title}
          summary={post.node.frontmatter.summary}
          subTitle={post.node.frontmatter.date}
          url={post.node.fields.slug}
        />
      ))}
    </section>
  )
}

// TODO fix query to exclude posts without a title
export const pageQuery = graphql`
  query PostIndexQuery {
    site {
      siteMetadata {
        title
        author
        description
      }
    }
    allMarkdownRemark(
      limit: 1000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { draft: { ne: true } } }
    ) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
            summary
            date(formatString: "MMMM DD, YYYY")
          }
        }
      }
    }
  }
`

