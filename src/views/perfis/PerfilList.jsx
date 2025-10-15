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
  CFormInput,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilPencil, cilTrash } from '@coreui/icons'

const ListaPerfil = () => {
  const [perfis, setPerfis] = useState([])
  const [error, setError] = useState(false)
  const [success, setSuccess] = useState(false)
  const [editando, setEditando] = useState(null)
  const [nomeEditado, setNomeEditado] = useState('')

  // 🔹 Buscar perfis da API
  const fetchPerfis = async () => {
    try {
      const response = await axios.get('http://localhost:8080/perfil')
      setPerfis(response.data)
      setError(false)
    } catch (err) {
      console.error('Erro ao buscar perfis:', err)
      setError(true)
    }
  }

  useEffect(() => {
    fetchPerfis()
  }, [])

  // 🔹 Entrar em modo de edição
  const handleEdit = (perfil) => {
    setEditando(perfil.id)
    setNomeEditado(perfil.nome)
    setSuccess(false)
  }

  // 🔹 Cancelar edição
  const handleCancel = () => {
    setEditando(null)
    setNomeEditado('')
  }

  // 🔹 Salvar edição
  const handleSave = async () => {
    try {
      const perfilAtualizado = { id: editando, nome: nomeEditado }
      await axios.put('http://localhost:8080/perfil', perfilAtualizado)
      setSuccess(true)
      setEditando(null)
      setNomeEditado('')
      fetchPerfis()
    } catch (err) {
      console.error('Erro ao atualizar perfil:', err)
      setError(true)
    }
  }

  // 🔹 Remover perfil
  const handleDelete = async (id) => {
    if (window.confirm('Tem certeza que deseja excluir este perfil?')) {
      try {
        await axios.delete(`http://localhost:8080/perfil/${id}`)
        fetchPerfis()
      } catch (err) {
        console.error('Erro ao excluir perfil:', err)
        setError(true)
      }
    }
  }

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
            {success && (
              <CAlert color="success">Perfil atualizado com sucesso!</CAlert>
            )}

            <CTable hover responsive>
              <CTableHead color="dark">
                <CTableRow>
                  <CTableHeaderCell>ID</CTableHeaderCell>
                  <CTableHeaderCell>Nome</CTableHeaderCell>
                  <CTableHeaderCell style={{ width: '250px' }}>Ações</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {perfis.map((perfil) => (
                  <CTableRow key={perfil.id}>
                    <CTableDataCell>{perfil.id}</CTableDataCell>

                    <CTableDataCell>
                      {editando === perfil.id ? (
                        <CFormInput
                          type="text"
                          value={nomeEditado}
                          onChange={(e) => setNomeEditado(e.target.value)}
                        />
                      ) : (
                        perfil.nome
                      )}
                    </CTableDataCell>

                    <CTableDataCell>
                      {editando === perfil.id ? (
                        <>
                          <CButton
                            color="success"
                            size="sm"
                            className="me-2"
                            onClick={handleSave}
                          >
                            Salvar
                          </CButton>
                          <CButton color="secondary" size="sm" onClick={handleCancel}>
                            Cancelar
                          </CButton>
                        </>
                      ) : (
                        <>
                          <CButton
                            color="warning"
                            size="sm"
                            className="me-2"
                            onClick={() => handleEdit(perfil)}
                          >
                            <CIcon icon={cilPencil} /> Editar
                          </CButton>
                          <CButton
                            color="danger"
                            size="sm"
                            onClick={() => handleDelete(perfil.id)}
                          >
                            <CIcon icon={cilTrash} /> Remover
                          </CButton>
                        </>
                      )}
                    </CTableDataCell>
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
