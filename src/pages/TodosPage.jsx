
import React from 'react';
import { Search, Check, Edit3, Trash2, X, Tag, Calendar } from 'lucide-react';
import Header from '../components/Header';

const TodosPage = ({ 
  darkMode, 
  getFilteredTodos, 
  searchTerm, 
  setSearchTerm, 
  filterCategory, 
  setFilterCategory, 
  filterStatus, 
  setFilterStatus, 
  categories, 
  toggleComplete, 
  startEdit, 
  deleteTodo, 
  editingId, 
  editText, 
  setEditText, 
  saveEdit, 
  cancelEdit, 
  getPriorityColors,
  setSidebarOpen,
  sidebarOpen
}) => {
  const filteredTodos = getFilteredTodos();

  return (
    <>
      <Header title="All Tasks" darkMode={darkMode} setSidebarOpen={setSidebarOpen} sidebarOpen={sidebarOpen} />
      <div style={{
        flex: 1,
        overflowY: 'auto',
        overflowX: 'hidden',
        backgroundColor: darkMode ? '#111827' : '#f8fafc',
        padding: 'clamp(16px, 3vw, 24px)'
      }}>
        {/* Filters */}
        <div style={{
          backgroundColor: darkMode ? '#1f2937' : '#ffffff',
          border: `1px solid ${darkMode ? '#374151' : '#e5e7eb'}`,
          borderRadius: '12px',
          padding: 'clamp(16px, 3vw, 24px)',
          boxShadow: darkMode ? '0 4px 20px rgba(0,0,0,0.3)' : '0 4px 20px rgba(0,0,0,0.08)',
          marginBottom: '24px'
        }}>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '16px'
          }}>
            <div style={{ position: 'relative' }}>
              <Search 
                size={16} 
                style={{ 
                  position: 'absolute', 
                  left: '16px', 
                  top: '50%', 
                  transform: 'translateY(-50%)', 
                  color: darkMode ? '#9ca3af' : '#6b7280' 
                }} 
              />
              <input
                type="text"
                placeholder="Search tasks..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  width: '100%',
                  maxWidth: '400px',
                  padding: '12px 16px 12px 48px',
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
              flexWrap: 'wrap'
            }}>
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                style={{
                  padding: '12px 16px',
                  border: `1px solid ${darkMode ? '#4b5563' : '#d1d5db'}`,
                  borderRadius: '8px',
                  fontSize: '15px',
                  backgroundColor: darkMode ? '#374151' : '#ffffff',
                  color: darkMode ? '#e5e7eb' : '#374151',
                  outline: 'none',
                  transition: 'all 0.2s ease',
                  minWidth: '150px'
                }}
              >
                <option value="all">All Categories</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>

              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                style={{
                  padding: '12px 16px',
                  border: `1px solid ${darkMode ? '#4b5563' : '#d1d5db'}`,
                  borderRadius: '8px',
                  fontSize: '15px',
                  backgroundColor: darkMode ? '#374151' : '#ffffff',
                  color: darkMode ? '#e5e7eb' : '#374151',
                  outline: 'none',
                  transition: 'all 0.2s ease',
                  minWidth: '150px'
                }}
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
              </select>
            </div>
          </div>
        </div>

        {/* Todo List */}
        <div style={{
          backgroundColor: darkMode ? '#1f2937' : '#ffffff',
          border: `1px solid ${darkMode ? '#374151' : '#e5e7eb'}`,
          borderRadius: '12px',
          padding: 'clamp(16px, 3vw, 24px)',
          boxShadow: darkMode ? '0 4px 20px rgba(0,0,0,0.3)' : '0 4px 20px rgba(0,0,0,0.08)'
        }}>
          {filteredTodos.length === 0 ? (
            <div style={{
              textAlign: 'center',
              padding: '60px 0'
            }}>
              <p style={{
                color: darkMode ? '#9ca3af' : '#6b7280',
                fontSize: '16px'
              }}>
                No tasks found matching your criteria
              </p>
            </div>
          ) : (
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '12px'
            }}>
              {filteredTodos.map(todo => (
                <div key={todo.id} style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '16px',
                  padding: 'clamp(12px, 2vw, 20px)',
                  backgroundColor: darkMode ? '#374151' : '#ffffff',
                  border: `1px solid ${darkMode ? '#4b5563' : '#e5e7eb'}`,
                  borderRadius: '8px',
                  transition: 'all 0.2s ease'
                }}>
                  <button
                    onClick={() => toggleComplete(todo.id)}
                    style={{
                      width: '20px',
                      height: '20px',
                      borderRadius: '4px',
                      border: `2px solid ${todo.completed ? '#10b981' : (darkMode ? '#4b5563' : '#d1d5db')}`,
                      backgroundColor: todo.completed ? '#10b981' : 'transparent',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      color: '#ffffff',
                      marginTop: '2px',
                      flexShrink: 0
                    }}
                  >
                    {todo.completed && <Check size={12} />}
                  </button>
                  
                  <div style={{ flex: 1, minWidth: 0 }}>
                    {editingId === todo.id ? (
                      <div style={{
                        display: 'flex',
                        gap: '12px',
                        alignItems: 'center',
                        flexWrap: 'wrap'
                      }}>
                        <input
                          type="text"
                          value={editText}
                          onChange={(e) => setEditText(e.target.value)}
                          style={{
                            flex: 1,
                            minWidth: '200px',
                            padding: '12px 16px',
                            border: `1px solid ${darkMode ? '#4b5563' : '#d1d5db'}`,
                            borderRadius: '8px',
                            fontSize: '15px',
                            backgroundColor: darkMode ? '#374151' : '#ffffff',
                            color: darkMode ? '#e5e7eb' : '#374151',
                            outline: 'none'
                          }}
                          onKeyPress={(e) => e.key === 'Enter' && saveEdit()}
                        />
                        <button
                          onClick={saveEdit}
                          style={{
                            padding: '8px',
                            borderRadius: '8px',
                            border: 'none',
                            backgroundColor: '#10b981',
                            color: '#ffffff',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}
                        >
                          <Check size={16} />
                        </button>
                        <button
                          onClick={cancelEdit}
                          style={{
                            padding: '8px',
                            borderRadius: '8px',
                            border: 'none',
                            backgroundColor: '#ef4444',
                            color: '#ffffff',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}
                        >
                          <X size={16} />
                        </button>
                      </div>
                    ) : (
                      <div>
                        <p style={{
                          margin: '0 0 8px 0',
                          fontSize: 'clamp(14px, 2.5vw, 16px)',
                          fontWeight: '500',
                          color: todo.completed ? (darkMode ? '#9ca3af' : '#6b7280') : (darkMode ? '#ffffff' : '#1f2937'),
                          textDecoration: todo.completed ? 'line-through' : 'none',
                          wordBreak: 'break-word'
                        }}>
                          {todo.text}
                        </p>
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '12px',
                          flexWrap: 'wrap'
                        }}>
                          <span style={{
                            padding: '4px 12px',
                            borderRadius: '9999px',
                            fontSize: '12px',
                            fontWeight: '600',
                            textTransform: 'uppercase',
                            letterSpacing: '0.025em',
                            backgroundColor: getPriorityColors(todo.priority).bg,
                            color: getPriorityColors(todo.priority).text
                          }}>
                            {todo.priority}
                          </span>
                          <span style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px',
                            fontSize: '12px',
                            color: darkMode ? '#9ca3af' : '#6b7280'
                          }}>
                            <Tag size={12} />
                            {todo.category}
                          </span>
                          <span style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px',
                            fontSize: '12px',
                            color: darkMode ? '#9ca3af' : '#6b7280'
                          }}>
                            <Calendar size={12} />
                            {todo.dueDate}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {editingId !== todo.id && (
                    <div style={{
                      display: 'flex',
                      gap: '8px',
                      flexShrink: 0
                    }}>
                      <button
                        onClick={() => startEdit(todo.id, todo.text)}
                        style={{
                          padding: '8px',
                          borderRadius: '8px',
                          border: 'none',
                          backgroundColor: 'transparent',
                          color: darkMode ? '#9ca3af' : '#6b7280',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          transition: 'all 0.2s ease'
                        }}
                      >
                        <Edit3 size={16} />
                      </button>
                      <button
                        onClick={() => deleteTodo(todo.id)}
                        style={{
                          padding: '8px',
                          borderRadius: '8px',
                          border: 'none',
                          backgroundColor: 'transparent',
                          color: darkMode ? '#9ca3af' : '#6b7280',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          transition: 'all 0.2s ease'
                        }}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default TodosPage;
