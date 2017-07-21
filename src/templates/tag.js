import React from 'react'
import Link from 'gatsby-link'


function PostLink (props) {
  return (
    <li key={props.slug}>
      <Link to={props.slug}>
        {props.title}
      </Link>
    </li>
  )
}

export default function TagRoute (props) {
  const posts = props.data.allMarkdownRemark.edges
  const postLinks = posts.map(post => (
    <PostLink
      slug={post.node.fields.slug}
      title={post.node.frontmatter.title}
    />
  ))

  return (
    <div>
      <h1>
        {props.data.allMarkdownRemark.totalCount}
        {' '}posts tagged with "{props.pathContext.tag}"
      </h1>
      <ul>
        {postLinks}
      </ul>
      <p><Link to='/tags/'>Browse all tags</Link></p>
    </div>
  )
}

export const pageQuery = graphql`
  query TagPage($tag: String) {
    allMarkdownRemark(
      limit: 1000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] }, draft: { ne: true } } }
    ) {
      totalCount
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
          }
        }
      }
    }
  }
`

