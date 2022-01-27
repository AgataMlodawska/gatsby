/* eslint-disable */
import React from 'react'
import {graphql} from 'gatsby'
import SEO from '../components/SEO'
import get from 'lodash/get'
import ProductSummary from '../components/ProductSummary'
import ProductAttributes from '../components/ProductAttributes'
import Dropdownjs from '../components/Dropdownjs'
import styled from 'styled-components'
import Layout from '../components/Layout'
import ProductosRelacionados from '../components/ProductosRelacionados'
import {Link} from 'gatsby'
import ScrollArrow from '../components/ScrollArrow'
import '../pages/filtros.css'

class ProductPageTemplate extends React.PureComponent {
  render() {
    const productInfo = get(this, 'props.data.allMongodbWorkoholicsProductos')
    const data = productInfo.edges[0].node
    const image = get(data, 'foto_url')
    const product = {
      ...data,
      id: data.id,
      image,
      header: data.name,
    }

    return (
      <Layout location={this.props.location}>
        <SEO title={data.nombre} />
        <Link to="/" style={{textDecoration: 'none', color: '#fb088c'}}>
          <p style={{marginBottom: '1%'}}>
            <i class="arrow left icon"></i>
          </p>
        </Link>
        <ProductSummary {...product} />
        <div className="dropdown">
          <Dropdownjs {...product} />
        </div>
        <div className="scrollarrow">
          <ScrollArrow />
        </div>
        <ProductAttributes {...product} />
        <ProductosRelacionados {...product} />
      </Layout>
    )
  }
}

export default ProductPageTemplate

export const pageQuery = graphql`
  query ProductsQuery($id: String!) {
    allMongodbWorkoholicsProductos(filter: {id: {eq: $id}}) {
      edges {
        node {
          id
          nombre
          descripcion
          foto_url
          Precio
          color
          Fotos
          categoria
          Unidades
          sku
          tallas {
            talla
            unidades
          }
          tamano
          Material
          Colores {
            color
            unidades
          }
          Productos_relacionados {
            nombre_producto
            photo
            id_producto
          }
        }
      }
    }
  }
`
