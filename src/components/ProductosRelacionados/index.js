import {useStaticQuery} from 'gatsby'
import {Image} from 'react-bootstrap'
import React, {useState} from 'react'
import {Figure} from 'react-bootstrap'
import {Link} from 'gatsby'

import 'bootstrap/dist/css/bootstrap.min.css'
import '../../pages/filtros.css'
const ProductosRelacionados = ({Productos_relacionados}) => {
  return (
    <>
      <p style={{margin: '1%'}}>
        <b>Productos relacionados: </b>
      </p>
      <div
        className="productos_relacionados"
        style={{display: 'flex', justifyContent: 'space-around'}}
      >
        {Productos_relacionados != undefined
          ? Productos_relacionados.map(Producto => (
              <div>
                <Link
                  to={`/product/${Producto.id_producto}`}
                  style={{textDecoration: 'none', color: '#f8068c'}}
                >
                  <Figure style={{margin: '1%'}}>
                    <Figure.Image
                      className="figure"
                      style={{maxWidth: '300px'}}
                      className="figure"
                      src={Producto.photo}
                      alt={Producto.nombre_producto}
                    />
                    <Figure.Caption>{Producto.nombre_producto}</Figure.Caption>
                  </Figure>
                </Link>
              </div>
            ))
          : null}
      </div>
    </>
  )
}

export default ProductosRelacionados
