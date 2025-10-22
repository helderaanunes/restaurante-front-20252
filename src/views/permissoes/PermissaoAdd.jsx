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
} from '@coreui/react'
import axios from 'axios'

const PermissaoForm = () => {
  const [codigo, setCodigo] = useState('')
  const [descricao, setDescricao] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')
    try {
      const response = await axios.post('/permissao', {
        codigo,
        descricao,
      })
      setMessage(`Permissão cadastrada com sucesso! ID: ${response.data.id}`)
      setCodigo('')
      setDescricao('')
    } catch (error) {
      setMessage('Erro ao cadastrar permissão. Tente novamente.')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <CRow className="justify-content-center">
      <CCol xs={12} md={6}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Cadastro de Permissão</strong>
          </CCardHeader>
          <CCardBody>
            <CForm onSubmit={handleSubmit}>
              <div className="mb-3">
                <CFormLabel htmlFor="codigo">Código</CFormLabel>
                <CFormInput
                  type="text"
                  id="codigo"
                  placeholder="Digite o código da permissão"
                  value={codigo}
                  onChange={(e) => setCodigo(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="descricao">Descrição</CFormLabel>
                <CFormInput
                  type="text"
                  id="descricao"
                  placeholder="Digite a descrição da permissão"
                  value={descricao}
                  onChange={(e) => setDescricao(e.target.value)}
                  required
                />
              </div>
              <CButton type="submit" color="primary" disabled={loading}>
                {loading ? 'Salvando...' : 'Salvar'}
              </CButton>
            </CForm>
            {message && (
              <div className="mt-3">
                <small>{message}</small>
              </div>
            )}
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default PermissaoForm
