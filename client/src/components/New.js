import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [selectedClient, setSelectedClient] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Sample client data
  const clients = [
    { id: '1', name: 'Acme Corporation' },
    { id: '2', name: 'Global Solutions Inc' },
    { id: '3', name: 'Tech Innovators Ltd' },
    { id: '4', name: 'Digital Ventures Co' },
    { id: '5', name: 'Future Enterprises' }
  ];

  const handleClientSelect = (clientName) => {
    setSelectedClient(clientName);
    setIsDropdownOpen(false);
  };

  const handleKeyDown = (event, clientName) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleClientSelect(clientName);
    }
  };

  const handleProceed = () => {
    if (selectedClient) {
      console.log('Proceeding with:', selectedClient);
      // Add your proceed logic here
    }
  };

  return (
    <div className="welcome-screen">
      {/* Navigation Bar */}
      <nav className="navbar" aria-label="Main navigation">
        <div className="nav-container">
          <div className="logo">
            <div className="logo-thumb" aria-label="Company logo">
              <span className="logo-icon">T</span>
            </div>
          </div>
          <div className="user-menu">
            <span className="username" aria-label="Current user">
              Tinku
            </span>
            <button 
              className="logout-btn"
              aria-label="Logout"
              onClick={() => console.log('Logout clicked')}
            >
              <svg 
                width="20" 
                height="20" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2"
                aria-hidden="true"
              >
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                <polyline points="16,17 21,12 16,7"></polyline>
                <line x1="21" y1="12" x2="9" y2="12"></line>
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="main-content">
        <div className="welcome-container">
          {/* Greeting */}
          <h1 className="welcome-greeting">
            Welcome, Tinku <span className="welcome-emoji" aria-label="waving hand">👋</span>
          </h1>
          
          {/* Subtitle */}
          <p className="welcome-subtitle">
            Please select the account name to proceed
          </p>

          {/* Client Selection Dropdown */}
          <div className="dropdown-container">
            <label htmlFor="client-select" className="dropdown-label">
              Select Account
            </label>
            <div className="custom-dropdown">
              <button
                id="client-select"
                className={`dropdown-trigger ${selectedClient ? 'has-selection' : ''} ${isDropdownOpen ? 'open' : ''}`}
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                aria-haspopup="listbox"
                aria-expanded={isDropdownOpen}
                aria-labelledby="client-select-label"
              >
                <span className="selected-value">
                  {selectedClient || 'Choose an account...'}
                </span>
                <svg 
                  className={`dropdown-arrow ${isDropdownOpen ? 'rotated' : ''}`}
                  width="16" 
                  height="16" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2"
                  aria-hidden="true"
                >
                  <polyline points="6,9 12,15 18,9"></polyline>
                </svg>
              </button>
              
              {isDropdownOpen && (
                <ul 
                  className="dropdown-list"
                  role="listbox"
                  aria-labelledby="client-select-label"
                >
                  {clients.map((client) => (
                    <li key={client.id} role="none">
                      <button
                        role="option"
                        aria-selected={selectedClient === client.name}
                        className={`dropdown-item ${selectedClient === client.name ? 'selected' : ''}`}
                        onClick={() => handleClientSelect(client.name)}
                        onKeyDown={(e) => handleKeyDown(e, client.name)}
                        tabIndex={0}
                      >
                        {client.name}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {/* Proceed Button */}
          <button
            className={`proceed-btn ${selectedClient ? 'active' : ''}`}
            onClick={handleProceed}
            disabled={!selectedClient}
            aria-label={`Proceed with ${selectedClient || 'selected account'}`}
          >
            Proceed
            <svg 
              width="20" 
              height="20" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2"
              aria-hidden="true"
            >
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12,5 19,12 12,19"></polyline>
            </svg>
          </button>
        </div>
      </main>
    </div>
  );
};

export default App;