import React, { useState } from 'react'
import axios from 'axios'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormInput,
  CFormLabel,
  CRow,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
} from '@coreui/react'

const CategoriaForm = () => {
  const [nome, setNome] = useState('')
  const [ordem, setOrdem] = useState('')
  const [mensagem, setMensagem] = useState('')
  const [erro, setErro] = useState(false)
  const [modalVisible, setModalVisible] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setMensagem('')
    setErro(false)

    // Validações
    if (!nome.trim()) {
      setMensagem('O nome da categoria é obrigatório.')
      setErro(true)
      setModalVisible(true)
      return
    }

    const ordemNumerica = parseInt(ordem, 10)
    if (!ordem || isNaN(ordemNumerica) || ordemNumerica <= 0) {
      setMensagem('Informe uma ordem válida (maior que zero).')
      setErro(true)
      setModalVisible(true)
      return
    }

    // Envio para API (usando proxy)
    try {
      const response = await axios.post('/categoriaItem', {
        nome: nome.trim(),
        ordem: ordemNumerica,
      })

      setMensagem(`Categoria "${response.data.nome}" cadastrada com sucesso!`)
      setErro(false)
      setNome('')
      setOrdem('')
      setModalVisible(true)
    } catch (error) {
      console.error('Erro ao cadastrar categoria:', error)
      setMensagem('Erro ao cadastrar categoria. Verifique os dados e tente novamente.')
      setErro(true)
      setModalVisible(true)
    }
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Cadastro de Categoria</strong>
          </CCardHeader>
          <CCardBody>
            <CForm onSubmit={handleSubmit}>
              <div className="mb-3">
                <CFormLabel htmlFor="nomeCategoria">Nome da Categoria</CFormLabel>
                <CFormInput
                  type="text"
                  id="nomeCategoria"
                  placeholder="Ex: Bebidas"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="ordemCategoria">Ordem</CFormLabel>
                <CFormInput
                  type="number"
                  id="ordemCategoria"
                  placeholder="Ex: 1"
                  value={ordem}
                  onChange={(e) => setOrdem(e.target.value)}
                  required
                />
              </div>
              <CButton type="submit" color="success">
                Cadastrar Categoria
              </CButton>
            </CForm>
          </CCardBody>
        </CCard>
      </CCol>

      <CModal visible={modalVisible} onClose={() => setModalVisible(false)}>
        <CModalHeader
          closeButton
          className={erro ? 'bg-danger text-white' : 'bg-success text-white'}
        >
          <strong>{erro ? 'Erro' : 'Sucesso'}</strong>
        </CModalHeader>
        <CModalBody>{mensagem}</CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setModalVisible(false)}>
            Fechar
          </CButton>
        </CModalFooter>
      </CModal>
    </CRow>
  )
}

export default CategoriaForm
