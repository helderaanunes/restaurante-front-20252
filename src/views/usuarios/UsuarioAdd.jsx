// UsuarioAdd.jsx
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import {
  CButton, CCard, CCardBody, CCardHeader, CCol, CForm,
  CFormInput, CFormLabel, CFormCheck, CRow
} from '@coreui/react'

const UsuarioAdd = () => {
  const { id } = useParams()              // se existir, estamos em modo edição
  const navigate = useNavigate()
  const isEdit = Boolean(id)

  const [loading, setLoading] = useState(false)
  const [usuario, setUsuario] = useState({
    nome: '',
    email: '',
    senha: '',
    ativo: false,
  })

  useEffect(() => {
    const carregar = async () => {
      if (!isEdit) return
      setLoading(true)
      try {
        const { data } = await axios.get(`http://localhost:8080/usuario/${id}`)
        // deixe a senha vazia (editar senha só se o user digitar)
        setUsuario({
          nome: data.nome ?? '',
          email: data.email ?? '',
          senha: '',
          ativo: !!data.ativo,
        })
      } catch (err) {
        console.error('Erro ao carregar usuário:', err)
        alert('Erro ao carregar usuário. Veja o console.')
      } finally {
        setLoading(false)
      }
    }
    carregar()
  }, [id, isEdit])

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setUsuario((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (isEdit) {
        // monta payload sem senha se não informada
        const payload = {
          nome: usuario.nome,
          email: usuario.email,
          ativo: usuario.ativo,
          ...(usuario.senha ? { senha: usuario.senha } : {}),
        }
        await axios.put(`http://localhost:8080/usuario/${id}`, payload)
        alert('Usuário atualizado com sucesso!')
      } else {
        await axios.post('http://localhost:8080/usuario', usuario)
        alert('Usuário cadastrado com sucesso!')
      }
      navigate('/usuarios')
    } catch (error) {
      console.error('Erro ao salvar usuário:', error)
      alert('Erro ao salvar usuário. Veja o console.')
    }
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>{isEdit ? 'Editar Usuário' : 'Cadastrar Usuário'}</strong>
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
                  disabled={loading}
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
                  disabled={loading}
                />
              </div>

              <div className="mb-3">
                <CFormLabel htmlFor="senha">
                  {isEdit ? 'Senha (deixe em branco para não alterar)' : 'Senha'}
                </CFormLabel>
                <CFormInput
                  type="password"
                  id="senha"
                  name="senha"
                  placeholder={isEdit ? 'Opcional na edição' : 'Digite a senha'}
                  value={usuario.senha}
                  onChange={handleChange}
                  disabled={loading}
                  {...(!isEdit ? { required: true } : {})}
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
                  disabled={loading}
                />
              </div>

              <div className="flex gap-2">
                <CButton type="submit" color="primary" className="me-2">
                  {isEdit ? 'Salvar Alterações' : 'Cadastrar'}
                </CButton>
                <CButton type="button" color="secondary" onClick={() => navigate('/usuarios')}>
                  Voltar
                </CButton>
              </div>
            </CForm>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default UsuarioAdd
