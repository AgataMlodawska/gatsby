// import * as React from "react"
// import { Link, graphql, useStaticQuery } from "gatsby"
// import Layout from "../components/layout"
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import {
//     faMoneyCheck,
//     faInfo,
//     faHome,
//     faCoffee,
//     faAddressBook,
//     faAirFreshener,
//     faAmbulance,
//     faAtom,
//     faBus,
//     faCoins,
//     faDice,
//   } from '@fortawesome/free-solid-svg-icons'
// import Seo from "../components/seo"

// const Productos = (props) => {
//     const productos = props.data.allMongodbWorkoholicsProductos.edges;
//     return (
//       <Layout>
//       <Link to="/"><FontAwesomeIcon icon={faHome} /></Link>
//       <React.Fragment>
//       <div>
//       <div className="product-container">
//         {productos.map(producto =>

//             <div className="producto" key={producto.node.nombre}>
//             <Link to={'/producto/' + producto.node.nombre}>
//             <img src={producto.node.foto_url}/>
//             <h2>{producto.node.nombre}</h2>
//             <h4>
//             <FontAwesomeIcon icon={faMoneyCheck} />  {producto.node.Precio} €</h4>
//             <p><FontAwesomeIcon icon={faInfo} /> {producto.node.descripcion}</p>
//           </Link>
//             </div>
//         )}
//       </div>
//     </div>
//     </React.Fragment>
//     </Layout>
//   )}
//   export default Productos
//   export const Pagequery = graphql`
// query{
// allMongodbWorkoholicsProductos {
//   edges {
//     node {
//       nombre
//       foto_url
//       descripcion
//       Precio
//     }
//   }
// }
// }
// `
