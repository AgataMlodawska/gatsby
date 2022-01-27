import {useStaticQuery} from 'gatsby'
import React, {useState} from 'react'
import '../../pages/filtros.css'
const Dropdownjs = ({tallas, Colores}) => {
  const [selectvalue, setSelectValue] = useState('')

  const handleSelect = e => {
    console.log(e.target.value)
    setSelectValue(e.target.value)
  }

  return (
    <div style={{marginTop: '1%', marginBottom: '2%', display: 'flex'}}>
      {tallas != undefined ? (
        <div>
          <label> Talla: </label>
          <select value={selectvalue} onChange={handleSelect}>
            <option label="" disabled></option>
            {tallas != undefined
              ? tallas.map(talla => (
                  <option value={talla.talla}>{talla.talla}</option>
                ))
              : null}
          </select>
          {tallas.map(talla => {
            return (
              <div>
                {' '}
                {talla.talla == selectvalue && talla.unidades > 10 ? (
                  <p style={{color: '#26d13f'}}>En stock</p>
                ) : talla.talla == selectvalue &&
                  talla.unidades <= 10 &&
                  talla.unidades > 0 ? (
                  <p style={{color: '#ffcd04'}}>
                    {talla.unidades} unidades disponibles
                  </p>
                ) : talla.talla == selectvalue && talla.unidades === 0 ? (
                  <p style={{color: '#df1f1d'}}>Fuera de stock</p>
                ) : null}
              </div>
            )
          })}
        </div>
      ) : null}

      {Colores != undefined ? (
        <div>
          <label> Color: </label>
          <select value={selectvalue} onChange={handleSelect}>
            {Colores != undefined ? (
              Colores.map(Color => <option>{Color.color}</option>)
            ) : (
              <p></p>
            )}
          </select>
          {Colores.map(Color => {
            return (
              <div>
                {Color.color == selectvalue && Color.unidades > 10 ? (
                  <p>en stock</p>
                ) : Color.color == selectvalue && Color.unidades <= 10 ? (
                  <p>Pocas unidades disponibles</p>
                ) : Color.color == selectvalue && Color.unidades == 0 ? (
                  <p>Fuera de stock</p>
                ) : null}
              </div>
            )
          })}
        </div>
      ) : null}
    </div>
  )
}
export default Dropdownjs
