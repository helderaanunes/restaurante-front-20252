// src/views/Restaurante/CadastroRestaurante.jsx

import React, { useState } from 'react'
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
  CAlert,
} from '@coreui/react'
import axios from 'axios'

const CadastroRestaurante = () => {
  const [nome, setNome] = useState('')
  const [cnpj, setCnpj] = useState('')
  const [mensagem, setMensagem] = useState(null)
  const [erro, setErro] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Validação simples
    if (!nome || !cnpj) {
      setErro('Preencha todos os campos.')
      setMensagem(null)
      return
    }

    try {
      const response = await axios.post('http://localhost:8080/restaurante', {
        nome,
        cnpj,
      })

      setMensagem('Restaurante cadastrado com sucesso!')
      setErro(null)
      setNome('')
      setCnpj('')
    } catch (err) {
      console.error(err)
      setErro('Erro ao cadastrar restaurante.')
      setMensagem(null)
    }
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Cadastro de Restaurante</strong>
          </CCardHeader>
          <CCardBody>
            <CForm onSubmit={handleSubmit}>
              {mensagem && <CAlert color="success">{mensagem}</CAlert>}
              {erro && <CAlert color="danger">{erro}</CAlert>}

              <div className="mb-3">
                <CFormLabel htmlFor="nome">Nome do Restaurante</CFormLabel>
                <CFormInput
                  type="text"
                  id="nome"
                  placeholder="Ex: Restaurante Sabor & Arte"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <CFormLabel htmlFor="cnpj">CNPJ</CFormLabel>
                <CFormInput
                  type="text"
                  id="cnpj"
                  placeholder="Ex: 00.000.000/0001-00"
                  value={cnpj}
                  onChange={(e) => setCnpj(e.target.value)}
                />
              </div>

              <CButton type="submit" color="primary">
                Cadastrar
              </CButton>
            </CForm>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default CadastroRestaurante
