import { useEffect, useState } from "react";
import CategoriaTabs from "../components/Categoriatabs";
import ItemCardapioGrid from "../components/ItemCardapioGrid";
import PedidoResumo from "../components/PedidoResumo";

import { getCategorias, getProdutosByCategoria } from "../services/produtoService";
import { usePedidoStore } from "../store/pedidoStore";

export default function PedidoPage() {

  const categorias = getCategorias();

  const [categoriaAtiva, setCategoriaAtiva] = useState(categorias[0]);
  const [itensCardapio, setItensCardapio] = useState([]);

  const itens = usePedidoStore(s => s.itens);
  const adicionar = usePedidoStore(s => s.adicionar);
  const limpar = usePedidoStore(s => s.limpar);

  // Carregar itens do cardápio conforme a categoria ativa
  useEffect(() => {
    getProdutosByCategoria(categoriaAtiva).then(setItensCardapio);
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

      {/* Exibe itens do cardápio filtrados por categoria */}
      <ItemCardapioGrid itemCardapio={itensCardapio} onAdd={adicionar} />

      {/* Resumo do pedido */}
      {itens.length > 0 && (
        <PedidoResumo itens={itens} onEnviar={enviarPedido} />
      )}
    </div>
  );
}

