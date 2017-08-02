const _ = require('lodash')
const path = require('path')

function getPostSlug (node) {
  let {date, title} = node.frontmatter

  if (title) {
    title = _.kebabCase(title.toLowerCase())
    date = date ? `${date.replace(/-/g, '/')}/` : ''
    return `/posts/${date}${title}/`
  } else {
    return path.parse(node.fileAbsolutePath).name
  }
}

exports.createPages = ({ graphql, boundActionCreators }) => {
  const { createPage } = boundActionCreators

  return new Promise((resolve, reject) => {
    const postTemplate = path.resolve('src/templates/post.js')
    const tagTemplate = path.resolve('src/templates/tag.js')

    // Query for markdown nodes
    resolve(
      graphql(
        `{
          allMarkdownRemark(limit: 1000, filter: { frontmatter: { draft: { ne: true }}}) {
            edges {
              node {
                fields {
                  slug
                }
                frontmatter {
                  tags
                }
              }
            }
          }
        }`
      ).then(result => {
        if (result.errors) {
          console.log(result.errors)
          reject(result.errors)
        }

        let tags = []
        result.data.allMarkdownRemark.edges.forEach(edge => {
          createPage({
            path: edge.node.fields.slug,
            component: postTemplate,
            context: {
              slug: edge.node.fields.slug
            }
          })

          // Add posts's tags to list of tags
          if (_.get(edge, 'node.frontmatter.tags')) {
            tags = tags.concat(edge.node.frontmatter.tags)
          }
        })

        // Create tag pages
        tags = _.uniq(tags)
        tags.forEach(tag => {
          const tagPath = `tags/${_.kebabCase(tag)}/`
          createPage({
            path: tagPath,
            component: tagTemplate,
            context: { tag }
          })
        })
      })
    )
  })
}

exports.onCreateNode = ({ node, boundActionCreators, getNode }) => {
  const { createNodeField } = boundActionCreators

  if (node.internal.type === 'MarkdownRemark') {
    const slug = getPostSlug(node)
    createNodeField({
      node, name: 'slug', value: slug
    })

    if (node.frontmatter.tags) {
      const tagSlugs = node.frontmatter.tags.map(
        tag => `/tags/${_.kebabCase(tag)}/`
      )
      createNodeField({ node, name: 'tagSlugs', value: tagSlugs })
    }
  }
}
