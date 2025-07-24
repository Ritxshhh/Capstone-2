
import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import DashboardPage from './pages/DashboardPage';
import TodosPage from './pages/TodosPage';
import AddTodoPage from './pages/AddTodoPage';
import AnalyticsPage from './pages/AnalyticsPage';

const TodoApp = () => {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [todos, setTodos] = useState(() => {
    try {
      const savedTodos = window.localStorage?.getItem('todos');
      return savedTodos ? JSON.parse(savedTodos) : [
        { id: 1, text: 'Complete project proposal', completed: false, category: 'Work', priority: 'high', dueDate: '2025-07-25' },
        { id: 2, text: 'Buy groceries', completed: true, category: 'Personal', priority: 'medium', dueDate: '2025-07-24' },
        { id: 3, text: 'Call dentist for appointment', completed: false, category: 'Health', priority: 'low', dueDate: '2025-07-26' },
        { id: 4, text: 'Review quarterly reports', completed: false, category: 'Work', priority: 'high', dueDate: '2025-07-27' },
        { id: 5, text: 'Plan weekend trip', completed: false, category: 'Personal', priority: 'medium', dueDate: '2025-07-28' }
      ];
    } catch (error) {
      console.error("Error parsing todos from localStorage", error);
      return [
        { id: 1, text: 'Complete project proposal', completed: false, category: 'Work', priority: 'high', dueDate: '2025-07-25' },
        { id: 2, text: 'Buy groceries', completed: true, category: 'Personal', priority: 'medium', dueDate: '2025-07-24' },
        { id: 3, text: 'Call dentist for appointment', completed: false, category: 'Health', priority: 'low', dueDate: '2025-07-26' },
        { id: 4, text: 'Review quarterly reports', completed: false, category: 'Work', priority: 'high', dueDate: '2025-07-27' },
        { id: 5, text: 'Plan weekend trip', completed: false, category: 'Personal', priority: 'medium', dueDate: '2025-07-28' }
      ];
    }
  });
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

  useEffect(() => {
    const savedTheme = window.localStorage?.getItem('theme');
    if (savedTheme) {
      setDarkMode(savedTheme === 'dark');
    } else if (window.matchMedia) {
      setDarkMode(window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
  }, []);

  useEffect(() => {
    if (window.localStorage) {
      window.localStorage.setItem('todos', JSON.stringify(todos));
    }
  }, [todos]);

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

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <DashboardPage 
          todos={todos} 
          darkMode={darkMode} 
          getStats={getStats} 
          getPriorityColors={getPriorityColors} 
          setSidebarOpen={setSidebarOpen} 
          sidebarOpen={sidebarOpen} 
        />;
      case 'todos':
        return <TodosPage 
          darkMode={darkMode} 
          getFilteredTodos={getFilteredTodos} 
          searchTerm={searchTerm} 
          setSearchTerm={setSearchTerm} 
          filterCategory={filterCategory} 
          setFilterCategory={setFilterCategory} 
          filterStatus={filterStatus} 
          setFilterStatus={setFilterStatus} 
          categories={categories} 
          toggleComplete={toggleComplete} 
          startEdit={startEdit} 
          deleteTodo={deleteTodo} 
          editingId={editingId} 
          editText={editText} 
          setEditText={setEditText} 
          saveEdit={saveEdit} 
          cancelEdit={cancelEdit} 
          getPriorityColors={getPriorityColors} 
          setSidebarOpen={setSidebarOpen} 
          sidebarOpen={sidebarOpen} 
        />;
      case 'add':
        return <AddTodoPage 
          darkMode={darkMode} 
          addTodo={addTodo} 
          newTodo={newTodo} 
          setNewTodo={setNewTodo} 
          newCategory={newCategory} 
          setNewCategory={setNewCategory} 
          newPriority={newPriority} 
          setNewPriority={setNewPriority} 
          newDueDate={newDueDate} 
          setNewDueDate={setNewDueDate} 
          categories={categories} 
          priorities={priorities} 
          setCurrentPage={setCurrentPage} 
          setSidebarOpen={setSidebarOpen} 
          sidebarOpen={sidebarOpen} 
        />;
      case 'analytics':
        return <AnalyticsPage 
          todos={todos} 
          darkMode={darkMode} 
          getStats={getStats} 
          categories={categories} 
          priorities={priorities} 
          getPriorityColors={getPriorityColors} 
          setSidebarOpen={setSidebarOpen} 
          sidebarOpen={sidebarOpen} 
        />;
      default:
        return <DashboardPage 
          todos={todos} 
          darkMode={darkMode} 
          getStats={getStats} 
          getPriorityColors={getPriorityColors} 
          setSidebarOpen={setSidebarOpen} 
          sidebarOpen={sidebarOpen} 
        />;
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
      <Sidebar 
        darkMode={darkMode} 
        toggleDarkMode={toggleDarkMode} 
        currentPage={currentPage} 
        setCurrentPage={setCurrentPage} 
        sidebarOpen={sidebarOpen} 
      />
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
