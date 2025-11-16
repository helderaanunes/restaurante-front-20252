// ItemCardapioList.jsx
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
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

const ItemCardapioList = () => {
  const [itens, setItens] = useState([])
  const navigate = useNavigate()

  const carregarItens = async () => {
    try {
      const { data } = await axios.get('http://localhost:8080/item-cardapio')
      setItens(data)
    } catch (error) {
      console.error('Erro ao carregar itens do cardápio:', error)
      alert('Erro ao carregar itens do cardápio. Veja o console.')
    }
  }

  useEffect(() => {
    carregarItens()
  }, [])

  const handleDelete = async (id) => {
    if (window.confirm('Tem certeza que deseja excluir este item do cardápio?')) {
      try {
        await axios.delete(`http://localhost:8080/item-cardapio/${id}`)
        alert('Item excluído com sucesso!')
        carregarItens()
      } catch (error) {
        console.error('Erro ao excluir item:', error)
        alert('Erro ao excluir item. Veja o console.')
      }
    }
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Itens do Cardápio</strong>

            <CButton
              color="primary"
              className="float-end"
              size="sm"
              onClick={() => navigate('/item-cardapio/novo')}
            >
              + Novo Item
            </CButton>
          </CCardHeader>

          <CCardBody>
            <CTable striped hover responsive>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell>ID</CTableHeaderCell>
                  <CTableHeaderCell>Nome</CTableHeaderCell>
                  <CTableHeaderCell>Descrição Curta</CTableHeaderCell>
                  <CTableHeaderCell>Preço</CTableHeaderCell>
                  <CTableHeaderCell>Disponível</CTableHeaderCell>
                  <CTableHeaderCell>Autoatendimento</CTableHeaderCell>
                  <CTableHeaderCell>Tempo Estimado (min)</CTableHeaderCell>
                  <CTableHeaderCell>Limite por Pedido</CTableHeaderCell>
                  <CTableHeaderCell>Ações</CTableHeaderCell>
                </CTableRow>
              </CTableHead>

              <CTableBody>
                {itens.map((item) => (
                  <CTableRow key={item.id}>
                    <CTableDataCell>{item.id}</CTableDataCell>
                    <CTableDataCell>{item.nome}</CTableDataCell>
                    <CTableDataCell>{item.descricaoCurta}</CTableDataCell>

                    <CTableDataCell>
                      R$ {item.preco?.toFixed(2).replace('.', ',')}
                    </CTableDataCell>

                    <CTableDataCell>{item.disponivel ? 'Sim' : 'Não'}</CTableDataCell>
                    <CTableDataCell>
                      {item.exibirNoAutoatendimento ? 'Sim' : 'Não'}
                    </CTableDataCell>

                    <CTableDataCell>{item.tempoPreparoEstimado}</CTableDataCell>
                    <CTableDataCell>{item.limitePorPedido}</CTableDataCell>

                    <CTableDataCell>
                      <CButton
                        color="warning"
                        size="sm"
                        className="me-2"
                        onClick={() => navigate(`/item-cardapio/edit/${item.id}`)}
                      >
                        Editar
                      </CButton>

                      <CButton
                        color="danger"
                        size="sm"
                        onClick={() => handleDelete(item.id)}
                      >
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

export default ItemCardapioList
