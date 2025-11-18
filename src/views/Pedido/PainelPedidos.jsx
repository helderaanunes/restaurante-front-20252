import React, { useEffect, useState } from "react";
import "./PainelPedidos.css";

export default function PainelPedidos() {
  const [preparando, setPreparando] = useState([]);
  const [prontos, setProntos] = useState([]);

  useEffect(() => {
    async function carregarPedidos() {
      const preparandoRes = await fetch("http://localhost:8080/pedidos/preparando");
      const prontosRes = await fetch("http://localhost:8080/pedidos/prontos");

      const preparandoData = await preparandoRes.json();
      const prontosData = await prontosRes.json();

      setPreparando(preparandoData.map(p => p.id));
      setProntos(prontosData.map(p => p.id));
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
            <li key={num} className="pronto">
              {num}
            </li>
          ))}
        </ul>
      </div>

      <div className="coluna">
        <h1>PRONTOS</h1>
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
