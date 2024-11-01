import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Sidebar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDoubleLeft, faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons';
import hcrLogo from './assets/hcr-logo.png';
import accountIcon from './assets/account-icon.png';

export default function Sidebar({ setMessage, setIsSidebarCollapsed }) {
  const [showInternados, setShowInternados] = useState(false);
  const [showCirurgia, setShowCirurgia] = useState(false);
  const [showEmergencia, setShowEmergencia] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
    setIsSidebarCollapsed(!isCollapsed);
  };

  return (
    <>
      {/* Header */}
      <header className={`header ${isCollapsed ? 'header-collapsed' : ''}`}>
        <h1 className="header-title">HCR ANALYST</h1>
        <div className="header-search">
          <input type="text" placeholder="Search..." className="header-search-input" />
        </div>
        <img src={accountIcon} alt="Account" className="header-account-icon" />
      </header>

      {/* Sidebar */}
      <div className={`sidebar1 ${isCollapsed ? 'collapsed' : ''}`}>
        <button onClick={toggleSidebar} className="toggle-button">
          <FontAwesomeIcon icon={isCollapsed ? faAngleDoubleRight : faAngleDoubleLeft} size="lg" />
        </button>

        {!isCollapsed && (
          <>
            <img src={hcrLogo} alt="HCR Logo" className="logo" />

            <div className="menu-item1">
              <button
                className="menu-button1"
                onClick={() => setMessage('home')} // Agora define a página para "home"
              >
                📊 HOME
              </button>

            </div>

            <div className="menu-item1">
              <button className="menu-button1" onClick={() => setShowInternados(!showInternados)}>
                🏥 Cadastros {showInternados ? '▲' : '▼'}
              </button>
              {showInternados && (
                <div className="sub-menu1">
                  <button className="sub-menu-item1" onClick={() => setMessage('Cadastros-por-raça')}>
                    Cadastro por raça
                  </button>
                  <button className="sub-menu-item1" onClick={() => setMessage('Internados-setor')}>
                    Internados por Setor
                  </button>
                </div>
              )}
            </div>

            <div className="menu-item1">
              <button className="menu-button1" onClick={() => setShowCirurgia(!showCirurgia)}>
                🏥 Cirurgias {showCirurgia ? '▲' : '▼'}
              </button>
              {showCirurgia && (
                <div className="sub-menu1">
                  <button className="sub-menu-item1" onClick={() => setMessage('Cirurgias-dia')}>
                    Cirurgias do Dia
                  </button>
                  <button className="sub-menu-item1" onClick={() => setMessage('Cirurgias-especialidade')}>
                    Cirurgias por Especialidade
                  </button>
                </div>
              )}
            </div>

            <div className="menu-item1">
              <button className="menu-button1" onClick={() => setShowEmergencia(!showEmergencia)}>
                🚑 Emergência {showEmergencia ? '▲' : '▼'}
              </button>
              {showEmergencia && (
                <div className="sub-menu1">
                  <button className="sub-menu-item1" onClick={() => setMessage('atendimento-cores')}>
                    Emergências do Dia
                  </button>
                  <button className="sub-menu-item1" onClick={() => setMessage('ocupacao')}>
                    Emergências por Classificação
                  </button>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
}
