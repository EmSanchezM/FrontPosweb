/*import React from 'react'

export default function DetalleProducto({nextStep, prevStep, categorias, onChange, producto}){
    
    siguiente = e =>{
        e.preventDefault();
        nextStep();
    };

    return (
        <>
        <div className="col-md-6">
            <div className="card">
                <h4 className="card-title">Detalle Producto</h4>
                <div className="card-body">
                    <div className="form-group col-md-12">
                        <label htmlFor="codeProduct">Código de producto</label>
                        <input 
                            type="text" 
                            className="form-control"
                            name="codeProduct"
                            value={codeProduct}
                            onChange={onChange} 
                            placeholder="Código de producto"
                        />
                    </div>
                    <div className="form-group col-md-12">
                        <label htmlFor="name">Nombre de producto</label>
                        <input 
                            type="text" 
                            className="form-control"
                            name="name"
                            value={name}
                            onChange={onChange} 
                            placeholder="Nombre de producto"/>
                    </div>
                    <div className="form-group col-md-12">
                        <label htmlFor="category">Categoria</label>
                        <select name="categoryId" onChange={onChange} className="form-control">
                            <option value="">Seleccione la categoria</option>
                            {categorias?.map(categoria=>(
                                <option
                                    key={categoria._id}
                                    value={categoria._id}
                                >
                                    {categoria.name} 
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group col-md-12">
                        <label htmlFor="description">Descripción</label>
                        <input 
                            type="text" 
                            className="form-control"
                            name="description"
                            value={description}
                            onChange={onChange} 
                            placeholder="Descripción del producto"/>
                    </div>
                    <div className="form-group col-md-12">
                        <label htmlFor="brand">Marca</label>
                        <input 
                            type="text" 
                            className="form-control"
                            name="brand"
                            value={brand}
                            onChange={onChange} 
                            placeholder="Marca del producto"/>
                    </div>
                    <div className="form-group col-md-12">
                        <label htmlFor="serie">Serie</label>
                        <input 
                            type="text" 
                            className="form-control"
                            name="serie"
                            value={serie}
                            onChange={onChange} 
                            placeholder="Serie del producto"/>
                    </div>
                    <div className="form-group col-md-12">
                        <label htmlFor="color">Color</label>
                        <input 
                            type="text" 
                            className="form-control"
                            name="color"
                            value={color}
                            onChange={onChange} 
                            placeholder="Color del producto"/>
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
        <div className="form-group row m-b-0">
            <div className="offset-sm-8 col-sm-10">
                <button type="button" className="btn btn-primary" onClick={siguiente}>
                    Siguiente
                </button>
            </div>
        </div>
        </>
    )
}
*/