import React, { useEffect, useState } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CTableDataCell,
  CButton,
  CAlert,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CForm,
  CFormInput,
  CFormLabel,
} from '@coreui/react'
import axios from 'axios'

const ListaRestaurantes = () => {
  const [restaurantes, setRestaurantes] = useState([])
  const [erro, setErro] = useState(null)
  const [modalAberto, setModalAberto] = useState(false)
  const [restauranteSelecionado, setRestauranteSelecionado] = useState(null)
  const [formData, setFormData] = useState({
    nome: '',
    cnpj: '',
  })
  const [salvando, setSalvando] = useState(false)

  useEffect(() => {
    buscarRestaurantes()
  }, [])

  const buscarRestaurantes = () => {
    axios
      .get('http://localhost:8080/restaurante')
      .then((response) => {
        setRestaurantes(response.data)
        setErro(null)
      })
      .catch((error) => {
        console.error(error)
        setErro('Erro ao buscar restaurantes.')
      })
  }

  // Abre o modal preenchendo os dados do restaurante selecionado
  const handleAtualizar = (restaurante) => {
    setRestauranteSelecionado(restaurante)
    setFormData({
      nome: restaurante.nome,
      cnpj: restaurante.cnpj,
    })
    setModalAberto(true)
  }

  // Atualiza os dados do formulário enquanto o usuário digita
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  // Envia a atualização para o backend
  const handleSalvar = () => {
    if (!restauranteSelecionado) return

    setSalvando(true)
    axios
      .put(`http://localhost:8080/restaurante/${restauranteSelecionado.id}`, {
        ...restauranteSelecionado,
        nome: formData.nome,
        cnpj: formData.cnpj,
      })
      .then(() => {
        setModalAberto(false)
        setSalvando(false)
        buscarRestaurantes()
      })
      .catch((error) => {
        console.error(error)
        setErro('Erro ao atualizar restaurante.')
        setSalvando(false)
      })
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Lista de Restaurantes</strong>
          </CCardHeader>
          <CCardBody>
            {erro && <CAlert color="danger">{erro}</CAlert>}

            <CTable striped hover responsive>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell>ID</CTableHeaderCell>
                  <CTableHeaderCell>Nome</CTableHeaderCell>
                  <CTableHeaderCell>CNPJ</CTableHeaderCell>
                  <CTableHeaderCell>Ações</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {restaurantes.map((restaurante) => (
                  <CTableRow key={restaurante.id}>
                    <CTableDataCell>{restaurante.id}</CTableDataCell>
                    <CTableDataCell>{restaurante.nome}</CTableDataCell>
                    <CTableDataCell>{restaurante.cnpj}</CTableDataCell>
                    <CTableDataCell>
                      <CButton
                        color="warning"
                        size="sm"
                        onClick={() => handleAtualizar(restaurante)}
                      >
                        Atualizar
                      </CButton>
                    </CTableDataCell>
                  </CTableRow>
                ))}
              </CTableBody>
            </CTable>

            {/* Modal para edição */}
            <CModal visible={modalAberto} onClose={() => setModalAberto(false)}>
              <CModalHeader>
                <CModalTitle>Atualizar Restaurante</CModalTitle>
              </CModalHeader>
              <CModalBody>
                <CForm>
                  <div className="mb-3">
                    <CFormLabel htmlFor="nome">Nome</CFormLabel>
                    <CFormInput
                      type="text"
                      id="nome"
                      name="nome"
                      value={formData.nome}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-3">
                    <CFormLabel htmlFor="cnpj">CNPJ</CFormLabel>
                    <CFormInput
                      type="text"
                      id="cnpj"
                      name="cnpj"
                      value={formData.cnpj}
                      onChange={handleChange}
                    />
                  </div>
                </CForm>
              </CModalBody>
              <CModalFooter>
                <CButton
                  color="secondary"
                  onClick={() => setModalAberto(false)}
                  disabled={salvando}
                >
                  Cancelar
                </CButton>
                <CButton color="primary" onClick={handleSalvar} disabled={salvando}>
                  {salvando ? 'Salvando...' : 'Salvar'}
                </CButton>
              </CModalFooter>
            </CModal>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default ListaRestaurantes
