export default function PedidoResumo({ itens, onEnviar }) {
  return (
    <div style={{ marginTop: 20, padding: 20, background: "#fff", borderRadius: 10 }}>
      <h3>Resumo do Pedido</h3>
      <ul>
        {itens.map((p, i) => <li key={i}>{p.nome}</li>)}
      </ul>

      <button
        onClick={onEnviar}
        style={{
          marginTop: 12,
          padding: 12,
          background: "green",
          color: "white",
          border: "none",
          borderRadius: 8,
          cursor: "pointer"
        }}
      >
        Enviar Pedido
      </button>
    </div>
  );
}
