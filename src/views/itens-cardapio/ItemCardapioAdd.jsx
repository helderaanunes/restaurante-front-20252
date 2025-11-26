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
  CFormTextarea,
  CFormCheck,
  CRow,
  CAlert,
} from '@coreui/react'
import axios from 'axios'

const CATEGORIAS = [
  "Pizzas",
  "Bebidas",
  "Lanches",
  "Sobremesas",
  "Pratos Principais",
];

export default function ItemCardapioAdd() {
  const [form, setForm] = useState({
    nome: '',
    descricao: '',
    descricaoCurta: '',
    preco: '',
    categoria: '',
    disponivel: true,
    exibirNoAutoatendimento: true,
    tempoPreparoEstimado: '',
    limitePorPedido: '',
  })

  const [mensagem, setMensagem] = useState(null)
  const [erro, setErro] = useState(null)

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!form.nome || !form.descricaoCurta || !form.preco || !form.categoria) {
      setErro('Preencha: Nome, Descrição Curta, Preço e Categoria.')
      setMensagem(null)
      return
    }

    try {
      const token = localStorage.getItem('token')

      if (!token) {
        setErro('Token não encontrado. Faça login novamente.')
        setMensagem(null)
        return
      }

      const precoFloat = parseFloat(form.preco.replace(',', '.')) || 0
      const tempo = parseInt(form.tempoPreparoEstimado || "0")
      const limite = parseInt(form.limitePorPedido || "0")

      const payload = {
        ...form,
        preco: precoFloat,
        tempoPreparoEstimado: tempo,
        limitePorPedido: limite,
      }

      await axios.post('http://localhost:8080/itemCardapio', payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })

      setMensagem('Item cadastrado com sucesso! 🎉')
      setErro(null)

      setForm({
        nome: '',
        descricao: '',
        descricaoCurta: '',
        preco: '',
        categoria: '',
        disponivel: true,
        exibirNoAutoatendimento: true,
        tempoPreparoEstimado: '',
        limitePorPedido: '',
      })
    } catch (error) {
      console.error('Erro no cadastro:', error)

      if (error.response) {
        setErro(error.response.data?.message || 'Erro do servidor.')
      } else {
        setErro('Erro ao conectar com o servidor.')
      }

      setMensagem(null)
    }
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Adicionar Item ao Cardápio</strong>
          </CCardHeader>

          <CCardBody>
            <CForm onSubmit={handleSubmit}>

              {mensagem && <CAlert color="success">{mensagem}</CAlert>}
              {erro && <CAlert color="danger">{erro}</CAlert>}

              <div className="mb-3">
                <CFormLabel>Nome</CFormLabel>
                <CFormInput
                  name="nome"
                  value={form.nome}
                  onChange={handleChange}
                  placeholder="Ex: Hambúrguer Artesanal"
                />
              </div>

              {/* Categoria */}
              <div className="mb-3">
                <CFormLabel>Categoria</CFormLabel>
                <select
                  name="categoria"
                  value={form.categoria}
                  onChange={handleChange}
                  className="form-select"
                >
                  <option value="">Selecione...</option>
                  {CATEGORIAS.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-3">
                <CFormLabel>Descrição Curta</CFormLabel>
                <CFormInput
                  name="descricaoCurta"
                  value={form.descricaoCurta}
                  onChange={handleChange}
                  placeholder="Ex: Hambúrguer com queijo e bacon"
                />
              </div>

              <div className="mb-3">
                <CFormLabel>Descrição Completa</CFormLabel>
                <CFormTextarea
                  name="descricao"
                  rows={4}
                  value={form.descricao}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3">
                <CFormLabel>Preço</CFormLabel>
                <CFormInput
                  name="preco"
                  value={form.preco}
                  onChange={handleChange}
                  placeholder="Ex: 29.90"
                />
              </div>

              <CFormCheck
                id="disponivel"
                name="disponivel"
                label="Disponível"
                checked={form.disponivel}
                onChange={handleChange}
              />

              <CFormCheck
                id="exibirNoAutoatendimento"
                name="exibirNoAutoatendimento"
                label="Exibir no autoatendimento"
                checked={form.exibirNoAutoatendimento}
                onChange={handleChange}
              />

              <div className="mb-3 mt-2">
                <CFormLabel>Tempo de Preparo (min)</CFormLabel>
                <CFormInput
                  type="number"
                  name="tempoPreparoEstimado"
                  value={form.tempoPreparoEstimado}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3">
                <CFormLabel>Limite por Pedido</CFormLabel>
                <CFormInput
                  type="number"
                  name="limitePorPedido"
                  value={form.limitePorPedido}
                  onChange={handleChange}
                />
              </div>

              <CButton type="submit" color="primary">
                Cadastrar Item
              </CButton>

            </CForm>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}
