import ItemCardapioCard from "./ItemCardapioCard";

export default function ItemCardapioGrid({ itemCardapio, onAdd }) {
  return (
    <div style={{
      display: "grid",
      gap: 12,
      gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))"
    }}>
      {itemCardapio.map(p => (
        <ItemCardapioCard key={p.id} itemCardapio={p} onClick={onAdd} />
      ))}
    </div>
  );
}
