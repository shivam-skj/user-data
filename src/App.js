import React, { useState } from 'react';
import './App.css';

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchUsers = async (page) => {
    try {
      const response = await fetch(`https://reqres.in/api/users?page=${page}`);
      const data = await response.json();
      return data.data;
    } catch (error) {
      console.error('Error fetching users:', error);
      return [];
    }
  };

  const handleGetUsers = () => {
    setLoading(true);

    // Simulate a 200 millisecond delay before fetching data
    setTimeout(async () => {
      try {
        const usersPage1 = await fetchUsers(1);
        const usersPage2 = await fetchUsers(2);

        setUsers([...usersPage1, ...usersPage2]);
      } finally {
        setLoading(false);
      }
    }, 200); // 200 milliseconds 
  };

  return (
    <div className="App">
      <nav className="navbar">
        <div className="brand">AirData</div>
        <button onClick={handleGetUsers} className="get-users-btn">
          Get Users
        </button>
      </nav>
      {loading ? (
        <div className="loader">Loading...</div>
      ) : (
        <div className="user-grid">
          {users.map(user => (
            <div key={user.id} className="user-card">
              <img src={user.avatar} alt={user.first_name} />
              <div>{`${user.first_name} ${user.last_name}`}</div>
              <div>Email: {user.email}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;


