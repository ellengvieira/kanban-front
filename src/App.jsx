import 'bootstrap/dist/css/bootstrap.min.css'
import '@popperjs/core/dist/cjs/popper.js'
import 'bootstrap/dist/js/bootstrap.min.js'
import 'bootstrap-icons/font/bootstrap-icons.css' 
import Menu from './componentes/Menu'
import Home from './componentes/Home'
import {BrowserRouter as Router, Routes , Route } from 'react-router-dom'
import React from 'react';
import Colunas from './componentes/telas/colunas/Colunas';
import Tarefas from './componentes/telas/tarefas/Tarefas'

function App() {
  return (
    <Router>
        <Menu/>
        <Routes>
          <Route exact path="/" element={<Home/>}/>
          <Route exact path="/colunas" element={<Colunas/>}/>
          <Route exact path="/tarefas" element={<Tarefas/>}/>
        </Routes>
    </Router>
  );
}

export default App;

