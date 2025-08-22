import { useEffect, useMemo, useState } from 'react';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[];
  displayOption: string;
  onFiltred: (todos: Todo[]) => void;
  onDisplayed: (option: string) => void;
};

export const TodoFilter = ({
  todos,
  displayOption,
  onFiltred,
  onDisplayed,
}: Props) => {
  const [query, setQuery] = useState('');
  const filtredTodos = useMemo(() => {
    return todos.filter(todo =>
      todo.title.toLowerCase().includes(query.toLowerCase()),
    );
  }, [query, todos]);

  useEffect(() => {
    onFiltred(filtredTodos);
  }, [filtredTodos, onFiltred]);

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    setQuery(value);
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;

    onDisplayed(value);
  };

  const handleClearSearch = () => {
    setQuery('');
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={displayOption}
            onChange={handleSelectChange}
          >
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
          value={query}
          onChange={handleQueryChange}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {query !== '' && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              onClick={handleClearSearch}
              data-cy="clearSearchButton"
              type="button"
              className="delete"
            />
          </span>
        )}
      </p>
    </form>
  );
};
