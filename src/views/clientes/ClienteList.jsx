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
  CButton,
  CForm,
  CFormInput,
  CFormCheck,
} from '@coreui/react'
import axios from 'axios'

const ClienteList = () => {
  const [clientes, setClientes] = useState([])
  const [loading, setLoading] = useState(true)
  const [editando, setEditando] = useState(null)
  const [apagando, setApagando] = useState(null)
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    anonimo: false,
  })

  // Função para buscar clientes
  const fetchClientes = async () => {
    try {
      const response = await axios.get('http://localhost:8080/cliente')
      setClientes(response.data)
    } catch (error) {
      console.error('Erro ao buscar clientes:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchClientes()
  }, [])

  // Iniciar edição
  const handleEdit = (cliente) => {
    setEditando(cliente.id)
    setFormData({
      nome: cliente.nome,
      email: cliente.email,
      telefone: cliente.telefone,
      anonimo: cliente.anonimo,
    })
  }

  // Atualizar campos do formulário
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    })
  }

  // Salvar alterações
  const handleSave = async (id) => {
    try {
      await axios.put(`http://localhost:8080/cliente/${id}`, formData)
      setClientes((prev) => prev.map((c) => (c.id === id ? { ...c, ...formData } : c)))
      setEditando(null)
    } catch (error) {
      console.error('Erro ao atualizar cliente:', error)
      alert('Erro ao salvar alterações.')
    }
  }

  // Cancelar edição
  const handleCancel = () => {
    setEditando(null)
  }

  // Apagar cliente
  const handleDelete = async (id) => {
    if (!window.confirm('Tem certeza que deseja apagar este cliente?')) return

    try {
      setApagando(id)
      await axios.delete(`http://localhost:8080/cliente/${id}`)
      setClientes((prev) => prev.filter((c) => c.id !== id))
    } catch (error) {
      console.error('Erro ao apagar cliente:', error)
      alert('Erro ao apagar cliente.')
    } finally {
      setApagando(null)
    }
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4 shadow-sm">
          <CCardHeader>
            <strong>Lista de Clientes</strong>
          </CCardHeader>
          <CCardBody>
            {loading ? (
              <div className="text-center py-4">
                <CSpinner color="primary" />
              </div>
            ) : (
              <CTable striped hover responsive>
                <CTableHead color="dark">
                  <CTableRow>
                    <CTableHeaderCell>ID</CTableHeaderCell>
                    <CTableHeaderCell>Nome</CTableHeaderCell>
                    <CTableHeaderCell>Email</CTableHeaderCell>
                    <CTableHeaderCell>Telefone</CTableHeaderCell>
                    <CTableHeaderCell>Anônimo</CTableHeaderCell>
                    <CTableHeaderCell>Ações</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {clientes.map((cliente) => (
                    <CTableRow key={cliente.id}>
                      <CTableDataCell>{cliente.id}</CTableDataCell>

                      {/* Se está editando, mostra o formulário inline */}
                      {editando === cliente.id ? (
                        <>
                          <CTableDataCell>
                            <CFormInput
                              name="nome"
                              value={formData.nome}
                              onChange={handleChange}
                              placeholder="Nome"
                            />
                          </CTableDataCell>
                          <CTableDataCell>
                            <CFormInput
                              name="email"
                              value={formData.email}
                              onChange={handleChange}
                              placeholder="Email"
                            />
                          </CTableDataCell>
                          <CTableDataCell>
                            <CFormInput
                              name="telefone"
                              value={formData.telefone}
                              onChange={handleChange}
                              placeholder="Telefone"
                            />
                          </CTableDataCell>
                          <CTableDataCell>
                            <CFormCheck
                              name="anonimo"
                              checked={formData.anonimo}
                              onChange={handleChange}
                              label="Sim"
                            />
                          </CTableDataCell>
                          <CTableDataCell>
                            <CButton
                              color="success"
                              size="sm"
                              onClick={() => handleSave(cliente.id)}
                              className="me-2"
                            >
                              Salvar
                            </CButton>
                            <CButton color="secondary" size="sm" onClick={handleCancel}>
                              Cancelar
                            </CButton>
                          </CTableDataCell>
                        </>
                      ) : (
                        <>
                          <CTableDataCell>{cliente.nome}</CTableDataCell>
                          <CTableDataCell>{cliente.email}</CTableDataCell>
                          <CTableDataCell>{cliente.telefone}</CTableDataCell>
                          <CTableDataCell>{cliente.anonimo ? 'Sim' : 'Não'}</CTableDataCell>
                          <CTableDataCell>
                            <CButton
                              color="warning"
                              size="sm"
                              className="me-2"
                              onClick={() => handleEdit(cliente)}
                            >
                              Editar
                            </CButton>
                            <CButton
                              color="danger"
                              size="sm"
                              disabled={apagando === cliente.id}
                              onClick={() => handleDelete(cliente.id)}
                            >
                              {apagando === cliente.id ? (
                                <>
                                  <CSpinner size="sm" className="me-2" />
                                  Apagando...
                                </>
                              ) : (
                                'Apagar'
                              )}
                            </CButton>
                          </CTableDataCell>
                        </>
                      )}
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

export default ClienteList
