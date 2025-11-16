export default function ItemCardapioCard({ itemCardapio, onClick }) {
  return (
    <div
      onClick={() => onClick(itemCardapio)}
      style={{
        background: "#d726d7",
        padding: 20,
        color: "white",
        borderRadius: 10,
        textAlign: "center",
        cursor: "pointer",
        userSelect: "none",
        fontWeight: "bold",
        fontSize: "1.1rem"
      }}
    >
      {itemCardapio.nome}
    </div>
  );
}
