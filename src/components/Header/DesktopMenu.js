import React, {useState, useEffect} from 'react'
import {Link, withPrefix} from 'gatsby'
import {Menu, Container, Icon} from 'semantic-ui-react'
import ShoppingCartIcon from './ShoppingCartIcon'
import styled from 'styled-components'
import Logo from './Logo'
import '../estilos.css'
const styledLink = styled(Link)`
  text-decoration: none;
  color: black;
  &:hover {
    color: #f8068c;
  }
`

const DesktopMenu = ({location: {pathname}, token, cartCount, signout}) => {
  const [activeItem, setActiveItem] = useState(pathname)

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
  // alert(arrayCarrito.length)
  cartCount = arrayCarrito.length
  // setContCarrito(cartCount)
  return (
    <Menu size="huge" borderless pointing>
      <Container text>
        <Menu.Item
          active={activeItem === withPrefix('/')}
          as={styledLink}
          to="/"
          header
        >
          <h4 className="tituloCabecera">Wörkoholics</h4>
        </Menu.Item>
        {token ? (
          <Menu.Menu position="right">
            <Menu.Item
              as={styledLink}
              to="/myaccount/"
              active={activeItem === withPrefix('/myaccount/')}
            >
              <Icon name="user" />
              Mi Cuenta
            </Menu.Item>
            <Menu.Item onClick={signout}>Cerrar Sesión</Menu.Item>
            <Menu.Item
              as={styledLink}
              to="/cart/"
              active={activeItem === withPrefix('/cart/')}
            >
              <ShoppingCartIcon cartCount={cartCount} name="Cart" />
            </Menu.Item>
          </Menu.Menu>
        ) : (
          <Menu.Menu position="right">
            <Menu.Item
              as={styledLink}
              to="/register/"
              active={activeItem === withPrefix('/register/')}
            >
              Registro
            </Menu.Item>
            <Menu.Item
              as={styledLink}
              to="/login/"
              active={activeItem === withPrefix('/login/')}
            >
              Login
            </Menu.Item>
            <Menu.Item
              as={styledLink}
              to="/cart/"
              active={activeItem === withPrefix('/cart/')}
            >
              <ShoppingCartIcon cartCount={cartCount} name="Cart" />
            </Menu.Item>
          </Menu.Menu>
        )}
      </Container>
    </Menu>
  )
}

export default DesktopMenu
