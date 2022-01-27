import React, {useState} from 'react'
import '../components/thanks.css'
import {navigate} from 'gatsby'
import {Message} from 'semantic-ui-react'

const thanks = () => {
  function pdf() {
    window.print()
  }
  const go = () => {
    arrayCarrito = []
    localStorage.setItem('arrayCarrito', JSON.stringify(arrayCarrito))
    navigate('/')
  }
  let precioTotalFactura = 0

  let arrayCarrito = []
  const arrayCarritoLocal = localStorage.getItem('arrayCarrito')
  const arrayCarritoLocalParseada = JSON.parse(arrayCarritoLocal)
  console.log(arrayCarritoLocalParseada)
  arrayCarrito = arrayCarritoLocalParseada
  if (arrayCarrito == null) {
    arrayCarrito = []
    localStorage.setItem('arrayCarrito', JSON.stringify(arrayCarrito))
  }
  let lista = arrayCarrito.map(producto => {
    precioTotalFactura = precioTotalFactura + producto.precioTotal

    return (
      <div className="parte-producto-lista">
        <div className="parte-producto-cesta">
          <h2 className="titulo-producto-cesta">{producto.nombre}</h2>
          <div className="parte-producto-medio-cesta">
            <img src={producto.foto}></img>
            <div className="parte-derecha-producto-cesta">
              <div className="parte-precio-cesta">
                <h3>Precio: {producto.precioTotal}</h3>
                <p>Precio por unidad: {producto.precio}</p>
              </div>
              <div className="parte-cantidad-cesta">
                <h3>Cantidad: {producto.cantidad}</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  })

  return (
    <div className="parte-thanks-general">
      <h1>Factura Wörkoholics Shop</h1>
      <div className="parte-mensaje">
        <Message color="green">
          <Message.Header>Gracias por comprar en Wörkoholics</Message.Header>
          <p>
            Se ha enviado un correo a pruebra@pruebra.com con la factura y el
            codigo de seguimiento. Si quieres descargar la factura en formato
            PDF haz click en el boton inferior "Generar PDF"
          </p>
        </Message>
      </div>
      <div className="lista-productos">{lista}</div>
      <div className="parte-precio-total">
        <h3>Precio Total: {precioTotalFactura}€</h3>
      </div>
      <div className="botones-footer">
        <button onClick={pdf}>GENERAR PDF</button>
        <button onClick={go}>Volver al Inicio</button>
      </div>
    </div>
  )
}

export default thanks
