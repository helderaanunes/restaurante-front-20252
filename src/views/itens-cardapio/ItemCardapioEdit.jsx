// src/views/ItemCardapio/ItemCardapioEdit.jsx

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
  CFormTextarea,
  CFormCheck,
  CRow,
  CAlert,
  CSpinner,
} from '@coreui/react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'

const ItemCardapioEdit = () => {
  const navigate = useNavigate()
  const { id } = useParams()

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

  const [loading, setLoading] = useState(true)
  const [salvando, setSalvando] = useState(false)
  const [erro, setErro] = useState('')
  const [ok, setOk] = useState('')

  // 🔹 Buscar item pelo ID
  useEffect(() => {
    const fetchItem = async () => {
      try {
        const { data } = await axios.get(`http://localhost:8080/item-cardapio/${id}`)

        setForm({
          nome: data.nome || '',
          descricao: data.descricao || '',
          descricaoCurta: data.descricaoCurta || '',
          preco: data.preco?.toString() || '',
          disponivel: data.disponivel ?? true,
          exibirNoAutoatendimento: data.exibirNoAutoatendimento ?? true,
          tempoPreparoEstimado: data.tempoPreparoEstimado?.toString() || '',
          limitePorPedido: data.limitePorPedido?.toString() || '',
        })
      } catch (err) {
        const msg =
          err?.response?.data?.message ||
          err.message ||
          'Erro ao carregar o item do cardápio.'
        setErro(msg)
      } finally {
        setLoading(false)
      }
    }

    fetchItem()
  }, [id])

  const onChange = (e) => {
    const { name, value, type, checked } = e.target

    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  // 🔹 Validação simples
  const validar = () => {
    if (!form.nome) return 'Informe o nome.'
    if (!form.descricaoCurta) return 'Informe a descrição curta.'
    if (!form.preco) return 'Informe o preço.'
    return ''
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    setErro('')
    setOk('')

    const msg = validar()
    if (msg) return setErro(msg)

    const payload = {
      nome: form.nome,
      descricao: form.descricao,
      descricaoCurta: form.descricaoCurta,
      preco: parseFloat(form.preco),
      disponivel: form.disponivel,
      exibirNoAutoatendimento: form.exibirNoAutoatendimento,
      tempoPreparoEstimado: parseInt(form.tempoPreparoEstimado || 0),
      limitePorPedido: parseInt(form.limitePorPedido || 0),
    }

    try {
      setSalvando(true)
      await axios.put(`http://localhost:8080/item-cardapio/${id}`, payload)

      setOk('Item atualizado com sucesso!')
      setTimeout(() => navigate('/item-cardapio'), 800)
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

  const onCancel = () => navigate('/item-cardapio')

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Editar Item do Cardápio #{id}</strong>
          </CCardHeader>

          <CCardBody>
            {erro && <CAlert color="danger">{erro}</CAlert>}
            {ok && <CAlert color="success">{ok}</CAlert>}

            {loading ? (
              <div className="d-flex align-items-center">
                <CSpinner size="sm" className="me-2" /> Carregando dados...
              </div>
            ) : (
              <CForm onSubmit={onSubmit}>
                {/* Nome */}
                <div className="mb-3">
                  <CFormLabel htmlFor="nome">Nome</CFormLabel>
                  <CFormInput
                    id="nome"
                    name="nome"
                    type="text"
                    value={form.nome}
                    onChange={onChange}
                    placeholder="Nome do item"
                    required
                  />
                </div>

                {/* Descrição curta */}
                <div className="mb-3">
                  <CFormLabel htmlFor="descricaoCurta">Descrição Curta</CFormLabel>
                  <CFormInput
                    id="descricaoCurta"
                    name="descricaoCurta"
                    type="text"
                    value={form.descricaoCurta}
                    onChange={onChange}
                    placeholder="Resumo do item"
                    required
                  />
                </div>

                {/* Descrição completa */}
                <div className="mb-3">
                  <CFormLabel htmlFor="descricao">Descrição Completa</CFormLabel>
                  <CFormTextarea
                    id="descricao"
                    name="descricao"
                    rows={4}
                    value={form.descricao}
                    onChange={onChange}
                    placeholder="Descrição detalhada"
                  />
                </div>

                {/* Preço */}
                <div className="mb-3">
                  <CFormLabel htmlFor="preco">Preço</CFormLabel>
                  <CFormInput
                    id="preco"
                    name="preco"
                    type="number"
                    step="0.01"
                    value={form.preco}
                    onChange={onChange}
                    placeholder="Ex: 29.90"
                    required
                  />
                </div>

                {/* Disponível */}
                <div className="mb-3">
                  <CFormCheck
                    id="disponivel"
                    name="disponivel"
                    label="Disponível"
                    checked={form.disponivel}
                    onChange={onChange}
                  />
                </div>

                {/* Autoatendimento */}
                <div className="mb-3">
                  <CFormCheck
                    id="exibirNoAutoatendimento"
                    name="exibirNoAutoatendimento"
                    label="Exibir no autoatendimento"
                    checked={form.exibirNoAutoatendimento}
                    onChange={onChange}
                  />
                </div>

                {/* Tempo de preparo */}
                <div className="mb-3">
                  <CFormLabel htmlFor="tempoPreparoEstimado">
                    Tempo de preparo estimado (min)
                  </CFormLabel>
                  <CFormInput
                    id="tempoPreparoEstimado"
                    name="tempoPreparoEstimado"
                    type="number"
                    value={form.tempoPreparoEstimado}
                    onChange={onChange}
                    placeholder="Ex: 15"
                  />
                </div>

                {/* Limite por pedido */}
                <div className="mb-3">
                  <CFormLabel htmlFor="limitePorPedido">Limite por pedido</CFormLabel>
                  <CFormInput
                    id="limitePorPedido"
                    name="limitePorPedido"
                    type="number"
                    value={form.limitePorPedido}
                    onChange={onChange}
                    placeholder="Ex: 3"
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

export default ItemCardapioEdit
