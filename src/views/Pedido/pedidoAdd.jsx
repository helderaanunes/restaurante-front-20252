import React, { useEffect, useState } from "react";
import {
  CRow,
  CCol,
  CCard,
  CCardBody,
  CCardHeader,
  CForm,
  CFormInput,
  CButton,
  CFormSelect,
} from "@coreui/react";
import axios from "axios";

import { useNavigate } from "react-router-dom"

export default function AdicionarPedido() {
    const navigate = useNavigate()
    const [tipoAtendimento, setTipoAtendimento] = useState("");
    const [origem, setOrigem] = useState("");
    const [itens, setItens] = useState([{ name: "", quantity: 1 }]);
    const [message, setMessage] = useState("");

    const adicionarItem = () => {
        setItens([...itens, { name: "", quantity: 1 }]);
  };

  const atualizarItem = (index, campo, valor) => {
    const copia = [...itens];
    copia[index][campo] = valor;
    setItens(copia);
  };

  const enviarPedido = async (e) => {
    e.preventDefault();
    try {
      const pedido = {
        tipoAtendimento,
        origem,
        itens,
        statusPedido: "PENDING",
      };

      await axios.post("http://localhost:8080/api/orders", pedido);navigate("/cozinha");
      setMessage("Pedido criado com sucesso!");
      setTipoAtendimento("");
      setOrigem("");
      setItens([{ name: "", quantity: 1 }]);
    } catch (error) {
      console.error(error);
      setMessage("Erro ao criar pedido.");
    }
  };

  return (
    <CRow>
      <CCol xs={12} md={8}>
        <CCard className="mb-4 shadow-sm">
          <CCardHeader>
            <strong style={{ fontSize: "1.8rem" }}>Adicionar Pedido</strong>
          </CCardHeader>
          <CCardBody>
            <CForm onSubmit={enviarPedido}>
              <div className="mb-3">
                <label className="form-label">Tipo de Atendimento</label>
                <CFormSelect
                  value={tipoAtendimento}
                  onChange={(e) => setTipoAtendimento(e.target.value)}
                  required
                >
                  <option value="">Selecione...</option>
                  <option value="Mesa">Mesa</option>
                  <option value="Balcão">Balcão</option>
                  <option value="Entrega">Entrega</option>
                </CFormSelect>
              </div>

              <div className="mb-3">
                <label className="form-label">Origem</label>
                <CFormInput
                  value={origem}
                  onChange={(e) => setOrigem(e.target.value)}
                  placeholder="Ex: Aplicativo, Caixa 1, Mesa 4..."
                  required
                />
              </div>

              <h4>Itens</h4>
              {itens.map((item, index) => (
                <div
                  key={index}
                  className="d-flex gap-3 align-items-center mb-2"
                >
                  <CFormInput
                    placeholder="Nome do item"
                    value={item.name}
                    onChange={(e) => atualizarItem(index, "name", e.target.value)}
                    required
                  />
                  <CFormInput
                    type="number"
                    min="1"
                    style={{ width: "120px" }}
                    value={item.quantity}
                    onChange={(e) => atualizarItem(index, "quantity", e.target.value)}
                    required
                  />
                </div>
              ))}

              <CButton color="secondary" onClick={adicionarItem} className="mb-3">
                + Adicionar Item
              </CButton>

              <br />
              <CButton type="submit" color="primary">
                Criar Pedido
              </CButton>
            </CForm>

            {message && <p className="mt-3">{message}</p>}
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
}
