import React, { useEffect, useMemo, useState } from 'react'
import {
  CAlert,
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CFormInput,
  CRow,
  CSpinner,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilPlus, cilPencil, cilTrash } from '@coreui/icons'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const PAGE_SIZE = 10

const MesaList = () => {
  const navigate = useNavigate()

  const [mesas, setMesas] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [query, setQuery] = useState('')
  const [page, setPage] = useState(1)
  const [deletingId, setDeletingId] = useState(null)

  // --- Carregar lista ---
  const fetchMesas = async () => {
    try {
      setLoading(true)
      setError('')
      const { data } = await axios.get('http://localhost:8080/mesa')
      setMesas(Array.isArray(data) ? data : [])
    } catch (err) {
      const msg = err?.response?.data?.message || err?.message || 'Erro ao carregar as mesas.'
      setError(msg)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchMesas()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // --- Filtro simples ---
  const filtered = useMemo(() => {
    if (!query) return mesas
    const q = query.toLowerCase()
    return mesas.filter((m) => {
      const n = String(m?.numero ?? '').toLowerCase()
      const c = String(m?.capacidade ?? '').toLowerCase()
      const qr = String(m?.qrFixo ?? '').toLowerCase()
      return n.includes(q) || c.includes(q) || qr.includes(q)
    })
  }, [mesas, query])

  // --- Paginação ---
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const currentPage = Math.min(page, totalPages)
  const pageStart = (currentPage - 1) * PAGE_SIZE
  const pageItems = filtered.slice(pageStart, pageStart + PAGE_SIZE)

  const goToPage = (p) => setPage(Math.min(Math.max(1, p), totalPages))

  // --- Ações ---
  const handleAdd = () => navigate('/mesas/novo')
  const handleEdit = (id) => navigate(`/mesas/editar/${id}`)

  const handleDelete = async (id) => {
    const mesa = mesas.find((m) => m.id === id)
    const label = mesa ? `mesa #${mesa.numero}` : `ID ${id}`
    if (!window.confirm(`Remover ${label}? Essa ação não pode ser desfeita.`)) return

    try {
      setDeletingId(id)
      await axios.delete(`http://localhost:8080/mesa/${id}`)
      // remove localmente sem recarregar
      setMesas((prev) => prev.filter((m) => m.id !== id))
      // ajustar página se necessário
      if (filtered.length - 1 <= pageStart && currentPage > 1) {
        goToPage(currentPage - 1)
      }
    } catch (err) {
      const msg = err?.response?.data?.message || err?.message || 'Erro ao remover a mesa.'
      setError(msg)
    } finally {
      setDeletingId(null)
    }
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader className="d-flex justify-content-between align-items-center">
            <strong>Mesas</strong>
            <div className="d-flex gap-2">
              <CFormInput
                placeholder="Buscar por número, capacidade ou QR"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value)
                  setPage(1)
                }}
                style={{ maxWidth: 320 }}
              />
              <CButton color="primary" onClick={handleAdd} className="text-white">
                <CIcon icon={cilPlus} className="me-2" /> Nova mesa
              </CButton>
            </div>
          </CCardHeader>

          <CCardBody>
            {error && (
              <CAlert color="danger" className="mb-3">
                {error}
              </CAlert>
            )}

            {loading ? (
              <div className="d-flex align-items-center gap-2">
                <CSpinner size="sm" /> Carregando mesas...
              </div>
            ) : (
              <>
                <CTable hover responsive>
                  <CTableHead>
                    <CTableRow>
                      <CTableHeaderCell style={{ width: 80 }}>ID</CTableHeaderCell>
                      <CTableHeaderCell>Número</CTableHeaderCell>
                      <CTableHeaderCell>Capacidade</CTableHeaderCell>
                      <CTableHeaderCell>QR Fixo</CTableHeaderCell>
                      <CTableHeaderCell style={{ width: 160 }} className="text-end">
                        Ações
                      </CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>
                  <CTableBody>
                    {pageItems.length === 0 ? (
                      <CTableRow>
                        <CTableDataCell colSpan={5} className="text-center text-body-secondary">
                          Nenhum registro encontrado.
                        </CTableDataCell>
                      </CTableRow>
                    ) : (
                      pageItems.map((m) => (
                        <CTableRow key={m.id}>
                          <CTableDataCell>#{m.id}</CTableDataCell>
                          <CTableDataCell>{m.numero}</CTableDataCell>
                          <CTableDataCell>{m.capacidade}</CTableDataCell>
                          <CTableDataCell>{m.qrFixo || '—'}</CTableDataCell>
                          <CTableDataCell className="text-end">
                            <div className="d-inline-flex gap-2">
                              <CButton
                                size="sm"
                                color="info"
                                className="text-white"
                                onClick={() => handleEdit(m.id)}
                              >
                                <CIcon icon={cilPencil} className="me-1" /> Editar
                              </CButton>
                              <CButton
                                size="sm"
                                color="danger"
                                variant="outline"
                                disabled={deletingId === m.id}
                                onClick={() => handleDelete(m.id)}
                              >
                                {deletingId === m.id ? (
                                  <>
                                    <CSpinner size="sm" className="me-1" /> Removendo
                                  </>
                                ) : (
                                  <>
                                    <CIcon icon={cilTrash} className="me-1" /> Excluir
                                  </>
                                )}
                              </CButton>
                            </div>
                          </CTableDataCell>
                        </CTableRow>
                      ))
                    )}
                  </CTableBody>
                </CTable>

                {/* Paginação simples */}
                <div className="d-flex justify-content-between align-items-center mt-3">
                  <small className="text-body-secondary">
                    {filtered.length} registro(s) • Página {currentPage} de {totalPages}
                  </small>
                  <div className="d-flex gap-2">
                    <CButton
                      color="secondary"
                      variant="outline"
                      size="sm"
                      onClick={() => goToPage(1)}
                      disabled={currentPage === 1}
                    >
                      « Primeiro
                    </CButton>
                    <CButton
                      color="secondary"
                      variant="outline"
                      size="sm"
                      onClick={() => goToPage(currentPage - 1)}
                      disabled={currentPage === 1}
                    >
                      ‹ Anterior
                    </CButton>
                    <CButton
                      color="secondary"
                      variant="outline"
                      size="sm"
                      onClick={() => goToPage(currentPage + 1)}
                      disabled={currentPage === totalPages}
                    >
                      Próxima ›
                    </CButton>
                    <CButton
                      color="secondary"
                      variant="outline"
                      size="sm"
                      onClick={() => goToPage(totalPages)}
                      disabled={currentPage === totalPages}
                    >
                      Última »
                    </CButton>
                  </div>
                </div>
              </>
            )}
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default MesaList
