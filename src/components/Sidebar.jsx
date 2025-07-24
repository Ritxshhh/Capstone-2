
import React from 'react';
import { Home, ListTodo, PlusCircle, BarChart3, Sun, Moon } from 'lucide-react';

const Sidebar = ({ darkMode, toggleDarkMode, currentPage, setCurrentPage, sidebarOpen }) => (
  <div className={`sidebar ${sidebarOpen ? 'open' : 'closed'}`} style={{
    position: 'fixed',
    top: 0,
    left: 0,
    width: sidebarOpen ? '280px' : '0',
    height: '100vh',
    backgroundColor: darkMode ? '#1f2937' : '#ffffff',
    borderRight: `1px solid ${darkMode ? '#374151' : '#e5e7eb'}`,
    display: 'flex',
    flexDirection: 'column',
    transition: 'all 0.3s ease',
    overflow: 'hidden',
    boxShadow: darkMode ? '0 0 20px rgba(0,0,0,0.5)' : '0 0 20px rgba(0,0,0,0.1)',
    zIndex: 1000
  }}>
    <div style={{
      padding: '24px',
      borderBottom: `1px solid ${darkMode ? '#374151' : '#e5e7eb'}`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    }}>
      <div style={{
        fontSize: '20px',
        fontWeight: '700',
        color: darkMode ? '#ffffff' : '#1f2937',
        letterSpacing: '-0.025em'
      }}>
        To-Do Matic
      </div>
      <button 
        onClick={toggleDarkMode}
        style={{
          padding: '8px',
          borderRadius: '8px',
          border: 'none',
          backgroundColor: darkMode ? '#374151' : '#f3f4f6',
          color: darkMode ? '#e5e7eb' : '#374151',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'all 0.2s ease'
        }}
      >
        {darkMode ? <Sun size={16} /> : <Moon size={16} />}
      </button>
    </div>
    <nav style={{
      padding: '16px',
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      gap: '4px'
    }}>
      {[
        { id: 'dashboard', icon: Home, label: 'Dashboard' },
        { id: 'todos', icon: ListTodo, label: 'All Tasks' },
        { id: 'add', icon: PlusCircle, label: 'Add Task' },
        { id: 'analytics', icon: BarChart3, label: 'Analytics' }
      ].map(item => (
        <button
          key={item.id}
          onClick={() => setCurrentPage(item.id)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '12px 16px',
            borderRadius: '8px',
            border: 'none',
            backgroundColor: currentPage === item.id 
              ? (darkMode ? '#374151' : '#f1f5f9') 
              : 'transparent',
            color: currentPage === item.id 
              ? (darkMode ? '#ffffff' : '#0f172a')
              : (darkMode ? '#d1d5db' : '#6b7280'),
            cursor: 'pointer',
            fontSize: '15px',
            fontWeight: '500',
            width: '100%',
            textAlign: 'left',
            transition: 'all 0.2s ease'
          }}
        >
          <item.icon size={18} />
          {item.label}
        </button>
      ))}
    </nav>
  </div>
);

export default Sidebar;
