import { useEffect, useState } from "react";
import CategoriaTabs from "../components/Categoriatabs";
import ProdutoGrid from "../components/ProdutoGrid";
import PedidoResumo from "../components/PedidoResumo";
import { getCategorias, getProdutosByCategoria } from "../services/produtoService";
import { usePedidoStore } from "../store/pedidoStore";

export default function PedidoPage() {

  const categorias = getCategorias();
  const [categoriaAtiva, setCategoriaAtiva] = useState(categorias[0]);
  const [produtos, setProdutos] = useState([]);
  
  const itens = usePedidoStore(s => s.itens);
  const adicionar = usePedidoStore(s => s.adicionar);
  const limpar = usePedidoStore(s => s.limpar);

  useEffect(() => {
    getProdutosByCategoria(categoriaAtiva).then(setProdutos);
  }, [categoriaAtiva]);

  function enviarPedido() {
    alert("Pedido enviado!");
    limpar();
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>Novo Pedido – Mesa 7</h2>

      <CategoriaTabs
        categorias={categorias}
        ativa={categoriaAtiva}
        onChange={setCategoriaAtiva}
      />

      <ProdutoGrid produtos={produtos} onAdd={adicionar} />

      {itens.length > 0 && (
        <PedidoResumo itens={itens} onEnviar={enviarPedido}/>
      )}
    </div>
  );
}
