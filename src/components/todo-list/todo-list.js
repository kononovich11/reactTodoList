import React from 'react';
import TodoListItem from '../todo-list-item';
import './todo-list.css';

const TodoList = ({ todoData, onDeleted, onToggelImportant, onToggelDone }) => {

  const elements = todoData.map((item) => {
    const {id, ...itemProps} = item;

    return (
      <li key={id} className="list-group-item">
        <TodoListItem 
          {...itemProps}
          onDeleted={() => onDeleted(id)}
          onToggelImportant={() => onToggelImportant(id)}
          onToggelDone={() => onToggelDone(id)}
          />
      </li>
    );
  });

  return (
    <ul className="list-group todo-list">
      {elements}
    </ul>
  );
}

export default TodoList;