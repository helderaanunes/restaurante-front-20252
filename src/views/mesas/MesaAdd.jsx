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

const MesaAdd = () => {
  const navigate = useNavigate()

  const [form, setForm] = useState({
    numero: '',
    capacidade: '',
    qrFixo: '',
  })
  const [salvando, setSalvando] = useState(false)
  const [erro, setErro] = useState('')
  const [ok, setOk] = useState('')

  const onChange = (e) => {
    const { name, value } = e.target
    // Para numero/capacidade, permitir vazio ou número
    if (name === 'numero' || name === 'capacidade') {
      // bloqueia caracteres não numéricos (mas deixa vazio para permitir digitação)
      if (value === '' || /^[0-9]*$/.test(value)) {
        setForm((prev) => ({ ...prev, [name]: value }))
      }
      return
    }
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const validar = () => {
    if (!form.numero) return 'Informe o número da mesa.'
    if (!form.capacidade) return 'Informe a capacidade.'
    const n = parseInt(form.numero, 10)
    const c = parseInt(form.capacidade, 10)
    if (Number.isNaN(n) || n <= 0) return 'Número da mesa inválido.'
    if (Number.isNaN(c) || c <= 0) return 'Capacidade inválida.'
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
      numero: parseInt(form.numero, 10),
      capacidade: parseInt(form.capacidade, 10),
      qrFixo: form.qrFixo || null,
    }

    try {
      setSalvando(true)
      await axios.post('http://localhost:8080/mesa', payload, {
        headers: { 'Content-Type': 'application/json' },
      })
      setOk('Mesa cadastrada com sucesso.')
      // pequeno delay opcional pra usuário ver a mensagem
      setTimeout(() => navigate('/mesas'), 400)
    } catch (err) {
      // tenta extrair mensagem do backend
      const detail =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        err?.message ||
        'Erro ao salvar a mesa.'
      setErro(detail)
    } finally {
      setSalvando(false)
    }
  }

  const onCancel = () => navigate('/mesas')

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Cadastrar Mesa</strong>
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
                <CFormLabel htmlFor="numero">Número</CFormLabel>
                <CFormInput
                  id="numero"
                  name="numero"
                  type="text"
                  placeholder="Ex.: 10"
                  value={form.numero}
                  onChange={onChange}
                  required
                  aria-label="Número da mesa"
                />
              </div>

              <div className="mb-3">
                <CFormLabel htmlFor="capacidade">Capacidade</CFormLabel>
                <CFormInput
                  id="capacidade"
                  name="capacidade"
                  type="text"
                  placeholder="Ex.: 4"
                  value={form.capacidade}
                  onChange={onChange}
                  required
                  aria-label="Capacidade de pessoas"
                />
              </div>

              <div className="mb-3">
                <CFormLabel htmlFor="qrFixo">QR Fixo (opcional)</CFormLabel>
                <CFormInput
                  id="qrFixo"
                  name="qrFixo"
                  type="text"
                  placeholder="Ex.: MESA-10-QR"
                  value={form.qrFixo}
                  onChange={onChange}
                  aria-label="Código QR fixo da mesa"
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

export default MesaAdd
