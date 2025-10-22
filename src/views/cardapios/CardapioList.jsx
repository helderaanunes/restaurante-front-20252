import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  CButton,
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
  CTableDataCell
} from '@coreui/react';
import { useNavigate } from 'react-router-dom'

const ListarCardapios = () => {
  const [cardapios, setCardapios] = useState([]);
  const [loading, setLoading] = useState(true);

  // Carregar os cardápios
  useEffect(() => {
    axios.get('http://localhost:8080/cardapio') // Endpoint para listar cardápios
      .then((response) => {
        setCardapios(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Erro ao carregar cardápios:', error);
        setLoading(false);
        alert('Erro ao carregar cardápios.');
      });
  }, []);
  const navigate = useNavigate()

  const handleEdit = (id) => {
    // Aqui você pode redirecionar para a página de edição do cardápio
    navigate(`/cardapios/edit/${id}`) // Ajuste conforme sua estrutura de rotas
  };

  const handleDelete = (id) => {
    if (window.confirm('Tem certeza que deseja excluir este cardápio?')) {
      axios.delete(`http://localhost:8080/cardapio/${id}`)
        .then(() => {
          setCardapios(cardapios.filter(cardapio => cardapio.id !== id));
          alert('Cardápio excluído com sucesso!');
        })
        .catch((error) => {
          console.error('Erro ao excluir cardápio:', error);
          alert('Erro ao excluir cardápio.');
        });
    }
  };

  const handleAdd = () => navigate('/cardapios/new')

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Lista de Cardápios</strong>
          </CCardHeader>
          <CCardBody>
            {loading ? (
              <p>Carregando...</p>
            ) : (
              <>
                <CButton
                  color="primary"
                  onClick={handleAdd}
                  className="mb-3"
                >
                  Cadastrar Novo Cardápio
                </CButton>
                <CTable striped hover>
                  <CTableHead>
                    <CTableRow>
                      <CTableHeaderCell>Nome</CTableHeaderCell>fthtr
                      <CTableHeaderCell>Início da Vigência</CTableHeaderCell>
                      <CTableHeaderCell>Fim da Vigência</CTableHeaderCell>
                      <CTableHeaderCell>Exibir no Alto Atendimento</CTableHeaderCell>
                      <CTableHeaderCell>Visibilidade</CTableHeaderCell>
                      <CTableHeaderCell>Ações</CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>
                  <CTableBody>
                    {cardapios.map((cardapio) => (
                      <CTableRow key={cardapio.id}>
                        <CTableDataCell>{cardapio.nome}</CTableDataCell>
                        <CTableDataCell>{cardapio.inicioVigencia}</CTableDataCell>
                        <CTableDataCell>{cardapio.fimVigencia || 'Não definido'}</CTableDataCell>
                        <CTableDataCell>{cardapio.exibirNoAltoAtendimento ? 'Sim' : 'Não'}</CTableDataCell>
                        <CTableDataCell>{cardapio.visibilidade ? 'Visível' : 'Oculto'}</CTableDataCell>
                        <CTableDataCell>
                          <CButton
                            color="warning"
                            onClick={() => handleEdit(cardapio.id)}
                          >
                            Editar
                          </CButton>
                          <CButton
                            color="danger"
                            className="ml-2"
                            onClick={() => handleDelete(cardapio.id)}
                          >
                            Excluir
                          </CButton>
                        </CTableDataCell>
                      </CTableRow>
                    ))}
                  </CTableBody>
                </CTable>
              </>
            )}
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default ListarCardapios;
