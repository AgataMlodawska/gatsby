import React, {useState} from 'react'
import Img from 'gatsby-image'
import GatsbyImage from 'gatsby-image'
import {Image, Item, Label} from 'semantic-ui-react'
import Dropdownjs from '../Dropdownjs'
import AddToCart from '../AddToCart'

import 'bootstrap/dist/css/bootstrap.min.css'
import {Carousel} from 'react-bootstrap'

export default ({
  id,
  nombre,
  Precio,
  sku,
  foto_url,
  Fotos,
  tallas,
  Colores,
  Unidades,
}) => (
  <div style={{width: '100%'}}>
    <Item.Group>
      <Item style={{alignItems: 'center'}}>
        <Item.Image size="large">
          <Carousel>
            {Fotos != undefined
              ? Fotos.map(Foto => (
                  <Carousel.Item key={nombre}>
                    <Image src={Foto} alt={nombre} />
                  </Carousel.Item>
                ))
              : null}
          </Carousel>
        </Item.Image>
        <Item.Content style={{marginTop: '5%', marignLeft: '-5%'}}>
          <Item.Header>{nombre}</Item.Header>
          <Item.Description>
            <p>{Precio} €</p>
            {Colores === null && tallas === null ? (
              <div>
                {Unidades != undefined && Unidades > 10 ? (
                  <p style={{color: '#26d13f'}}>En stock</p>
                ) : (
                  <p></p>
                )}
                {Unidades != undefined && Unidades <= 10 && Unidades > 0 ? (
                  <p style={{color: '#ffcd04'}}>Pocas unidades disponibles</p>
                ) : (
                  <p></p>
                )}
                {Unidades != undefined && Unidades == 0 ? (
                  <p style={{color: '#df1f1d'}}>Fuera de stock</p>
                ) : (
                  <p></p>
                )}
              </div>
            ) : (
              <></>
            )}
            <Label>{`SKU: ${sku}`}</Label>
          </Item.Description>
          <Item.Extra>
            <AddToCart
              nombreProducto={nombre}
              foto={foto_url}
              productId={id}
              precio={Precio}
            />
          </Item.Extra>
        </Item.Content>
      </Item>
    </Item.Group>
  </div>
)
