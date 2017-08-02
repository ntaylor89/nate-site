---
title: "Building a Blog with Gatsby JS Pt 2"
date: "2017-08-02"
author: "Nate Taylor"
summary: "Setup Gatsby to automatically turn markdown files into blog posts"
draft: true
tags:
- Gatsby
- JavaScript
- React
- Tutorial
---

If you want to build a personal blog with modern web technologies, [Gatsby](https://www.gatsbyjs.org/) is an excellent choice. But if you're coming
from tools like Jeckyll, you'll find that some features don't work out of the box.

One such feature is markdown support. In this post, we will:

- Add basic markdown support to Gatsby, allowing you to import a markdown file into any component, and
  set it as inner HTML
- Automatically create blog posts from markdown files in a specific directory.

If you don't have a gatsby project, set one up with `gatsby new my-blog`.

## Adding Markdown Support

Gatsby uses a [plugin system](https://www.gatsbyjs.org/docs/plugins/) to add support
for new features. But before we add the plugins we need, we need to know how Gatsby's data layer
works, and what these plugins actually do.

### Understanding Gatsby's Data Layer

Gatsby has a modular data layer extendable through plugins. Here's how it works:

- Gatsby searches "sources" (extendable via "source" plugins) for data, and creates a
  "gatsby-node" to a tree data structure.
- If the data in the node is a data-type Gatsby understands, it will parse it and create a
  child node. Support for more data-types is added via "transformer" plugins.
- In a component, you specify the data you need via GraphQL queries. The data you query
  is available to your component as a prop.

__Note__: GraphQL isn't actually used in your deployed site. At build time, Gatsby resolves the queries and adds the data to the components.

### Installing the Remark Plugins

The plugins we need all wrap or extend the [Remark](https://github.com/wooorm/remark) library.
This library parses the markdown into HTML for us.

Here are the plugins we need:

- [gatsby-transformer-remark](https://www.gatsbyjs.org/packages/gatsby-transformer-remark/)
- [gatsby-source-filesystem](https://www.gatsbyjs.org/packages/gatsby-source-filesystem/)

`gatsby-transformer-remark` tells gatsby how to parse markdown into html.
`gatsby-source-filesystem` lets us tell gatsby to look in the filesystem for data it understands.

First install each of these plugins via npm:

```
npm install --save gatsby-transformer-remark
npm install --save gatsby-source-filesystem
```

Then tell Gatsby to use these plugins be adding them to the `plugins` list in
`gatsby-config.js`:

```javascript
 module.exports = {
   plugins: [
     {
       resolve: `gatsby-source-filesystem`,
       options: {
         name: `pages`,
         // Tell gatsby to look in /src/pages for data.
         // You can use any path you want.
         path: `${__dirname}/src/pages`
       },
       `gatsby-transformer-remark`
     }
   ]
 }
```

Plugins listed in `gatsby-config` can be a string or an object with a
`resolve` attribute. We use objects so that we can specify options in the `options` attribute.

In the config above, we tell Gatsby to look for data in `/src/pages`. You can use any path you choose, but we use this structure so we can import markdown into components without adding additonal configuration.

Now create a folder called "posts" under `/src/pages`

```
mkdir /src/pages/posts
```

Gatsby will recursively search the `pages` folder, so it will pick up all markdown in `posts`. Later we'll tell Gatsby how to transform those markdown files into pages.

#### Making Remark Work For You

These plugins aren't required, but make writing with markdown a lot nicer:

- [gatsby-remark-copy-linked-files](https://www.gatsbyjs.org/packages/gatsby-remark-copy-linked-files/): Auto copies referenced files (images, pdfs, etc) to the static directory at build time
- [gatsby-remark-smartypants](https://www.gatsbyjs.org/packages/gatsby-remark-smartypants/): Convert ASCII punctuation into HTML characters
- [gatsby-remark-images](https://www.gatsbyjs.org/packages/gatsby-remark-images/): Lets you use images in markdown

If you want to use these, install them with npm add them to `gatsby-config.js`. These are all plugins to the
`gatsby-transformer-remark` plugin, so the config will look a little different.

```javascript
 module.exports = {
   plugins: [
     {
       resolve: `gatsby-source-filesystem`,
       options: {
         name: `pages`,
         path: `${__dirname}/src/pages`
       },
       // gatsby-transform-remark is now an object
       {
         resolve: `gatsby-transformer-remark`,
         options: {
           // here we specify the plugins dependend on transformer-remark
           plugins: {
             {
               resolve: `gatsby-remark-images`,
               options: {
                 maxWidth: 590 // You must specify some value here
               }
             },
             `gatsby-remark-copy-linked-files`,
             `gatsby-remark-smartypants`
           }
         }
       }
     }
   ]
 }
```

With the configuration above, you can now import markdown into any component. You will be given
stringified HTML that you can nest under any element

```jsx
import React from 'react'
import aboutMe from './about-me.md'

export default function About () {
  return <div dangerouslySetInnerHTML={{ __html: aboutMe }} />
}
```

## Creating Pages from Markdown Posts

Now that basic markdown support is in place, we can tell gatsby how to
