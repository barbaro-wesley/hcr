

import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import hcrLogo from './assets/hcr-logo.png'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilePdf, faFileImage } from '@fortawesome/free-solid-svg-icons';
import './App.css';
import Home from './Home';

function Data() {
  const [selectedMenu, setSelectedMenu] = useState('home'); // Começa no dashboard
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const userName = import.meta.env.VITE_USER_NAME;  
  const userPassword = import.meta.env.VITE_USER_PASSWORD;

  const graficoLinks = {
    'Cadastros-por-raça': {
      resource: "/adhoc/HCR__Marau_/Estatísticas/HCR___Taxa_de_Mortalidade___Por_Setor",
      auth: {
        name: userName,
        password: userPassword
      }
    },
    'Internados-setor': {
      resource: "/adhoc/Marau/ESUS___Atendimento_Individual/ESUS___Ficha_Atendimento_Individual___Por_Sexo",
      auth: {
        name: userName,
        password: userPassword
      }
    },
    'Cirurgia-cirurgiao': {
      resource: "/adhoc/HCR__Marau_/Cirurgias/HCR___Cirurgias_Por_Cirurgião_Complexidade___Mensal",
      auth: {
        name: userName,
        password: userPassword
      }
    },
    'Cirurgia-complexidade': {
      resource: "/adhoc/HCR__Marau_/Cirurgias/HCR___Cirurgias_Por_Complexidade___Mensal",
      auth: {
        name: userName,
        password: userPassword
      }
    },
    'Cirurgia-localidade': {
      resource: "/adhoc/HCR__Marau_/Cirurgias/HCR___Cirurgias_Por_Localidade_Complexidade___Mensal",
      auth: {
        name: userName,
        password: userPassword
      }
    },
    'atentimento-genero': {
      resource: "/adhoc/HCR__Marau_/Estatísticas/Atendimentos___Por_Sexo",
      auth: {
        name: userName,
        password: userPassword
      }
    },
    'atendimento-cores': {
      resource: "/adhoc/HCR__Marau_/Estatísticas/Atendimentos___Por_Escala_Manchester",
      auth: {
        name: userName,
        password: userPassword
      }
    },
    'ocupacao': {
      resource: "/adhoc/HCR__Marau_/Estatísticas/HCR____Ocupação",
      auth: {
        name: userName,
        password: userPassword
      }
    },
  };

  const loadGrafico = (menuOption, containerId = '#container') => {
    const grafico = graficoLinks[menuOption];
    if (grafico) {
      window.visualize({
        auth: {
          name: userName,
          password: userPassword,
        }
      }, function(v) {
        v(containerId).adhocView({
          resource: grafico.resource,
          error: (e) => console.error("Erro ao carregar gráfico", e),
        });
      });
    }
  };

  useEffect(() => {
    if (selectedMenu && selectedMenu !== 'home') {
      loadGrafico(selectedMenu, '#container');
    }
  }, [selectedMenu]);

  const generatePDF = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const logoWidth = 70;
    const logoHeight = 30;
    const logoX = (pageWidth - logoWidth) / 2;

    doc.addImage(hcrLogo, 'PNG', logoX, 10, logoWidth, logoHeight);

    const chartContainer = document.getElementById('container');
    html2canvas(chartContainer).then((canvas) => {
      const imgWidth = 190;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      const imgData = canvas.toDataURL('image/png');
      doc.addImage(imgData, 'PNG', 10, 50, imgWidth, imgHeight);
      doc.save('relatorio-hospital.pdf');
    });
  };

  const exportAsImage = () => {
    const container = document.getElementById('container');
    html2canvas(container).then(canvas => {
      const link = document.createElement('a');
      link.download = `${selectedMenu}-grafico.png`;
      link.href = canvas.toDataURL();
      link.click();
    });
  };

  return (
    <div style={{ display: 'flex' }}>
      <Sidebar setMessage={setSelectedMenu} setIsSidebarCollapsed={setIsSidebarCollapsed} />

      <div
        style={{
          marginLeft: isSidebarCollapsed ? '60px' : '260px',
          padding: '20px',
          width: '100%',
          transition: 'margin-left 0.3s ease',
        }}
      >
        {selectedMenu === 'home' ? (
          <Home loadGrafico={loadGrafico} />
        ) : (
          <>
            <h1>{selectedMenu || 'Selecione uma opção do menu'}</h1>

            {selectedMenu && (
              <div style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
                <button onClick={exportAsImage} style={{ display: 'flex', alignItems: 'center', padding: '10px 20px' }}>
                  <FontAwesomeIcon icon={faFileImage} style={{ marginRight: '5px', color: 'green' }} />
                  Exportar como PNG
                </button>
                <button onClick={generatePDF} style={{ display: 'flex', alignItems: 'center', padding: '10px 20px' }}>
                  <FontAwesomeIcon icon={faFilePdf} style={{ marginRight: '5px', color: 'red' }} />
                  Exportar como PDF
                </button>
              </div>
            )}

            <div
              id="container"
              style={{
                width: '100%',
                minWidth: '1000px',
                minHeight: '600px',
                overflowX: 'auto',
                overflowY: 'auto',
                border: '1px solid #ccc',
                padding: '10px',
                boxSizing: 'border-box',
                backgroundColor: 'white',
              }}
            >
              {/* O gráfico será inserido aqui */}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Data;
