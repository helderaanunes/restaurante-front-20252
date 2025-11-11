import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const PermissaoAdd = () => {
  const [permissao, setPermissao] = useState({
    nome: '',
    descricao: ''
  });

  const { id } = useParams();
  const navigate = useNavigate();

  // Se tiver ID, carrega a permissão existente (edição)
  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:8080/permissao/${id}`)
        .then((response) => {
          setPermissao(response.data);
        })
        .catch((error) => {
          console.error('Erro ao buscar permissão:', error);
          alert('Erro ao carregar os dados da permissão!');
        });
    }
  }, [id]);

  // Atualiza os campos do formulário
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPermissao({ ...permissao, [name]: value });
  };

  // Envia os dados ao backend
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (id) {
        await axios.put(`http://localhost:8080/permissao`, permissao);
        alert('Permissão atualizada com sucesso!');
      } else {
        await axios.post('http://localhost:8080/permissao', permissao);
        alert('Permissão cadastrada com sucesso!');
      }

      navigate('/permissoes'); // redireciona para listagem após salvar
    } catch (error) {
      console.error('Erro ao salvar permissão:', error);
      alert('Erro ao salvar a permissão.');
    }
  };

  return (
    <div className="container mt-4">
      <h2>{id ? 'Editar Permissão' : 'Cadastrar Permissão'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group mt-3">
          <label>Nome</label>
          <input
            type="text"
            name="nome"
            className="form-control"
            value={permissao.nome}
            onChange={handleChange}
            placeholder="Digite o nome da permissão"
            required
          />
        </div>

        <div className="form-group mt-3">
          <label>Descrição</label>
          <textarea
            name="descricao"
            className="form-control"
            value={permissao.descricao}
            onChange={handleChange}
            placeholder="Digite a descrição da permissão"
          />
        </div>

        <button type="submit" className="btn btn-primary mt-3">
          {id ? 'Atualizar' : 'Salvar'}
        </button>
      </form>
    </div>
  );
};

export default PermissaoAdd;
