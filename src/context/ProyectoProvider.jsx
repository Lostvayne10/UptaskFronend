import { useState, useEffect, createContext } from "react";
import clienteAxions from "../config/clienteAxios";
import { useNavigate } from "react-router-dom";

const ProyectoContext = createContext();

const ProyectoProvider = ({children}) => {
    const [proyecto, setProyecto] = useState({});
    const [proyectos, setProyectos] = useState([]);
    const [alerta, setAlerta] = useState({});
    const [cargando, setCargando] = useState(false);
    const navigate = useNavigate();

    useEffect(()=>{
        const obtenerProyectos = async () => {
            try{
                const token = localStorage.getItem("token");
                if(!token){
                   
                    return;
                }
                const config = {
                    headers:{
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    }
                };
    
                const {data} = await clienteAxions("/proyectos",config);
    
                setProyectos(data);
                
            }catch(error){
                console.log(error)
            }
        }

        obtenerProyectos();
    }, []);

    const mostrarAlerta = alerta => {
        setAlerta(alerta)

        setTimeout(()=>{
            setAlerta({})
        }, 5000)
    }

    const obtenerProyecto = async id => {
        setCargando(true)
        try{
            const token = localStorage.getItem("token");
            if(!token){
               
                return;
            }
            const config = {
                headers:{
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            };

            const {data} = await clienteAxions(`/proyectos/${id}`,config);

            setProyecto(data);
            
        }catch(error){
            console.log(error)
        }
        setCargando(false)
    }

    const submitProyecto = async proyecto => {

        if(proyecto.id){
            editarProyecto(proyecto);
        } else{
            nuevoProyecto(proyecto)
        }
    }

    const editarProyecto = async proyecto =>{
        try{
            const token = localStorage.getItem("token");
            if(!token){
               
                return;
            }
            const config = {
                headers:{
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            };

            const {data} = await clienteAxions.put(`/proyectos/${proyecto.id}`,proyecto,config);

            const proyectosActualizados = proyectos.map(proyectoState => proyectoState._id === data._id ?data  : proyectoState);

            setProyectos(proyectosActualizados);

            setAlerta({
                msg: 'Proyecto Actualizado Correctamente',
                error:false
            });

            setTimeout(() => {
                setAlerta({});
                navigate("/proyectos");
            }, 3000);

        }catch(error){
            console.log(error)
        }
    }

    const nuevoProyecto = async proyecto =>{
        try{
            const token = localStorage.getItem("token");
            if(!token){
               
                return;
            }
            const config = {
                headers:{
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            };

            const {data} = await clienteAxions.post("/proyectos",proyecto,config);

            setProyectos([...proyectos, data])

            setAlerta({
                msg: 'Proyecto Creado Correctamente',
                error:false
            });

            setTimeout(() => {
                setAlerta({});
                navigate("/proyectos");
            }, 3000);

        }catch(error){
            console.log(error)
        }
    }

    const eliminarProyecto = async id => {
        try{
            const token = localStorage.getItem("token");
            if(!token){
               
                return;
            }
            const config = {
                headers:{
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            };

            const {data} = await clienteAxions.delete(`/proyectos/${id}`,config);

            const proyectosActualizados = proyectos.filter(proyectoState => proyectoState._id !== id);

            setProyectos(proyectosActualizados);

            setAlerta({
                msg: data.msg,
                error:false
            });

            setTimeout(() => {
                setAlerta({});
                navigate("/proyectos");
            }, 3000);

        }catch(error){
            console.log(error)
        }
    }

    return (
        <ProyectoContext.Provider
            value={{
                proyectos,
                setProyectos,
                mostrarAlerta,
                alerta,
                submitProyecto,
                obtenerProyecto,
                proyecto,
                cargando,
                eliminarProyecto
            }}
        >
            {children}
        </ProyectoContext.Provider>
    );

}

export {
    ProyectoProvider
};
export default ProyectoContext;