import React, { useState } from 'react'
import axios from 'axios'
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
} from '@coreui/react'

const CategoriaForm = () => {
  const [nome, setNome] = useState('')
  const [ordem, setOrdem] = useState('')
  const [mensagem, setMensagem] = useState('')
  const [erro, setErro] = useState(false) // para diferenciar mensagem de erro/sucesso

  const handleSubmit = async (e) => {
    e.preventDefault()
    setMensagem('')
    setErro(false)

    // Validação simples no frontend (opcional)
    if (!nome.trim()) {
      setMensagem('O nome da categoria é obrigatório.')
      setErro(true)
      return
    }
    if (!ordem || isNaN(ordem)) {
      setMensagem('Informe uma ordem válida.')
      setErro(true)
      return
    }

    try {
      const response = await axios.post('http://localhost:8080/categoriaItem', {
        nome: nome.trim(),
        ordem: parseInt(ordem, 10),
      })
      setMensagem(`Categoria "${response.data.nome}" cadastrada com sucesso!`)
      setErro(false)
      setNome('')
      setOrdem('')
    } catch (error) {
      console.error(error)
      setMensagem('Erro ao cadastrar categoria. Verifique os dados e tente novamente.')
      setErro(true)
    }
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Cadastro de Categoria</strong>
          </CCardHeader>
          <CCardBody>
            <CForm onSubmit={handleSubmit}>
              <div className="mb-3">
                <CFormLabel htmlFor="nomeCategoria">Nome da Categoria</CFormLabel>
                <CFormInput
                  type="text"
                  id="nomeCategoria"
                  placeholder="Ex: Bebidas"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="ordemCategoria">Ordem</CFormLabel>
                <CFormInput
                  type="number"
                  id="ordemCategoria"
                  placeholder="Ex: 1"
                  value={ordem}
                  onChange={(e) => setOrdem(e.target.value)}
                  required
                />
              </div>
              <CButton type="submit" color="primary">
                Cadastrar Categoria
              </CButton>
              {mensagem && (
                <p className={`mt-3 ${erro ? 'text-danger' : 'text-success'}`}>{mensagem}</p>
              )}
            </CForm>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default CategoriaForm
