
import React from 'react';
import { BarChart3, Check, Calendar, X } from 'lucide-react';
import Header from '../components/Header';

const DashboardPage = ({ todos, darkMode, getStats, getPriorityColors, setSidebarOpen, sidebarOpen }) => {
  const stats = getStats();
  const recentTodos = todos.slice(-5).reverse();

  return (
    <>
      <Header title="Dashboard" darkMode={darkMode} setSidebarOpen={setSidebarOpen} sidebarOpen={sidebarOpen} />
      <div style={{
        flex: 1,
        overflowY: 'auto',
        overflowX: 'hidden',
        backgroundColor: darkMode ? '#111827' : '#f8fafc',
        padding: 'clamp(16px, 3vw, 24px)'
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: 'clamp(16px, 3vw, 24px)',
          marginBottom: '32px'
        }}>
          {[
            { icon: BarChart3, value: stats.total, label: 'Total Tasks', color: '#2563eb' },
            { icon: Check, value: stats.completed, label: 'Completed', color: '#16a34a' },
            { icon: Calendar, value: stats.pending, label: 'Pending', color: '#d97706' },
            { icon: X, value: stats.overdue, label: 'Overdue', color: '#dc2626' }
          ].map((stat, index) => (
            <div key={index} style={{
              backgroundColor: darkMode ? '#1f2937' : '#ffffff',
              border: `1px solid ${darkMode ? '#374151' : '#e5e7eb'}`,
              borderRadius: '12px',
              padding: 'clamp(16px, 3vw, 24px)',
              boxShadow: darkMode ? '0 4px 20px rgba(0,0,0,0.3)' : '0 4px 20px rgba(0,0,0,0.08)',
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              transition: 'all 0.2s ease'
            }}>
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '12px',
                backgroundColor: `${stat.color}20`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <stat.icon size={24} style={{ color: stat.color }} />
              </div>
              <div>
                <p style={{
                  margin: 0,
                  fontSize: 'clamp(16px, 3vw, 20px)',
                  fontWeight: '700',
                  color: darkMode ? '#ffffff' : '#1f2937'
                }}>
                  {stat.value}
                </p>
                <p style={{
                  margin: 0,
                  fontSize: '14px',
                  color: darkMode ? '#9ca3af' : '#6b7280'
                }}>
                  {stat.label}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div style={{
          backgroundColor: darkMode ? '#1f2937' : '#ffffff',
          border: `1px solid ${darkMode ? '#374151' : '#e5e7eb'}`,
          borderRadius: '12px',
          padding: 'clamp(16px, 3vw, 24px)',
          boxShadow: darkMode ? '0 4px 20px rgba(0,0,0,0.3)' : '0 4px 20px rgba(0,0,0,0.08)'
        }}>
          <h3 style={{
            margin: '0 0 20px 0',
            fontSize: 'clamp(16px, 3vw, 18px)',
            fontWeight: '600',
            color: darkMode ? '#ffffff' : '#1f2937'
          }}>
            Recent Tasks
          </h3>
          {recentTodos.length === 0 ? (
            <p style={{
              color: darkMode ? '#9ca3af' : '#6b7280',
              textAlign: 'center',
              padding: '40px 0'
            }}>
              No tasks yet. Create your first task!
            </p>
          ) : (
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '12px'
            }}>
              {recentTodos.map(todo => (
                <div key={todo.id} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  padding: 'clamp(12px, 2vw, 20px)',
                  backgroundColor: darkMode ? '#374151' : '#ffffff',
                  border: `1px solid ${darkMode ? '#4b5563' : '#e5e7eb'}`,
                  borderRadius: '8px',
                  transition: 'all 0.2s ease'
                }}>
                  <div style={{
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
                    color: '#ffffff'
                  }}>
                    {todo.completed && <Check size={12} />}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{
                      margin: '0 0 4px 0',
                      fontSize: 'clamp(14px, 2.5vw, 15px)',
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
                        fontSize: '12px',
                        color: darkMode ? '#9ca3af' : '#6b7280'
                      }}>
                        {todo.category}
                      </span>
                      <span style={{
                        fontSize: '12px',
                        color: darkMode ? '#9ca3af' : '#6b7280'
                      }}>
                        {todo.dueDate}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default DashboardPage;
