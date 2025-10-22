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
  CFormSwitch,
  CRow,
} from '@coreui/react'
import axios from 'axios'

const ClienteForm = () => {
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [telefone, setTelefone] = useState('')
  const [isAnonimo, setIsAnonimo] = useState(false)
  const [message, setMessage] = useState('')


  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const cliente = { nome, email, telefone, isAnonimo }
      const response = await axios.post('http://localhost:8080/cliente', cliente)
      setMessage(`Cliente ${response.data.nome} cadastrado com sucesso!`)
      // limpa formulário
      setNome('')
      setEmail('')
      setTelefone('')
      setIsAnonimo(false)
    } catch (error) {
      setMessage('Erro ao cadastrar cliente')
      console.error(error)
    }
  }

  return (
    <CRow>
      <CCol xs={12} md={6}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Cadastro de Cliente</strong>
          </CCardHeader>
          <CCardBody>
            <CForm onSubmit={handleSubmit}>
              <div className="mb-3">
                <CFormLabel htmlFor="nome">Nome</CFormLabel>
                <CFormInput
                  type="text"
                  id="nome"
                  placeholder="Digite o nome"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="email">Email</CFormLabel>
                <CFormInput
                  type="email"
                  id="email"
                  placeholder="nome@exemplo.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="telefone">Telefone</CFormLabel>
                <CFormInput
                  type="tel"
                  id="telefone"
                  placeholder="(99) 99999-9999"
                  value={telefone}
                  onChange={(e) => setTelefone(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="isAnonimo">Cliente Anônimo?</CFormLabel>
                <CFormSwitch
                  id="isAnonimo"
                  checked={isAnonimo}
                  onChange={(e) => setIsAnonimo(e.target.checked)}
                />
              </div>
              <CButton type="submit" color="primary">
                Cadastrar
              </CButton>
            </CForm>
            {message && <p className="mt-3">{message}</p>}
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default ClienteForm
