import React from 'react'
import { CCard, CCardHeader, CCardBody, CButton, CRow, CCol } from '@coreui/react'
import { useNavigate } from 'react-router-dom'
import CIcon from '@coreui/icons-react'
import { cilPlus } from '@coreui/icons'

const MesaList = () => {
  const navigate = useNavigate()

  // Exemplo simples: lista mockada
  const mesas = [
    { id: 1, nome: 'Mesa 01', lugares: 4, status: 'Livre' },
    { id: 2, nome: 'Mesa 02', lugares: 6, status: 'Ocupada' },
  ]

  return (
    <CCard className="mb-4">
      <CCardHeader className="d-flex justify-content-between align-items-center">
        <span>Listar Mesas</span>
        <CButton color="success" className="text-white" onClick={() => navigate('/mesas/new')}>
          <CIcon icon={cilPlus} className="me-2" />
          Adicionar
        </CButton>
      </CCardHeader>
      <CCardBody>
        <div className="table-responsive">
          <table className="table table-hover align-middle">
            <thead>
              <tr>
                <th>#</th>
                <th>Nome</th>
                <th>Lugares</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {mesas.map((m) => (
                <tr key={m.id}>
                  <td>{m.id}</td>
                  <td>{m.nome}</td>
                  <td>{m.lugares}</td>
                  <td>{m.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CCardBody>
    </CCard>
  )
}

export default MesaList
