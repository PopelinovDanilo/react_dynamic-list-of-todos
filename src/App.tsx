/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getActiveTodos, getComplitedTodos, getTodos } from './api';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filtredTodos, setFiltredTodos] = useState<Todo[]>([]);
  const [displayOption, setDisplayOption] = useState('all');
  const [loading, setLoading] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState(0);

  const handleLoading = () => {
    setLoading(false)
  }


  useEffect(() => {
    setLoading(true);
    if (displayOption === 'active') {
      getActiveTodos().then(data => {
          setTodos(data)
          setFiltredTodos(data)
      })
      .finally(() => handleLoading())
    } else if (displayOption === 'completed') {
      getComplitedTodos().then(data => {
          setTodos(data)
          setFiltredTodos(data)
        })
        .finally(() => handleLoading())
    } else {
      getTodos().then(data => {
          setTodos(data)
          setFiltredTodos(data)
      })
        .finally(() => handleLoading())
    }
      }, [displayOption]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter onDisplayed={setDisplayOption} displayOption={displayOption} todos={todos} onFiltred={setFiltredTodos}/>
            </div>

            <div className="block">
              {loading && <Loader />}
              <TodoList todos={filtredTodos} onSelected={setSelectedTodo} selectedTodo={selectedTodo}/>
              {selectedTodo > 0 && <TodoModal todos={todos} selectedTodo={selectedTodo} onClose={setSelectedTodo}/>}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
