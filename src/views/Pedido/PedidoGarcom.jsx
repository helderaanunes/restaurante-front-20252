// src/views/Pedidos/RealizarPedidoMobile.jsx

import React, { useEffect, useState } from "react";
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CRow,
  CSpinner,
  CAlert,
  CListGroup,
  CListGroupItem,
} from "@coreui/react";
import axios from "axios";

const CATEGORIAS = [
  "Pizzas",
  "Bebidas",
  "Lanches",
  "Sobremesas",
  "Pratos Principais",
];

const RealizarPedidoMobile = () => {
  const [cardapio, setCardapio] = useState([]);
  const [categoriaAtiva, setCategoriaAtiva] = useState("Pizzas");
  const [pedidoItens, setPedidoItens] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mensagem, setMensagem] = useState("");
  const [erro, setErro] = useState("");

  // Buscar itens do cardápio
  useEffect(() => {
    const fetchCardapio = async () => {
      try {
        const response = await axios.get("http://localhost:8080/itemCardapio");
        setCardapio(response.data);
      } catch (err) {
        setErro("Erro ao carregar o cardápio!");
      } finally {
        setLoading(false);
      }
    };

    fetchCardapio();
  }, []);

  // Filtrar itens pela categoria ativa
  const itensFiltrados = cardapio.filter(
    (item) => item.categoria === categoriaAtiva
  );

  // Adicionar item ao pedido
  const adicionarItem = (item) => {
    setPedidoItens((prev) => {
      const existente = prev.find((i) => i.id === item.id);

      if (existente) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, qtd: i.qtd + 1 } : i
        );
      }

      return [...prev, { ...item, qtd: 1 }];
    });
  };

  // Alterar quantidade (+ / –)
  const alterarQuantidade = (id, delta) => {
    setPedidoItens((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, qtd: Math.max(1, item.qtd + delta) } : item
        )
        .filter((item) => item.qtd > 0)
    );
  };

  // Subtotal
  const subtotal = pedidoItens
    .reduce((soma, item) => soma + item.preco * item.qtd, 0)
    .toFixed(2);

  // Enviar pedido ao backend
  const enviarPedido = async () => {
    try {
      const pedido = {
        tipoAtendimento: "MESA",
        origem: "Garçom Mobile",
        statusPedido: "PENDING",
        subtotal: subtotal,
        total: subtotal,
      };

      const response = await axios.post("http://localhost:8080/pedidos", pedido);

      setMensagem("Pedido enviado com sucesso!");
      setErro("");
      setPedidoItens([]);

      console.log("Pedido salvo:", response.data);
    } catch (err) {
      setErro("Erro ao enviar o pedido!");
      setMensagem("");
    }
  };

  if (loading) {
    return (
      <div className="text-center mt-4">
        <CSpinner color="primary" />
      </div>
    );
  }

  return (
    <CRow>
      <CCol xs={12}>
        <h3 className="mb-3 text-center">🍽 Fazer Pedido</h3>

        {mensagem && <CAlert color="success">{mensagem}</CAlert>}
        {erro && <CAlert color="danger">{erro}</CAlert>}

        {/* Categorias */}
        <div
          style={{
            display: "flex",
            gap: 10,
            overflowX: "auto",
            paddingBottom: 10,
            marginBottom: 15,
          }}
        >
          {CATEGORIAS.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoriaAtiva(cat)}
              style={{
                padding: "12px 16px",
                borderRadius: 8,
                border: "none",
                fontSize: 16,
                cursor: "pointer",
                background: cat === categoriaAtiva ? "#007bff" : "#e0e0e0",
                color: cat === categoriaAtiva ? "white" : "black",
                whiteSpace: "nowrap",
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        <h5>Itens da categoria: {categoriaAtiva}</h5>

        <div
          style={{
            display: "grid",
            gap: "10px",
            gridTemplateColumns: "repeat(2, 1fr)",
          }}
        >
          {itensFiltrados.length === 0 && (
            <p style={{ gridColumn: "1 / -1", color: "#888" }}>
              Nenhum item nesta categoria.
            </p>
          )}

          {itensFiltrados.map((item) => (
            <CCard
              key={item.id}
              style={{
                padding: "10px",
                textAlign: "center",
                backgroundColor: "#f7f7f7",
                borderRadius: "12px",
                cursor: "pointer",
              }}
              onClick={() => adicionarItem(item)}
            >
              <CCardBody style={{ padding: "5px" }}>
                <strong>{item.nome}</strong>
                <p style={{ margin: 0 }}>R$ {item.preco.toFixed(2)}</p>
              </CCardBody>
            </CCard>
          ))}
        </div>

        <hr />

        <h5>Itens do Pedido</h5>

        {pedidoItens.length === 0 ? (
          <p>Nenhum item adicionado.</p>
        ) : (
          <CListGroup>
            {pedidoItens.map((item) => (
              <CListGroupItem
                key={item.id}
                className="d-flex justify-content-between align-items-center"
              >
                <div style={{ flex: 1 }}>
                  <strong>{item.nome}</strong>
                  <p style={{ margin: 0, fontSize: "14px" }}>
                    R$ {item.preco.toFixed(2)} cada
                  </p>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <CButton
                    color="danger"
                    size="sm"
                    style={{ borderRadius: "50%", width: "36px", height: "36px" }}
                    onClick={() => alterarQuantidade(item.id, -1)}
                  >
                    –
                  </CButton>

                  <span style={{ fontSize: "18px", minWidth: "24px", textAlign: "center" }}>
                    {item.qtd}
                  </span>

                  <CButton
                    color="success"
                    size="sm"
                    style={{ borderRadius: "50%", width: "36px", height: "36px" }}
                    onClick={() => alterarQuantidade(item.id, +1)}
                  >
                    +
                  </CButton>
                </div>

                <strong style={{ marginLeft: "15px", width: "80px", textAlign: "right" }}>
                  R$ {(item.preco * item.qtd).toFixed(2)}
                </strong>
              </CListGroupItem>
            ))}
          </CListGroup>
        )}

        <h4 className="mt-3">Total: R$ {subtotal}</h4>

        <CButton
          color="success"
          className="w-100 mt-3"
          size="lg"
          onClick={enviarPedido}
          disabled={pedidoItens.length === 0}
        >
          Enviar Pedido
        </CButton>
      </CCol>
    </CRow>
  );
};

export default RealizarPedidoMobile;
