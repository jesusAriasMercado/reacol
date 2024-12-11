import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom'; 
import Home from './components/Home';
import Signin from './components/Signin';
import Login from './components/Login';
import Principal from './components/Principal';
import Plantilla from './components/Plantilla';
import Table from './components/Table';
import Clientes from './components/Clientes';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/login" element={<Login />} />
        <Route path="/principal" element={<Principal />} />
        <Route path="/plantilla" element={<Plantilla />} />
        <Route path="/tabla" element={<Table />} />
        <Route path="/clientes" element={<Clientes />} />
      </Routes>
    </Router>
  );
}

export default App;
