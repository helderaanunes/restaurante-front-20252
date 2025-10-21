// UsuarioList.jsx
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import {
  CButton, CCard, CCardBody, CCardHeader, CCol, CRow,
  CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow
} from '@coreui/react'

const UsuarioList = () => {
  const [usuarios, setUsuarios] = useState([])
  const navigate = useNavigate()

  const carregarUsuarios = async () => {
    try {
      const { data } = await axios.get('http://localhost:8080/usuario')
      setUsuarios(data)
    } catch (error) {
      console.error('Erro ao carregar usuários:', error)
      alert('Erro ao carregar usuários. Veja o console.')
    }
  }

  useEffect(() => { carregarUsuarios() }, [])

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
          <CCardHeader><strong>Lista de Usuários</strong></CCardHeader>
          <CCardBody>
            <CTable striped hover responsive>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell>ID</CTableHeaderCell>
                  <CTableHeaderCell>Nome</CTableHeaderCell>
                  <CTableHeaderCell>Email</CTableHeaderCell>
                  <CTableHeaderCell>Ativo</CTableHeaderCell>
                  <CTableHeaderCell>Ações</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {usuarios.map((u) => (
                  <CTableRow key={u.id}>
                    <CTableDataCell>{u.id}</CTableDataCell>
                    <CTableDataCell>{u.nome}</CTableDataCell>
                    <CTableDataCell>{u.email}</CTableDataCell>
                    <CTableDataCell>{u.ativo ? 'Sim' : 'Não'}</CTableDataCell>
                    <CTableDataCell>
                      <CButton
                        color="warning" size="sm" className="me-2"
                        onClick={() => navigate(`/usuarios/edit/${u.id}`)}
                      >
                        Editar
                      </CButton>
                      <CButton color="danger" size="sm" onClick={() => handleDelete(u.id)}>
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
