import React, { useEffect, useState } from 'react'
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
  CSpinner,
  CAlert,
} from '@coreui/react'
import axios from 'axios'

const PermissaoList = () => {
  const [permissoes, setPermissoes] = useState([])
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resp = await axios.get('http://localhost:8080/permissao')
        setPermissoes(resp.data)
      } catch (err) {
        setErro('Erro ao carregar permissões.')
      } finally {
        setCarregando(false)
      }
    }
    fetchData()
  }, [])

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Lista de Permissões</strong>
          </CCardHeader>
          <CCardBody>
            {erro && <CAlert color="danger">{erro}</CAlert>}
            {carregando ? (
              <CSpinner />
            ) : (
              <CTable striped hover responsive>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell scope="col">ID</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Código</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Descrição</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {permissoes.map((p) => (
                    <CTableRow key={p.id}>
                      <CTableDataCell>{p.id}</CTableDataCell>
                      <CTableDataCell>{p.codigo}</CTableDataCell>
                      <CTableDataCell>{p.descricao}</CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
            )}
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default PermissaoList
