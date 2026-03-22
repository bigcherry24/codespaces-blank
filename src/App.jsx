import './App.css'
import { Route, Routes } from 'react-router-dom';
import React, { useContext } from 'react';
import { AuthContext } from './components/AuthContext';
import { Link } from 'react-router-dom';

function HomePage() {
  const {user} = useContext(AuthContext);
  return (
    <div style={{padding: "0 1.5rem"}}>
      <h1>Home Page</h1>
      { user.isAuth ? (
        <p>Welcome, {user.name}!</p>
      ) : (
        <p>Please log in to access your profile.</p>
      )}
    </div>
  )
}

function ProfilePage() {
  const {user} = useContext(AuthContext);
   return (
    <div style={{padding: "0 1.5rem"}}>
      <h1>Profile</h1>
      <p>Name : {user.name} </p>
      <p>Here you could show more user info from the context.</p>
    </div>
  )
}

function Navbar() {
  const { user, logout } = useContext(AuthContext);
  
  const navStyle = {
    display: 'flex',
    gap: '1rem',
    padding: '1rem 1.5rem',
    borderBottom: '1px solid #e5e7eb',
  };

  const linkStyle = {
    textDecoration: 'none',
    color: '#a4b3d3',
    fontWeight: 600,
  };

  return (
    <nav style={navStyle}>
      <Link to="/" style={linkStyle}>Home</Link>
      <Link to="/profile" style={linkStyle}>Profile</Link>
      {user.isAuth ? <button onClick={logout} style={linkStyle}>Logout</button> : <Link to="/login" style={linkStyle}>Login</Link>}
    </nav>
  );
}

function LoginPage() {
  
  const [name, setName] = React.useState('');
  const {user, login } = useContext(AuthContext);

  function handleSubmit(e) {
    e.preventDefault();
    if(!name.trim()) {
      return;
    }
    login(name)
  }

  return (
    <div style={{padding: "0 1.5rem"}}>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="Enter your name" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          style={{ padding: '0.5rem', fontSize: '1rem', width: '100%', maxWidth: '300px' }}
        />
        <button type="submit" style={{ marginTop: '1rem', padding: '0.5rem 1rem', fontSize: '1rem' }}>
          Login
        </button>
      </form>

      {user.isAuth && <p>User Logged In</p>}
    </div>
  )
}

export default function App() {
  const [user, setUser] = React.useState({name: "", isAuth: false});

  function login(name){
    setUser({name: name, isAuth: true});
  }

  function logout(){
    setUser({name: "", isAuth: false});
  }

  return (
    <div>
      <AuthContext.Provider value={{ user, login, logout }}>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="*" 
            element={<h1 style={{ padding: '0 1.5rem' }}>404 Not Found</h1>} />
        </Routes>
      </AuthContext.Provider>
    </div>
  );

}