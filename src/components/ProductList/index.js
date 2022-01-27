/* eslint-disable camelcase */
import React from 'react'
import {Card, Image} from 'semantic-ui-react'
import {Link} from 'gatsby'
import styled from 'styled-components'
const styledLink = styled(Link)`
  text-decoration: none;
  color: black;
  &:hover {
    color: #f8068c;
  }
`

const mapProductsToItems = productos =>
  productos.map(
    ({node: {nombre, id, foto_url, descripcion, Precio, Unidades}}) => {
      return {
        as: styledLink,
        to: `/product/${id}/`,
        childKey: id,
        header: nombre,
        image: <Image className="img" src={foto_url} alt={nombre}></Image>,
        meta: (
          <div>
            <p>{Precio} €</p>
            <p>{descripcion}</p>
            {Unidades != undefined && Unidades > 10 ? (
              <p style={{color: '#26d13f'}}>En stock</p>
            ) : (
              <p></p>
            )}
            {Unidades != undefined && Unidades <= 10 && Unidades > 0 ? (
              <p style={{color: '#ffcd04'}}>{Unidades} disponibles</p>
            ) : (
              <p></p>
            )}
            {Unidades != undefined && Unidades == 0 ? (
              <p style={{color: '#df1f1d'}}>Temporalmente fuera de stock</p>
            ) : (
              <p></p>
            )}
          </div>
        ),
      }
    },
  )

export default ({products}) => (
  <Card.Group items={mapProductsToItems(products)} itemsPerRow={2} stackable />
)
