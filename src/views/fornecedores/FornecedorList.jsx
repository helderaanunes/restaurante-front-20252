import React, { useEffect, useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CAlert,
  CSpinner,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CFormInput,
} from '@coreui/react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const FornecedorList = () => {
  const navigate = useNavigate()
  const [fornecedores, setFornecedores] = useState([])
  const [loading, setLoading] = useState(true)
  const [erro, setErro] = useState('')

  useEffect(() => {
    const carregar = async () => {
      try {
        const resp = await axios.get('http://localhost:8080/fornecedor')
        setFornecedores(resp.data)
      } catch (err) {
        setErro(
          err?.response?.data?.message ||
            err?.response?.data?.error ||
            err?.message ||
            'Erro ao carregar fornecedores.',
        )
      } finally {
        setLoading(false)
      }
    }
    carregar()
  }, [])

  const [search, setSearch] = useState('')

  // Filtrar fornecedores pelo nome ou CNPJ
  const fornecedoresFiltrados = fornecedores.filter(
    (f) => f.nome.toLowerCase().includes(search.toLowerCase()) || f.cnpj.includes(search),
  )

  const onAdd = () => navigate('/fornecedores/new')
  const handleDelete = async (id) => {
    if (window.confirm('Tem certeza que deseja apagar este fornecedor?')) {
      try {
        await axios.delete(`http://localhost:8080/fornecedor/${id}`)
        setFornecedores(fornecedores.filter((f) => f.id !== id))
      } catch (err) {
        setErro(
          err?.response?.data?.message ||
            err?.response?.data?.error ||
            err?.message ||
            'Erro ao apagar fornecedor.',
        )
      }
    }
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader className="d-flex justify-content-between align-items-center">
            <strong>Lista de Fornecedores</strong>
            <div className="d-flex justify-content-between mb-3">
              <CFormInput
                type="text"
                placeholder="Pesquisar por nome ou CNPJ..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{ maxWidth: '300px' }}
              />
              <CButton color="primary" onClick={onAdd}>
                Novo Fornecedor
              </CButton>
            </div>
          </CCardHeader>
          <CCardBody>
            {erro && (
              <CAlert color="danger" className="mb-3">
                {erro}
              </CAlert>
            )}

            {loading ? (
              <div className="text-center py-4">
                <CSpinner color="primary" />
                <p>Carregando...</p>
              </div>
            ) : fornecedoresFiltrados.length === 0 ? (
              <CAlert color="info">Nenhum fornecedor encontrado.</CAlert>
            ) : (
              <CTable bordered hover responsive>
                <CTableHead color="dark">
                  <CTableRow>
                    <CTableHeaderCell>ID</CTableHeaderCell>
                    <CTableHeaderCell>Nome</CTableHeaderCell>
                    <CTableHeaderCell>CNPJ</CTableHeaderCell>
                    <CTableHeaderCell>Email</CTableHeaderCell>
                    <CTableHeaderCell>Telefone</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {fornecedores.map((f) => (
                    <CTableRow key={f.id}>
                      <CTableDataCell>{f.id}</CTableDataCell>
                      <CTableDataCell>{f.nome}</CTableDataCell>
                      <CTableDataCell>{f.cnpj}</CTableDataCell>
                      <CTableDataCell>{f.email}</CTableDataCell>
                      <CTableDataCell>{f.telefone}</CTableDataCell>
                      <CTableDataCell>
                        <CButton
                          color="warning"
                          size="sm"
                          className="me-2"
                          onClick={() => navigate(`/fornecedores/edit/${f.id}`)}
                        >
                          Editar
                        </CButton>
                        <CButton color="danger" size="sm" onClick={() => handleDelete(f.id)}>
                          Apagar
                        </CButton>
                      </CTableDataCell>
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

export default FornecedorList
