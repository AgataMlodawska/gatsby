/* eslint-disable camelcase */
import React, {useState, useContext, useEffect} from 'react'
import {Loader, Message, Input, Icon, Transition} from 'semantic-ui-react'
import SEO from '../components/SEO'
import CartItemList from '../components/CartItemList'
import CartSummary from '../components/CartSummary'
import CartContext from '../components/Context/CartContext'
import Layout from '../components/Layout'
import '../components/CartItemList/cesta.css'
import '../components/estilos.css'

const Moltin = require('../../lib/moltin')

const Cart = ({location}) => {
  const [loading, setLoading] = useState(true)
  const [items, setItems] = useState([])
  const [completed, setCompleted] = useState(false)
  const [meta, setMeta] = useState({})
  const [cartId, setCartId] = useState({})
  const {updateCartCount} = useContext(CartContext)

  async function getCartItems() {
    const cartIdLocal = await localStorage.getItem('mcart')
    await Moltin.getCartItems(cartIdLocal).then(({data, meta}) => {
      setItems(data)
      setCartId(cartIdLocal)
      setMeta(meta)
      setLoading(false)
      console.log(data)
    })
  }

  useEffect(() => {
    getCartItems()
  }, [])

  const handleCheckout = async data => {
    const cartId = await localStorage.getItem('mcart')
    const customerId = localStorage.getItem('mcustomer')

    const {
      id: token,
      email,
      card: {
        name,
        address_line1: line_1,
        address_city: city,
        address_country: country,
        address_state: county,
        address_zip: postcode,
      },
    } = data

    const customer = customerId || {name, email}

    const address = {
      first_name: name.split(' ')[0],
      last_name: name.split(' ')[1] || '',
      line_1,
      city,
      county: county || '',
      country,
      postcode,
    }

    try {
      const {
        data: {id},
      } = await Moltin.checkoutCart(cartId, customer, address)
      await Moltin.payForOrder(id, token, email)
      setCompleted(true)
      updateCartCount(0, cartId)
    } catch (e) {
      console.log(e)
    }
  }

  const handleRemoveFromCart = itemId => {
    Moltin.removeFromCart(itemId, cartId).then(({data, meta}) => {
      const total = data.reduce((a, c) => a + c.quantity, 0)
      updateCartCount(total, cartId)
      setItems(data)
      setMeta(meta)
    })
  }
  let [subTotal, setTotal] = useState(0)
  let [precioComboStarter, setprecioComboStarter] = useState(0)

  let arrayCarrito = []
  const arrayCarritoLocal = localStorage.getItem('arrayCarrito')
  const arrayCarritoLocalParseada = JSON.parse(arrayCarritoLocal)
  console.log(arrayCarritoLocalParseada)
  arrayCarrito = arrayCarritoLocalParseada
  if (arrayCarrito == null) {
    arrayCarrito = []
    localStorage.setItem('arrayCarrito', JSON.stringify(arrayCarrito))
  } else {
    arrayCarrito.map((producto, i) => {
      precioComboStarter = precioComboStarter + producto.precioTotal
    })
  }
  // setCantidad(precioComboStarter)
  subTotal = precioComboStarter
  precioComboStarter = precioComboStarter * 100
  // console.log('PRECIO COMBO: ' + precioCombo)
  console.log('AKI ')
  console.log(arrayCarrito)

  const [visible, setVisible] = useState(false)
  const [error, setError] = useState('')
  const [descuento, setDescuento] = useState('')
  const [tipoDescuento, setTipoDescuento] = useState(0)

  const arrayDescuentos = [
    {cod: 16789653, valor: 20},
    {cod: 12345, valor: 10},
  ]
  const toggleMessage = () => {
    setTimeout(() => {
      setVisible(false)
    }, 1000)
  }
  let tipo = () => {
    if (tipoDescuento == 0) {
      return (
        <Transition duration={{hide: 500, show: 500}} visible={visible}>
          <div style={{color: 'green', position: 'absolute'}}>
            <Icon name="check" />
            Descuento aplicado correctamente
          </div>
        </Transition>
      )
    } else {
      return (
        <Transition duration={{hide: 500, show: 500}} visible={visible}>
          <div style={{color: 'red', position: 'absolute'}}>
            <Icon name="window close" />
            Descuento no valido
          </div>
        </Transition>
      )
    }
  }
  const handleChange = ({target: {value}}) => setDescuento(value)
  const handleSubmit = () => {
    arrayDescuentos.map((producto, i) => {
      if (descuento == producto.cod) {
        // alert(precioComboStarter / 100)
        let precioValor = producto.valor / 100
        let precioForm = precioComboStarter / 100
        let precioBase = precioForm * precioValor
        let precioDescontado = precioForm - precioBase
        // alert(
        //   'PrecioForm: ' +
        //     precioForm +
        //     ' * PrecioValor: ' +
        //     precioValor +
        //     ' PrecioBase: ' +
        //     precioBase,
        // )
        // alert(
        //   'PrecioForm: ' +
        //     precioForm +
        //     ' - PrecioBase: ' +
        //     precioBase +
        //     '= PrecioDescontado: ' +
        //     precioDescontado,
        // )
        setTotal(0)
        setprecioComboStarter(precioDescontado - precioComboStarter / 100)
        setTipoDescuento(0)
        setVisible(true)
        toggleMessage()
      } else {
        setTipoDescuento(1)
        setVisible(true)
        toggleMessage()
      }
    })
  }
  return (
    <Layout location={location}>
      <SEO title="Cart" />
      <div className="parte-tramitar-pedido">
        <Input
          className="boton-descuento"
          type="text"
          placeholder="Cod.descuento"
          value={descuento}
          error={!!error}
          onChange={handleChange}
          action={{
            color: 'pink',
            content: 'Aplicar descuento',
            onClick: handleSubmit,
            loading,
            disabled: loading,
          }}
        />
        {tipo()}

        {!loading && !completed && (
          <CartSummary
            display_price={meta.display_price}
            handleCheckout={handleCheckout}
            precio={precioComboStarter}
            subTotal={subTotal}
          />
        )}
      </div>
      <div className="parte-cesta">
        <CartItemList
          completed={completed}
          items={items}
          loading={loading}
          cartId={cartId}
          setTotal={setTotal}
          removeFromCart={item => handleRemoveFromCart(item)}
        />
      </div>
    </Layout>
  )
}

export default Cart
