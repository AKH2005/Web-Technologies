import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [users, setUsers] = useState([]); // store fetched data
  const [loading, setLoading] = useState(true); // loading state
  const [error, setError] = useState(""); // error state

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await fetch("https://jsonplaceholder.typicode.com/users");

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const data = await response.json();
      setUsers(data);
      setError("");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>User Data from API</h1>

      {loading && <p className="loading">Loading data...</p>}

      {error && <p className="error">Error: {error}</p>}

      {!loading && !error && (
        <div className="card-container">
          {users.map((user) => (
            <div className="card" key={user.id}>
              <h2>{user.name}</h2>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Company:</strong> {user.company.name}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;