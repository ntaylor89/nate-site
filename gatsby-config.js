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
        path: `${__dirname}/src/pages`
      }
    },
    `gatsby-plugin-catch-links`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 590,
              linkImagesToOriginal: false,
              wrapperStyle: 'z-index: 0; margin-top: 1rem; margin-bottom: 1rem;'
            }
          },
          {
           resolve: `gatsby-remark-responsive-iframe`,
           options: { wrapperStyle: `margin-bottom 1rem` }
          },
          `gatsby-remark-autolink-headers`,
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-smartypants`,
          `gatsby-remark-prismjs`
        ]
      }
    }
  ],
}
