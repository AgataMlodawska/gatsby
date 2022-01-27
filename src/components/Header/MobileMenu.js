import React, {useState, useEffect} from 'react'
import {Link, withPrefix} from 'gatsby'
import './estiloMenu.css'

import {
  Menu,
  Container,
  Icon,
  Portal,
  Segment,
  Divider,
  Button,
} from 'semantic-ui-react'
import styled from 'styled-components'
import ShoppingCartIcon from './ShoppingCartIcon'
import Logo from './Logo'

const StyledLink = styled(Link)`
  font-weight: bold;
  text-align: center;
  font-size: 2em;
  color: black;
  text-decoration: none;
  font-family: DM Sans, sans-serif;
  &:hover {
    color: #fb088c;
  }
`

const BurgerButton = styled(Button)`
  &&& {
    font-size: 1rem;
    padding: 0.785em 1.5em;
    box-shadow: 0 0 0 1px transparent inset,
      0 0 0 0 rgba(34, 36, 38, 0.15) inset;
  }
`
const CloseButton = styled(BurgerButton)`
  &&& {
    position: absolute;
    top: -4em;
    right: 0em;
    padding: 0.5em;
    font-size: 1.5em;
    width: 2em;
    height: 2em;
  }
`

const StyledSegment = styled(Segment)`
  &&& {
    position: fixed;
    top: -1em;
    left: 0vw;
    z-index: 1000;
    width: 100vw;
    height: 110vh;
  }
`

const StyledContainer = styled.div`
  &&& {
    margin-top: 6em;
    text-align: center;
    position: relative;
  }
`

const StyledDivider = styled(Divider)`
  &&& {
    margin: 2em;
  }
`

const MobileMenu = ({location: {pathname}, token, cartCount, signout}) => {
  const [activeItem, setActiveItem] = useState(pathname)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    setActiveItem(pathname)
  }, [pathname])
  let arrayCarrito = []
  let arrayCarritoLocal = localStorage.getItem('arrayCarrito')
  let arrayCarritoLocalParseada = JSON.parse(arrayCarritoLocal)
  console.log(arrayCarritoLocalParseada)
  arrayCarrito = arrayCarritoLocalParseada

  if (arrayCarrito == null) {
    arrayCarrito = []
    localStorage.setItem('arrayCarrito', JSON.stringify(arrayCarrito))
  }
  cartCount = arrayCarrito.length

  const handleClick = () => setOpen(!open)

  const handleClose = () => setOpen(false)

  return (
    <Menu size="huge" borderless pointing>
      <Container text>
        <Menu.Item
          as={Link}
          to="/"
          header
          active={activeItem === withPrefix('/')}
        >
          <p className="tituloCabecera">Wörkoholics</p>
        </Menu.Item>
        <Menu.Menu position="right">
          <Menu.Item
            as={Link}
            to="/cart/"
            active={activeItem === withPrefix('/cart/')}
          >
            <ShoppingCartIcon cartCount={cartCount} name="" />
          </Menu.Item>
          <Menu.Item position="right">
            <BurgerButton
              basic
              onClick={handleClick}
              aria-label="Open Navigation Menu"
              autoFocus
            >
              <Icon fitted name="bars" />
            </BurgerButton>
          </Menu.Item>
        </Menu.Menu>
        <Portal closeOnEscape onClose={handleClose} open={open}>
          <StyledSegment className role="dialog" aria-label="Navigation Menu">
            <StyledContainer>
              <CloseButton
                aria-label="Close Navigation"
                basic
                circular
                onClick={handleClose}
                autoFocus
              >
                {/* X */}
                <p className="boton-cerrar-menu">X</p>
              </CloseButton>
              <StyledLink to="/" onClick={handleClose}>
                Productos
              </StyledLink>
              <StyledDivider />
              <StyledLink to="/cart/" onClick={handleClose}>
                {`Carrito ${cartCount ? `(${cartCount})` : ''}`}
              </StyledLink>
              <StyledDivider />
              {token
                ? [
                    <StyledLink to="/myaccount/" onClick={handleClose} key={1}>
                      Mi Cuenta
                    </StyledLink>,
                    <StyledDivider key={2} />,
                    <StyledLink to="/" onClick={signout} key={3}>
                      Cerrar Sesion
                    </StyledLink>,
                  ]
                : [
                    <StyledLink to="/register/" onClick={handleClose} key={1}>
                      Registro
                    </StyledLink>,
                    <StyledDivider key={2} />,
                    <StyledLink to="/login/" onClick={handleClose} key={3}>
                      Login
                    </StyledLink>,
                  ]}
            </StyledContainer>
          </StyledSegment>
        </Portal>
      </Container>
    </Menu>
  )
}

export default MobileMenu
