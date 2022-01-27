// import React from "react"
// import { graphql } from "gatsby"
// import Layout from "./layout"
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
// import { faShoppingCart } from "@fortawesome/free-solid-svg-icons"
// import Seo from "./seo"
// class Product extends React.Component {
//   render() {
//     const producto = this.props.data.mongodbWorkoholicsProductos

//     return (
//       <Layout>
//         <div>
//           {producto.skus.map(sku=><div>
//             <h2><span>{sku.nombre_producto}</span></h2>
//            <p><img src={sku.imagen_url}></img></p>
//            <p> <span>precio: {sku.precio} €</span></p>
//            {sku.ejemplares !=null?
//             <div>
//            <label for="tallas">Seleccionar talla </label>
//            <select name="tallas" id="tallas">
//             {sku.ejemplares !=null ? sku.ejemplares.map(ejemplar =><option>
//             {ejemplar.talla} </option>

//             ):<p></p>}
//                 </select>
//                 {sku.ejemplares !=null ? sku.ejemplares.map(ejemplar =><div>
//                     {ejemplar.unidades <10 && ejemplar.unidades>0? <p>Talla {ejemplar.talla}: Pocas unidades disponibles</p>:<p></p>}
//                     {ejemplar.unidades==0?<p>Talla: {ejemplar.talla}: Producto no disponible</p>:<p></p>}</div>
//                     ):<p></p>}
//                 </div>:<p></p>}
//               <p>  <button><FontAwesomeIcon icon={faShoppingCart}/></button></p>
//               {sku.unidades <10 && sku.unidades>0? <p color="red">Pocas unidades disponibles</p>:<p></p>}
//               {sku.unidades==0?<p>Producto no disponible</p>:<p></p>}
//                 <h3>Productos relacionados: </h3>
//                 { sku.productos_relacionados != null ? sku.productos_relacionados.map (relacionado=><div className="productos relacionados">
//                     <p>{relacionado.nombre_producto_relacionado}</p>
//                     <p><img src={relacionado.img_url}></img></p>
//                     </div>):<p></p>}

//             </div>
//             )}

//         </div>
//       </Layout>
//     )
//   }
// }

// export default Product

// export const pageQuery = graphql`
//   query($id: String!) {
//     mongodbWorkoholicsProductos(id: { eq: $id }) {
//         id
//         nombre
//         skus {
//             nombre_producto
//             precio
//             imagen_url
//             unidades
//             productos_relacionados {
//                 nombre_producto_relacionado
//                 img_url
//             }
//             ejemplares {
//                 talla
//                 unidades
//             }

//         }
//     }
//   }
// `
