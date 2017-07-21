module.exports = {
  siteMetadata: {
    title: 'Nate A Taylor',
    author: 'Nate A Taylor',
    description: 'Website of Nate A Taylor'
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `pages`,
        path: `${__dirname}/src/pages/`
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `posts`,
        path: `${__dirname}/src/posts/`
      }
    },
    `gatsby-plugin-react-helmet`,
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          `gatsby-remark-autolink-headers`,
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-smartypants`,
          `gatsby-remark-prismjs`,
          {
            resolve: `gatsby-remark-images`,
            options: { maxWidth: 740 }
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: { wrapperStyle: `margin-bottom 1.0725rem` }
          }
        ]
      }
    }
  ],
}
