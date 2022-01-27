/* eslint-disable */
import React from 'react'
import {graphql} from 'gatsby'
import SEO from '../components/SEO'
import get from 'lodash/get'
import styled from 'styled-components'
import Layout from '../components/Layout'
import Categories from '../components/Categories/Categories'
import {propertyOf} from 'lodash'
import {Card, Image} from 'semantic-ui-react'
import {Link} from 'gatsby'
import ScrollArrow from '../components/ScrollArrow'
const styledLink = styled(Link)`
  text-decoration: none;
  color: black;
  &:hover {
    color: #f8068c;
  }
`

class CategoryPageTemplate extends React.PureComponent {
  render() {
    const productInfo = get(this, 'props.data.allMongodbWorkoholicsProductos')
    const data = productInfo.edges[0].node
    const categoria = data.categoria

    const data2 = productInfo.edges
    console.log(data2)
    const image = get(data, 'foto_url')
    const mapProductsToItems = data2.map(
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
      <Layout location={this.props.location}>
        <SEO title={data.categoria} />
        <Link to="/" style={{textDecoration: 'none', color: '#fb088c'}}>
          <p style={{marginBottom: '1%'}}>
            <i class="arrow left icon"></i>
          </p>
        </Link>
        <h4 style={{marginBottom: '5%'}}>Categoria: {categoria}</h4>
        <Card.Group items={mapProductsToItems} itemsPerRow={2} stackable />
        <ScrollArrow />
      </Layout>
    )
  }
}

export default CategoryPageTemplate

export const pageQuery = graphql`
  query CategoriesQuery($categoria: String!) {
    allMongodbWorkoholicsProductos(filter: {categoria: {eq: $categoria}}) {
      edges {
        node {
          id
          nombre
          descripcion
          foto_url
          Precio
          color
          Fotos
          Unidades
          categoria
        }
      }
    }
  }
`
