import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [selectedClient, setSelectedClient] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Enhanced client data with profile information
  const clients = [
    { 
      id: '1', 
      firstName: 'Sarah',
      lastName: 'Chen',
      username: 'sarah.chen',
      role: 'Project Manager',
      avatar: 'SC'
    },
    { 
      id: '2', 
      firstName: 'Marcus',
      lastName: 'Rodriguez',
      username: 'marcus.r',
      role: 'Design Lead',
      avatar: 'MR'
    },
    { 
      id: '3', 
      firstName: 'Priya',
      lastName: 'Patel',
      username: 'priya.p',
      role: 'Frontend Developer',
      avatar: 'PP'
    },
    { 
      id: '4', 
      firstName: 'James',
      lastName: 'Wilson',
      username: 'james.w',
      role: 'Backend Engineer',
      avatar: 'JW'
    },
    { 
      id: '5', 
      firstName: 'Aisha',
      lastName: 'Khan',
      username: 'aisha.k',
      role: 'Product Owner',
      avatar: 'AK'
    }
  ];

  const handleClientSelect = (client) => {
    setSelectedClient(client);
    setIsDropdownOpen(false);
  };

  const handleKeyDown = (event, client) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleClientSelect(client);
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
        <div className="background-grid"></div>
        <div className="welcome-container">
          {/* Greeting */}
          <h1 className="welcome-greeting">
            Welcome, Tinku <span className="welcome-emoji" aria-label="waving hand">👋</span>
          </h1>
          
          {/* Subtitle */}
          <p className="welcome-subtitle">
            Please select the account name to proceed
          </p>

          {/* Enhanced Client Selection Dropdown */}
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
                {selectedClient ? (
                  <div className="selected-client-profile">
                    <div className="client-avatar small">
                      {selectedClient.avatar}
                    </div>
                    <div className="client-info">
                      <div className="client-name">
                        {selectedClient.firstName} {selectedClient.lastName}
                      </div>
                      <div className="client-username">
                        @{selectedClient.username}
                      </div>
                    </div>
                  </div>
                ) : (
                  <span className="placeholder">Choose an account...</span>
                )}
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
                        aria-selected={selectedClient?.id === client.id}
                        className={`dropdown-item ${selectedClient?.id === client.id ? 'selected' : ''}`}
                        onClick={() => handleClientSelect(client)}
                        onKeyDown={(e) => handleKeyDown(e, client)}
                        tabIndex={0}
                      >
                        <div className="client-profile">
                          <div className="client-avatar">
                            {client.avatar}
                          </div>
                          <div className="client-details">
                            <div className="client-name">
                              {client.firstName} {client.lastName}
                            </div>
                            <div className="client-meta">
                              <span className="client-username">@{client.username}</span>
                              <span className="client-role">{client.role}</span>
                            </div>
                          </div>
                        </div>
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
            aria-label={`Proceed with ${selectedClient ? `${selectedClient.firstName} ${selectedClient.lastName}` : 'selected account'}`}
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