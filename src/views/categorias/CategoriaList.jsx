import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'

const CategoriaList = () => {
  const [categorias, setCategorias] = useState([])

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const response = await axios.get('http://localhost:8080/categoriaItem')
        setCategorias(response.data)
      } catch (error) {
        console.error('Erro ao buscar categorias:', error)
      }
    }

    fetchCategorias()
  }, [])

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Lista de Categorias</strong>
          </CCardHeader>
          <CCardBody>
            <CTable striped>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell>ID</CTableHeaderCell>
                  <CTableHeaderCell>Nome</CTableHeaderCell>
                  <CTableHeaderCell>Ordem</CTableHeaderCell>
                  <CTableHeaderCell>Ações</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {categorias.map((categoria) => (
                  <CTableRow key={categoria.id}>
                    <CTableDataCell>{categoria.id}</CTableDataCell>
                    <CTableDataCell>{categoria.nome}</CTableDataCell>
                    <CTableDataCell>{categoria.ordem}</CTableDataCell>
                    <CTableDataCell>###</CTableDataCell>
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

export default CategoriaList
