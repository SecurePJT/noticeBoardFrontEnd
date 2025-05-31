import React, { useEffect, useState } from 'react';
import AppRouter from './routes/AppRouter';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    //const savedUser = localStorage.getItem('user');
    //if (savedUser) {
     // setUser(JSON.parse(savedUser));
   // }
  }, []);

  return <AppRouter user={user} setUser={setUser} />;
}

export default App;