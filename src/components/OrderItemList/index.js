/* eslint-disable camelcase */
import React from 'react'
import {Link} from 'gatsby'
import {Header, Loader, Message, Label, Segment} from 'semantic-ui-react'

export default ({orders, loading}) => {
  if (loading) return <Loader active inline="centered" />

  if (orders.length === 0) {
    return (
      <Message warning>
        <Message.Header>No hay pedidos recientes</Message.Header>
        <p>
          Cuando hagas un pedido, aparecerá aquí.
          <Link to="/"> Ir a la tienda.</Link>
        </p>
      </Message>
    )
  }

  return (
    <div>
      <Header as="h1">Pedidos anteriores</Header>

      {orders.map(order => {
        const {
          id,
          billing_address,
          shipping_address,
          status,
          meta,
          order_items,
        } = order
        const completed = status === 'complete'
        const price = meta.display_price.with_tax.formatted

        return (
          <Segment.Group key={id}>
            <Segment>
              <Header as="h4">{price}</Header>
              <Label
                icon={completed ? 'check' : null}
                color={completed ? 'green' : null}
                content={status.toUpperCase()}
              />
              <pre>{JSON.stringify(order_items, '\t', 2)}</pre>
            </Segment>
            <Segment.Group horizontal>
              <Segment>
                <Header as="h4">Dirección de Envio:</Header>
                <p>
                  {billing_address.line_1}
                  <br />
                  {billing_address.line_2}
                  <br />
                  {billing_address.city}
                  <br />
                  {billing_address.postcode}
                  <br />
                  {billing_address.county}
                  <br />
                  {billing_address.country}
                </p>
              </Segment>
              <Segment>
                <Header as="h4">Dirección de envío:</Header>
                <p>
                  {shipping_address.line_1}
                  <br />
                  {shipping_address.line_2}
                  <br />
                  {shipping_address.city}
                  <br />
                  {shipping_address.postcode}
                  <br />
                  {shipping_address.county}
                  <br />
                  {shipping_address.country}
                </p>
              </Segment>
            </Segment.Group>
          </Segment.Group>
        )
      })}
    </div>
  )
}
