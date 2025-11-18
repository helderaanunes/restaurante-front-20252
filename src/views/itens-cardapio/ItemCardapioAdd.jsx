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
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
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

      if (!token) {
        // opcional: tratar token ausente
        setErro('Token não encontrado. Faça login novamente.')
        setMensagem(null)
        return
      }

      // preparar payload convertendo valores numéricos com fallback seguro
      const precoFloat = (() => {
        if (typeof form.preco === 'number') return form.preco
        const s = (form.preco || '').toString().trim()
        if (s === '') return 0
        return parseFloat(s.replace(',', '.')) || 0
      })()

      const tempo = Number.isFinite(Number(form.tempoPreparoEstimado))
        ? parseInt(form.tempoPreparoEstimado, 10)
        : 0

      const limite = Number.isFinite(Number(form.limitePorPedido))
        ? parseInt(form.limitePorPedido, 10)
        : 0

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
        timeout: 10000, // opcional: timeout de 10s
      })

      setMensagem('Item do cardápio cadastrado com sucesso! ✅')
      setErro(null)

      // Resetar form
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
      // tratamento robusto de erro Axios
      console.error('Erro no cadastro:', error)

      if (error.response) {
        // servidor respondeu com status != 2xx
        const serverMessage =
          error.response.data?.message ||
          error.response.data ||
          `Erro do servidor (status ${error.response.status})`
        setErro(serverMessage)
      } else if (error.request) {
        // requisição feita mas sem resposta (ex: backend não rodando)
        setErro(
          'Sem resposta do servidor. Verifique se o backend está rodando em http://localhost:8080 e a porta está correta.'
        )
      } else {
        // outro erro (config, criação do request, etc)
        setErro(error.message || 'Erro ao cadastrar item.')
      }

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
                  type="text"
                  id="preco"
                  name="preco"
                  placeholder="Ex: 29.90"
                  value={form.preco}
                  onChange={handleChange}
                />
              </div>

              {/* Disponível */}
              <div className="mb-3">
                <CFormCheck
                  id="disponivel"
                  name="disponivel"
                  checked={form.disponivel}
                  onChange={handleChange}
                  label="Disponível para venda"
                />
              </div>

              {/* Autoatendimento */}
              <div className="mb-3">
                <CFormCheck
                  id="exibirNoAutoatendimento"
                  name="exibirNoAutoatendimento"
                  checked={form.exibirNoAutoatendimento}
                  onChange={handleChange}
                  label="Exibir no autoatendimento"
                />
              </div>

              {/* Tempo */}
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

              {/* Limite */}
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
