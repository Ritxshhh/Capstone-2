
import React from 'react';
import { Plus } from 'lucide-react';
import Header from '../components/Header';

const AddTodoPage = ({ 
  darkMode, 
  addTodo, 
  newTodo, 
  setNewTodo, 
  newCategory, 
  setNewCategory, 
  newPriority, 
  setNewPriority, 
  newDueDate, 
  setNewDueDate, 
  categories, 
  priorities, 
  setCurrentPage,
  setSidebarOpen,
  sidebarOpen
}) => {
  return (
    <>
      <Header title="Add New Task" darkMode={darkMode} setSidebarOpen={setSidebarOpen} sidebarOpen={sidebarOpen} />
      <div style={{
        flex: 1,
        overflowY: 'auto',
        overflowX: 'hidden',
        backgroundColor: darkMode ? '#111827' : '#f8fafc',
        padding: 'clamp(16px, 3vw, 24px)'
      }}>
        <div style={{
          maxWidth: '800px',
          margin: '0 auto'
        }}>
          <div style={{
            backgroundColor: darkMode ? '#1f2937' : '#ffffff',
            border: `1px solid ${darkMode ? '#374151' : '#e5e7eb'}`,
            borderRadius: '12px',
            padding: 'clamp(20px, 4vw, 32px)',
            boxShadow: darkMode ? '0 4px 20px rgba(0,0,0,0.3)' : '0 4px 20px rgba(0,0,0,0.08)'
          }}>
            <form 
              onSubmit={(e) => { 
                e.preventDefault(); 
                addTodo(); 
                setCurrentPage('todos'); 
              }} 
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '24px'
              }}
            >
              <div>
                <label style={{
                  display: 'block',
                  marginBottom: '8px',
                  fontSize: '14px',
                  fontWeight: '600',
                  color: darkMode ? '#e5e7eb' : '#374151'
                }}>
                  Task Description
                </label>
                <input
                  type="text"
                  value={newTodo}
                  onChange={(e) => setNewTodo(e.target.value)}
                  placeholder="What do you need to do?"
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: `1px solid ${darkMode ? '#4b5563' : '#d1d5db'}`,
                    borderRadius: '8px',
                    fontSize: '15px',
                    backgroundColor: darkMode ? '#374151' : '#ffffff',
                    color: darkMode ? '#e5e7eb' : '#374151',
                    outline: 'none',
                    transition: 'all 0.2s ease'
                  }}
                  required
                />
              </div>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '16px'
              }}>
                <div>
                  <label style={{
                    display: 'block',
                    marginBottom: '8px',
                    fontSize: '14px',
                    fontWeight: '600',
                    color: darkMode ? '#e5e7eb' : '#374151'
                  }}>
                    Category
                  </label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      border: `1px solid ${darkMode ? '#4b5563' : '#d1d5db'}`,
                      borderRadius: '8px',
                      fontSize: '15px',
                      backgroundColor: darkMode ? '#374151' : '#ffffff',
                      color: darkMode ? '#e5e7eb' : '#374151',
                      outline: 'none',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label style={{
                    display: 'block',
                    marginBottom: '8px',
                    fontSize: '14px',
                    fontWeight: '600',
                    color: darkMode ? '#e5e7eb' : '#374151'
                  }}>
                    Priority
                  </label>
                  <select
                    value={newPriority}
                    onChange={(e) => setNewPriority(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      border: `1px solid ${darkMode ? '#4b5563' : '#d1d5db'}`,
                      borderRadius: '8px',
                      fontSize: '15px',
                      backgroundColor: darkMode ? '#374151' : '#ffffff',
                      color: darkMode ? '#e5e7eb' : '#374151',
                      outline: 'none',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    {priorities.map(priority => (
                      <option key={priority} value={priority}>
                        {priority.charAt(0).toUpperCase() + priority.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label style={{
                  display: 'block',
                  marginBottom: '8px',
                  fontSize: '14px',
                  fontWeight: '600',
                  color: darkMode ? '#e5e7eb' : '#374151'
                }}>
                  Due Date
                </label>
                <input
                  type="date"
                  value={newDueDate}
                  onChange={(e) => setNewDueDate(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: `1px solid ${darkMode ? '#4b5563' : '#d1d5db'}`,
                    borderRadius: '8px',
                    fontSize: '15px',
                    backgroundColor: darkMode ? '#374151' : '#ffffff',
                    color: darkMode ? '#e5e7eb' : '#374151',
                    outline: 'none',
                    transition: 'all 0.2s ease'
                  }}
                />
              </div>

              <div style={{
                display: 'flex',
                gap: '16px',
                justifyContent: 'flex-end',
                flexWrap: 'wrap'
              }}>
                <button
                  type="button"
                  onClick={() => {
                    setNewTodo('');
                    setNewCategory('Personal');
                    setNewPriority('medium');
                    setNewDueDate('');
                  }}
                  style={{
                    padding: '12px 24px',
                    borderRadius: '8px',
                    border: `1px solid ${darkMode ? '#4b5563' : '#d1d5db'}`,
                    fontSize: '15px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    transition: 'all 0.2s ease',
                    backgroundColor: darkMode ? '#374151' : '#f3f4f6',
                    color: darkMode ? '#e5e7eb' : '#374151'
                  }}
                >
                  Clear
                </button>
                <button
                  type="submit"
                  style={{
                    padding: '12px 24px',
                    borderRadius: '8px',
                    border: 'none',
                    fontSize: '15px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    transition: 'all 0.2s ease',
                    backgroundColor: '#2563eb',
                    color: '#ffffff'
                  }}
                >
                  <Plus size={16} />
                  Add Task
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddTodoPage;
