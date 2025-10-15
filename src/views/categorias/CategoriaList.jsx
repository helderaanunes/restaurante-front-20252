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
  CButtonGroup,
} from '@coreui/react'

const CategoriaList = () => {
  const [categorias, setCategorias] = useState([])
  const [editandoId, setEditandoId] = useState(null)
  const [formData, setFormData] = useState({ nome: '', ordem: '' })

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

  const handleEditClick = (categoria) => {
    setEditandoId(categoria.id)
    setFormData({ nome: categoria.nome, ordem: categoria.ordem })
  }

  const handleCancelEdit = () => {
    setEditandoId(null)
    setFormData({ nome: '', ordem: '' })
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevData) => ({ ...prevData, [name]: value }))
  }

  const handleSave = async (id) => {
    try {
      const categoriaAtualizada = {
        id,
        nome: formData.nome,
        ordem: formData.ordem,
      }

      await axios.put('http://localhost:8080/categoriaItem', categoriaAtualizada)
      setEditandoId(null)
      buscarCategorias()
    } catch (error) {
      console.error('Erro ao salvar categoria:', error)
    }
  }

  const handleDelete = async (id) => {
    const confirmar = window.confirm('Tem certeza que deseja excluir esta categoria?')
    if (!confirmar) return

    try {
      await axios.delete(`http://localhost:8080/categoriaItem/${id}`)
      setCategorias((prev) => prev.filter((cat) => cat.id !== id))
    } catch (error) {
      console.error('Erro ao excluir categoria:', error)
    }
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Lista de Categorias</strong>
          </CCardHeader>
          <CCardBody>
            <CTable striped responsive>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell>ID</CTableHeaderCell>
                  <CTableHeaderCell>Nome</CTableHeaderCell>
                  <CTableHeaderCell>Ordem</CTableHeaderCell>
                  <CTableHeaderCell>Ações</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {categorias.map((categoria) => (
                  <CTableRow key={categoria.id}>
                    <CTableDataCell>{categoria.id}</CTableDataCell>

                    <CTableDataCell>
                      {editandoId === categoria.id ? (
                        <CFormInput
                          name="nome"
                          value={formData.nome}
                          onChange={handleChange}
                          size="sm"
                        />
                      ) : (
                        categoria.nome
                      )}
                    </CTableDataCell>

                    <CTableDataCell>
                      {editandoId === categoria.id ? (
                        <CFormInput
                          name="ordem"
                          value={formData.ordem}
                          onChange={handleChange}
                          type="number"
                          size="sm"
                        />
                      ) : (
                        categoria.ordem
                      )}
                    </CTableDataCell>

                    <CTableDataCell>
                      {editandoId === categoria.id ? (
                        <CButtonGroup>
                          <CButton
                            color="success"
                            size="sm"
                            onClick={() => handleSave(categoria.id)}
                          >
                            Salvar
                          </CButton>
                          <CButton color="secondary" size="sm" onClick={handleCancelEdit}>
                            Cancelar
                          </CButton>
                        </CButtonGroup>
                      ) : (
                        <CButtonGroup>
                          <CButton
                            color="primary"
                            size="sm"
                            onClick={() => handleEditClick(categoria)}
                          >
                            Editar
                          </CButton>
                          <CButton
                            color="danger"
                            size="sm"
                            onClick={() => handleDelete(categoria.id)}
                          >
                            Excluir
                          </CButton>
                        </CButtonGroup>
                      )}
                    </CTableDataCell>
                  </CTableRow>
                ))}
              </CTableBody>
            </CTable>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default CategoriaList
