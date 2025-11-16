// src/views/ItemCardapio/CadastroItemCardapio.jsx

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

const CadastroItemCardapio = () => {
  const [form, setForm] = useState({
    nome: '',
    descricao: '',
    descricaoCurta: '',
    preco: '',
    disponivel: true,
    exibirNoAutoatendimento: true,
    tempoPreparoEstimado: '',
    limitePorPedido: '',
  })

  const [mensagem, setMensagem] = useState(null)
  const [erro, setErro] = useState(null)

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setForm({
      ...form,
      [name]: type === 'checkbox' ? checked : value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Validação simples
    if (!form.nome || !form.descricaoCurta || !form.preco) {
      setErro('Preencha ao menos: Nome, Descrição Curta e Preço.')
      setMensagem(null)
      return
    }

    try {
      const token = localStorage.getItem('token')

      await axios.post(
        'http://localhost:8080/item-cardapio',
        {
          ...form,
          preco: parseFloat(form.preco),
          tempoPreparoEstimado: parseInt(form.tempoPreparoEstimado || 0),
          limitePorPedido: parseInt(form.limitePorPedido || 0),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )

      setMensagem('Item do cardápio cadastrado com sucesso! ✅')
      setErro(null)

      // Limpar campos
      setForm({
        nome: '',
        descricao: '',
        descricaoCurta: '',
        preco: '',
        disponivel: true,
        exibirNoAutoatendimento: true,
        tempoPreparoEstimado: '',
        limitePorPedido: '',
      })
    } catch (error) {
      console.error(error)
      setErro('Erro ao cadastrar item. Veja o console.')
      setMensagem(null)
    }
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Cadastro de Item do Cardápio</strong>
          </CCardHeader>

          <CCardBody>
            <CForm onSubmit={handleSubmit}>
              {mensagem && <CAlert color="success">{mensagem}</CAlert>}
              {erro && <CAlert color="danger">{erro}</CAlert>}

              {/* Nome */}
              <div className="mb-3">
                <CFormLabel htmlFor="nome">Nome</CFormLabel>
                <CFormInput
                  type="text"
                  id="nome"
                  name="nome"
                  placeholder="Ex: Hambúrguer Artesanal"
                  value={form.nome}
                  onChange={handleChange}
                />
              </div>

              {/* Descrição Curta */}
              <div className="mb-3">
                <CFormLabel htmlFor="descricaoCurta">Descrição Curta</CFormLabel>
                <CFormInput
                  type="text"
                  id="descricaoCurta"
                  name="descricaoCurta"
                  placeholder="Ex: Hambúrguer com queijo e bacon"
                  value={form.descricaoCurta}
                  onChange={handleChange}
                />
              </div>

              {/* Descrição Completa */}
              <div className="mb-3">
                <CFormLabel htmlFor="descricao">Descrição Completa</CFormLabel>
                <CFormTextarea
                  id="descricao"
                  name="descricao"
                  rows={4}
                  placeholder="Descreva o prato de forma detalhada..."
                  value={form.descricao}
                  onChange={handleChange}
                />
              </div>

              {/* Preço */}
              <div className="mb-3">
                <CFormLabel htmlFor="preco">Preço</CFormLabel>
                <CFormInput
                  type="number"
                  id="preco"
                  name="preco"
                  step="0.01"
                  placeholder="Ex: 29.90"
                  value={form.preco}
                  onChange={handleChange}
                />
              </div>

              {/* Disponível / Autoatendimento */}
              <div className="mb-3">
                <CFormCheck
                  id="disponivel"
                  name="disponivel"
                  checked={form.disponivel}
                  onChange={handleChange}
                  label="Disponível para venda"
                />
              </div>

              <div className="mb-3">
                <CFormCheck
                  id="exibirNoAutoatendimento"
                  name="exibirNoAutoatendimento"
                  checked={form.exibirNoAutoatendimento}
                  onChange={handleChange}
                  label="Exibir no autoatendimento"
                />
              </div>

              {/* Tempo de preparo */}
              <div className="mb-3">
                <CFormLabel htmlFor="tempoPreparoEstimado">
                  Tempo de preparo estimado (minutos)
                </CFormLabel>
                <CFormInput
                  type="number"
                  id="tempoPreparoEstimado"
                  name="tempoPreparoEstimado"
                  placeholder="Ex: 15"
                  value={form.tempoPreparoEstimado}
                  onChange={handleChange}
                />
              </div>

              {/* Limite por pedido */}
              <div className="mb-3">
                <CFormLabel htmlFor="limitePorPedido">Limite por pedido</CFormLabel>
                <CFormInput
                  type="number"
                  id="limitePorPedido"
                  name="limitePorPedido"
                  placeholder="Ex: 3"
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

export default CadastroItemCardapio
