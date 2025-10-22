import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CButton,
  CFormInput,
  CModal,
  CModalHeader,
  CModalBody,
  CModalFooter,
  CButtonGroup,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilPencil, cilTrash, cilPlus } from '@coreui/icons'

const CategoriaList = () => {
  const [categorias, setCategorias] = useState([])
  const [editandoCategoria, setEditandoCategoria] = useState(null)
  const [novaCategoriaVisible, setNovaCategoriaVisible] = useState(false)
  const [formData, setFormData] = useState({ nome: '', ordem: '' })
  const [formNovaData, setFormNovaData] = useState({ nome: '', ordem: '' })

  useEffect(() => {
    buscarCategorias()
  }, [])

  const buscarCategorias = async () => {
    try {
      const response = await axios.get('http://localhost:8080/categoriaItem')
      setCategorias(response.data)
    } catch (error) {
      console.error('Erro ao buscar categorias:', error)
    }
  }

  // -------------------- EDITAR -------------------
  const abrirEditar = (categoria) => {
    setEditandoCategoria(categoria)
    setFormData({ nome: categoria.nome, ordem: categoria.ordem })
  }

  const fecharEditar = () => {
    setEditandoCategoria(null)
    setFormData({ nome: '', ordem: '' })
  }

  const handleChangeEdit = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const salvarEdicao = async () => {
    try {
      await axios.put('http://localhost:8080/categoriaItem', {
        id: editandoCategoria.id,
        nome: formData.nome,
        ordem: formData.ordem,
      })
      fecharEditar()
      buscarCategorias()
    } catch (error) {
      console.error('Erro ao salvar categoria:', error)
    }
  }

  // -------------------- NOVA ---------------------
  const abrirNova = () => {
    setNovaCategoriaVisible(true)
    setFormNovaData({ nome: '', ordem: '' })
  }

  const fecharNova = () => {
    setNovaCategoriaVisible(false)
    setFormNovaData({ nome: '', ordem: '' })
  }

  const handleChangeNova = (e) => {
    const { name, value } = e.target
    setFormNovaData((prev) => ({ ...prev, [name]: value }))
  }

  const salvarNova = async () => {
    try {
      await axios.post('http://localhost:8080/categoriaItem', formNovaData)
      fecharNova()
      buscarCategorias()
    } catch (error) {
      console.error('Erro ao criar categoria:', error)
    }
  }

  // -------------------- EXCLUIR ------------------
  const [excluirId, setExcluirId] = useState(null)

  const abrirExcluir = (id) => {
    setExcluirId(id)
  }

  const fecharExcluir = () => {
    setExcluirId(null)
  }

  const confirmarExcluir = async () => {
    try {
      await axios.delete(`http://localhost:8080/categoriaItem/${excluirId}`)
      setCategorias((prev) => prev.filter((cat) => cat.id !== excluirId))
      fecharExcluir()
    } catch (error) {
      console.error('Erro ao excluir categoria:', error)
    }
  }

  return (
    <>
      <CRow>
        <CCol xs={12}>
          <CCard className="mb-4">
            <CCardHeader className="d-flex justify-content-between align-items-center">
              <strong>Lista de Categorias</strong>
              <CButton color="primary" onClick={abrirNova}>
                <CIcon icon={cilPlus} className="me-2" />
                Nova Categoria
              </CButton>
            </CCardHeader>
            <CCardBody>
              <CTable striped responsive>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell style={{ width: 80 }}>ID</CTableHeaderCell>
                    <CTableHeaderCell>Nome</CTableHeaderCell>
                    <CTableHeaderCell>Ordem</CTableHeaderCell>
                    <CTableHeaderCell style={{ width: 160 }} className="text-center">
                      Ações
                    </CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {categorias.map((categoria) => (
                    <CTableRow key={categoria.id}>
                      <CTableDataCell>{categoria.id}</CTableDataCell>
                      <CTableDataCell>{categoria.nome}</CTableDataCell>
                      <CTableDataCell>{categoria.ordem}</CTableDataCell>
                      <CTableDataCell className="text-center">
                        <div className="d-flex justify-content-center gap-3">
                          <CButton
                            color="info"
                            size="sm"
                            variant="outline"
                            onClick={() => abrirEditar(categoria)}
                            style={{
                              borderRadius: '8px',
                              display: 'flex',
                              flexDirection: 'column',
                              alignItems: 'center',
                            }}
                          >
                            <CIcon icon={cilPencil} />
                            <div style={{ fontSize: '0.75rem' }}>Editar</div>
                          </CButton>
                          <CButton
                            color="danger"
                            size="sm"
                            variant="outline"
                            onClick={() => abrirExcluir(categoria.id)}
                            style={{
                              borderRadius: '8px',
                              display: 'flex',
                              flexDirection: 'column',
                              alignItems: 'center',
                            }}
                          >
                            <CIcon icon={cilTrash} />
                            <div style={{ fontSize: '0.75rem' }}>Excluir</div>
                          </CButton>
                        </div>
                      </CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

      {/* Modal/ Card Flutuante para Editar */}
      <CModal
        visible={!!editandoCategoria}
        onClose={fecharEditar}
        backdrop="static"
        size="sm"
        alignment="center"
      >
        <CModalHeader>
          <strong>Editar Categoria</strong>
        </CModalHeader>
        <CModalBody>
          <CFormInput
            label="Nome"
            name="nome"
            value={formData.nome}
            onChange={handleChangeEdit}
            className="mb-3"
          />
          <CFormInput
            label="Ordem"
            name="ordem"
            type="number"
            value={formData.ordem}
            onChange={handleChangeEdit}
          />
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={fecharEditar}>
            Cancelar
          </CButton>
          <CButton color="success" onClick={salvarEdicao}>
            Salvar
          </CButton>
        </CModalFooter>
      </CModal>

      {/* Modal/ Card Flutuante para Nova Categoria */}
      <CModal
        visible={novaCategoriaVisible}
        onClose={fecharNova}
        backdrop="static"
        size="sm"
        alignment="center"
      >
        <CModalHeader>
          <strong>Nova Categoria</strong>
        </CModalHeader>
        <CModalBody>
          <CFormInput
            label="Nome"
            name="nome"
            value={formNovaData.nome}
            onChange={handleChangeNova}
            className="mb-3"
          />
          <CFormInput
            label="Ordem"
            name="ordem"
            type="number"
            value={formNovaData.ordem}
            onChange={handleChangeNova}
          />
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={fecharNova}>
            Cancelar
          </CButton>
          <CButton color="success" onClick={salvarNova}>
            Criar
          </CButton>
        </CModalFooter>
      </CModal>

      {/* Modal para confirmar exclusão */}
      <CModal visible={!!excluirId} onClose={fecharExcluir} backdrop="static" alignment="center">
        <CModalHeader>
          <strong>Confirmar exclusão</strong>
        </CModalHeader>
        <CModalBody>Tem certeza que deseja excluir esta categoria?</CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={fecharExcluir}>
            Cancelar
          </CButton>
          <CButton color="danger" onClick={confirmarExcluir}>
            Excluir
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}

export default CategoriaList
