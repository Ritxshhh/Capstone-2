
import React from 'react';
import Header from '../components/Header';

const AnalyticsPage = ({ todos, darkMode, getStats, categories, priorities, getPriorityColors, setSidebarOpen, sidebarOpen }) => {
  const stats = getStats();
  const categoryStats = categories.map(cat => ({
    name: cat,
    total: todos.filter(t => t.category === cat).length,
    completed: todos.filter(t => t.category === cat && t.completed).length
  })).filter(stat => stat.total > 0);

  const priorityStats = priorities.map(priority => ({
    name: priority,
    total: todos.filter(t => t.priority === priority).length,
    completed: todos.filter(t => t.priority === priority && t.completed).length
  })).filter(stat => stat.total > 0);

  return (
    <>
      <Header title="Analytics" darkMode={darkMode} setSidebarOpen={setSidebarOpen} sidebarOpen={sidebarOpen} />
      <div style={{
        flex: 1,
        overflowY: 'auto',
        overflowX: 'hidden',
        backgroundColor: darkMode ? '#111827' : '#f8fafc',
        padding: 'clamp(16px, 3vw, 24px)'
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
          gap: 'clamp(16px, 3vw, 32px)',
          marginBottom: '32px'
        }}>
          {/* Category Breakdown */}
          <div style={{
            backgroundColor: darkMode ? '#1f2937' : '#ffffff',
            border: `1px solid ${darkMode ? '#374151' : '#e5e7eb'}`,
            borderRadius: '12px',
            padding: 'clamp(20px, 4vw, 24px)',
            boxShadow: darkMode ? '0 4px 20px rgba(0,0,0,0.3)' : '0 4px 20px rgba(0,0,0,0.08)'
          }}>
            <h3 style={{
              margin: '0 0 24px 0',
              fontSize: 'clamp(16px, 3vw, 18px)',
              fontWeight: '600',
              color: darkMode ? '#ffffff' : '#1f2937'
            }}>
              Category Breakdown
            </h3>
            {categoryStats.length === 0 ? (
              <p style={{
                color: darkMode ? '#9ca3af' : '#6b7280',
                textAlign: 'center',
                padding: '40px 0'
              }}>
                No data available
              </p>
            ) : (
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '20px'
              }}>
                {categoryStats.map(stat => (
                  <div key={stat.name}>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: '8px'
                    }}>
                      <span style={{
                        fontSize: '15px',
                        fontWeight: '500',
                        color: darkMode ? '#ffffff' : '#1f2937'
                      }}>
                        {stat.name}
                      </span>
                      <span style={{
                        fontSize: '14px',
                        color: darkMode ? '#9ca3af' : '#6b7280'
                      }}>
                        {stat.completed}/{stat.total}
                      </span>
                    </div>
                    <div style={{
                      width: '100%',
                      height: '8px',
                      backgroundColor: darkMode ? '#374151' : '#e5e7eb',
                      borderRadius: '4px',
                      overflow: 'hidden'
                    }}>
                      <div style={{
                        height: '100%',
                        backgroundColor: '#2563eb',
                        width: `${stat.total > 0 ? (stat.completed / stat.total) * 100 : 0}%`,
                        transition: 'width 0.3s ease'
                      }}></div>
                    </div>
                    <p style={{
                      fontSize: '12px',
                      color: darkMode ? '#9ca3af' : '#6b7280',
                      margin: '4px 0 0 0'
                    }}>
                      {stat.total > 0 ? Math.round((stat.completed / stat.total) * 100) : 0}% complete
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Priority Distribution */}
          <div style={{
            backgroundColor: darkMode ? '#1f2937' : '#ffffff',
            border: `1px solid ${darkMode ? '#374151' : '#e5e7eb'}`,
            borderRadius: '12px',
            padding: 'clamp(20px, 4vw, 24px)',
            boxShadow: darkMode ? '0 4px 20px rgba(0,0,0,0.3)' : '0 4px 20px rgba(0,0,0,0.08)'
          }}>
            <h3 style={{
              margin: '0 0 24px 0',
              fontSize: 'clamp(16px, 3vw, 18px)',
              fontWeight: '600',
              color: darkMode ? '#ffffff' : '#1f2937'
            }}>
              Priority Distribution
            </h3>
            {priorityStats.length === 0 ? (
              <p style={{
                color: darkMode ? '#9ca3af' : '#6b7280',
                textAlign: 'center',
                padding: '40px 0'
              }}>
                No data available
              </p>
            ) : (
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '20px'
              }}>
                {priorityStats.map(stat => (
                  <div key={stat.name}>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: '8px'
                    }}>
                      <span style={{
                        padding: '4px 12px',
                        borderRadius: '9999px',
                        fontSize: '12px',
                        fontWeight: '600',
                        textTransform: 'capitalize',
                        letterSpacing: '0.025em',
                        backgroundColor: getPriorityColors(stat.name).bg,
                        color: getPriorityColors(stat.name).text
                      }}>
                        {stat.name} Priority
                      </span>
                      <span style={{
                        fontSize: '14px',
                        color: darkMode ? '#9ca3af' : '#6b7280'
                      }}>
                        {stat.completed}/{stat.total}
                      </span>
                    </div>
                    <div style={{
                      width: '100%',
                      height: '8px',
                      backgroundColor: darkMode ? '#374151' : '#e5e7eb',
                      borderRadius: '4px',
                      overflow: 'hidden'
                    }}>
                      <div style={{
                        height: '100%',
                        backgroundColor: getPriorityColors(stat.name).text,
                        width: `${stat.total > 0 ? (stat.completed / stat.total) * 100 : 0}%`,
                        transition: 'width 0.3s ease'
                      }}></div>
                    </div>
                    <p style={{
                      fontSize: '12px',
                      color: darkMode ? '#9ca3af' : '#6b7280',
                      margin: '4px 0 0 0'
                    }}>
                      {stat.total > 0 ? Math.round((stat.completed / stat.total) * 100) : 0}% complete
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Overall Progress */}
        <div style={{
          backgroundColor: darkMode ? '#1f2937' : '#ffffff',
          border: `1px solid ${darkMode ? '#374151' : '#e5e7eb'}`,
          borderRadius: '12px',
          padding: 'clamp(20px, 4vw, 32px)',
          boxShadow: darkMode ? '0 4px 20px rgba(0,0,0,0.3)' : '0 4px 20px rgba(0,0,0,0.08)'
        }}>
          <h3 style={{
            margin: '0 0 32px 0',
            fontSize: 'clamp(16px, 3vw, 18px)',
            fontWeight: '600',
            color: darkMode ? '#ffffff' : '#1f2937',
            textAlign: 'center'
          }}>
            Overall Progress
          </h3>
          
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            marginBottom: '32px'
          }}>
            <div style={{
              width: 'clamp(120px, 20vw, 160px)',
              height: 'clamp(120px, 20vw, 160px)',
              borderRadius: '50%',
              background: `conic-gradient(#2563eb ${stats.total > 0 ? (stats.completed / stats.total) * 360 : 0}deg, ${darkMode ? '#374151' : '#e5e7eb'} 0deg)`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              flexShrink: 0
            }}>
              <div style={{
                width: 'clamp(90px, 15vw, 120px)',
                height: 'clamp(90px, 15vw, 120px)',
                borderRadius: '50%',
                backgroundColor: darkMode ? '#1f2937' : '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column'
              }}>
                <div style={{
                  fontSize: 'clamp(24px, 6vw, 32px)',
                  fontWeight: '700',
                  color: darkMode ? '#ffffff' : '#1f2937'
                }}>
                  {stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0}%
                </div>
                <div style={{
                  fontSize: 'clamp(10px, 2vw, 12px)',
                  color: darkMode ? '#9ca3af' : '#6b7280',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em'
                }}>
                  Complete
                </div>
              </div>
            </div>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
            gap: '24px',
            textAlign: 'center'
          }}>
            {[
              { value: stats.total, label: 'Total Tasks', color: darkMode ? '#ffffff' : '#1f2937' },
              { value: stats.completed, label: 'Completed', color: '#16a34a' },
              { value: stats.pending, label: 'Pending', color: '#d97706' },
              { value: stats.overdue, label: 'Overdue', color: '#dc2626' }
            ].map((item, index) => (
              <div key={index}>
                <div style={{
                  fontSize: 'clamp(20px, 5vw, 28px)',
                  fontWeight: '700',
                  color: item.color
                }}>
                  {item.value}
                </div>
                <div style={{
                  fontSize: '14px',
                  color: darkMode ? '#9ca3af' : '#6b7280'
                }}>
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default AnalyticsPage;
