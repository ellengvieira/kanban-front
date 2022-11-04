import 'bootstrap/dist/css/bootstrap.min.css'
import '@popperjs/core/dist/cjs/popper.js'
import 'bootstrap/dist/js/bootstrap.min.js'
import 'bootstrap-icons/font/bootstrap-icons.css'
import MenuPublico from './componentes/MenuPublico'
import MenuPrivado from './componentes/MenuPrivado'
import Home from './componentes/Home'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import React from 'react';
import Colunas from './componentes/telas/colunas/Colunas';
import Tarefas from './componentes/telas/tarefas/Tarefas'
import Login from './componentes/telas/login/Login'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MenuPublico />}  >
          <Route index element={<Home />} />
          <Route exact="true" path="/login" element={<Login />} />
        </Route>

        <Route path="/privado" element={<MenuPrivado />}  >
          <Route index element={<Home />} />
          <Route exact="true" path="colunas" element={<Colunas />} />
          <Route exact="true" path="tarefas" element={<Tarefas />} />
          <Route exact="true" path="login" element={<Login />} />
        </Route>
      </Routes>
    </Router>

  );
}

export default App;

