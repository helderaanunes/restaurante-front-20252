import React, { useEffect, useState } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CTableDataCell,
  CButton,
  CAlert,
} from '@coreui/react'
import axios from 'axios'

const ListaRestaurantes = () => {
  const [restaurantes, setRestaurantes] = useState([])
  const [erro, setErro] = useState(null)

  useEffect(() => {
    axios
      .get('http://localhost:8080/restaurante')
      .then((response) => {
        setRestaurantes(response.data)
        setErro(null)
      })
      .catch((error) => {
        console.error(error)
        setErro('Erro ao buscar restaurantes.')
      })
  }, [])

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Lista de Restaurantes</strong>
          </CCardHeader>
          <CCardBody>
            {erro && <CAlert color="danger">{erro}</CAlert>}

            <CTable striped hover responsive>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell>ID</CTableHeaderCell>
                  <CTableHeaderCell>Nome</CTableHeaderCell>
                  <CTableHeaderCell>CNPJ</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {restaurantes.map((restaurante) => (
                  <CTableRow key={restaurante.id}>
                    <CTableDataCell>{restaurante.id}</CTableDataCell>
                    <CTableDataCell>{restaurante.nome}</CTableDataCell>
                    <CTableDataCell>{restaurante.cnpj}</CTableDataCell>
                  </CTableRow>
                ))}
              </CTableBody>
            </CTable>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default ListaRestaurantes
