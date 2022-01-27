/* eslint-disable camelcase */
import React from 'react'
import {Header, Divider, Table} from 'semantic-ui-react'

export default ({nombre, color, categoria, tamano, Material}) => (
  <div>
    <Divider />

    <Table celled>
      <Table.Header style={{background: '#f9fafb'}}>
        <Table.Row>
          <Table.HeaderCell colSpan="2">Características</Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        <Table.Row>
          <Table.Cell>Color</Table.Cell>
          <Table.Cell>{color}</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>Categoría</Table.Cell>
          <Table.Cell>{categoria}</Table.Cell>
        </Table.Row>
        {tamano != undefined ? (
          <Table.Row>
            <Table.Cell>Tamaño</Table.Cell>
            <Table.Cell>{tamano}</Table.Cell>
          </Table.Row>
        ) : null}
        {Material != undefined ? (
          <Table.Row>
            <Table.Cell>Material</Table.Cell>
            <Table.Cell>{Material}</Table.Cell>
          </Table.Row>
        ) : null}
      </Table.Body>
    </Table>
  </div>
)
