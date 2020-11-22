import React, {useState, useContext, useEffect} from 'react';
import { useHistory } from 'react-router-dom';

import categoriaContext from '../../../Context/categorias/categoriaContext';
import AlertaContext from '../../../Context/alertas/alertaContext';

export default function FormularioCategoria(){
    const history = useHistory()

    const alertaContext = useContext(AlertaContext);
    const {alerta, mostrarAlerta} = alertaContext;

    const [categoria, setCategoria] = useState({
        parentId: '',
        active: true,
        codeCategory: '',
        name: '',
        description: ''
    })

    const CategoriaContext = useContext(categoriaContext);
    const { categoriaseleccionada, errorcategoria, actualizarCategoria,  agregarCategoria, validarCategoria } = CategoriaContext;

    useEffect(()=>{
        if(categoriaseleccionada !== null){
            console.log('categoria seleccionada ',categoriaseleccionada)
            const categoriaActualizar = {
                _id: categoriaseleccionada._id,
                name: '',
                codeCategory: '',
                description: '',
                parentId: 1,
                active: true
            };
            const {_id, codeCategory, name, description, active} = categoriaseleccionada;
            
            categoriaActualizar._id = _id
            categoriaActualizar.name = name
            categoriaActualizar.description = description
            categoriaActualizar.codeCategory = codeCategory
            categoriaActualizar.parentId = 1
            categoriaActualizar.active = active

            setCategoria(categoriaActualizar)
        }else{
            setCategoria({
                _id: -1,
                name: '',
                codeCategory: '',
                description: '',
                parentId: 0,
                active: true
            })
        }
    }, [categoriaseleccionada])

    const { parentId, active, codeCategory, name, description } = categoria
    
    const onChange = e =>{
        setCategoria({
            ...categoria,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = e =>{
        e.preventDefault();
        //Validaciones
        if(name.trim()==='' || description.trim()==='' || codeCategory.trim()==='')
        {
            validarCategoria();
            return;
        }
         //Comprobamos si es agregar o editar
         if(categoriaseleccionada === null){
            agregarCategoria(categoria);
            mostrarAlerta('Categoria agregada exitosamente!', 'alert-success');
            //Redirigimos a la tabla de ver categoria
            history.push('/admin/categorias');
            
        }else{
            actualizarCategoria(categoria);
            mostrarAlerta('Categoria actualizada exitosamente!', 'alert-success')
            history.push('/admin/categorias');
        }
    }

    return(
        <>
        <div className="row">
            <div className="col-md-10">
                <div className="card">
                    <div className="card-body">
                    <h4 className="card-title">{categoriaseleccionada ? 'Editar Categoria': 'Agregar Categoria'}</h4>
                        <hr/>
                        <div className="errores">
                        {errorcategoria ? ( <small className="text-danger">Todos los campos son obligatorio</small>) : null}
                        </div>
                        
                        <form onSubmit={handleSubmit}>
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="card">
                                        <div className="card-body">
                                            <div className="form-group col-md-8">
                                                <label htmlFor="codeCategory">Codigo de categoria</label>
                                                <input 
                                                    type="text" 
                                                    className="form-control"
                                                    name="codeCategory"
                                                    value={codeCategory}
                                                    onChange={onChange} 
                                                    placeholder="Codigo de categoria"
                                                />
                                            </div>
                                            <div className="form-group col-md-8">
                                                <label htmlFor="name">Nombre de categoria</label>
                                                <input 
                                                    type="text" 
                                                    className="form-control"
                                                    name="name"
                                                    value={name}
                                                    onChange={onChange} 
                                                    placeholder="Nombre de categoria"/>
                                                {alerta ? (<small className={`alerta ${alerta.tipoAlerta}`}> {alerta.msg} </small>): null}
                                            </div>
                                            <div className="form-group col-md-8">
                                                <label htmlFor="description">Descripcion</label>
                                                <input 
                                                    type="text" 
                                                    className="form-control"
                                                    name="description"
                                                    value={description}
                                                    onChange={onChange} 
                                                    placeholder="Descripción de la categoria"/>
                                            </div>
                                            <div className="form-group col-md-12">
                                                <div className="switch switch-primary d-inline m-r-10">
                                                    <input type="checkbox" id="switch-p-1" name="active" value={active} onChange={onChange}/>
                                                    <label htmlFor="switch-p-1" className="cr"></label>
                                                </div>
                                                <label htmlFor="">Activo</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                           </div>
                           <div className="form-group row m-b-0">
                                <div className="offset-sm-8 col-sm-10">
                                    <button type="submit" className="btn btn-primary">
                                        <i className="ti-save p-2"></i>
                                        {categoriaseleccionada ? 'Editar categoria': 'Agregar Categoria'}
                                    </button>
                                </div>
                            </div>
                        </form>
        
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}