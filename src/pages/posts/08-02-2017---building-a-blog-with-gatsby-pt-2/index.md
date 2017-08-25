---
title: "Building a Blog with Gatsby Pt 2"
date: "2017-08-02"
author: "Nate Taylor"
summary: "Setup Gatsby to automatically turn markdown files into blog posts."
draft: false
tags:
- Gatsby
- JavaScript
- React
- Tutorial
---

If you want to build a personal blog with modern web technologies, [Gatsby](https://www.gatsbyjs.org/) is a great choice. But if you're coming from tools like Jeckyll, you'll find that some features don't
work out of the box.

One such feature is markdown support. In this post, we will:

- Add basic markdown support to Gatsby, allowing you to import a markdown file into any component, and set it as inner HTML.
- Automatically create blog posts from markdown files in a specific directory.

If you don't have a Gatsby project, set one up with `gatsby new my-blog` and follow along.

## Adding The Plugins We Need

Gatsby uses a [plugin system](https://www.gatsbyjs.org/docs/plugins/) to add support
for new features. But before we add plugins, we need to know how Gatsby's data layer
works, and what these plugins actually do.

### Understanding Gatsby's Data Layer

Gatsby has a modular data layer extendable through plugins. Here's how it works:

- Gatsby searches it's known sources for data, and adds a `gatsby-node` to a tree data structure.
- If the data in the node is a data-type Gatsby understands, it will parse it and create a child node.
- Gatsby allows you to query the `gatsby-node` tree with GraphQL.
- In a component, you export a GraphQL query to specify what data the component needs. The data you query
  is available to your component as a prop.

`gatsby-source` plugins tell gatsby where to look for data, and `gatsby-transformer` plugins tell
Gatsby how to use new data-types.

__Note__: GraphQL isn't actually used in your deployed site. At build time, Gatsby resolves the queries and adds the data to the components.

### Telling Gatsby Where To Find Data

We will use the [gatsby-source-filesystem](https://www.gatsbyjs.org/packages/gatsby-source-filesystem/)
plugin to tell Gatsby to look for data in `src/pages`.

First install `gatsby-source-filesystem`:

```bash
npm install --save gatsby-source-filesystem
```

Then edit `gatsby-config.js` to configure it. This config file exports a configuration object.
All plugin configurations live in the array under the `plugins` attribute.

```javascript
module.exports = {
  //...
  plugins: [
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'pages',
        path: `${__dirname}/src/pages`
      }
    }
  ]
}
```

This tells Gatsby to look for data in `src/pages/`. The search is recursive, so it will search
nested folders. We'll put all blog posts in `src/pages/posts` to distinguish them from other
pages. Since we're talking about it, reate that folder now.

```
mkdir src/pages/posts
```

### Telling Gatsby How to Parse Markdown

The [gatsby-transformer-remark](https://www.gatsbyjs.org/packages/gatsby-transformer-remark/) plugin
tells Gatsby how to parse Markdown. This plugin wraps the [Remark](https://github.com/wooorm/remark) library.

The plugin will parse markdown into an string of HTML, which we can use to set the inner HTML of an
existing element.

Install `gatsby-transfomer-remark`:

```bash
npm install --save gatsby-transformer-remark
```

And again edit `gatsby-config` to make Gatsby aware of the plugin.

```javascript
module.exports = {
  //...
  plugins: [
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'pages',
        path: `${__dirname}/src/pages`
      }
    },
    'gatsby-transformer-remark'
  ]
}
```

Note that we added `gatsby-transformer-remark` to the list of plugins as a string. Gatsby allows
either a string or an object in the plugins array. We use an object when we need to give plugin settings.

Now we can import a markdown file into a component, and use it to set inner HTML. For example...

```jsx
import React from 'react'
import aboutMe from './about-me.md'

export default function About () {
  return (
    <div dangerouslySetInnerHTML={{ __html: aboutMe.html }} />
  )
}
```

### Making Remark Work For You

We now have bare bones markdown support, but we add more plugins to make like easier. Gatsby
has many [useful plugins](https://www.gatsbyjs.org/docs/plugins/#official-plugins) for remark,
but for now we'll just add three:

- [gatsby-remark-copy-linked-files](https://www.gatsbyjs.org/packages/gatsby-remark-copy-linked-files/): Auto copies referenced files (images, pdfs, etc) to the static directory at build time
- [gatsby-remark-smartypants](https://www.gatsbyjs.org/packages/gatsby-remark-smartypants/): Convert ASCII punctuation into HTML characters
- [gatsby-remark-images](https://www.gatsbyjs.org/packages/gatsby-remark-images/): Lets you use images in markdown

First install them:

```bash
npm install --save gatsby-remark-images gatsby-remark-copy-linked-files gatsby-remark-smartypants
```

Then add them to `gatsby-config.js`:

```javascript
module.exports = {
  //...
  plugins: [
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'pages',
        path: `${__dirname}/src/pages`
      }
    },
    // The config for `gatsby-transformer-remark` is now an object
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        // This plugin has plugins!
        plugins: [
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 590 // You must specify some value here
            }
          },
          'gatsby-remark-copy-linked-files',
          'gatsby-remark-smartypants'
        ]
      }
    }
  ]
}
```

Note that we nested each new plugin under the config for `gatsby-transformer-remark`. Each of these
new plugins are plugins for `gatsby-transformer-remark`. That's right, plugins can have plugins.

## Creating Pages from Markdown Posts

Now that basic markdown support is in place, we can tell Gatsby how to create pages from the markdown files that live in the `src/pages/post` directory.

This requires a few steps
- Make a template to use for each page
- Tell `gatsby-node` to create the pages using the template
- Add an index page for the posts

### Creating a Slug

First we'll create a "slug" for each post based on the date and title in the frontmatter. So if we have this
front matter:

```md
---
title: "First Post"
date: "2017-08-01"
---
```

Then the slug will be `2017/08/01/first-post`. Later, we'll use this slug as the route to each post.

We can create this slug when Gatsby creates the `gatsby-node`. If the file `gatsby-node.js` does not
exist in the top level of your project, create it. Then add this code.

```javascript
// Create a jeckyll like blog post path.
// i.e., if the date is "08-01-2017", and the title is "Welcome",
// then the path will be "/posts/2017/08/02/welcome"
function getSlug(node) {
  let {date, title} = node.frontmatter

  title = title.toLowerCase().replace(/ /g, '-')
  date = date.replace(/-/g, '/')
  return `/posts/${date}/${title}/`
}

// `onCreateNode` gets called for every node created
exports.onCreateNode = ({ node, boundActionCreators, getNode }) => {
  const { createNodeField } = boundActionCreators

  // Add the slug if the node is a markdown node
  if (node.internal_type === 'MarkdownRemark') {
    const slug = getSlug(node)
    createNodeField({
      node, name: 'slug', value: slug
    })
  }
}

```
Now every markdown node will have a `slug` value in it's `fields` attribute.

### Creating a Post Template

Next we need a template to use for each post. This template is a React component like any other
page. We'll put it in a `src/templates/` folder.

```
mkdir src/templates
touch src/templates/post.js
```

Now put this code in the `src/templates/post.js`:

```jsx
import React from 'react'

export default function PostTemplate (props) {
  const post = props.data.markdownRemark

  return (
    <div>
      <h1>{post.frontmatter.title}</h1>
      <span>{post.frontmatter.date}</span>

      <article dangerouslySetInnerHTML={{ __html: post.html }} />
    </div>
  )
}

export const pageQuery = graphql`
  query PostBySlug($slug: String!) {
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
```

Notice the `export const pageQuery` at the bottom of this page. Later, when we use this template, the
caller will pass in the slug. The template uses the slug to query the data it needs for the matching post.

The query calls `markdownRemark` to find a single markdown `gatsby-node`, and then passes the data
into the component. We can then access the data from the props via `props.data.markdownRemark`.

### Building the Pages

With the template in place, let's build the pages. Add this snippet to the bottom of `gatsby-node.js`

```javascript
exports.createPages = ({ graphql, boundActionCreators }) => {
  const { createPage } = boundActionCreators

  return new Promise((resolve, reject)) => {
    const postTemplate = path.resolve('src/templates/post.js')

    // Fetch all markdown nodes
    resolve(
      graphql(
        `{
          allMarkdownRemark(
            limit: 1000,
            filter: {
              frontmatter: {
                draft: { ne: false },
                title: { ne: null },
                date: { ne: null }
              }
            }
          ) {

          }
        }`
      ).then(result => {
        if (result.errors) {
          console.log(result.errors)
          reject(result.errors)
        }

        result.data.allMarkdownRemark.edges.forEach(edge => {
          createPage({
            path: edge.node.fields.slug,
            component: postTemplate,
            context: {
              // this is where we pass the slug to the template
              slug: edge.node.fields.slug
            }
          })
        })
      })
    )
  }
}
```

We export a `createPages` function, which Gatsby passes helpers into. These helpers let us query
GraphQL and create pages.

Now all posts are available at their paths.

## Creating an Post Index

Now that we have individual posts available, we can add an index page. Add the following code to
`src/pages/posts.js`:

```jsx
import React from 'react'
import Link from 'gatsby-link'

export default function PostIndex (props) {
  const posts = props.data.allMarkdownRemark.edges

  return (
    <section>
      {posts.map(post => (
        <article>
          <h1>
            <Link to={post.node.frontmatter.slug}>
              {post.node.frontmatter.title}
            </Link>
          </h1>
          <span>{props.subTitle}</span>
          <p>
            {props.summary}
          </p>
        </article>
      ))}
    </section>
  )
}

export const pageQuery = graphql`
  query PostIndexQuery {
    allMarkdownRemark(
      limit: 1000,
      sort: { fields: [frontmatter___date], order: DESC },
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
```

Because this file lives in `src/pages` and exports a component, Gatsby will:

1. Pass this component into our layout in `src/layouts/index.html`
2. Make it available at a route based on the file name (in this case, `/posts`)

Note that we export a graphql query again. You can do this from any component that needs data from
`gatsby-node`.

And that should do it! Some final tips:
- If you import external resources into a markdown file, then create a new folder under `src/pages/posts`
  for the put all revevant media there.
- There are more official gatsby-remark plugins available at the site.
