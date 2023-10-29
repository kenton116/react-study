import React, { useState, useEffect } from 'react'
import classNames from 'classnames';
import ReactDOM from 'react-dom';
import { onAuthStateChanged, signOut } from "firebase/auth";
import auth from "./FirebaseConfig.js";
import { Router, useNavigate } from "react-router-dom";

const Mypage = () => {

  const getKey = () => Math.random().toString(32).substring(2);
  const [user, setUser] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() =>{
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
  },[]);

  const navigate = useNavigate();

  const logout = async () => {
    await signOut(auth);
    navigate("/login")
  }

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
      return false;
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
  
      return (
        <>
        {!loading && (
          <>
          {!user ? (
            <useNavigate to={`/login`} />
          ) : (
          <div className="panel">
            <div className="panel-heading">
              やることリスト
              <p>こんにちは！ {user?.email} さん</p>
              <button onClick={logout} className="button is-info">ログアウト</button>
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
          )}
          </>
        )}
        </>
      );
    };
  
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
        <button
          onClick={handleClick.bind(null, 'ALL')}
          className={classNames('button is-info', { 'is-active': value === 'ALL' })}
        >すべて</button>
        <button
          onClick={handleClick.bind(null, 'TODO')}
          className={classNames('button is-info', { 'is-active': value === 'TODO' })}
        >未完了</button>
        <button
          onClick={handleClick.bind(null, 'DONE')}
          className={classNames('button is-info', { 'is-active': value === 'DONE' })}
        >完了済み</button>
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
      <Router>
        <Todo />
      </Router>
    );
  }
  const root = document.getElementById('root');
  ReactDOM.render(<App />, root);
}

export default Mypage