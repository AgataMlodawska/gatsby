/* eslint-disable camelcase */
import React, {useState} from 'react'
import {Link, navigate} from 'gatsby'
import {Loader, Message, Input, Icon, Transition} from 'semantic-ui-react'
import './cesta.css'
import styled from 'styled-components'
import imagen from './trash.png'
export default ({loading, setTotal}) => {
  if (loading) return <Loader active inline="centered" />

  const [visible, setVisible] = useState(false)
  const [error, setError] = useState('')
  const [descuento, setDescuento] = useState('')

  const toggleMessage = () => {
    setTimeout(() => {
      setVisible(false)
    }, 1000)
  }

  let arrayCarrito = []
  const arrayCarritoLocal = localStorage.getItem('arrayCarrito')
  const arrayCarritoLocalParseada = JSON.parse(arrayCarritoLocal)
  console.log(arrayCarritoLocalParseada)
  arrayCarrito = arrayCarritoLocalParseada
  if (arrayCarrito == null) {
    arrayCarrito = []
    localStorage.setItem('arrayCarrito', JSON.stringify(arrayCarrito))
  }
  if (arrayCarrito.length === 0) {
    return (
      <Message warning>
        <Message.Header>El carrito esta vacio</Message.Header>
        <p>Necesitas añadir productos antes de realizar el pago.</p>
      </Message>
    )
  } else {
    let precioTotal = 0
    let lista = arrayCarrito.map((producto, i) => {
      let [cantidad, setCantidad] = useState(producto.cantidad)
      let [precio, setPrecio] = useState(producto.precioTotal)
      let ruta = `/product/${producto.productId}`
      function go() {
        navigate(ruta)
      }
      function eliminar() {
        // alert(arrayCarrito[i].productId)
        arrayCarrito.splice(i, 1)
        localStorage.removeItem('arrayCarrito')
        const arrayObjetoProducto = JSON.stringify(arrayCarrito)
        localStorage.setItem('arrayCarrito', arrayObjetoProducto)
        window.location.reload(false)
      }
      function restar() {
        if (arrayCarrito[i].cantidad == 1) {
        } else {
          arrayCarrito[i].cantidad = arrayCarrito[i].cantidad - 1
          setCantidad(arrayCarrito[i].cantidad)
          arrayCarrito[i].precioTotal =
            arrayCarrito[i].cantidad * arrayCarrito[i].precio
          localStorage.removeItem('arrayCarrito')
          const arrayObjetoProducto = JSON.stringify(arrayCarrito)
          localStorage.setItem('arrayCarrito', arrayObjetoProducto)
          setPrecio(arrayCarrito[i].precioTotal)
          precioTotal = producto.precioTotal + precioTotal
          setTotal(precioTotal)
          // window.location.reload(false)
        }
      }
      function sumar() {
        arrayCarrito[i].cantidad = parseInt(arrayCarrito[i].cantidad) + 1
        setCantidad(arrayCarrito[i].cantidad)
        arrayCarrito[i].precioTotal =
          arrayCarrito[i].cantidad * arrayCarrito[i].precio
        localStorage.removeItem('arrayCarrito')
        const arrayObjetoProducto = JSON.stringify(arrayCarrito)
        localStorage.setItem('arrayCarrito', arrayObjetoProducto)
        setPrecio(arrayCarrito[i].precioTotal)
        precioTotal = producto.precioTotal + precioTotal
        setTotal(precioTotal)
        // window.location.reload(false)
      }
      return (
        <>
          <div className="parte-producto">
            <h2 onClick={go} className="titulo-producto">
              {producto.nombre}
            </h2>
            <div className="parte-producto-medio">
              <img src={producto.foto}></img>
              <div className="parte-derecha-producto">
                <div className="parte-precio">
                  <h3>Precio: {producto.precioTotal}€</h3>
                  <p>Precio por unidad: {producto.precio}€</p>
                </div>
                <div className="parte-cantidad">
                  <h3>Cantidad: {producto.cantidad}</h3>
                </div>
                <div className="parte-botones-cantidad">
                  <button
                    style={{marginRight: '10%', padding: '2px 11px'}}
                    className="botones-cantidad"
                    onClick={restar}
                  >
                    -
                  </button>
                  <button className="botones-cantidad" onClick={sumar}>
                    +
                  </button>
                </div>
                <div className="parte-boton-eliminar">
                  <button className="boton-eliminar" onClick={eliminar}>
                    <img src={imagen}></img>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <hr className="separador-productos"></hr>
        </>
      )
    })
    const handleChange = ({target: {value}}) => setDescuento(value)
    const handleSubmit = async () => {
      setVisible(true)
      toggleMessage()
    }

    return (
      <>
        {lista}
        {/* <Input
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
        {error && (
          <div style={{color: 'red', position: 'absolute'}}>{error}</div>
        )}
        <Transition duration={{hide: 500, show: 500}} visible={visible}>
          <div style={{color: 'green', position: 'absolute'}}>
            <Icon name="check" />
            Añadido al carrito
          </div>
        </Transition> */}
      </>
    )
  }
}
