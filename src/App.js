import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

//Context
import AlertaState from './Context/alertas/alertaState';
import AuthState from './Context/autenticacion/authState';
import EmpleadoState from './Context/empleados/empleadoState';
import ClienteState from './Context/clientes/clienteState';
import ProveedorState from './Context/proveedores/proveedorState';
import UsuarioState from './Context/usuarios/usuarioState';
import CategoriaState from './Context/categorias/categoriaState';
import ProductoState from './Context/productos/productoState';
import BodegaState from './Context/bodegas/bodegaState';
import OrdenCompraState from './Context/ordenesCompra/ordenescompraState';
//Component ruta privada
import RutaPrivada from './Components/rutas/RutaPrivada';

//Pages 
import Home from 'Pages/Home';
import PanelAdmin from 'Pages/PanelAdmin';

function App() {
  return (
    <>
    <OrdenCompraState>
    <BodegaState>
    <ProductoState>
    <CategoriaState>
    <UsuarioState>
    <EmpleadoState>
    <ClienteState>
    <ProveedorState> 
      <AlertaState>
        <AuthState>
          <Router>
            <Switch>
              <Route exact path="/" component={Home}/>
              <RutaPrivada path="/admin" component={PanelAdmin}/>
            </Switch>
          </Router>  
        </AuthState>
      </AlertaState>
    </ProveedorState>
    </ClienteState>
    </EmpleadoState>
    </UsuarioState>
    </CategoriaState>
    </ProductoState>
    </BodegaState>
    </OrdenCompraState>
    </>
  );
}

export default App;
