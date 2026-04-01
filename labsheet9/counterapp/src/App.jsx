import { useState } from 'react';
import './App.css';

function App() {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount(count + 1);
  };

  const decrement = () => {
    setCount(count - 1);
  };

  return (
    <div className="container">
      <div className="counter-card">
        <h1>Simple Counter App</h1>
        <h2>{count}</h2>

        <div className="button-group">
          <button onClick={increment}>Increment</button>
          <button onClick={decrement}>Decrement</button>
        </div>
      </div>
    </div>
  );
}

export default App;