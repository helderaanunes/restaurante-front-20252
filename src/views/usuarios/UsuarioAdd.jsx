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
  CFormCheck,
  CRow,
} from '@coreui/react'

const UsuarioForm = () => {
  const [usuario, setUsuario] = useState({
    nome: '',
    email: '',
    senha: '',
    ativo: false,
  })

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setUsuario({
      ...usuario,
      [name]: type === 'checkbox' ? checked : value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post('http://localhost:8080/usuario', usuario)
      console.log('Usuário cadastrado com sucesso:', response.data)
      alert('Usuário cadastrado com sucesso!')
      // Limpar formulário
      setUsuario({ nome: '', email: '', senha: '', ativo: false })
    } catch (error) {
      console.error('Erro ao cadastrar usuário:', error)
      alert('Erro ao cadastrar usuário. Veja o console.')
    }
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Cadastrar Usuário</strong>
          </CCardHeader>
          <CCardBody>
            <CForm onSubmit={handleSubmit}>
              <div className="mb-3">
                <CFormLabel htmlFor="nome">Nome</CFormLabel>
                <CFormInput
                  type="text"
                  id="nome"
                  name="nome"
                  placeholder="Digite o nome"
                  value={usuario.nome}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <CFormLabel htmlFor="email">Email</CFormLabel>
                <CFormInput
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Digite o email"
                  value={usuario.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <CFormLabel htmlFor="senha">Senha</CFormLabel>
                <CFormInput
                  type="password"
                  id="senha"
                  name="senha"
                  placeholder="Digite a senha"
                  value={usuario.senha}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3">
                <CFormCheck
                  type="checkbox"
                  id="ativo"
                  name="ativo"
                  label="Ativo"
                  checked={usuario.ativo}
                  onChange={handleChange}
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

export default UsuarioForm
