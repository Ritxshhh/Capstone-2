
import React from 'react';
import { Menu } from 'lucide-react';

const Header = ({ title, darkMode, setSidebarOpen, sidebarOpen }) => (
  <div style={{
    height: '72px',
    minHeight: '72px',
    backgroundColor: darkMode ? '#1f2937' : '#ffffff',
    borderBottom: `1px solid ${darkMode ? '#374151' : '#e5e7eb'}`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 24px',
    boxShadow: darkMode ? '0 1px 3px rgba(0,0,0,0.3)' : '0 1px 3px rgba(0,0,0,0.1)',
    position: 'sticky',
    top: 0,
    zIndex: 100
  }}>
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '16px'
    }}>
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        style={{
          padding: '8px',
          borderRadius: '8px',
          border: 'none',
          backgroundColor: 'transparent',
          color: darkMode ? '#e5e7eb' : '#374151',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Menu size={20} />
      </button>
      <h1 style={{
        fontSize: 'clamp(20px, 4vw, 28px)',
        fontWeight: '700',
        color: darkMode ? '#ffffff' : '#1f2937',
        margin: 0
      }}>
        {title}
      </h1>
    </div>
  </div>
);

export default Header;
