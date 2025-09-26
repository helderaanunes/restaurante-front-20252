import React, { useState } from 'react'
import { CCard, CCardHeader, CCardBody, CForm, CFormInput, CFormSelect, CButton } from '@coreui/react'
import { useNavigate } from 'react-router-dom'

const MesaAdd = () => {
  const navigate = useNavigate()
  const [form, setForm] = useState({ nome: '', lugares: 4, status: 'Livre' })

  const onChange = (e) => {
    const { name, value } = e.target

    setForm((prev) => ({ ...prev, [name]: value }))

  }

  const onSubmit = (e) => {
    e.preventDefault()
    // TODO: integrar com sua API (POST /mesas)
    // fetch('/api/mesas', { method: 'POST', body: JSON.stringify(form), ... })
    navigate('/mesas')
  }

  return (
    <CCard className="mb-4">
      <CCardHeader>Adicionar Mesa</CCardHeader>
      <CCardBody>
        <CForm onSubmit={onSubmit}>
          <div className="mb-3">
            <CFormInput
              type="text"
              label="Nome da Mesa"
              placeholder="Ex.: Mesa 01"
              name="nome"
              value={form.nome}
              onChange={onChange}
              required
            />
          </div>

          <div className="mb-3">
            <CFormInput
              type="number"
              label="Quantidade de lugares"
              name="lugares"
              min={1}
              value={form.lugares}
              onChange={onChange}
              required
            />
          </div>

          <div className="mb-4">
            <CFormSelect label="Status" name="status" value={form.status} onChange={onChange}>
              <option>Livre</option>
              <option>Ocupada</option>
              <option>Reservada</option>
            </CFormSelect>
          </div>

          <div className="d-flex gap-2">
            <CButton type="submit" color="success" className="text-white">
              Salvar
            </CButton>
            <CButton type="button" color="secondary" onClick={() => navigate('/mesas')}>
              Cancelar
            </CButton>
          </div>
        </CForm>
      </CCardBody>
    </CCard>
  )
}

export default MesaAdd
