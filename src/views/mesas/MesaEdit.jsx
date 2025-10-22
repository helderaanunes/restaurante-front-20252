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
  const { id } = useParams() // ID da mesa para edição

  const [form, setForm] = useState({
    numero: '',
    capacidade: '',
    qrFixo: '',
  })
  const [salvando, setSalvando] = useState(false)
  const [erro, setErro] = useState('')
  const [ok, setOk] = useState('')
  const [loading, setLoading] = useState(true)

  // 🔹 Buscar mesa pelo ID
  useEffect(() => {
    const fetchMesa = async () => {
      try {
        const { data } = await axios.get(`http://localhost:8080/mesa/${id}`)
        setForm({
          numero: data.numero?.toString() || '',
          capacidade: data.capacidade?.toString() || '',
          qrFixo: data.qrFixo || '',
        })
      } catch (err) {
        const msg = err?.response?.data?.message || err.message || 'Erro ao carregar a mesa.'
        setErro(msg)
      } finally {
        setLoading(false)
      }
    }
    fetchMesa()
  }, [id])

  const onChange = (e) => {
    const { name, value } = e.target
    // validação simples numérica
    if ((name === 'numero' || name === 'capacidade') && !/^[0-9]*$/.test(value)) return
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
    if (msg) return setErro(msg)

    const payload = {
      numero: parseInt(form.numero, 10),
      capacidade: parseInt(form.capacidade, 10),
      qrFixo: form.qrFixo || null,
    }

    try {
      setSalvando(true)
      await axios.put(`http://localhost:8080/mesa/${id}`, payload)
      setOk('Mesa atualizada com sucesso!')
      setTimeout(() => navigate('/mesas'), 800)
    } catch (err) {
      const msg =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        err.message ||
        'Erro ao salvar alterações.'
      setErro(msg)
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
            <strong>Editar Mesa #{id}</strong>
          </CCardHeader>
          <CCardBody>
            {erro && <CAlert color="danger">{erro}</CAlert>}
            {ok && <CAlert color="success">{ok}</CAlert>}

            {loading ? (
              <div className="d-flex align-items-center">
                <CSpinner size="sm" className="me-2" /> Carregando dados da mesa...
              </div>
            ) : (
              <CForm onSubmit={onSubmit}>
                <div className="mb-3">
                  <CFormLabel htmlFor="numero">Número</CFormLabel>
                  <CFormInput
                    id="numero"
                    name="numero"
                    type="text"
                    value={form.numero}
                    onChange={onChange}
                    required
                    placeholder="Ex.: 10"
                  />
                </div>

                <div className="mb-3">
                  <CFormLabel htmlFor="capacidade">Capacidade</CFormLabel>
                  <CFormInput
                    id="capacidade"
                    name="capacidade"
                    type="text"
                    value={form.capacidade}
                    onChange={onChange}
                    required
                    placeholder="Ex.: 4"
                  />
                </div>

                <div className="mb-3">
                  <CFormLabel htmlFor="qrFixo">QR Fixo (opcional)</CFormLabel>
                  <CFormInput
                    id="qrFixo"
                    name="qrFixo"
                    type="text"
                    value={form.qrFixo}
                    onChange={onChange}
                    placeholder="Ex.: MESA-10-QR"
                  />
                </div>

                <div className="d-flex gap-2">
                  <CButton color="primary" type="submit" disabled={salvando}>
                    {salvando ? (
                      <>
                        <CSpinner size="sm" className="me-2" /> Salvando...
                      </>
                    ) : (
                      'Salvar Alterações'
                    )}
                  </CButton>
                  <CButton color="secondary" variant="outline" onClick={onCancel}>
                    Cancelar
                  </CButton>
                </div>
              </CForm>
            )}
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default MesaEdit
