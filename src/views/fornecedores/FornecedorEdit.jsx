import React, { useEffect, useState } from 'react'
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
  CSpinner,
} from '@coreui/react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'

const FornecedorEdit = () => {
  const navigate = useNavigate()
  const { id } = useParams()

  const [form, setForm] = useState({
    nome: '',
    cnpj: '',
    email: '',
    telefone: '',
  })
  const [loading, setLoading] = useState(true)
  const [salvando, setSalvando] = useState(false)
  const [erro, setErro] = useState('')
  const [ok, setOk] = useState('')

  useEffect(() => {
    const carregar = async () => {
      try {
        const resp = await axios.get(`http://localhost:8080/fornecedor/${id}`)
        setForm(resp.data)
      } catch (err) {
        setErro('Erro ao carregar fornecedor.')
      } finally {
        setLoading(false)
      }
    }
    carregar()
  }, [id])

  const onChange = (e) => {
    const { name, value } = e.target
    if (name === 'cnpj' || name === 'telefone') {
      if (value === '' || /^[0-9]*$/.test(value)) {
        setForm((prev) => ({ ...prev, [name]: value }))
      }
      return
    }
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const validar = () => {
    if (!form.nome) return 'Informe o nome.'
    if (!form.cnpj) return 'Informe o CNPJ.'
    if (!form.email) return 'Informe o email.'
    return ''
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    setErro('')
    setOk('')
    const msg = validar()
    if (msg) {
      setErro(msg)
      return
    }

    try {
      setSalvando(true)
      await axios.put('http://localhost:8080/fornecedor', form, {
        headers: { 'Content-Type': 'application/json' },
      })
      setOk('Fornecedor atualizado com sucesso!')
      setTimeout(() => navigate('/fornecedores'), 500)
    } catch (err) {
      setErro('Erro ao atualizar fornecedor.')
    } finally {
      setSalvando(false)
    }
  }

  if (loading) {
    return (
      <div className="text-center py-4">
        <CSpinner color="primary" />
        <p>Carregando...</p>
      </div>
    )
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Editar Fornecedor</strong>
          </CCardHeader>
          <CCardBody>
            {erro && <CAlert color="danger">{erro}</CAlert>}
            {ok && <CAlert color="success">{ok}</CAlert>}

            <CForm onSubmit={onSubmit}>
              <div className="mb-3">
                <CFormLabel htmlFor="nome">Nome</CFormLabel>
                <CFormInput id="nome" name="nome" value={form.nome} onChange={onChange} required />
              </div>

              <div className="mb-3">
                <CFormLabel htmlFor="cnpj">CNPJ</CFormLabel>
                <CFormInput id="cnpj" name="cnpj" value={form.cnpj} onChange={onChange} required />
              </div>

              <div className="mb-3">
                <CFormLabel htmlFor="email">Email</CFormLabel>
                <CFormInput
                  id="email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={onChange}
                  required
                />
              </div>

              <div className="mb-3">
                <CFormLabel htmlFor="telefone">Telefone</CFormLabel>
                <CFormInput
                  id="telefone"
                  name="telefone"
                  value={form.telefone}
                  onChange={onChange}
                />
              </div>

              <div className="d-flex gap-2">
                <CButton color="primary" type="submit" disabled={salvando}>
                  {salvando ? (
                    <>
                      <CSpinner size="sm" className="me-2" />
                      Salvando...
                    </>
                  ) : (
                    'Salvar'
                  )}
                </CButton>
                <CButton
                  color="secondary"
                  variant="outline"
                  onClick={() => navigate('/fornecedores')}
                >
                  Cancelar
                </CButton>
              </div>
            </CForm>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default FornecedorEdit
