/*import React from 'react'

export default function BodegaProducto({nextStep, prevStep, categorias, onChange, producto}){
    
    siguiente = e =>{
        e.preventDefault();
        nextStep();
    };

    anterior = e => {
        e.preventDefault();
        prevStep();
    }

    return (
        <>
        <div className="col-md-6">
            <div className="card">
                <h4 className="card-title">Gestión de bodega</h4>
                <div className="card-body">
                    <div className="form-group col-md-12">
                        <label htmlFor="inStock">Stock</label>
                        <input 
                            type="number" 
                            className="form-control"
                            name="inStock"
                            value={inStock}
                            onChange={onChange} 
                            placeholder="Stock del producto"/>
                    </div>
                    
                    <div className="form-group col-md-12">
                        <label htmlFor="price1">Precio Unitario</label>
                        <input 
                            type="number" 
                            className="form-control"
                            name="price1"
                            value={price1}
                            onChange={onChange} 
                            placeholder="Precio unitario del producto"/>
                    </div>
                    <div className="form-group col-md-12">
                        <label htmlFor="price2">Precio Minoristas</label>
                        <input 
                            type="number" 
                            className="form-control"
                            name="price2"
                            value={price2}
                            onChange={onChange} 
                            placeholder="Precio minorista del producto"/>
                    </div>
                    <div className="form-group col-md-12">
                        <label htmlFor="price3">Precio Mayorista</label>
                        <input 
                            type="number" 
                            className="form-control"
                            name="price3"
                            value={price3}
                            onChange={onChange} 
                            placeholder="Precio mayorista del producto"/>
                    </div>
                    <div className="form-group col-md-12">
                        <label htmlFor="price4">Precio descuento</label>
                        <input 
                            type="number" 
                            className="form-control"
                            name="price4"
                            value={price4}
                            onChange={onChange} 
                            placeholder="Precio descuento del producto"/>
                    </div>
                    <div className="form-group col-md-12">
                        <label htmlFor="inStock">Stock</label>
                        <input 
                            type="number" 
                            className="form-control"
                            name="inStock"
                            value={inStock}
                            onChange={onChange} 
                            placeholder="Stock del producto"/>
                    </div>
                    <div className="form-group col-md-12">
                        <label htmlFor="inStock">Stock</label>
                        <input 
                            type="number" 
                            className="form-control"
                            name="inStock"
                            value={inStock}
                            onChange={onChange} 
                            placeholder="Stock del producto"/>
                    </div>
                </div>
            </div>
        </div>
        <div className="form-group row m-b-0">
            <div className="offset-sm-8 col-sm-10">
                <button type="button" className="btn btn-primary" onClick={siguiente}>
                    Siguiente
                </button>
                <button type="button" className="btn btn-primary" onClick={anterior}>
                    Anterior
                </button>
            </div>
        </div>
        </>
    )
}
*/