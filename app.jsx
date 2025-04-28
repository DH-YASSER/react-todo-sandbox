const { useState, useEffect } = React;

function App() {
  const [todos, setTodos] = useState(() => JSON.parse(localStorage.getItem('todos') || '[]'));
  const [input, setInput] = useState('');
  const [filter, setFilter] = useState('all');

  useEffect(() => { localStorage.setItem('todos', JSON.stringify(todos)); }, [todos]);

  const add = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    setTodos([...todos, { id: Date.now(), text: input, done: false }]);
    setInput('');
  };

  const toggle = (id) => setTodos(todos.map(t => t.id === id ? { ...t, done: !t.done } : t));
  const remove = (id) => setTodos(todos.filter(t => t.id !== id));

  const filtered = todos.filter(t =>
    filter === 'all' ? true : filter === 'active' ? !t.done : t.done
  );

  return (
    <div className="app">
      <h1>My Todos</h1>
      <form className="add-form" onSubmit={add}>
        <input value={input} onChange={e => setInput(e.target.value)} placeholder="What needs to be done?" />
        <button type="submit">Add</button>
      </form>
      <div className="filters">
        {['all','active','done'].map(f => (
          <button key={f} className={filter === f ? 'active' : ''} onClick={() => setFilter(f)}>{f}</button>
        ))}
      </div>
      {filtered.map(t => (
        <div key={t.id} className={`todo-item ${t.done ? 'done' : ''}`}>
          <input type="checkbox" checked={t.done} onChange={() => toggle(t.id)} />
          <span>{t.text}</span>
          <button onClick={() => remove(t.id)}>✕</button>
        </div>
      ))}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
