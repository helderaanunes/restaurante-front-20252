import React, { useEffect, useState } from "react"
import {
  CRow,
  CCol,
  CCard,
  CCardBody,
  CCardHeader,
  CSpinner,
} from "@coreui/react"
import axios from "axios"

const PedidoCozinha = () => {
  const [pendentes, setPendentes] = useState([])
  const [concluidos, setConcluidos] = useState([])
  const [loading, setLoading] = useState(true)

  const carregar = async () => {
    try {
      const p = await axios.get("http://localhost:8080/api/orders/pending")
      const c = await axios.get("http://localhost:8080/api/orders/completed")
      setPendentes(p.data)
      setConcluidos(c.data)
    } catch (error) {
      console.error("Erro ao carregar pedidos:", error)
    } finally {
      setLoading(false)
    }
  }

  // Ao clicar, marca como concluído
  const concluirPedido = async (id) => {
    try {
      await axios.put(`http://localhost:8080/api/orders/${id}/complete`)
      carregar()
    } catch (error) {
      console.error("Erro ao concluir pedido:", error)
    }
  }

  useEffect(() => {
    carregar()
    const polling = setInterval(carregar, 3000)
    return () => clearInterval(polling)
  }, [])

  const CardPedido = ({ pedido, onClick, concluido }) => (
    <CCard 
      className="mb-4 shadow-lg"
      style={{
        cursor: onClick ? "pointer" : "default",
        border: concluido ? "4px solid #4caf50" : "4px solid #ff5252",
        background: concluido ? "#3e7042ff" : "#4a2026ff",
      }}
      onClick={onClick}
    >
      <CCardBody>
        <h1 style={{ fontSize: "3rem", fontWeight: "900" }}>
          PEDIDO #{pedido.id}
        </h1>

        <h2 style={{ fontSize: "2rem", fontWeight: "700" }}>
          {pedido.tipoAtendimento}
        </h2>

        <hr />

        {pedido.itens && pedido.itens.map((item, i) => (
          <p key={i} style={{ fontSize: "2rem", fontWeight: "700" }}>
            {item.quantity} × {item.name}
          </p>
        ))}
      </CCardBody>
    </CCard>
  )

  return (
    <CRow>
      <CCol xs={12} md={6}>
        <CCard className="shadow-sm">
          <CCardHeader>
            <strong style={{ fontSize: "2.5rem", color: "#b71c1c" }}>
              🚨 PEDIDOS PENDENTES
            </strong>
          </CCardHeader>
          <CCardBody>
            {loading ? (
              <CSpinner color="danger" />
            ) : pendentes.length === 0 ? (
              <h2>Nenhum pedido pendente</h2>
            ) : (
              pendentes.map((p) => (
                <CardPedido
                  key={p.id}
                  pedido={p}
                  onClick={() => concluirPedido(p.id)}
                />
              ))
            )}
          </CCardBody>
        </CCard>
      </CCol>

      <CCol xs={12} md={6}>
        <CCard className="shadow-sm">
          <CCardHeader>
            <strong style={{ fontSize: "2.5rem", color: "#1b5e20" }}>
              ✔ PEDIDOS CONCLUÍDOS
            </strong>
          </CCardHeader>
          <CCardBody style={{ opacity: 0.6 }}>
            {loading ? (
              <CSpinner color="success" />
            ) : concluidos.length === 0 ? (
              <h2>Nenhum concluído ainda</h2>
            ) : (
              concluidos.map((p) => (
                <CardPedido key={p.id} pedido={p} concluido />
              ))
            )}
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default PedidoCozinha