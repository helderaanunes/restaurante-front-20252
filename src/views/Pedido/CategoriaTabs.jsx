export default function Categoriatabs({ categorias, ativa, onChange }) {
  return (
    <div style={{ display: "flex", gap: 10, overflowX: "auto", paddingBottom: 10 }}>
      {categorias.map(cat => (
        <button
          key={cat}
          onClick={() => onChange(cat)}
          style={{
            padding: "12px 16px",
            borderRadius: 8,
            border: "none",
            fontSize: 16,
            cursor: "pointer",
            background: cat === ativa ? "#007bff" : "#e0e0e0",
            color: cat === ativa ? "white" : "black",
            whiteSpace: "nowrap"
          }}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
