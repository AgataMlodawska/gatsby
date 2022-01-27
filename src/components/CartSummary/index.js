import React from 'react'
import StripeCheckout from 'react-stripe-checkout'
import {Button, Segment, Divider} from 'semantic-ui-react'
import {navigate} from 'gatsby'
import '../estilos.css'

const onToken = token => {
  console.log(token)
  // alert('Payement Successful')
  navigate('/thanks')
}
export default ({
  precio,
  subTotal,
  handleCheckout,
  display_price: {
    with_tax: {amount, currency, formatted},
  },
}) => (
  <div className="parte-pago">
    <Divider />
    <Segment clearing size="large">
      <span>
        <strong>Sub total:</strong>
        {` ${subTotal}€`}
      </span>
      <StripeCheckout
        name="Workoholics Store"
        amount={precio}
        currency={currency || 'EUR'}
        stripeKey={
          process.env.STRIPE_PUBLISHABLE_KEY ||
          'pk_test_51K5BEsDa0yIVlyaxR2sg7u3ftQT9xeVXwIR3LVHVE72MspAPIn1Gb66dJhk4XjI2r1IUG5X3GfDdOWO3fs4zYHIS00uc3rvX0R'
        }
        shippingAddress={false}
        billingAddress
        zipCode
        token={onToken}
        reconfigureOnUpdate={false}
        triggerEvent="onClick"
      >
        <Button color="black" floated="right">
          Pagar
        </Button>
      </StripeCheckout>
    </Segment>
  </div>
)
