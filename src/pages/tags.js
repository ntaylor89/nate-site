import React from 'react'
import Link from 'gatsby-link'
import kebabCase from 'lodash/kebabCase'

function tagPath(tagName) {
  return `/tags/${kebabCase(tagName)}/`
}

function TagLi (props) {
  return (
    <li key={tagPath(props.name)}>
      <Link to={tagPath(props.name)}>
        {props.name} ({props.count})
      </Link>
    </li>
  )
}

export default function TagsPageRoute (props) {
  const allTags = props.data.allMarkdownRemark.group

  return (
    <div>
      <h1>Tags</h1>
      <ul>
        {allTags.map(tag =>
          <TagLi
            name={tag.fieldValue}
            count={tag.totalCount}
          />
        )}
      </ul>
    </div>
  )
}

export const pageQuery = graphql`
  query TagsQuery {
    allMarkdownRemark(
      limit: 1000
      filter: { frontmatter: { draft: { ne: true } } }
    ) {
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
    }
  }
`

