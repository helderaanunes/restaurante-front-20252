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
} from '@coreui/react'

const UsuarioList = () => {
  const [usuarios, setUsuarios] = useState([])

  const carregarUsuarios = async () => {
    try {
      const response = await axios.get('http://localhost:8080/usuario')
      setUsuarios(response.data)
    } catch (error) {
      console.error('Erro ao carregar usuários:', error)
      alert('Erro ao carregar usuários. Veja o console.')
    }
  }

  useEffect(() => {
    carregarUsuarios()
  }, [])

  const handleDelete = async (id) => {
    if (window.confirm('Tem certeza que deseja excluir este usuário?')) {
      try {
        await axios.delete(`http://localhost:8080/usuario/${id}`)
        alert('Usuário excluído com sucesso!')
        carregarUsuarios()
      } catch (error) {
        console.error('Erro ao excluir usuário:', error)
        alert('Erro ao excluir usuário. Veja o console.')
      }
    }
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Lista de Usuários</strong>
          </CCardHeader>
          <CCardBody>
            <CTable striped hover responsive>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope="col">ID</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Nome</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Email</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Ativo</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Ações</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {usuarios.map((usuario) => (
                  <CTableRow key={usuario.id}>
                    <CTableDataCell>{usuario.id}</CTableDataCell>
                    <CTableDataCell>{usuario.nome}</CTableDataCell>
                    <CTableDataCell>{usuario.email}</CTableDataCell>
                    <CTableDataCell>{usuario.ativo ? 'Sim' : 'Não'}</CTableDataCell>
                    <CTableDataCell>
                      <CButton
                        color="warning"
                        size="sm"
                        className="me-2"
                        onClick={() => (window.location.href = `/editar-usuario/${usuario.id}`)}
                      >
                        Editar
                      </CButton>
                      <CButton color="danger" size="sm" onClick={() => handleDelete(usuario.id)}>
                        Excluir
                      </CButton>
                    </CTableDataCell>
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

export default UsuarioList
