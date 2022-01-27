import React, {useState} from 'react'
import Headroom from 'react-headroom'
import {Container} from 'semantic-ui-react'
import Footer from '../Footer'
import Header from '../Header'
import 'semantic-ui-css/semantic.min.css'

const Layout = ({location, children}) => {
  let [contCarrito, setContCarrito] = useState(0)
  return (
    <>
      <Headroom
        upTolerance={10}
        downTolerance={10}
        style={{zIndex: '20', height: '6.5em'}}
      >
        <Header
          contCarrito={contCarrito}
          setContCarrito={setContCarrito}
          location={location}
        />
      </Headroom>
      <Container contCarrito={contCarrito} setContCarrito={setContCarrito} text>
        {children}
      </Container>
      <Footer />
    </>
  )
}

export default Layout
