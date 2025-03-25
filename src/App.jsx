import React, { useState } from 'react';
    import TodoForm from './components/TodoForm.jsx';
    import TodoList from './components/TodoList.jsx';

    function App() {
      const [todos, setTodos] = useState([]);

      const addTodo = (task) => {
        setTodos([...todos, { task, id: Date.now() }]);
      };

      const removeTodo = (id) => {
        setTodos(todos.filter(todo => todo.id !== id));
      };

      return (
        <div className="app-container">
          <h1>Todo App</h1>
          <TodoForm addTodo={addTodo} />
          <TodoList todos={todos} removeTodo={removeTodo} />
        </div>
      );
    }

    export default App;