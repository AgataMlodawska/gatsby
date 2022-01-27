import React, {useState} from 'react'
import {graphql, useStaticQuery, Link} from 'gatsby'
import get from 'lodash/get'
import {Image, Header, Button} from 'semantic-ui-react'
import ProductList from '../components/ProductList'
import SEO from '../components/SEO'
import logo from '../images/logo.png'
import Layout from '../components/Layout'
import SearchEngine from '../components/SearchEngine'
import {Icon} from 'semantic-ui-react'
import SortedTemplate from '../components/sorted'
import SortedDesc from '../components/SortedDesc'
import './filtros.css'
import ScrollArrow from '../components/ScrollArrow'

const StoreIndex = ({location}) => {
  const data = useStaticQuery(graphql`
    query IndexQuery {
      site {
        siteMetadata {
          title
        }
      }
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

  const siteTitle = get(data, 'site.siteMetadata.title')
  const products = get(data, 'allMongodbWorkoholicsProductos.edges')
  const emptyQuery = ''

  const [state, setState] = useState({
    filteredData: [],
    query: emptyQuery,
  })
  const categories = products.map(product => {
    const filter = product.node.categoria
    return filter
  })
  console.log(categories)
  let uniquecategories = [...new Set(categories)]
  const [showDesc, setShowDesc] = useState(false)
  const onClick = () => setShowDesc(true)
  const [showAsc, setShowAsc] = useState(false)
  const onClickAsc = () => setShowAsc(true)
  function refreshPage() {
    window.location.reload(false)
  }
  const [filters, setFilters] = useState(false)
  const onClickFilters = () => setFilters(true)
  const filterProductsWithoutImages = products.filter(v => v.node.foto_url)
  return (
    <Layout location={location}>
      <SEO title={siteTitle} />
      <Header
        as="h3"
        icon
        textAlign="center"
        style={{
          marginBottom: '2em',
        }}
      >
        <Header.Content
          style={{
            width: '60%',
            margin: '0 auto',
          }}
        ></Header.Content>
      </Header>
      <div
        className="logo"
        style={{
          display: 'flex',
          marginBottom: '6%',
          marginTop: '-6%',
          alignContent: 'center',
          width: '80%',
          alignItems: 'center',
          flexDirection: 'column',
          width: '80%',
          marginLeft: '10%',
        }}
      >
        <img src={logo} alt="Logo" />
        <h1 classname="h1" style={{display: 'flex', textAlign: 'center'}}>
          TIENDA
        </h1>
      </div>
      <Button
        onClick={onClickFilters}
        style={{marginTop: '-5%', backgroundColor: '#fbeae9'}}
      >
        Filtros
      </Button>
      {filters ? (
        <div
          className="filters"
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: '2%',
            marginRight: '2%',
          }}
        >
          <div style={{display: 'flex'}}>
            <p style={{marginTop: '1%'}}>
              <b>Filtra por:</b>
            </p>

            {uniquecategories.map(category => {
              return (
                <div>
                  <Link to={`/product/categoria/${category}/`}>
                    <Button style={{backgroundColor: '#fbeae9'}}>
                      <Icon>
                        <i class="filter icon"></i>
                      </Icon>{' '}
                      {category}
                    </Button>
                  </Link>
                </div>
              )
            })}
          </div>
          <div style={{display: 'flex', justifyContent: 'space-between'}}>
            <p style={{padding: '1%'}}>
              <b>Ordena precios: </b>
            </p>
            <Button
              style={{backgroundColor: '#fbeae9', marginBottom: '5%'}}
              onClick={onClick}
            >
              <Icon>
                <i class="plus icon"></i>
              </Icon>{' '}
            </Button>

            <Button
              style={{backgroundColor: '#fbeae9', marginBottom: '5%'}}
              onClick={onClickAsc}
            >
              <Icon>
                <i class="minus icon"></i>
              </Icon>{' '}
            </Button>
            <Button
              onClick={refreshPage}
              style={{backgroundColor: '#fbeae9', marginBottom: '5%'}}
            >
              {' '}
              Limpiar filtros
            </Button>
          </div>
        </div>
      ) : (
        <></>
      )}
      {showAsc ? (
        <div style={{marginTop: '-10%'}}>
          {' '}
          <SortedDesc />
        </div>
      ) : showDesc ? (
        <div>
          {' '}
          <SortedTemplate />
        </div>
      ) : (
        <SearchEngine />
      )}
      <ScrollArrow />
    </Layout>
  )
}

export default StoreIndex
