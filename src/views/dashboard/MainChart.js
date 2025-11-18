import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Tooltip,
  Legend
);

import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  CCard,
  CCardBody,
  CRow,
  CCol,
  CFormInput,
  CButton,
} from "@coreui/react";
import { Line } from "react-chartjs-2";

const MainChart = () => {
  const [intervalData, setIntervalData] = useState([]);
  const [daily, setDaily] = useState([]);
  const [weekly, setWeekly] = useState([]);
  const [monthly, setMonthly] = useState([]);

  const [inicio, setInicio] = useState("");
  const [fim, setFim] = useState("");

  // -----------------------------
  // Carrega os gráficos secundários
  // -----------------------------
  const loadSecondaryCharts = async () => {
    try {
      const [d, w, m] = await Promise.all([
        axios.get("http://localhost:8080/api/dashboard/lucro/diario"),
        axios.get("http://localhost:8080/api/dashboard/lucro/semanal"),
        axios.get("http://localhost:8080/api/dashboard/lucro/mensal"),
      ]);

      setDaily(d.data);
      setWeekly(w.data);
      setMonthly(m.data);
    } catch (err) {
      console.error("Erro ao carregar dados:", err);
    }
  };

  useEffect(() => {
    loadSecondaryCharts();
  }, []);

  // -----------------------------
  // Buscar dados por intervalo
  // -----------------------------
  const buscarIntervalo = async () => {
    if (!inicio || !fim) {
      alert("Selecione as duas datas.");
      return;
    }

    try {
      const response = await axios.get(
        "http://localhost:8080/api/dashboard/lucro/intervalo",
        {
          params: { inicio, fim },
        }
      );

      setIntervalData(response.data);
    } catch (err) {
      console.error("Erro ao buscar intervalo:", err);
    }
  };

  const intervalChartData = {
    labels: intervalData.map((item) => item.label),
    datasets: [
      {
        label: "Lucro por Intervalo (R$)",
        data: intervalData.map((item) => Number(item.value)),
        fill: false,
        borderColor: "rgba(75,192,192,1)",
        tension: 0.3,
      },
    ],
  };

  // Mini-card gráfico
  const smallChart = (data, title) => (
    <CCard className="mb-3">
      <CCardBody>
        <h6 className="text-center">{title}</h6>
        <Line
          height={120}
          data={{
            labels: data.map((d) => d.label),
            datasets: [
              {
                label: title,
                data: data.map((d) => Number(d.value)),
                borderColor: "rgba(99,102,241,1)",
                fill: false,
                tension: 0.3,
              },
            ],
          }}
        />
      </CCardBody>
    </CCard>
  );

  return (
    <>
      {/* Gráfico principal: FILTRO POR INTERVALO */}
      <CCard className="mb-4">
        <CCardBody>
          <h4>Lucro por Intervalo de Datas</h4>
          <div className="small text-body-secondary mb-3">
            Selecione uma data de início e fim para gerar o gráfico.
          </div>

          <CRow className="mb-3">
            <CCol md={4}>
              <CFormInput
                type="date"
                label="Data Inicial"
                value={inicio}
                onChange={(e) => setInicio(e.target.value)}
              />
            </CCol>

            <CCol md={4}>
              <CFormInput
                type="date"
                label="Data Final"
                value={fim}
                onChange={(e) => setFim(e.target.value)}
              />
            </CCol>

            <CCol md={4} className="d-flex align-items-end">
              <CButton color="primary" className="w-100" onClick={buscarIntervalo}>
                Buscar
              </CButton>
            </CCol>
          </CRow>

          <Line height={80} data={intervalChartData} />
        </CCardBody>
      </CCard>

      {/* Gráficos secundários */}
      <CRow>
        <CCol md={4}>{smallChart(daily, "Lucro Diário")}</CCol>
        <CCol md={4}>{smallChart(weekly, "Lucro Semanal")}</CCol>
        <CCol md={4}>{smallChart(monthly, "Lucro Mensal")}</CCol>
      </CRow>
    </>
  );
};

export default MainChart;
