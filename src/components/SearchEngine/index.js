import React, {useReact, useState} from 'react'
import {Link, graphql, useStaticQuery} from 'gatsby'
import get from 'lodash/get'
import styled from 'styled-components'
import SEO from '../SEO'
import {Card, Image, Icon} from 'semantic-ui-react'
import '../../pages/filtros.css'
const styledLink = styled(Link)`
  text-decoration: none;
  color: black;
  &:hover {
    color: #f8068c;
  }
`
const SearchEngine = () => {
  const data = useStaticQuery(graphql`
    query SearchQuery {
      allMongodbWorkoholicsProductos {
        edges {
          node {
            id
            nombre
            descripcion
            Precio
            foto_url
            Unidades
            categoria
          }
        }
      }
    }
  `)
  const allProducts = get(data, 'allMongodbWorkoholicsProductos.edges')

  const emptyQuery = ''

  const [state, setState] = useState({
    filteredData: [],
    query: emptyQuery,
  })

  const handleInputChange = event => {
    console.log(event.target.value)
    const query = event.target.value

    const posts = data.allMongodbWorkoholicsProductos.edges || []

    const filteredData = posts.filter(post => {
      const descripcion = post.node.descripcion
      const nombre = post.node.nombre
      const categoria = post.node.categoria
      return (
        descripcion.toLowerCase().includes(query.toLowerCase()) ||
        nombre.toLowerCase().includes(query.toLowerCase()) ||
        categoria.toLowerCase().includes(query.toLowerCase)
      )
    })

    setState({
      query,
      filteredData,
    })
  }

  const {filteredData, query} = state

  const hasSearchResults = filteredData && query !== emptyQuery
  const productos = hasSearchResults ? filteredData : allProducts
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
      <div
        className="searchBox"
        style={{display: 'flex', marginBottom: '1%', marginTop: '2%'}}
      >
        <Icon className="search-icon">
          <i class="search icon"></i>
        </Icon>
        <input
          className="searchInput"
          type="text"
          aria-label="Search"
          placeholder="Estoy buscando..."
          onChange={handleInputChange}
          style={{
            padding: '1%',
            marginBottom: '5%',

            borderStyle: 'none',
            borderWidth: '1px',
            borderRadius: '4%',
            borderColor: '#c7c7c7',
            backgroundColor: '#fbeae9',
          }}
        />
      </div>
      <div>
        <SEO title={query} />
        {query != '' ? (
          <div>
            {filteredData.length === 1 ? (
              <p>
                Resultados para: "{query}". Hemos encontrado{' '}
                {filteredData.length} producto
              </p>
            ) : filteredData.length === 0 || filteredData.length > 1 ? (
              <p>Hemos encontrado {filteredData.length} productos</p>
            ) : (
              <></>
            )}
          </div>
        ) : (
          <></>
        )}
        <Card.Group items={mapProductsToItems} itemsPerRow={2} stackable />
      </div>
    </>
  )
}

export default SearchEngine
