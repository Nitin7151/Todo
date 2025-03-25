import React, { useState } from 'react';

    function TodoForm({ addTodo }) {
      const [task, setTask] = useState('');

      const handleChange = (e) => {
        setTask(e.target.value);
      };

      const handleSubmit = (e) => {
        e.preventDefault();
        if (task.trim()) {
          addTodo(task);
          setTask('');
        }
      };

      return (
        <form className="form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="task">New Task:</label>
            <input
              type="text"
              id="task"
              name="task"
              value={task}
              onChange={handleChange}
            />
          </div>
          <button type="submit">Add</button>
        </form>
      );
    }

    export default TodoForm;