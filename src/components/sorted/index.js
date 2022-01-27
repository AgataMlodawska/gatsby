import React from 'react'
import {graphql, useStaticQuery} from 'gatsby'
import {Image} from 'semantic-ui-react'
import {get} from 'lodash'
import {Link} from 'gatsby'
import styled from 'styled-components'
import SEO from '../SEO'
import {Card} from 'semantic-ui-react'
const styledLink = styled(Link)`
  text-decoration: none;
  color: black;
  &:hover {
    color: #f8068c;
  }
`
const SortedTemplate = () => {
  const data = useStaticQuery(graphql`
    query sort {
      allMongodbWorkoholicsProductos(sort: {fields: Precio, order: ASC}) {
        edges {
          node {
            Fotos
            foto_url
            Precio
            Unidades
            descripcion
            nombre
            id
          }
        }
      }
    }
  `)
  const productos = get(data, 'allMongodbWorkoholicsProductos.edges')
  console.log(productos)
  const mapProductsToItems = productos.map(
    ({
      node: {nombre, id, foto_url, descripcion, Precio, Unidades, categoria},
    }) => {
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
              <p style={{color: '#ffcdo4'}}>{Unidades} disponibles</p>
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
  return (
    <>
      <div>
        <p>
          <b>Precios: de mayor a menor</b>
        </p>
        <Card.Group items={mapProductsToItems} itemsPerRow={2} stackable />
      </div>
    </>
  )
}

export default SortedTemplate
