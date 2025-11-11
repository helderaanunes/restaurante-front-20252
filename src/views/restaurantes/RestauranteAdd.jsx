// src/views/Restaurante/CadastroRestaurante.jsx

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
  CRow,
  CAlert,
} from '@coreui/react'
import axios from 'axios'

// Função validarCNPJ fica aqui, fora do componente
function validarCNPJ(cnpj) {
  cnpj = cnpj.replace(/[^\d]+/g, '') // Remove tudo que não for número

  if (cnpj.length !== 14) return false

  // Elimina alguns CNPJs inválidos conhecidos
  if (/^(\d)\1+$/.test(cnpj)) return false

  // Validação do dígito verificador
  let tamanho = cnpj.length - 2
  let numeros = cnpj.substring(0, tamanho)
  let digitos = cnpj.substring(tamanho)
  let soma = 0
  let pos = tamanho - 7

  for (let i = tamanho; i >= 1; i--) {
    soma += numeros.charAt(tamanho - i) * pos--
    if (pos < 2) pos = 9
  }

  let resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11)
  if (resultado != digitos.charAt(0)) return false

  tamanho = tamanho + 1
  numeros = cnpj.substring(0, tamanho)
  soma = 0
  pos = tamanho - 7

  for (let i = tamanho; i >= 1; i--) {
    soma += numeros.charAt(tamanho - i) * pos--
    if (pos < 2) pos = 9
  }

  resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11)
  if (resultado != digitos.charAt(1)) return false

  return true
}

const CadastroRestaurante = () => {
  const [nome, setNome] = useState('')
  const [cnpj, setCnpj] = useState('')
  const [mensagem, setMensagem] = useState(null)
  const [erro, setErro] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Validação simples
    if (!nome || !cnpj) {
      setErro('Preencha todos os campos.')
      setMensagem(null)
      return
    }

    if (!validarCNPJ(cnpj)) {
      setErro('CNPJ inválido.')
      setMensagem(null)
      return
    }

    try {
      const token = localStorage.getItem('token') // 🔑 recupera o token salvo

  const response = await axios.post(
    'http://localhost:8080/restaurante',
    { nome, cnpj },
    {
      headers: {
        Authorization: `Bearer ${token}`, // 👈 envia o token no cabeçalho
      },
    }
  );
      console.log(response)
      setMensagem('Restaurante cadastrado com sucesso! ✅')
      setErro(null)
      setNome('')
      setCnpj('')
    } catch (err) {
      console.error(err)
      setErro('Erro ao cadastrar restaurante.')
      setMensagem(null)
    }
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Cadastro de Restaurante</strong>
          </CCardHeader>
          <CCardBody>
            <CForm onSubmit={handleSubmit}>
              {mensagem && <CAlert color="success">{mensagem}</CAlert>}
              {erro && <CAlert color="danger">{erro}</CAlert>}

              <div className="mb-3">
                <CFormLabel htmlFor="nome">Nome do Restaurante</CFormLabel>
                <CFormInput
                  type="text"
                  id="nome"
                  placeholder="Ex: Restaurante Sabor & Arte"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <CFormLabel htmlFor="cnpj">CNPJ</CFormLabel>
                <CFormInput
                  type="text"
                  id="cnpj"
                  placeholder="Ex: 00.000.000/0001-00"
                  value={cnpj}
                  onChange={(e) => setCnpj(e.target.value)}
                />
              </div>

              <CButton type="submit" color="primary">
                Cadastrar
              </CButton>
            </CForm>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default CadastroRestaurante
