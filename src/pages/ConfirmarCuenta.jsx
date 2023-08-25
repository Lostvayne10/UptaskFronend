import { useEffect, useState } from "react"
import {useParams, Link} from "react-router-dom"
import clienteAxions from "../config/clienteAxios";
import Alerta from "../components/Alerta"

function ConfirmarCuenta() {

  const params = useParams();
  const {token} = params;
  const [alerta, setAlerta ] = useState({});
  const [cuentaConfirmado, setCuentaConfirmada] = useState(false);

  useEffect(()=>{

    const confirmarCuenta = async () =>{
      try{
        const {data} = await clienteAxions(`/usuarios/confirmar/${token}`);
        setAlerta({
          msg: data.msg,
          error: false
        });
        setCuentaConfirmada(true);
      }catch(error){
       
        setAlerta({
          msg: error.response.data.msg,
          error: true
        })
      }
    }
    confirmarCuenta();

  },[]);

  const {msg} = alerta;

  return (
    <>
      <h1 className='text-sky-600 font-black text-6xl capitalize'>
        Confirma tu cuenta
      </h1>
      <div className="mt-20 md:mt-10 shadow-lg px-5 py-10 rounded-xl bg-white">
        { msg && <Alerta alerta={alerta}/> }
        {cuentaConfirmado && (
            <Link className="block text-center my-5 text-slate-500 uppercase text-sm" to="/">Inicia sesion</Link>
        )}
      </div>
    </>
  )
}

export default ConfirmarCuenta