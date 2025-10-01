import React, { useEffect, useState } from 'react'
import axios from 'axios'

const IngredienteList = () => {
  const [ingredientes, setIngredientes] = useState([])
  const [loading, setLoading] = useState(true)
  const [erro, setErro] = useState(null)

  useEffect(() => {
    axios
      .get('http://localhost:8080/ingrediente')
      .then((response) => {
        setIngredientes(response.data)
        setLoading(false)
      })
      .catch((error) => {
        setErro('Erro ao carregar ingredientes')
        setLoading(false)
      })
  }, [])

  if (loading) return <p>Carregando...</p>
  if (erro) return <p>{erro}</p>

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Lista de Ingredientes</h2>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Nome</th>
            <th style={styles.th}>Unidade de Medida</th>
            <th style={styles.th}>Custo Médio (R$)</th>
            <th style={styles.th}>ID</th>
          </tr>
        </thead>
        <tbody>
          {ingredientes.map(({ id, nome, unidadeDeMedida, custoMedio }) => (
            <tr key={id} style={styles.tr}>
              <td style={styles.td}>{nome}</td>
              <td style={styles.td}>{unidadeDeMedida}</td>
              <td style={styles.td}>{Number(custoMedio).toFixed(2)}</td>
              <td style={styles.td}>{id}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

const styles = {
  container: {
    padding: '30px',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#1f1f1f', // fundo escuro
    minHeight: '100vh',
    color: '#eee',
  },
  title: {
    textAlign: 'center',
    marginBottom: '20px',
  },
  table: {
    width: '100%',
    borderCollapse: 'separate',
    borderSpacing: 0,
    borderRadius: '12px',
    overflow: 'hidden',
    boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
  },
  th: {
    backgroundColor: '#333',
    color: '#fff',
    padding: '12px 20px',
    textAlign: 'left',
    fontWeight: '600',
    borderBottom: '2px solid #555',
  },
  tr: {
    backgroundColor: '#2c2c2c',
    borderBottom: '1px solid #444',
    transition: 'background-color 0.3s',
  },
  td: {
    padding: '12px 20px',
    color: '#ddd',
  },
}

export default IngredienteList
