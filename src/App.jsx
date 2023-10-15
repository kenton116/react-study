import React from 'react'
import classNames from 'classnames';
import ReactDOM from 'react-dom';

const getKey = () => Math.random().toString(32).substring(2);

function Todo() {
  const [items, setItems] = React.useState([]);
  const [filter, setFilter] = React.useState('ALL');

  const handleAdd = text => {
    setItems([...items, { key: getKey(), text, done: false }]);
  };

  const handleFilterChange = value => setFilter(value);

  const displayItems = items.filter(item => {
    if (filter === 'ALL') return true;
    if (filter === 'TODO') return !item.done;
    if (filter === 'DONE') return item.done;
  });

  const handleCheck = checked => {
    const newItems = items.map(item => {
      if (item.key === checked.key) {
        item.done = !item.done;
      }
      return item;
    });
    setItems(newItems);
  };

  if (displayItems.length === 0) {
    return (
      <div className="panel">
        <div className="panel-heading">
          やることリスト
        </div>
        <Input onAdd={handleAdd} />
        <Filter
          onChange={handleFilterChange}
          value={filter}
        />
        <div className="has-text-centered">
          タスクがありません
        </div>
        <div className="panel-block">
          {displayItems.length} 個のタスク
        </div>
      </div>
    )
  } else {
    return (
      <div className="panel">
        <div className="panel-heading">
          やることリスト
        </div>
        <Input onAdd={handleAdd} />
        <Filter
          onChange={handleFilterChange}
          value={filter}
        />
        {displayItems.map(item => (
          <div>
            <TodoItem
            key={item.text}
            item={item}
            onCheck={handleCheck}
            />
          </div>
        ))}
        <div className="panel-block">
          {displayItems.length} 個のタスク
        </div>
      </div>
    );
  }

}

function Input({ onAdd }) {
  const [text, setText] = React.useState('');

  const handleChange = e => setText(e.target.value);

  const handleKeyDown = e => {
    if (e.key === 'Enter' && text !== "") {
      onAdd(text);
      setText('');
    }
  };

  const handleClick = e => {
    if (text !== "") {
      onAdd(text);
      setText('');

    }
  }

  return (
    <div className="panel-block">
      <input
        className="input"
        type="text"
        placeholder="エンターキーで追加"
        value={text}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
      <button
        className="button is-info"
        type="button"
        onClick={handleClick}
      >追加</button>
    </div>
  );
}

function Filter({ value, onChange }) {
  const handleClick = (key, e) => {
    e.preventDefault();
    onChange(key);
  };

  return (
    <div className="panel-tabs">
      <a
        href="#"
        onClick={handleClick.bind(null, 'ALL')}
        className={classNames({ 'is-active': value === 'ALL' })}
      >すべて</a>
      <a
        href="#"
        onClick={handleClick.bind(null, 'TODO')}
        className={classNames({ 'is-active': value === 'TODO' })}
      >未完了</a>
      <a
        href="#"
        onClick={handleClick.bind(null, 'DONE')}
        className={classNames({ 'is-active': value === 'DONE' })}
      >完了済み</a>
    </div>
  );
}

function TodoItem({ item, onCheck }) {
  const handleChange = () => {
    onCheck(item);
  };

  return (
    <label className="panel-block">
      <input
        type="checkbox"
        checked={item.done}
        onChange={handleChange}
      />
      <span
        className={classNames({
          'has-text-grey-light': item.done
        })}
      >
        {item.text}
      </span>
    </label>
  );
}

function App() {
  return (
    <div className="container is-fluid">
      <Todo />
    </div>
  );
}

const root = document.getElementById('root');
ReactDOM.render(<App />, root);
export default App