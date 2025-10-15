import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
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
  const { id } = useParams()
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    nome: '',
  })

  const [mensagem, setMensagem] = useState('')
  const [loading, setLoading] = useState(true)

  // Se estiver em modo edição, busca os dados da unidade
  useEffect(() => {
    const fetchUnidade = async () => {
      if (id) {
        try {
          const response = await axios.get(`http://localhost:8080/unidades/${id}`)
          setFormData({ nome: response.data.nome })
        } catch (error) {
          console.error('Erro ao buscar unidade:', error)
          setMensagem('Erro ao carregar dados da unidade.')
        }
      }
      setLoading(false)
    }

    fetchUnidade()
  }, [id])

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
      if (id) {
        // Modo edição
        await axios.put(`http://localhost:8080/unidade/${id}`, formData)
        setMensagem('Unidade atualizada com sucesso!')
      } else {
        // Modo cadastro
        await axios.post('http://localhost:8080/unidade', formData)
        setMensagem('Unidade cadastrada com sucesso!')
        setFormData({ nome: '' })
      }

      // Opcional: redireciona para listagem após salvar
      setTimeout(() => {
        navigate('/unidades') // ajuste para a rota da listagem de unidades
      }, 1500)
    } catch (error) {
      console.error('Erro ao salvar unidade:', error)
      setMensagem('Erro ao salvar unidade.')
    }
  }

  if (loading) {
    return <p>Carregando...</p>
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>{id ? 'Editar Unidade' : 'Cadastro de Unidade'}</strong>
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
                {id ? 'Salvar Alterações' : 'Cadastrar Unidade'}
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
