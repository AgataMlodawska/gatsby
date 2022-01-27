/* eslint-disable react/require-default-props */
/* eslint-disable react/forbid-prop-types */
import React from 'react'
import PropTypes from 'prop-types'
import {Helmet} from 'react-helmet'
import {useStaticQuery, graphql, withPrefix} from 'gatsby'

function SEO({description, lang, meta, keywords, title}) {
  const {site} = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
          }
        }
      }
    `,
  )

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title}
      titleTemplate={`%s | Comunicación,diseño y tecnología`}
      meta={[
        {
          name: `description`,
          content: 'La tienda DreamMakers,tu tienda ideal',
        },
        {
          name: `keywords`,
          content: 'Worköholics',
        },
        {
          property: `og:title`,
          content: title,
        },
        {
          property: `og:description`,
          content: '',
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          name: `twitter:card`,
          content: `summary`,
        },
        {
          name: `twitter:creator`,
          content: site.siteMetadata.author,
        },
        {
          name: `twitter:title`,
          content: title,
        },
        {
          name: `twitter:description`,
          content: '',
        },
        {name: 'msapplication-TileColor', content: '#da532c'},
        {name: 'theme-color', content: '#ffffff'},
      ]
        .concat(
          keywords.length > 0
            ? {
                name: `keywords`,
                content: keywords.join(`, `),
              }
            : [],
        )
        .concat(meta)}
    >
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href={withPrefix('/favicons/workoholics.png')}
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href={withPrefix('/favicons/workoholics.png')} //este cambia
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href={withPrefix('/favicons/favicon-16x16.png')}
      />
    </Helmet>
  )
}

SEO.defaultProps = {
  lang: `en`,
  meta: [],
  keywords: [],
}

SEO.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.array,
  keywords: PropTypes.arrayOf(PropTypes.string),
  title: PropTypes.string.isRequired,
}

export default SEO
