import React from 'react';
import './App.css';
import { BiodataProvider } from './context/BiodataContext';
import Navbar from './components/common/Navbar';
import FormPanel from './components/FormPanel/FormPanel';
import PreviewPanel from './components/PreviewPanel/PreviewPanel';

function App() {
  return (
    <BiodataProvider>
      <div className="antialiased min-h-screen bg-[#fdfaf6]" style={{ fontFamily: "'Inter', sans-serif" }}>
        <Navbar />

        {/* Main Interface - Reverted to match original design exactly */}
        <div className="max-w-[1400px] mx-auto p-4 md:p-6 lg:p-8">
          <div className="flex flex-col lg:flex-row gap-8">
            <FormPanel />
            <PreviewPanel />
          </div>
        </div>
      </div>
    </BiodataProvider>
  );
}

export default App;
