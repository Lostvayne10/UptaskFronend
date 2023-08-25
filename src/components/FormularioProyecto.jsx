import { useState } from 'react'
import useProyectos from '../hooks/useProyectos';
import Alerta from './Alerta';

function FormularioProyecto() {

    const [nombre, setNombre] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [fechaEntrega, setFechaEntrega] = useState("");
    const [cliente, setCliente] = useState("");

    const {mostrarAlerta, alerta, submitProyecto} = useProyectos();

    const handleSubmit = async e => {
        e.preventDefault();

        if([nombre, descripcion, fechaEntrega, cliente].includes('')){
            mostrarAlerta({
                msg: "Todos los campos son obligatorios",
                error: true
            });
            return;
        }

        await submitProyecto({
            nombre, descripcion, fechaEntrega, cliente
        });

        setNombre("");
        setDescripcion("");
        setCliente("");
        setFechaEntrega("");
    }

    const {msg} = alerta;

  return (
    
    <form   onSubmit={handleSubmit} 
        className='bg-white py-5 px-5 md:w-1/2 rounded-lg'>
        {msg&& <Alerta alerta={alerta}/>}
        <div className='mb-5'>
            <label 
                htmlFor="nombre" 
                className='text-gray-700 font-bold uppercase text-sm shadow'>
                Nombre Proyecto
            </label>
            <input 
                type="text" 
                className='border w-full p-2 mt-2 placeholder-gray-400 rounded-md' 
                id="nombre"
                placeholder='Nombre del Proyecto' 
                value={nombre}
                onChange={e => setNombre(e.target.value)}
                />
        </div>
        <div className='mb-5'>
            <label 
                htmlFor="descripcion" 
                className='text-gray-700 font-bold uppercase text-sm shadow'>
               Descripcion
            </label>
            <textarea
                className='border w-full p-2 mt-2 placeholder-gray-400 rounded-md' 
                id="descripcion"
                placeholder='Descripcion del Proyecto' 
                value={descripcion}
                onChange={e => setDescripcion(e.target.value)}
                />
        </div>
        <div className='mb-5'>
            <label 
                htmlFor="fecha-entrega" 
                className='text-gray-700 font-bold uppercase text-sm shadow'>
                Fecha de Entrega
            </label>
            <input 
                type="date" 
                className='border w-full p-2 mt-2 placeholder-gray-400 rounded-md' 
                id="fecha-entrega"
                value={fechaEntrega}
                onChange={e => setFechaEntrega(e.target.value)}
                />
        </div>
        <div className='mb-5'>
            <label 
                htmlFor="cliente" 
                className='text-gray-700 font-bold uppercase text-sm shadow'>
                Cliente
            </label>
            <input 
                type="text" 
                className='border w-full p-2 mt-2 placeholder-gray-400 rounded-md' 
                id="cliente"
                placeholder='Cliente del Proyecto' 
                value={cliente}
                onChange={e => setCliente(e.target.value)}
                />
        </div>
        <input 
                type="submit" 
                value="Crear proyecto" 
                className='bg-sky-600 text-white uppercase p-3 w-full font-bold text-center rounded cursor-pointer hover:bg-sky-700 transition-colors' />
        
    </form>
  )
}

export default FormularioProyecto