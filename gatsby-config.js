require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
  siteMetadata: {
    title: 'Worköholics Store',
    author: 'Dream Makers',
    description: 'La tienda de tu webdeveloper favorita',
    siteUrl: 'https://workoholics-tienda/.es/',
  },
  pathPrefix: '/workoholics-tienda',
  plugins: [
    `gatsby-plugin-fontawesome-css`,
    {
      resolve: 'gatsby-source-mongodb',
      options: {
        dbName: `Workoholics`,
        collection: [`users`, `productos`],
        server: {
          address: 'workoholics-shard-00-01.q2o1y.mongodb.net',
          port: 27017,
        },
        auth: {
          user: 'bootcamp',
          password:
            '9y%2F78OUx74Uc4U5U%2Fkj7Em44dKnTwDlVzjqP3Z9cv49Me4DED0TmdUdpvqOMxCrc',
        },
        extraParams: {
          replicaSet: 'Main-shard-0',
          ssl: true,
          authSource: 'admin',
          retryWrites: true,
        },
      },
    },
    {
      resolve: '@moltin/gatsby-source-moltin',
      options: {
        client_id:
          process.env.MOLTIN_CLIENT_ID ||
          'EdP3Gi1agyUF3yFS7Ngm8iyodLgbSR3wY4ceoJl0d2',
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/pages`,
        name: 'pages',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'img',
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        // trackingId: `ADD YOUR TRACKING ID HERE`,
      },
    },
    {
      resolve: `gatsby-plugin-nprogress`,
      options: {
        // Setting a color is optional.
        color: `tomato`,
        // Disable the loading spinner.
        showSpinner: false,
      },
    },
    'gatsby-plugin-styled-components',
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: 'Workoholics Store',
        short_name: 'Shop App',
        start_url: '/workoholics-tienda/.es//',
        background_color: '#ffffff',
        theme_color: '#ffffff',
        display: 'minimal-ui',
        icons: [
          {
            src: `/favicons/favicon.png`,
            sizes: `512x512`,
            type: `image/png`,
          },
        ],
      },
    },
    `gatsby-plugin-offline`,
    `gatsby-plugin-react-helmet`,
  ],
}
