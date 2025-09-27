import React, { useState, useEffect } from 'react'
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
  CFormTextarea,
  CFormCheck,
  CRow,
} from '@coreui/react'

const CardapioForm = ({ cardapioId, onSuccess }) => {
  // estado dos campos
  const [cardapio, setCardapio] = useState({
    nome: '',
    inicioVigencia: '',
    fimVigencia: '',
    exibirNoAltoAtendimento: false,
    visibilidade: false,
  })

  // Carregar cardapio para edição (se tiver id)
  useEffect(() => {
    if (cardapioId) {
      axios.get(`http://localhost:8080/cardapio/${cardapioId}`)
        .then((response) => {
          // converter datas para input yyyy-MM-dd
          const data = response.data
          setCardapio({
            nome: data.nome,
            inicioVigencia: data.inicioVigencia,
            fimVigencia: data.fimVigencia || '',
            exibirNoAltoAtendimento: data.exibirNoAltoAtendimento,
            visibilidade: data.visibilidade,
            id: data.id,
          })
        })
        .catch((error) => {
          console.error('Erro ao buscar cardápio:', error)
          alert('Erro ao carregar cardápio para edição.')
        })
    }
  }, [cardapioId])

  // Atualizar estado dos inputs
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setCardapio((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  // Enviar formulário
  const handleSubmit = (e) => {
    e.preventDefault()

    // Verificar se é update ou insert
    const method = cardapio.id ? axios.put : axios.post
    const url = 'http://localhost:8080/cardapio'

    method(url, cardapio)
      .then((response) => {
        alert('Cardápio salvo com sucesso!')
        if (onSuccess) onSuccess(response.data)
      })
      .catch((error) => {
        console.error('Erro ao salvar cardápio:', error)
        alert('Erro ao salvar cardápio. Verifique os dados e tente novamente.')
      })
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>{cardapioId ? 'Editar' : 'Cadastrar'} Cardápio</strong>
          </CCardHeader>
          <CCardBody>
            <CForm onSubmit={handleSubmit}>
              <div className="mb-3">
                <CFormLabel htmlFor="nome">Nome do Cardápio</CFormLabel>
                <CFormInput
                  type="text"
                  id="nome"
                  name="nome"
                  placeholder="Digite o nome do cardápio"
                  value={cardapio.nome}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <CFormLabel htmlFor="inicioVigencia">Início da Vigência</CFormLabel>
                <CFormInput
                  type="date"
                  id="inicioVigencia"
                  name="inicioVigencia"
                  value={cardapio.inicioVigencia}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <CFormLabel htmlFor="fimVigencia">Fim da Vigência</CFormLabel>
                <CFormInput
                  type="date"
                  id="fimVigencia"
                  name="fimVigencia"
                  value={cardapio.fimVigencia}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3 form-check">
                <CFormCheck
                  type="checkbox"
                  id="exibirNoAltoAtendimento"
                  name="exibirNoAltoAtendimento"
                  checked={cardapio.exibirNoAltoAtendimento}
                  onChange={handleChange}
                  label="Exibir no Alto Atendimento"
                />
              </div>

              <div className="mb-3 form-check">
                <CFormCheck
                  type="checkbox"
                  id="visibilidade"
                  name="visibilidade"
                  checked={cardapio.visibilidade}
                  onChange={handleChange}
                  label="Visível"
                />
              </div>

              <CButton color="primary" type="submit">
                {cardapioId ? 'Atualizar' : 'Cadastrar'}
              </CButton>
            </CForm>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default CardapioForm
