import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

//Context
import AlertaState from './Context/alertas/alertaState';
import AuthState from './Context/autenticacion/authState';
import EmpleadoState from './Context/empleados/empleadoState';
import ClienteState from './Context/clientes/clienteState';
import ProveedorState from './Context/proveedores/proveedorState';

//Pages 
import Home from 'Pages/Home';
import PanelAdmin from 'Pages/PanelAdmin';

function App() {
  return (
    <>
    <EmpleadoState>
    <ClienteState>
    <ProveedorState> 
      <AlertaState>
        <AuthState>
          <Router>
            <Switch>
              <Route exact path="/" component={Home}/>
              <Route path="/admin" component={PanelAdmin}/>
            </Switch>
          </Router>  
        </AuthState>
      </AlertaState>
    </ProveedorState>
    </ClienteState>
    </EmpleadoState>
    </>
  );
}

export default App;
