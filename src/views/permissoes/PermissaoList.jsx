import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const PermissaoList = () => {
  const [permissoes, setPermissoes] = useState([]);
  const navigate = useNavigate();

  // Busca todas as permissões ao carregar a página
  useEffect(() => {
    carregarPermissoes();
  }, []);

  const carregarPermissoes = async () => {
    try {
      const response = await axios.get('http://localhost:8080/permissao');
      setPermissoes(response.data);
    } catch (error) {
      console.error('Erro ao buscar permissões:', error);
      alert('Erro ao carregar a lista de permissões.');
    }
  };

  const excluirPermissao = async (id) => {
    if (window.confirm('Deseja realmente excluir esta permissão?')) {
      try {
        await axios.delete(`http://localhost:8080/permissao/${id}`);
        alert('Permissão excluída com sucesso!');
        carregarPermissoes(); // atualiza a lista após excluir
      } catch (error) {
        console.error('Erro ao excluir permissão:', error);
        alert('Erro ao excluir a permissão.');
      }
    }
  };

  return (
    <div className="container mt-4">
      <h2>Lista de Permissões</h2>

      <div className="d-flex justify-content-end mb-3">
        <button
          className="btn btn-success"
          onClick={() => navigate('/permissao/add')}
        >
          Nova Permissão
        </button>
      </div>

      <table className="table table-bordered table-striped">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Descrição</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {permissoes.length > 0 ? (
            permissoes.map((p) => (
              <tr key={p.id}>
                <td>{p.id}</td>
                <td>{p.nome}</td>
                <td>{p.descricao}</td>
                <td>
                  <Link
                    to={`/permissao/edit/${p.id}`}
                    className="btn btn-primary btn-sm me-2"
                  >
                    Editar
                  </Link>
                  <button
                    onClick={() => excluirPermissao(p.id)}
                    className="btn btn-danger btn-sm"
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center">
                Nenhuma permissão cadastrada.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default PermissaoList;
