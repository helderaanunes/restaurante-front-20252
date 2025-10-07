import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {
  CButton,
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
  CAlert,
} from '@coreui/react'

const ListaPerfil = () => {
  const [perfis, setPerfis] = useState([])
  const [error, setError] = useState(false)

  useEffect(() => {
    const fetchPerfis = async () => {
      try {
        const response = await axios.get('http://localhost:8080/perfil')
        setPerfis(response.data)
      } catch (err) {
        console.error('Erro ao buscar perfis:', err)
        setError(true)
      }
    }

    fetchPerfis()
  }, [])

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Lista de Perfis</strong>
          </CCardHeader>
          <CCardBody>
            {error && (
              <CAlert color="danger">Erro ao carregar a lista de perfis.</CAlert>
            )}

            <CTable hover responsive>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell>ID</CTableHeaderCell>
                  <CTableHeaderCell>Nome</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {perfis.map((perfil) => (
                  <CTableRow key={perfil.id}>
                    <CTableDataCell>{perfil.id}</CTableDataCell>
                    <CTableDataCell>{perfil.nome}</CTableDataCell>
                  </CTableRow>
                ))}
              </CTableBody>
            </CTable>

            {perfis.length === 0 && !error && (
              <CAlert color="info">Nenhum perfil encontrado.</CAlert>
            )}
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default ListaPerfil
