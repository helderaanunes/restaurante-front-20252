import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CTable,
  CTableHead,
  CTableBody,
  CTableRow,
  CTableHeaderCell,
  CTableDataCell,
  CButton,
} from '@coreui/react'

const UnidadeList = () => {
  const [unidades, setUnidades] = useState([])

  // Função para carregar as unidades
  const carregarUnidades = async () => {
    try {
      const response = await axios.get('http://localhost:8080/unidade')
      setUnidades(response.data)
    } catch (error) {
      console.error('Erro ao carregar unidades:', error)
    }
  }

  useEffect(() => {
    carregarUnidades()
  }, []) // Chama a função de carregar unidades ao montar o componente

  // Função para excluir a unidade
  const excluirUnidade = async (id) => {
    // Exibe uma confirmação antes de excluir
    const confirmacao = window.confirm('Tem certeza que deseja excluir esta unidade?')
    if (!confirmacao) return
    try {
      await axios.delete(`http://localhost:8080/unidade/${id}`)
      setUnidades(unidades.filter((unidade) => unidade.id !== id))
    } catch (error) {
      console.error('Erro ao excluir unidade:', error)
    }
  }

  // Editar unidade
  const editarUnidade = async (id) => {
    navigate(`/unidades/new/${id}`)
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Listagem de Unidades</strong>
          </CCardHeader>
          <CCardBody>
            <CTable hover>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell>ID</CTableHeaderCell>
                  <CTableHeaderCell>Nome</CTableHeaderCell>
                  <CTableHeaderCell>Ações</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {unidades.length > 0 ? (
                  unidades.map((unidade) => (
                    <CTableRow key={unidade.id}>
                      <CTableDataCell>{unidade.id}</CTableDataCell>
                      <CTableDataCell>{unidade.nome}</CTableDataCell>
                      <CTableDataCell>
                        <CButton color="danger" onClick={() => excluirUnidade(unidade.id)}>
                          Excluir
                        </CButton>
                        <CButton color="success" onClick={() => editarUnidade(unidade.id)}>
                          Editar
                        </CButton>
                      </CTableDataCell>
                    </CTableRow>
                  ))
                ) : (
                  <CTableRow>
                    <CTableDataCell colSpan="3" className="text-center">
                      Nenhuma unidade cadastrada.
                    </CTableDataCell>
                  </CTableRow>
                )}
              </CTableBody>
            </CTable>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default UnidadeList
