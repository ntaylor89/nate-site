import React from 'react'
import Link from 'gatsby-link'

function PostSlat (props) {
  return (
    <article className='pv4 bt bb b--black-10 ph3 ph0-1'>
      <div className='flex flex-column flex-row-ns'>
        <div className='w-100 w-60-ns pr3-ns order-2 order-1-ns'>
          <h1 className='f3 mt0 lh-title'>
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
    <section className='mw7 center'>
      <h2 className='ph3 ph0-1'>Writing</h2>
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

