import React from 'react';
import {BrowserRouter as Router, Route } from 'react-router-dom';

//Componentes
import Header from '../../Components/Layouts/Header/Header';
import Inicio from '../../Components/Layouts/Inicio';

//CRUD Empleados
import Empleados from '.../../Components/Empleados';
import FormularioEmpleado from '../../Components/Empleados/FormEmpleado';
//CRUD Clientes
import Clientes from '../../Components/Clientes';
import FormularioCliente from '../../Components/Clientes/FormCliente';
//CRUD Proveedores
import Proveedores from '../../Components/Proveedores';
import FormularioProveedor from '../../Components/Proveedores/FormProveedor';
//CRUD Usuarios
import Usuarios from '../../Components/Usuarios';
import FormularioUsuario from '../../Components/Usuarios/FormUsuario';
//CRUD categorias
import Categorias from '../../Components/Categorias';
import FormularioCategoria from '../../Components/Categorias/FormCategoria';
//CRUD productos
import Productos from '../../Components/Productos';
import FormularioProducto from '../../Components/Productos/FormProducto';
//CRUD bodegas
import Bodegas from '../../Components/Bodegas';
import FormularioBodega from '../../Components/Bodegas/FormBodega';

//CRUD ordenes de compra
import OrdenesCompras from '../../Components/OrdenCompra';
import FormularioOrdenCompra from '../../Components/OrdenCompra/FormOrdenCompra';
import AddProductoOrdenCompra from '../../Components/OrdenCompra/AddProductoOrdenCompra';
import ProductosOrdenCompra from '../../Components/OrdenCompra/VerProductoOrdenCompra';
import OrdenCompraPDF from '../../Components/OrdenCompra/Pdf';

//CRUD de compras
import Compras from '../../Components/Compras';
import FormularioCompra from '../../Components/Compras/FormCompra';

export default function PanelAdmin() {

    return (
        <>
        <Router>
            <Header/>
            <div className="pcoded-main-container">
                <div className="pcoded-content">
                    <div className="row">
                        <div className="col-sm-12">
                            <Route exact path={`/admin/inicio`} component={Inicio}/>
                            <Route exact path={`/admin/usuarios`} component={Usuarios}/>
                            <Route exact path={`/admin/usuarios/nuevo`} component={FormularioUsuario}/>                      
                            <Route exact path={`/admin/empleados`} component={Empleados}/>
                            <Route exact path={`/admin/empleados/nuevo`} component={FormularioEmpleado}/>
                            <Route exact path={`/admin/clientes`} component={Clientes}/>
                            <Route exact path={`/admin/clientes/nuevo`} component={FormularioCliente}/>
                            <Route exact path={`/admin/proveedores`} component={Proveedores}/>
                            <Route exact path={`/admin/proveedores/nuevo`} component={FormularioProveedor}/>
                            <Route exact path={`/admin/categorias`} component={Categorias}/>
                            <Route exact path={`/admin/categorias/nueva`} component={FormularioCategoria}/>
                            <Route exact path={`/admin/productos`} component={Productos}/>
                            <Route exact path={`/admin/productos/nuevo`} component={FormularioProducto}/>
                            <Route exact path={`/admin/bodegas`} component={Bodegas}/>
                            <Route exact path={`/admin/bodegas/nueva`} component={FormularioBodega}/>
                            <Route exact path={`/admin/ordenescompras`} component={OrdenesCompras}/>
                            <Route exact path={`/admin/ordenescompras/nueva`} component={FormularioOrdenCompra}/>
                            <Route exact path={`/admin/orden-compra/:ordenId/productos`} component={AddProductoOrdenCompra}/>
                            <Route exact path={`/admin/orden-compra/:id`} component={ProductosOrdenCompra}/>
                            <Route exact path='/admin/orden-compra/pdf' compornent={OrdenCompraPDF}/> 
                            <Route exact path={`/admin/compras`} component={Compras}/>
                            <Route exact path={`/admin/compras/nueva`} component={FormularioCompra}/>
                            
                        </div>
                    </div>
                </div>
            </div>
        </Router>
        </>
    )
}
