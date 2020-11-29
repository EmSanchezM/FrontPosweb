import React, {useState, useContext, useEffect} from 'react';
import { useHistory } from 'react-router-dom';
/*
import DetalleProducto from './DetalleProducto';
import Bodega from './Bodega'
*/
import productoContext from '../../../Context/productos/productoContext';
import categoriaContext from '../../../Context/categorias/categoriaContext';
import proveedorContext from '../../../Context/proveedores/proveedorContext';
import AlertaContext from '../../../Context/alertas/alertaContext';

export default function FormularioProducto(){
    const history = useHistory()

    const alertaContext = useContext(AlertaContext);
    const {alerta, mostrarAlerta} = alertaContext;

    const [loop, setLoop] = useState(0);

    const [producto, setProducto] = useState({
        step:1,
        codeProduct:'',
        name:'',
        description:'',
        categoryId:'',
        supplierId:'',
        price1:0,
        price2:0,
        price3:0,
        price4:0,
        inStock:0,
        cost:0,
        brand:'',
        serie:'',
        color:'',
        year:'',
        weight:'',
        size:'',
        minCount:0,
        expiredDate:'',
        expiredSaleDate:'',
        isConsumible:false,
        active:true
    })

    const ProductoContext = useContext(productoContext);
    const { productoseleccionado, errorproducto, actualizarProducto,  agregarProducto, validarProducto } = ProductoContext;

    const CategoriaContext = useContext(categoriaContext);
    const { categorias, obtenerCategorias } = CategoriaContext;

    const ProveedorContext = useContext(proveedorContext);
    const { proveedores, obtenerProveedores } = ProveedorContext;
    
    useEffect(()=>{
        obtenerCategorias();
    },[loop])
    
    useEffect(()=>{
        obtenerProveedores();
    },[loop])

    /*
    nextStep = () => {
        const { step } = producto;
        this.setProducto({
          step: step + 1
        });
      };
    
      // Go back to prev step
    prevStep = () => {
        const { step } = producto;
        this.setProducto({
          step: step - 1
        });
    };
    */

    useEffect(()=>{
        if(productoseleccionado !== null){
            console.log('producto seleccionado ',productoseleccionado);
            setProducto(productoseleccionado);
        }else{
            setProducto({
                codeProduct:'',
                name:'',
                description:'',
                categoryId:'',
                supplierId:'',
                price1:0,
                price2:0,
                price3:0,
                price4:0,
                inStock:0,
                cost:0,
                brand:'',
                serie:'',
                color:'',
                year:'',
                weight:'',
                size:'',
                minCount:0,
                expiredDate:'',
                expiredSaleDate:'',
                isConsumible:false,
                active:true
            })
        }
    }, [productoseleccionado])

    const { 
        name, description, codeProduct,
        price1, price2, price3, price4,
        inStock, cost,brand, serie, 
        color, year, weight, size, 
        minCount, expiredDate, expiredSaleDate,
        isConsumible, active  
    } = producto

    const onChange = e =>{
        setProducto({
            ...producto,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = e =>{
        e.preventDefault();
        //Validaciones
        if(name.trim()==='' || description.trim()==='' || codeProduct.trim()==='' ||  
           brand.trim()==='' || serie.trim()==='' || color.trim()==='' ||
           year.trim()==='' || weight.trim()==='' || size.trim()==='')
        {
            validarProducto();
            return;
        }

        if(price1 < 0 || price2 < 0 || price3 < 0 || price4 < 0){
            validarProducto();
            mostrarAlerta('Campo debe ser mayor a cero!', 'alert-danger')
            return;
        }
         //Comprobamos si es agregar o editar
         if(productoseleccionado === null){
            agregarProducto(producto);
            mostrarAlerta('Producto agregado exitosamente!', 'alert-success');
            //Redirigimos a la tabla de ver productos
            history.push('/admin/productos');
            
        }else{
            actualizarProducto(producto);
            mostrarAlerta('Producto actualizado exitosamente!', 'alert-success')
            history.push('/admin/productos');
        }
    }

    return(
        <>
        <div className="row">
            <div className="col-md-10">
                <div className="card">
                    <div className="card-body">
                        <h4 className="card-title">{productoseleccionado ? 'Editar Producto': 'Agregar Producto'}</h4>
                        <hr/>
                        <div className="errores">
                            {errorproducto ? ( <small className="text-danger">Todos los campos son obligatorio</small>) : null}
                        </div>
                        {alerta ? 
                            (
                                <div className={`alert ${alerta.tipoAlerta}`}>
                                    {alerta.msg}
                                    <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                                        <span aria-hidden="true">X</span>
                                    </button>
                                </div>
                            ): null} 
                    <form onSubmit={handleSubmit}>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="card">
                                    <h4 className="card-title">Detalle Producto</h4>
                                    <div className="card-body">
                                        <div className="form-group col-md-12">
                                            <label htmlFor="category">Categoria</label>
                                            <select name="categoryId" onChange={onChange} className="form-control">
                                                <option value="">Seleccione la categoria</option>
                                                {productoseleccionado ? (
                                                    categorias?.map(categoria=>(
                                                        <option
                                                            key={categoria._id}
                                                            value={categoria._id}
                                                            selected={categoria._id === productoseleccionado.categoryId}
                                                        >
                                                            {categoria.name} 
                                                        </option>
                                                    ))
                                                ): (
                                                    categorias?.map(categoria=>(
                                                        <option
                                                            key={categoria._id}
                                                            value={categoria._id}
                                                        >
                                                            {categoria.name} 
                                                        </option>
                                                    ))
                                                )}
                                            </select>
                                        </div>
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
                                            <label htmlFor="year">Año</label>
                                            <input 
                                                type="text" 
                                                className="form-control"
                                                name="year"
                                                value={year}
                                                onChange={onChange} 
                                                placeholder="Año de lanzamiento del producto"/>
                                        </div>
                                        <div className="form-group col-md-12">
                                            <label htmlFor="weight">Peso</label>
                                            <input 
                                                type="text" 
                                                className="form-control"
                                                name="weight"
                                                value={weight}
                                                onChange={onChange} 
                                                placeholder="Peso del producto"/>
                                        </div>
                                        <div className="form-group col-md-12">
                                            <label htmlFor="size">Tamaño</label>
                                            <input 
                                                type="text" 
                                                className="form-control"
                                                name="size"
                                                value={size}
                                                onChange={onChange} 
                                                placeholder="Tamaño del producto"/>
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
                                                <input type="checkbox" id="switch-p-2" name="isConsumible" value={isConsumible} onChange={onChange}/>
                                                <label htmlFor="switch-p-2" className="cr"></label>
                                            </div>
                                            <label htmlFor="">Comestible</label>
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
                            <div className="col-md-6">
                                <div className="card">
                                    <h4 className="card-title">Gestión de bodega</h4>
                                    <div className="card-body">
                                        <div className="form-group col-md-12">
                                            <label htmlFor="proveedor">Proveedor</label>
                                            <select name="supplierId" onChange={onChange} className="form-control">
                                                <option value="">Seleccione el proveedor</option>
                                                {productoseleccionado ? (
                                                    proveedores?.map(proveedor=>(
                                                        <option
                                                            key={proveedor._id}
                                                            value={proveedor._id}
                                                            selected={proveedor._id === productoseleccionado.supplierId}
                                                        >
                                                            {proveedor.companyName} 
                                                        </option>
                                                    ))
                                                ):
                                                (
                                                    proveedores?.map(proveedor=>(
                                                        <option
                                                            key={proveedor._id}
                                                            value={proveedor._id}
                                                        >
                                                            {proveedor.companyName} 
                                                        </option>
                                                    ))
                                                )
                                                }    
                                            </select>
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
                                            <label htmlFor="minCount">Mínimo</label>
                                            <input 
                                                type="number" 
                                                className="form-control"
                                                name="minCount"
                                                value={minCount}
                                                onChange={onChange} 
                                                placeholder="Minimo del producto"/>
                                        </div>
                                        <div className="form-group col-md-12">
                                            <label htmlFor="cost">Costo</label>
                                            <input 
                                                type="number" 
                                                className="form-control"
                                                name="cost"
                                                value={cost}
                                                onChange={onChange} 
                                                placeholder="Costo del producto"/>
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
                                            <label htmlFor="expiredDate">Fecha de expiracion</label>
                                            <input 
                                                type="date" 
                                                className="form-control"
                                                name="expiredDate"
                                                value={expiredDate}
                                                onChange={onChange} 
                                            />
                                        </div>
                                        <div className="form-group col-md-12">
                                            <label htmlFor="expiredSaleDate">Fecha de venta vencida</label>
                                            <input 
                                                type="date" 
                                                className="form-control"
                                                name="expiredSaleDate"
                                                value={expiredSaleDate}
                                                onChange={onChange} 
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>                            
                        </div>                     
                        <div className="form-group row m-b-0">
                            <div className="offset-sm-8 col-sm-10">
                                <button type="submit" className="btn btn-primary">
                                    <i className="ti-save p-2"></i>
                                    {productoseleccionado ? 'Editar producto': 'Agregar Producto'}
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