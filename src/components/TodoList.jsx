import React from 'react';

    function TodoList({ todos, removeTodo }) {
      return (
        <ul className="todo-list">
          {todos.map((todo) => (
            <li key={todo.id} className="todo-item">
              {todo.task}
              <button onClick={() => removeTodo(todo.id)}>Remove</button>
            </li>
          ))}
        </ul>
      );
    }

    export default TodoList;