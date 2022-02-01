import React from "react";
import { BrowserRouter, Route, Routes} from 'react-router-dom';


//components
import Login from "./components/auth/Login/Login.js";
import NuevaCuenta from "./components/auth/NuevaCuenta/NuevaCuenta";
import Proyectos from "./components/proyectos/Proyectos";

import ProyectoState from './context/proyectos/proyectosState';  
import TareaState from "./context/tareas/tareaState.js";
import AlertaState from "./context/alertas/alertaState.js";
import AuthState from "./context/autenticacion/authState.js";

import tokenAuth from "./config/token.js";

//Higher-Order Component
import RutaPrivada from "./components/rutas/RutaPrivada.js";

// Revisar si tenemos un token
const token = localStorage.getItem('token');
if(token) {
  tokenAuth(token);
}

function App() {

  return (

        <ProyectoState>
          <TareaState>
            <AlertaState>
              <AuthState>
                <BrowserRouter>
                  <Routes>
                    <Route exact path="/" element={<Login/>}/>
                    <Route exact path="/nueva-cuenta" element={<NuevaCuenta/>}/>
                    <Route element={<RutaPrivada/>}>
                      <Route exact path="/proyectos" element={<Proyectos/>}/>
                    </Route>
                    
                  </Routes>      
                </BrowserRouter>
              </AuthState>
            </AlertaState>
          </TareaState>
        </ProyectoState> 

  );
}

export default App;
