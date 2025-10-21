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

const MesaEdit = () => {
  const navigate = useNavigate()
  const { id } = useParams()

  const [form, setForm] = useState({
    numero: '',
    capacidade: '',
    qrFixo: '',
  })
  const [loading, setLoading] = useState(true)
  const [salvando, setSalvando] = useState(false)
  const [erro, setErro] = useState('')
  const [ok, setOk] = useState('')

  useEffect(() => {
    const carregar = async () => {
      try {
        setLoading(true)
        const { data } = await axios.get(`http://localhost:8080/mesa/${id}`)
        // adapta caso backend retorne objeto com campos diferentes
        setForm({
          numero: String(data.numero ?? ''),
          capacidade: String(data.capacidade ?? ''),
          qrFixo: data.qrFixo ?? '',
        })
      } catch (err) {
        setErro('Erro ao carregar a mesa.')
      } finally {
        setLoading(false)
      }
    }
    carregar()
  }, [id])

  const onChange = (e) => {
    const { name, value } = e.target
    if (name === 'numero' || name === 'capacidade') {
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
      await axios.put(`http://localhost:8080/mesa/${id}`, payload, {
        headers: { 'Content-Type': 'application/json' },
      })
      setOk('Mesa atualizada com sucesso.')
      setTimeout(() => navigate('/mesas'), 500)
    } catch (err) {
      const detail =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        err?.message ||
        'Erro ao atualizar a mesa.'
      setErro(detail)
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
            <strong>Editar Mesa</strong>
          </CCardHeader>
          <CCardBody>
            {erro && <CAlert color="danger">{erro}</CAlert>}
            {ok && <CAlert color="success">{ok}</CAlert>}

            <CForm onSubmit={onSubmit}>
              <div className="mb-3">
                <CFormLabel htmlFor="numero">Número</CFormLabel>
                <CFormInput
                  id="numero"
                  name="numero"
                  value={form.numero}
                  onChange={onChange}
                  required
                />
              </div>

              <div className="mb-3">
                <CFormLabel htmlFor="capacidade">Capacidade</CFormLabel>
                <CFormInput
                  id="capacidade"
                  name="capacidade"
                  value={form.capacidade}
                  onChange={onChange}
                  required
                />
              </div>

              <div className="mb-3">
                <CFormLabel htmlFor="qrFixo">QR Fixo (opcional)</CFormLabel>
                <CFormInput id="qrFixo" name="qrFixo" value={form.qrFixo} onChange={onChange} />
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
                  type="button"
                  variant="outline"
                  onClick={() => navigate('/mesas')}
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

export default MesaEdit
