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
  CAlert,
} from '@coreui/react'

const PerfilForm = () => {
  const [nome, setNome] = useState('')
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(false)

  const handleSubmit = async (e) => {  //evento
    e.preventDefault()
    setSuccess(false)
    setError(false)

    try {
      const perfil = { nome }
      await axios.post('http://localhost:8080/perfil', perfil)
      setSuccess(true)
      setNome('') // limpa o campo
    } catch (err) {
      console.error('Erro ao salvar perfil:', err)
      setError(true)
    }
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Cadastrar Perfil</strong>
          </CCardHeader>
          <CCardBody>
            {success && (
              <CAlert color="success">Perfil cadastrado com sucesso!</CAlert>
            )}
            {error && (
              <CAlert color="danger">Erro ao cadastrar o perfil.</CAlert>
            )}

            <CForm onSubmit={handleSubmit}>
              <div className="mb-3">
                <CFormLabel htmlFor="nomePerfil">Nome do Perfil</CFormLabel>
                <CFormInput
                  type="text"
                  id="nomePerfil"
                  placeholder="Ex: Administrador"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  required
                />
              </div>
              <CButton type="submit" color="primary">
                Salvar
              </CButton>
            </CForm>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default PerfilForm
