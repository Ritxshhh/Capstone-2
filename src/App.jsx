import React, { useState, useEffect } from 'react';
import { Plus, Edit3, Trash2, Check, X, Calendar, Tag, User, BarChart3, Search, Filter, Moon, Sun, Menu, Home, ListTodo, PlusCircle } from 'lucide-react';

const TodoApp = () => {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [todos, setTodos] = useState([
    { id: 1, text: 'Complete project proposal', completed: false, category: 'Work', priority: 'high', dueDate: '2025-07-25' },
    { id: 2, text: 'Buy groceries', completed: true, category: 'Personal', priority: 'medium', dueDate: '2025-07-24' },
    { id: 3, text: 'Call dentist for appointment', completed: false, category: 'Health', priority: 'low', dueDate: '2025-07-26' },
    { id: 4, text: 'Review quarterly reports', completed: false, category: 'Work', priority: 'high', dueDate: '2025-07-27' },
    { id: 5, text: 'Plan weekend trip', completed: false, category: 'Personal', priority: 'medium', dueDate: '2025-07-28' }
  ]);
  const [newTodo, setNewTodo] = useState('');
  const [newCategory, setNewCategory] = useState('Personal');
  const [newPriority, setNewPriority] = useState('medium');
  const [newDueDate, setNewDueDate] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  const categories = ['Personal', 'Work', 'Health', 'Shopping', 'Other'];
  const priorities = ['low', 'medium', 'high'];

  // Check for system preference and set initial dark mode
  useEffect(() => {
    const savedTheme = window.localStorage?.getItem('theme');
    if (savedTheme) {
      setDarkMode(savedTheme === 'dark');
    } else if (window.matchMedia) {
      setDarkMode(window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
  }, []);

  // Handle responsive sidebar
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    if (window.localStorage) {
      window.localStorage.setItem('theme', newMode ? 'dark' : 'light');
    }
  };

  const addTodo = () => {
    if (newTodo.trim()) {
      setTodos([...todos, {
        id: Date.now(),
        text: newTodo.trim(),
        completed: false,
        category: newCategory,
        priority: newPriority,
        dueDate: newDueDate || new Date().toISOString().split('T')[0]
      }]);
      setNewTodo('');
      setNewDueDate('');
    }
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const toggleComplete = (id) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const startEdit = (id, text) => {
    setEditingId(id);
    setEditText(text);
  };

  const saveEdit = () => {
    setTodos(todos.map(todo => 
      todo.id === editingId ? { ...todo, text: editText } : todo
    ));
    setEditingId(null);
    setEditText('');
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditText('');
  };

  const getFilteredTodos = () => {
    return todos.filter(todo => {
      const matchesSearch = todo.text.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = filterCategory === 'all' || todo.category === filterCategory;
      const matchesStatus = filterStatus === 'all' || 
        (filterStatus === 'completed' && todo.completed) ||
        (filterStatus === 'pending' && !todo.completed);
      return matchesSearch && matchesCategory && matchesStatus;
    });
  };

  const getStats = () => {
    const total = todos.length;
    const completed = todos.filter(t => t.completed).length;
    const pending = total - completed;
    const overdue = todos.filter(t => !t.completed && new Date(t.dueDate) < new Date()).length;
    return { total, completed, pending, overdue };
  };

  const getPriorityColors = (priority) => {
    const colors = {
      high: { bg: darkMode ? '#7f1d1d' : '#fef2f2', text: darkMode ? '#fca5a5' : '#dc2626' },
      medium: { bg: darkMode ? '#78350f' : '#fffbeb', text: darkMode ? '#fcd34d' : '#d97706' },
      low: { bg: darkMode ? '#14532d' : '#f0fdf4', text: darkMode ? '#86efac' : '#16a34a' }
    };
    return colors[priority] || colors.medium;
  };

  const Sidebar = () => (
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
          TaskMaster Pro
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

  const Header = ({ title }) => (
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

  const DashboardPage = () => {
    const stats = getStats();
    const recentTodos = todos.slice(-5).reverse();

    return (
      <>
        <Header title="Dashboard" />
        <div style={{
          flex: 1,
          overflow: 'auto',
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

  const TodosPage = () => {
    const filteredTodos = getFilteredTodos();

    return (
      <>
        <Header title="All Tasks" />
        <div style={{
          flex: 1,
          overflow: 'auto',
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

  const AddTodoPage = () => {
    return (
      <>
        <Header title="Add New Task" />
        <div style={{
          flex: 1,
          overflow: 'auto',
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

  const AnalyticsPage = () => {
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
        <Header title="Analytics" />
        <div style={{
          flex: 1,
          overflow: 'auto',
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

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <DashboardPage />;
      case 'todos':
        return <TodosPage />;
      case 'add':
        return <AddTodoPage />;
      case 'analytics':
        return <AnalyticsPage />;
      default:
        return <DashboardPage />;
    }
  };

  return (
    <div style={{
      height: '100vh',
      width: '100vw',
      overflow: 'hidden',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      fontSize: '14px',
      lineHeight: '1.5',
      color: darkMode ? '#e5e7eb' : '#374151',
      backgroundColor: darkMode ? '#111827' : '#f8fafc',
      display: 'flex',
      transition: 'all 0.3s ease',
      position: 'relative'
    }}>
      <Sidebar />
      {/* Overlay for mobile when sidebar is open */}
      {sidebarOpen && window.innerWidth < 1024 && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 999
          }}
          onClick={() => setSidebarOpen(false)}
        />
      )}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        overflow: 'hidden',
        marginLeft: sidebarOpen && window.innerWidth >= 1024 ? '280px' : '0',
        transition: 'margin-left 0.3s ease',
        width: sidebarOpen && window.innerWidth >= 1024 ? 'calc(100vw - 280px)' : '100vw'
      }}>
        {renderCurrentPage()}
      </div>
    </div>
  );
};

export default TodoApp;