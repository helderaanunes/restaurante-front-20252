import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormInput,
  CRow,
} from '@coreui/react'
import { useParams, useHistory } from 'react-router-dom'

const UsuarioEdit = () => {
  const { id } = useParams() // Pega o ID do parâmetro da URL
  const [usuario, setUsuario] = useState({
    nome: '',
    email: '',
    ativo: true,
  })
  const history = useHistory()

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const carregarUsuario = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/usuario/${id}`)
      setUsuario(response.data)
    } catch (error) {
      console.error('Erro ao carregar usuário:', error)
      alert('Erro ao carregar os dados do usuário.')
    }
  }

  useEffect(() => {
    carregarUsuario()
  }, [carregarUsuario, id])

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      await axios.put(`http://localhost:8080/usuario/${id}`, usuario)
      alert('Usuário atualizado com sucesso!')
      history.push('/usuarios') // Redireciona de volta para a lista de usuários
    } catch (error) {
      console.error('Erro ao atualizar o usuário:', error)
      alert('Erro ao atualizar o usuário.')
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setUsuario((prev) => ({
      ...prev,
      [name]: name === 'ativo' ? value === 'true' : value,
    }))
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Editar Usuário</strong>
          </CCardHeader>
          <CCardBody>
            <CForm onSubmit={handleSubmit}>
              <CFormInput
                label="Nome"
                type="text"
                name="nome"
                value={usuario.nome}
                onChange={handleChange}
              />
              <CFormInput
                label="Email"
                type="email"
                name="email"
                value={usuario.email}
                onChange={handleChange}
              />
              <div>
                <label>Ativo</label>
                <select name="ativo" value={usuario.ativo} onChange={handleChange}>
                  <option value={true}>Sim</option>
                  <option value={false}>Não</option>
                </select>
              </div>
              <CButton color="primary" type="submit">
                Salvar
              </CButton>
            </CForm>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default UsuarioEdit
