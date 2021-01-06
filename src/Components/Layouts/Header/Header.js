import React from 'react';
import { Link } from 'react-router-dom';

import userImg from './user_default.png';
import Navbar from '../Navbar/Navbar';

    /*useEffect(() => {
        customInitFunctions();
    }, [customInitFunctions])*/
    
/*
 <li className="nav-item pcoded-hasmenu">
    <Link className="nav-link" to="#!" onClick={preventDefault}>
        <span className="pcoded-micon"><i className="ti-package"></i></span>
        <span className="pcoded-mtext">Gestion de Inventarios</span>
    </Link>
    <ul className="pcoded-submenu">
        <li>
            <Link className="nav-link pcoded-hasmenu" to={'/admin/categorias'}>
                <span className="pcoded-micon"><i className="ti-clipboard"></i></span>
                <span className="pcoded-mtext">Categorias</span>
            </Link>
        </li>
        <li>
            <Link className="nav-link pcoded-hasmenu" to={'/admin/productos'}>
                <span className="pcoded-micon"><i className="ti-shopping-cart"></i></span>
                <span className="pcoded-mtext">Productos</span>
            </Link>
        </li>
        <li>
            <Link className="nav-link pcoded-hasmenu" to={'/admin/bodegas'}>
                <span className="pcoded-micon"><i className="ti-package"></i></span>
                <span className="pcoded-mtext">Bodegas</span>
            </Link>
        </li>
    </ul>
</li>

*/
export default function Header(){
    
    let user = JSON.parse(localStorage.getItem('user'));
   
    const preventDefault = (e) => {
        e.preventDefault();
    }

    return (
        <>
            <Navbar/>
            <nav className="pcoded-navbar menupos-fixed">
                <div className="navbar-wrapper">
                    <div className="navbar-content scroll-div">
                        <div>
                        {
                            user &&
                            (
                                <div className="main-menu-header">
                                    <img src={userImg} alt="User default" className="img-radius"/>
                                    <div className="user-details">
                                        <span className="mb-0 font-weight-bold">{user?.username}</span>
                                        <div id="more-details"><small>{user?.role}</small></div>
                                    </div>
                                </div>   
                            )
                        }
                        </div>
                        <ul className="nav pcoded-inner-navbar">
                            <li className="nav-item pcoded-menu-caption"><label htmlFor="">Inicio</label></li>
                            <li className="nav-item">
                                <Link className="nav-link pcoded-hasmenu" to={`/admin/inicio`}>
                                    <span className="pcoded-micon"><i className="ti-home"></i></span>
                                    <span className="pcoded-mtext">Inicio</span>
                                </Link>
                            </li>
                            <li className="nav-item pcoded-hasmenu">
                                <Link className="nav-link" to="#!" onClick={preventDefault}>
                                    <span className="pcoded-micon"><i className="ti-user"></i></span>
                                    <span className="pcoded-mtext">Gestion de Usuarios</span>
                                </Link>
                                <ul className="pcoded-submenu">
                                    <li>
                                        <Link className="nav-link pcoded-hasmenu" to={'/admin/usuarios'}>
                                            <span className="pcoded-micon"><i className="ti-user"></i></span>
                                            <span className="pcoded-mtext">Usuarios</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link className="nav-link pcoded-hasmenu" to={'/admin/empleados'}>
                                            <span className="pcoded-micon"><i className="ti-user"></i></span>
                                            <span className="pcoded-mtext">Empleados</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link className="nav-link pcoded-hasmenu" to={'/admin/clientes'}>
                                            <span className="pcoded-micon"><i className="ti-user"></i></span>
                                            <span className="pcoded-mtext">Clientes</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to={'/admin/proveedores'}>
                                            <span className="pcoded-micon"><i className="ti-truck"></i></span>
                                            <span className="pcoded-mtext">Proveedores</span>
                                        </Link>
                                    </li>
                                </ul>
                            </li>
                            <li className="nav-item pcoded-menu-caption"><label htmlFor="">Inventarios</label></li>
                            <li className="nav-item">
                                <Link className="nav-link pcoded-hasmenu" to={'/admin/categorias'}>
                                    <span className="pcoded-micon"><i className="ti-clipboard"></i></span>
                                    <span className="pcoded-mtext">Categorias</span>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link pcoded-hasmenu" to={'/admin/productos'}>
                                    <span className="pcoded-micon"><i className="ti-shopping-cart"></i></span>
                                    <span className="pcoded-mtext">Productos</span>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link pcoded-hasmenu" to={'/admin/bodegas'}>
                                    <span className="pcoded-micon"><i className="ti-package"></i></span>
                                    <span className="pcoded-mtext">Bodegas</span>
                                </Link>
                            </li>
                            <li className="nav-item pcoded-menu-caption"><label htmlFor="">Ordenes</label></li>
                            <li className="nav-item">
                                <Link className="nav-link pcoded-hasmenu" to={'/admin/ordenescompras'}>
                                    <span className="pcoded-micon"><i className="ti-shopping-cart-full"></i></span>
                                    <span className="pcoded-mtext">Ordenes de Compra</span>
                                </Link>
                            </li>                           
                        </ul>
                    </div>
                </div>
            </nav>       
        </>
    )
}