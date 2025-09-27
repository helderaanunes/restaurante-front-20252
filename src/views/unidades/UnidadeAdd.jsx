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
} from '@coreui/react'

const UnidadeForm = () => {
  const [formData, setFormData] = useState({
    nome: '',
  })

  const [mensagem, setMensagem] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post('http://localhost:8080/unidade', formData)
      setMensagem('Unidade cadastrada com sucesso!')
      console.log(response.data)
      setFormData({ nome: '' })
    } catch (error) {
      console.error('Erro ao cadastrar unidade:', error)
      setMensagem('Erro ao cadastrar unidade.')
    }
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Cadastro de Unidade</strong>
          </CCardHeader>
          <CCardBody>
            <CForm onSubmit={handleSubmit}>
              <div className="mb-3">
                <CFormLabel htmlFor="nome">Nome da Unidade</CFormLabel>
                <CFormInput
                  type="text"
                  id="nome"
                  name="nome"
                  placeholder="Ex: Unidade Central"
                  value={formData.nome}
                  onChange={handleChange}
                  required
                />
              </div>

              <CButton color="primary" type="submit">
                Cadastrar Unidade
              </CButton>

              {mensagem && (
                <div className="mt-3">
                  <strong>{mensagem}</strong>
                </div>
              )}
            </CForm>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default UnidadeForm
