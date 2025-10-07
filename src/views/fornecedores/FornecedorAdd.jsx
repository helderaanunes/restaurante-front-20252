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
  CSpinner,
} from '@coreui/react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const FornecedorAdd = () => {
  const navigate = useNavigate()

  const [form, setForm] = useState({
    nome: '',
    cnpj: '',
    email: '',
    telefone: '',
  })
  const [salvando, setSalvando] = useState(false)
  const [erro, setErro] = useState('')
  const [ok, setOk] = useState('')

  const onChange = (e) => {
    const { name, value } = e.target
    // CNPJ e telefone só permitem números, mas pode deixar vazio
    if (name === 'cnpj' || name === 'telefone') {
      if (value === '' || /^[0-9]*$/.test(value)) {
        setForm((prev) => ({ ...prev, [name]: value }))
      }
      return
    }
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const validar = () => {
    if (!form.nome) return 'Informe o nome do fornecedor.'
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

    const payload = {
      nome: form.nome,
      cnpj: form.cnpj,
      email: form.email,
      telefone: form.telefone || null,
    }

    try {
      setSalvando(true)
      await axios.post('http://localhost:8080/fornecedor', payload, {
        headers: { 'Content-Type': 'application/json' },
      })
      setOk('Fornecedor cadastrado com sucesso.')
      setTimeout(() => navigate('/fornecedores'), 400)
    } catch (err) {
      const detail =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        err?.message ||
        'Erro ao salvar o fornecedor.'
      setErro(detail)
    } finally {
      setSalvando(false)
      //  navigate('/fornecedores')
    }
  }

  const onCancel = () => navigate('/fornecedores')

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Cadastrar Fornecedor</strong>
          </CCardHeader>
          <CCardBody>
            {erro && (
              <CAlert color="danger" className="mb-3">
                {erro}
              </CAlert>
            )}
            {ok && (
              <CAlert color="success" className="mb-3">
                {ok}
              </CAlert>
            )}

            <CForm onSubmit={onSubmit}>
              <div className="mb-3">
                <CFormLabel htmlFor="nome">Nome</CFormLabel>
                <CFormInput
                  id="nome"
                  name="nome"
                  type="text"
                  placeholder="Ex.: Papelaria Silva Ltda."
                  value={form.nome}
                  onChange={onChange}
                  required
                />
              </div>

              <div className="mb-3">
                <CFormLabel htmlFor="cnpj">CNPJ</CFormLabel>
                <CFormInput
                  id="cnpj"
                  name="cnpj"
                  type="text"
                  placeholder="Ex.: 12345678000199"
                  value={form.cnpj}
                  onChange={onChange}
                  required
                />
              </div>

              <div className="mb-3">
                <CFormLabel htmlFor="email">Email</CFormLabel>
                <CFormInput
                  id="email"
                  name="email"
                  type="email"
                  placeholder="fornecedor@email.com"
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
                  type="text"
                  placeholder="81999999999"
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
                <CButton color="secondary" type="button" variant="outline" onClick={onCancel}>
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

export default FornecedorAdd
