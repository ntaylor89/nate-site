import React from 'react'
import Link from 'gatsby-link'

function PostSlat (props) {
  // TODO make query filter posts without title
  // instead of short circuiting here
  if (!props.title) return null

  return (
    <article className='pv3'>
      <div className='flex flex-column flex-row-ns'>
        <div className='w-100 w-60-ns pr3-ns order-2 order-1-ns'>
          <h1 className='f3 mt0 lh-title garamond'>
            <Link to={props.slug}>{props.title}</Link>
          </h1>
          <p className='f5 f4-l lh-copy'>
            {props.summary}
          </p>
        </div>
      </div>
    </article>
  )
}

export default function PostIndex (props) {
  const posts = props.data.allMarkdownRemark.edges

  return (
    <section>
      {posts.map(post => (
        <PostSlat
          title={post.node.frontmatter.title}
          summary={post.node.frontmatter.summary}
          slug={post.node.fields.slug}
        />
      ))}
    </section>
  )
}

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

