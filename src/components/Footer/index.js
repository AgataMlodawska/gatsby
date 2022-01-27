import React from 'react'
import {Link} from 'gatsby'
import {Segment, Container, Grid, List, Header} from 'semantic-ui-react'
import styled from 'styled-components'

const styledLink = styled(Link)`
  text-decoration: none;
  color: black;
  &:hover {
    color: #f8068c;
  }
`
const twitterLink = (
  <a
    style={{
      color: 'black',
      textDecoration: 'none',
      fontfamily: 'DM Sans,sans-serif',
    }}
    href="https://twitter.com/workoholics_"
    alt="twitter link"
  >
    Twitter
  </a>
)
const linkedinLink = (
  <a
    style={{
      color: 'black',
      textDecoration: 'none',
      fontfamily: 'DM Sans,sans-serif',
    }}
    href="https://www.linkedin.com/company/workoholics/?originalSubdomain=es"
    alt="linkedin link"
  >
    Linkedin
  </a>
)
const instagramLink = (
  <a
    style={{
      color: 'black',
      textDecoration: 'none',
      fontfamily: 'DM Sans,sans-serif',
    }}
    href="https://www.instagram.com/workoholics_/?hl=es"
    alt="twitter link"
  >
    Instagram
  </a>
)
const emailLink = (
  <a
    style={{
      color: 'black',
      textDecoration: 'none',
      fontfamily: 'DM Sans,sans-serif',
    }}
    href="mailto:helloStore@workoholics.es"
    alt="email link"
  >
    Email
  </a>
)

const Footer = () => (
  <Segment
    vertical
    style={{
      padding: '4em 0em',
      marginTop: '3em',
      borderTop: '2px solid #f2f2f2',
    }}
  >
    <Container text>
      <Grid stackable>
        <Grid.Row>
          <Grid.Column width={4}>
            <Header
              style={{
                textDecoration: 'underline',
                fontfamily: 'DM Sans,sans-serif',
              }}
              as="h4"
              content="Sobre nosotros"
            />
            <List>
              <List.Item as={styledLink} to="/privacy/">
                Privacidad
              </List.Item>
              <List.Item as={styledLink} to="/terms/">
                Terminos y condiciones
              </List.Item>
            </List>
          </Grid.Column>
          <Grid.Column width={5}>
            <Header
              style={{
                textDecoration: 'underline',
                fontfamily: 'DM Sans,sans-serif',
              }}
              as="h4"
              content="Servicios"
            />
            <List>
              <List.Item as={styledLink} to="/">
                Nuestros productos
              </List.Item>

              <List.Item as={styledLink}>
                <a rel="noreferrer" href="mailto:hello@workoholics.es">
                  hello@workoholics.es
                </a>
              </List.Item>
              <List.Item as={styledLink}>
                <a
                  href="tel:+34 944 059 957"
                  style={{textDecoration: 'none', color: 'black'}}
                >
                  +34 944 059 957
                </a>
              </List.Item>
            </List>
          </Grid.Column>
          <Grid.Column width={7}>
            <Header
              style={{color: '#fb088c', fontfamily: 'DM Sans,sans-serif'}}
              as="h4"
            >
              Workoholics
            </Header>
            <p>
              Creamos experiencias digitales que emocionan y conectan con las
              personas. Nos apasiona lo que hacemos. Somos Worköholics.
            </p>
            <p>Diseñamos por ti.</p>
            <List horizontal style={{display: 'flex'}}>
              <List.Item
                icon="instagram"
                style={{display: 'flex'}}
                content={instagramLink}
              />
              <List.Item
                icon="linkedin"
                style={{display: 'flex'}}
                content={linkedinLink}
              />
              <List.Item
                icon="twitter"
                style={{display: 'flex'}}
                content={twitterLink}
              />

              <List.Item
                icon="mail"
                style={{display: 'flex'}}
                content={emailLink}
              />
            </List>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  </Segment>
)

export default Footer
