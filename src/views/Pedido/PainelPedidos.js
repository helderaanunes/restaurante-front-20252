import React, { useEffect, useState } from "react";
import "./PainelPedidos.css";

export default function PainelPedidos() {
  const [preparando, setPreparando] = useState([]);
  const [prontos, setProntos] = useState([]);

  useEffect(() => {
    async function carregarPedidos() {
      const res = await fetch("http://localhost:8080/pedidos/status");
      const data = await res.json();

      setPreparando(data.preparando);
      setProntos(data.prontos);
    }

    carregarPedidos();
    const intervalo = setInterval(carregarPedidos, 5000);

    return () => clearInterval(intervalo);
  }, []);

  return (
    <div className="painel-container">
      <div className="coluna">
        <h1>PREPARANDO</h1>
        <ul>
          {preparando.map((num) => (
            <li key={num}>{num}</li>
          ))}
        </ul>
      </div>

      <div className="coluna">
        <h1>PRONTO</h1>
        <ul>
          {prontos.map((num) => (
            <li key={num} className="pronto">
              {num}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
