import React, {useState} from 'react'
import {Input, Icon, Transition} from 'semantic-ui-react'

// const Moltin = require('../../../lib/moltin')

const AddToCart = ({productId, nombreProducto, foto, precio}) => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [visible, setVisible] = useState(false)

  const toggleMessage = () => {
    setTimeout(() => {
      setVisible(false)
    }, 1000)
  }

  const validate = quantity => {
    let error
    const re = /^[0-9\b]+$/

    if (!quantity) error = "Can't be blank"
    if (!re.test(quantity)) error = 'Please enter an integer for the quantity'

    return error
  }

  const handleSubmit = async () => {
    let arrayCarrito = []
    const arrayCarritoLocal = localStorage.getItem('arrayCarrito')
    const arrayCarritoLocalParseada = JSON.parse(arrayCarritoLocal)
    console.log(arrayCarritoLocalParseada)
    arrayCarrito = arrayCarritoLocalParseada
    if (arrayCarrito == null) {
      arrayCarrito = []
      localStorage.setItem('arrayCarrito', JSON.stringify(arrayCarrito))
    }
    // d
    const error = validate(quantity)
    setError(error)
    if (!error) {
      setLoading(true)

      arrayCarrito.push({
        productId: productId,
        cantidad: quantity,
        nombre: nombreProducto,
        foto: foto,
        precio: precio,
        precioTotal: precio * quantity,
      })
      localStorage.removeItem('arrayCarrito')
      const arrayObjetoProducto = JSON.stringify(arrayCarrito)
      localStorage.setItem('arrayCarrito', arrayObjetoProducto)

      console.log(arrayCarrito)
      setLoading(false)
      setQuantity(quantity)
      setVisible(true)
      toggleMessage()
      window.location.reload(false)
    }
  }

  const handleChange = ({target: {value}}) => setQuantity(value)

  return (
    <>
      <Input
        style={{maxWidth: '150px'}}
        type="number"
        placeholder="Quantity"
        value={quantity}
        min={1}
        step={1}
        error={!!error}
        onChange={handleChange}
        action={{
          color: 'pink',
          content: 'Añadir al carrito',
          icon: 'plus cart',
          onClick: handleSubmit,
          loading,
          disabled: loading,
        }}
      />
      {error && <div style={{color: 'red', position: 'absolute'}}>{error}</div>}
      <Transition duration={{hide: 500, show: 500}} visible={visible}>
        <div style={{color: 'green', position: 'absolute'}}>
          <Icon name="check" />
          Añadido al carrito
        </div>
      </Transition>
    </>
  )
}

export default AddToCart
