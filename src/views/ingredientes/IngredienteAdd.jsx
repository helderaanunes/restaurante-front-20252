import React, { useState } from 'react'
import axios from 'axios'

const IngredienteAdd = ({ onAdd }) => {
  const [nome, setNome] = useState('')
  const [unidadeDeMedida, setUnidadeDeMedida] = useState('')
  const [custoMedio, setCustoMedio] = useState('')
  const [loading, setLoading] = useState(false)
  const [erro, setErro] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setErro(null)

    try {
      const response = await axios.post('http://localhost:8080/ingrediente', {
        nome,
        unidadeDeMedida,
        custoMedio: parseFloat(custoMedio),
      })
      onAdd(response.data)
      setNome('')
      setUnidadeDeMedida('')
      setCustoMedio('')
    } catch (err) {
      setErro('Erro ao adicionar ingrediente')
    }
    setLoading(false)
  }

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <h3 style={styles.title}>Adicionar Ingrediente</h3>

      <label style={styles.label}>
        Nome:
        <input
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
          style={styles.input}
          placeholder="Ex: Tomate"
        />
      </label>

      <label style={styles.label}>
        Unidade de Medida:
        <input
          type="text"
          value={unidadeDeMedida}
          onChange={(e) => setUnidadeDeMedida(e.target.value)}
          required
          style={styles.input}
          placeholder="Ex: kg, litro, unidade"
        />
      </label>

      <label style={styles.label}>
        Custo Médio:
        <input
          type="number"
          step="0.01"
          value={custoMedio}
          onChange={(e) => setCustoMedio(e.target.value)}
          required
          style={styles.input}
          placeholder="Ex: 5.50"
        />
      </label>

      {erro && <p style={styles.error}>{erro}</p>}

      <button type="submit" disabled={loading} style={styles.button}>
        {loading ? 'Salvando...' : 'Adicionar'}
      </button>
    </form>
  )
}

const styles = {
  form: {
    backgroundColor: '#2c2c2c',
    padding: '20px',
    borderRadius: '12px',
    maxWidth: '400px',
    margin: '30px auto',
    color: '#eee',
    boxShadow: '0 4px 10px rgba(0,0,0,0.3)',
    fontFamily: 'Arial, sans-serif',
  },
  title: {
    marginBottom: '20px',
    textAlign: 'center',
  },
  label: {
    display: 'block',
    marginBottom: '15px',
    fontWeight: '600',
    fontSize: '14px',
  },
  input: {
    width: '100%',
    padding: '10px 12px',
    marginTop: '6px',
    borderRadius: '8px',
    border: '1px solid #555',
    backgroundColor: '#1f1f1f',
    color: '#eee',
    fontSize: '14px',
    outline: 'none',
    transition: 'border-color 0.3s',
  },
  button: {
    width: '100%',
    padding: '12px',
    borderRadius: '10px',
    border: 'none',
    backgroundColor: '#4a90e2',
    color: '#fff',
    fontWeight: '700',
    fontSize: '16px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  error: {
    color: '#ff6b6b',
    marginBottom: '15px',
    fontWeight: '600',
    textAlign: 'center',
  },
}

export default IngredienteAdd
