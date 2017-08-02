---
title: "Building a Blog with Gatsby JS Pt 1"
date: "2017-07-21"
author: "Nate Taylor"
summary: "How to build a personal site with Gatsby."
draft: false
tags:
- JavaScript
- React
- Tutorial
---

[Gatsby](https://www.gatsbyjs.org/) is a static site generator built with React, Redux, and Webpack.
Like [Jeckyll](https://jekyllrb.com/), but with modern JS instead of Ruby.

In the next few posts, we'll walkthough how to set up your own website/blog using Gatsby.

Topics we'll cover in this post
- Initializing a new static site
- Adding new pages

Some of this information is in the [official documentation](https://www.gatsbyjs.org/docs/).
Unfortunately, since this is a somewhat new project, there are still some holes.

## Prerequisites

You'll need
- Familiarity with ES6 JavaScript
- [Node](https://nodejs.org/en/) and NPM installed

## Initializing the Project

First install Gatsby

```sh
npm install -g gatsby

```

Then use it to create a new project

```sh
# replace "site-name" with the name of the
# directory you want the project to live in
gatsby new site-name
```

This will create a new react project in the directory `site-name`. That directory should
have the following structure

```
LICENSE
gatsby-config.js  # Contains config information for Gatsby
packag.json
src/ # Most of the project is in this folder
  layouts/
  pages/
README.md
node_modules
public
```

No you can the command `yarn develop` (or `node develop` if not using yarn) to serve the app at localhost:8000 in
development mode. You should see

![Default gatsby index page](./gatsby-index.png)

"Development mode" will hotload any changes you make,
except for changes made to config files (`package.json`, `gatsby-config.js`, or `gatsby-node.js`).

### Adding a New Page

To create a new page on our site, create a new `js` file in the `src/pages` directory,
and export a React component from that file. Gatsby will create a new route based on the name of the file, and render the component based on the layout defined in `src/layouts/index.js`

To see an example, save the following code into `src/pages/my-new-page.js`:

```javascript
import React from 'react'

export default function MyNewPage () {
  return (
    <div>
      <h1>My New Page</h1>
      <p>
        I just added a new page to my site. Cool!
      <p>
    </div>
  )
}
```

Gatsby will create a new route based on the file name. That means you can see our new page
by visiting `localhost:8000/my-new-page`
