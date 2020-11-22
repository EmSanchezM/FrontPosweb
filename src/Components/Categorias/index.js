import React,  { useContext, useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';

import categoriaContext from '../../Context/categorias/categoriaContext';
import alertaContext from '../../Context/alertas/alertaContext';

export default function Categorias(){

    const CategoriaContext = useContext(categoriaContext);
    const { categorias, obtenerCategorias, eliminarCategoria} = CategoriaContext;

    const AlertaContext = useContext(alertaContext);
    const {alerta, mostrarAlerta} = AlertaContext;
    let confirm;

    const [consulta, setConsulta] = useState('');
    const [filterCategorias, setFilterCategorias] = useState(categorias);
    
    useEffect(()=>{
        obtenerCategorias();
    }, [obtenerCategorias]);

    useMemo(()=>{
        const result = categorias.filter(categoria=>{
            return `${categoria.name}`
                    .toLowerCase()
                    .includes(consulta.toLowerCase())
        })
        setFilterCategorias(result);
    },[consulta, categorias])
   
    const onClickEliminar = categoria => {
        confirm = window.confirm('¿Estas seguro de eliminarla?');
        
        if(confirm){
            eliminarCategoria(categoria);
            mostrarAlerta('Categoria eliminada exitosamente!', 'alert-success');
            obtenerCategorias();
            return;
        }       
    }

    return(
        <>
            <div className="row">
                <div className="col-12">
                    <div className="card">
                        <div className="card-body">
                            {alerta ?
                            (
                                <div className={`alert ${alerta.tipoAlerta}`}>
                                    {alerta.msg}
                                    <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                                        <span aria-hidden="true">X</span>
                                    </button>
                                </div>
                            )
                            : 
                            (    <div className="input-group">
                                    <div className="input-group-prepend">
                                        <div className="input-group-text"><i className="ti-search"></i></div>
                                    </div>
                                    <input 
                                        type="text"
                                        className="form-control"
                                        placeholder="Buscar categoria..."
                                        name="consulta"
                                        value={consulta}
                                        onChange={e=> setConsulta(e.target.value)}
                                    />
                                </div>
                            )
                            }

                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <div className="card">
                        <div className="card-body">
                            <div className="row">
                                <div className="col-8">
                                    <h4 className="card-title">Categorias( {categorias.length} )</h4>
                                </div>
                                <div className="col-4 mb-2">
                                    <div className="text-right">
                                        <Link className="btn btn-sm btn-primary" to='/admin/categorias/nueva'>
                                            <span className="pcoded-micon"><i className="ti-user"></i></span>
                                            <span className="pcoded-mtext p-2">Agregar</span>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            <div className="table-responsive">
                                <table className="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th>COD. Categoria</th>
                                            <th>Nombre categoria</th>
                                            <th>Descripcion</th>
                                            <th className="w100 text-nowrap">Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            filterCategorias.length === 0
                                            ?
                                            <tr><div className="alert alert-danger">No hay categorias</div></tr>
                                            :
                                            (
                                                filterCategorias.map((categoria,i) => {
                                                    return(
                                                    <tr key={i+categoria._id} >  
                                                        <td key={Math.random()}>{categoria.codeCategory}</td>
                                                        <td key={Math.random()}>{categoria.name}</td>
                                                        <td key={Math.random()}>{categoria.description}</td>
                                                        <td className="text-nowrap text-center">
                                                            
                                                            <button
                                                                data-toggle="tooltip" 
                                                                className="btn btn-block btn-sm btn-danger sweet-multiple"
                                                                data-original-title="Borrar"
                                                                onClick={()=>onClickEliminar(categoria)}
                                                            ><i className="ti-trash"></i></button>
                                                        </td>
                                                    </tr> 
                                                    )
                                                })
                                            )
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
      </>
    )
}
